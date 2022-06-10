---
title: 【Google Analytics】メールの開封率を測定する方法
date: 2022-06-10 09:00:00
---

### これは何

Google Analyticsでメールの開封率を測定する方法です。

### 前提1

メールを開いた時に発生するイベントを仕込みます。
そのイベントの発生回数と、メール送信回数を使って開封率を算出します。

### 前提2

メールには通常のテキストとリッチテキストの２種類あります。
リッチテキストではhtmlが書けます。
今回はimgタグにイベントを仕込むので、リッチテキストを使います。

### やり方

1. sample.htmlという名前のファイルを作成します。
2. 以下をコピペします。
  
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ja">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>hoge</title>
  </head>
  <body>
    <div>
      <p>
        hoge様
      </p>
      
      <!-- これが重要！ -->
      <!-- tidとcidとelの値は各自で変更すること -->
      <img src="https://ssl.google-analytics.com/collect?v=1&t=event&tid=hoge&cid=hoge&ec=email&ea=open&el=hoge">
      
      <div>
        株式会社hoge<br>
      </div>
      
  </body>
</html>
```

3. hogeの部分を変更する。
4. sample.htmlをブラウザで開きます
5. ブラウザで開いた内容をコピペします
6. メールに貼り付けます（リッチテキスト状態にしておくこと）

あとは通常通りにメール送信するだけです。
結果はanalyticsからいつも通り確認できます。
elの値でフィルタすると良いと思います。

以上です。
