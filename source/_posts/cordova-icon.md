---
date: 2019-09-21
tags:
  - Cordova
title: 【cordova】アイコン画像の設定方法
---

{% asset_img cordova.jpeg %}

<!-- more -->

### 環境

- cordova-icon: 1.0.0

### 画像作成と配置

1024\*1024 のサイズのアイコン画像を用意する
icon.png という名前にして res フォルダ直下に置きます

ちなみにここで画像のサイズ変更ができます
https://onlinepngtools.com/resize-png

### android の場合

android の場合は config.xml に以下の行を追加するだけです
android だけが対象なので`<platform name="android">`タグの中に追加します

```xml
<platform name="android">
  ...
  <icon src="res/icon.png" /> <!-- この行を追加する -->
</platform>
```

### ios の場合

ios の場合はなぜか上のやり方だとダメなのでライブラリを利用します

### ライブラリインストール

利用ライブラリ
https://www.npmjs.com/package/cordova-icon

cordova プロジェクトルートで

```bash
npm install cordova-icon
```

### アイコン配布

```
cordova-icon --icon=res/icon.png
```

ファイル名を`icon.png`以外にしたら以下のエラーになった
多分`icon.jpeg`とかは大丈夫だと思う

エラー
`CompileAssetCatalog build/emulator/hoge.app hoge/Images.xcassets`

エラーが出なければ、あとは普通にビルドすれば OK！

### 参考

https://cordova.apache.org/docs/ja/latest/config_ref/images.html

以上です。
