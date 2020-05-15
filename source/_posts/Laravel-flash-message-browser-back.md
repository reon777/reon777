---
title: Laravelのフラッシュメッセージをブラウザバック時に出ないようにする
date: 2020-05-15
---

![](/images/php.png)

### はじめに

DB登録完了時に「登録完了しました！」みたいなポップアップがあると嬉しいですよね。
これを実現するためにLaravelにはフラッシュメッセージという機能があります。
フラッシュメッセージを使うと画面リロード時には表示されなかったりと便利です。
ただ、ブラウザバックの時は表示されちゃうんですよね。
なのでLaravelのフラッシュメッセージをブラウザバックで出ないようにする方法をメモします。
やり方は単純で、ブラウザのセッションストレージにフラグを用意するだけです。

### コントローラー

hogeController.php

```php
return redirect("/hoge")->with('is_after_complete', '完了しました');
```

### ビュー

hoge.brade.php

```php
<!DOCTYPE html>
<html lang="ja">
<head>
</head>
<body>
</body>
</html>

<script type="text/javascript">
	// 完了後ポップアップ表示
	const is_after_complete = "{{ Session::get('is_after_complete') }}";
	if (is_after_complete) {
		// sessionStorageはブラウザバックで完了ポップアップが出てしまうのを防ぐために利用している
		if (sessionStorage.getItem('is_after_complete') != "1") {
			alert(is_after_complete);
			sessionStorage.setItem('is_after_complete', "1");
		}
	}

	// ブラウザバックで完了ポップアップが出てしまうのを防ぐための処理
	$('form').submit(function() {
		sessionStorage.setItem('is_after_complete', "0");
	})
</script>

```

### おわりに

需要高いはずなのでLaravel標準機能にありそうだけど探しても見つからなかった、、なぜだ、、

### 参考

[Laravel：フラッシュメッセージを表示する](https://qiita.com/usaginooheso/items/6a99e565f16de2f9ddf7)
