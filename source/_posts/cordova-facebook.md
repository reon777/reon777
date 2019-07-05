---
date: 2019-07-05
tags:
  - cordova
  - facebook
title: cordovaでfacebookログインを実装してみた
---

{% asset_img facebook.png %}

cordovaでfacebookログインを実装したので手順をメモしておきます

<!-- more -->

**作業環境**

- Mac Mojave 10.14.4
- cordova-ios 4.5.5
- cordova-android 7.1.4

## インストール

### 利用プラグイン
https://github.com/jeduan/cordova-plugin-facebook4

### インストールコマンド
```bash
# for ios
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="MyApp"
# for android
cordova plugin add https://github.com/jeduan/cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="MyApp"
```

APP_IDとAPP_NAMEは書き替えてね！

## ログイン

下のコードで自動的にfacebookログインページが起動します！簡単！
クリックで実行してもいいしcreatedとか画面初期表示で実行してもいいし、君の自由だ！

```js
  facebookConnectPlugin.login(["public_profile","email"],
      function(result) {
        console.log('ログイン成功！')
        console.log(result)
      },
      function(error) {
        console.log('ログイン失敗！')
        console.log(error)
      }
```

`["public_profile","email"]`の部分は何の情報にアクセスできるか？ってことですね。
[ここ](https://developers.facebook.com/docs/facebook-login/permissions)から選べます。

## ハマったポイント

テストしたいfacebookアカウントは事前に登録しておく必要があります。
実際のアカウントは利用したくない場合はテストアカウントも用意されてます。
[アプリのログインのレビュー - 要件](https://developers.facebook.com/docs/facebook-login/review/requirements?locale=ja_JP)

## おわりに

いやあ簡単過ぎて拍子抜けしました。
どうせたくさんハマるからもうやりながら記事書いちゃおうと思って書きましたが簡単過ぎて別に書かなくて良かったですね笑
さすが天下のFacebookさんですね。
これがマークザッカーバーグに繋がっていると思うと感慨深いです。

それでは良きCordova＊Facebookライフを〜

## 参考記事
[【Cordova】cordova-plugin-facebook4でFacebookログインのパーミッションを複数指定する方法](https://cpoint-lab.co.jp/article/201801/1106/)
