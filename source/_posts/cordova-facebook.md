---
date: 2019-07-05
tags:
  - Cordova
title: cordovaでfacebookログインを実装してみた
---

{% asset_img facebook.png %}

cordovaでfacebookログインを実装したので手順をメモしておきます

<!-- more -->

**作業環境**

- Mac Mojave 10.14.4
- cordova-ios 4.5.5
- cordova-android 7.1.4

## 前提

facebookの開発者登録とアプリ作成は完了しているものとします
ググればたくさん日本語記事あったのでやり方は割愛します

## インストール

### 利用プラグイン
https://github.com/jeduan/cordova-plugin-facebook4

### インストールコマンド
```bash
cordova plugin add https://github.com/jeduan/cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="MyApp"
```

APP_IDとAPP_NAMEは書き替えてね！
公式ドキュメントだとandroid用のコマンドみたいだけどiosもこれで行けた。

## プラグイン修正(androidのみ)

最大のハマりポイント
最新版だとビルドエラーになるのでバージョンを下げる必要がある

`plugins/cordova-plugin-facebook4/plugin.xml`を以下の通り修正する

```bash
# 修正前
<preference name="FACEBOOK_ANDROID_SDK_VERSION" default="5.0.2"/>
# 修正後
<preference name="FACEBOOK_ANDROID_SDK_VERSION" default="4.28.0"/>
```

参考
https://stackoverflow.com/questions/52217275/cordova-plugin-facebook4-couldnt-make-the-app-start-android

## 環境設定変更(android)
androidは環境を再構築する必要がありました

```bash
cordova platforms rm android
cordova platforms add android
```

また、`platforms/android/project.properties`を以下の通りに修正する必要がありました

```bash
# 修正前
cordova.system.library.1=com.android.support:support-v4:24.1.1+
# 修正後
cordova.system.library.1=com.android.support:support-v4:24.1.1
```

## テストアカウント準備

テストしたいfacebookアカウントは事前に登録しておく必要があります。
実際のアカウントは利用したくない場合はテストアカウントも用意されてます。
[アプリのログインのレビュー - 要件](https://developers.facebook.com/docs/facebook-login/review/requirements?locale=ja_JP)

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

## おわりに

iosはサクッとできて感動したのですがandroidはまあまあハマりました、、
どうせハマると思ってやりながら記事書いたのですが、正解でした笑

facebookログインがあると良い感じのアプリに見えて良いですよね！（語彙力

それでは良きCordova＊Facebookライフを〜

## 参考記事
[【Cordova】cordova-plugin-facebook4でFacebookログインのパーミッションを複数指定する方法](https://cpoint-lab.co.jp/article/201801/1106/)
