---
date: 2019-06-20
tags:
  - cordova
  - twilio
title: CordovaでTwilio通話をやろうとしたけど挫折したメモ
---

## はじめに

Cordova で Twilio 通話をやろうとしたけど挫折しました
難しい要員として、Twilio は js の SDK はあるけどそれはスマホのブラウザでは動かない
ので、スマホの場合は ios とか android それぞれの SDK が必要
なのでそれに対応した Cordova プラグインの利用が必須
けど、全然情報がない！
日本語はもちろん英語も少ない
まあそこまでニッチなことやりたいなら Cordova じゃなくてネイティブで書けってことなのかなあ、、

けどせっかく色々頑張ったのでダメだった過程をメモしておきます

<!-- more -->

## 試行錯誤１

### ライブラリ

twilio_client_phonegap
https://github.com/jefflinwood/twilio_client_phonegap

### 過程

頑張ってビルドは成功した({% post_link twilio-client-phonegap-plugin %})けど結局アプリ起動すると即落ちするバグがあって終了

## 試行錯誤２

### ライブラリ

twilio-voice-phonegap-plugin
https://www.npmjs.com/package/cordova-plugin-twiliovoice

### 過程

インストール
cordova plugin add twilio-voice-phonegap-plugin -variable INCOMING_CALL_APP_NAME=hoge

https://media.twiliocdn.com/sdk/ios/voice/releases/2.0.1/twilio-voice-ios-2.0.1.tar.bz2 でフレームワークをダウンロードして、解凍する
Xcode ＞ General タブ＞ Embedded Binaries に、上で解凍したフォルダの中にある TwilioVoice.framework フォルダ をドラッグ&ドロップする
"Copy items if needed"にチェックを入れて、Finish をクリック
Embedded Binaries と Linked Frameworks に TwilioVoice.framework が追加される

依存ライブラリインストール
cordova plugin add cordova-plugin-device

ここまでは OK だったけどいざアプリを起動してみても Twilio オブジェクトがひたすら undifind になる、、

ちゃんと`deviceready`の発火は待ってるんだけどなあ、、

```js
document.addEventListener("deviceready", () => {
  console.log("deviceready");
  console.log("window.Twilio: " + window.Twilio);
}
```

あとドキュメントなくて使い方分からん

サンプルはあるけどその中の以下がどこにあるか分からん

<script type="text/javascript" src="js/TwilioVoicePlugin.js"></script>
<script type="text/javascript" src="js/twilioVoiceApp.js"></script>

## 試行錯誤３

### ライブラリ

cordova-plugin-twilio-video
https://github.com/PriceFallin/cordova-plugin-twilio-video

### 過程

README.md の
＞ ionic cordova plugin add [path/to/plugin]
がの具体的なコマンドが分からん
ionic じゃないし

あと cordova plugin add cordova-plugin-twilio-video
は 404 エラーになるし、、

あとドキュメントないから使い方分からん
もはや使い方のサンプルすらない

## 終わりに

つらみ
