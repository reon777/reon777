---
title: 【Laravel】iPhoneで撮った写真が回転してしまう不具合の解決策
date: 2020-05-29
tags:
  - PHP
---

![](/images/php.png)

### はじめに

iPhoneの画像をアップロードした時に意図せぬ方向に回転してしまう不具合を解消したので手順をメモしておきます

調べた限りでは`intervention/image`を使った記事が多かったですが、なぜかうまくいかなかったので`Imagick`を利用しました。

ただ`intervention/image`の方が簡単っぽいのでまずはこの記事ではなく、一番下にある参考記事の通りにやってみるのをオススメしますw

### 環境

- Mac Catalina 10.15.3
- Laravel Framework 7.10.3

### 不具合の再現

Chromeだと発生しません！
Safariだと発生します！

1. iPhoneで縦向きで写真を撮る
2. LINEやSlackなどを経由してPCに送る（※AirDropだとダメ。拡張子がHEICのままになるので。）
3. アプリから画像をアップロードする（不具合１→プレビューで意図せぬ回転）
4. DBに保存する
5. DBから画像を取得してアプリで表示する（不具合２→表示時に意図せぬ回転）

### 事前準備

imagickが利用できるか確認します

```bash
php -m | grep imagick
# imagick
```

imagickが表示されない場合はインストールしてください。
[imagickを使うためにImageMagickの最新版をインストールする話](https://qiita.com/SHIN_DEVELOP/items/c60eb9cd592f4a6a0f00)

### 解決策

以下の２つを行う必要があります
- プレビュー時点の回転を補正する
- DBに保存する時点で回転を補正する

### プレビュー時点の回転補正

以下のライブラリを利用します
https://github.com/blueimp/JavaScript-Load-Image

https://github.com/blueimp/JavaScript-Load-Image/blob/master/js/load-image.all.min.js
のソースの中身をコピーします

`public/js/load-image.all.min.js`を作成して、貼り付けます

<script src="/js/load-image.all.min.js"></script>

プレビューの処理を以下のように修正します

修正前

```js
<script type="text/javascript">
  const file = $(id).prop('files')[0];
  var blobUrl = window.URL.createObjectURL(file);
  $(id + '_preview').attr('src', blobUrl);
</script>
```

修正後


```js
<script src="/js/load-image.all.min.js"></script>
<script type="text/javascript">
  const file = $(id).prop('files')[0];

  // 読み込み用の関数で読み込み完了時に、HTMLにcanvas追加
  load(file, function(canvas) {
    console.log('読み込み完了')
    canvas.toBlob(function(blob) {
      // プレビュー表示
      var blobUrl = window.URL.createObjectURL(blob);
      $(id + '_preview').attr('src', blobUrl);
      // フォーム送信用に変換
      $(id).attr('src', canvas.toDataURL());
    });
  });

  function load(file, callback) {
    // canvas: true にすると canvas に画像を描画する(回転させる場合は必須オプション)
    var options = {
      canvas: true,
    };
    loadImage.parseMetaData(file, function(data) {
      if (data.exif) {
        // 回転補正
        options.orientation = data.exif.get('Orientation');
      }
      // 画像の読み込み。完了時に callback が呼び出される
      loadImage(file, callback, options);
    });
  }
</script>
```

### サーバ側で実際の画像の回転補正

コントローラに以下の処理を追加

```php
// 普通に画像を保存する
Storage::putFileAs("public/image/hoge.jpeg");

// 回転補正して上書きする
\Log::info('回転補正開始');
$imagick = new \Imagick();
$url = env("APP_URL") . '/storage/image/hoge.jpeg';
$image = file_get_contents($url);
$imagick->readImageBlob($image);
$format = strtolower($imagick->getImageFormat());
if ($format === 'jpeg') {
  $orientation = $imagick->getImageOrientation();
  $isRotated = false;
  if ($orientation === \Imagick::ORIENTATION_RIGHTTOP) {
    $imagick->rotateImage('none', 90);
    $isRotated = true;
  } elseif ($orientation === \Imagick::ORIENTATION_BOTTOMRIGHT) {
    $imagick->rotateImage('none', 180);
    $isRotated = true;
  } elseif ($orientation === \Imagick::ORIENTATION_LEFTBOTTOM) {
    $imagick->rotateImage('none', 270);
    $isRotated = true;
  }
  if ($isRotated) {
    $imagick->setImageOrientation(\Imagick::ORIENTATION_TOPLEFT);
  }
}
$imagick->writeImage(ltrim('/storage/image/hoge.jpeg', "/"));
```

以上

### 参考

[iPhoneで撮った写真が回転している問題 in Laravel](https://idealive.jp/blog/2019/09/12/iphone%E3%81%A7%E6%92%AE%E3%81%A3%E3%81%9F%E5%86%99%E7%9C%9F%E3%81%8C%E5%9B%9E%E8%BB%A2%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E5%95%8F%E9%A1%8C-in-laravel/)

（もう１つすごく参考にした記事があったのだけれどタブを消してしまい、検索しても出てこず、、分かったら追記します、、）
