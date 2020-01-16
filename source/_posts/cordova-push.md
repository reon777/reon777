---
date: 2019-09-19
tags:
  - Cordova
  - FCM
title: 【cordova】プッシュ通知を実装してみた【FCM】
---

{% asset_img firebase.png %}

### はじめに

cordova にプッシュ通知機能を実装したので手順をメモしておきます。

<!-- more -->

### 環境

- cordova-plugin-fcm-with-dependecy-updated: 3.2.0
- cordova-ios: 4.5.5
- cordova-android: 7.1.4

### 準備

- ios は GoogleService-Info.plist
- android は google-services.json
  が必要です。

以下のページを参考にして取得してから cordova ルートフォルダに置いてください。
https://firebase.google.com/docs/ios/setup

#### 【ios】設定追加

GoogleService-Info.plist に以下の２行を追加する

```xml
	<key>FirebaseAppDelegateProxyEnabled</key>
	<false></false>
```

#### 【ios】サーバ登録用の証明書ファイル作成

プッシュ用の証明書を作成する
以下を参考にして p8 ファイルをダウンロードして firebase に登録する
p8 ファイルは複数アプリで使い回し可能
https://qiita.com/matsuyoro/items/77408e5d09ef00be8577
※UI が古いけど慌てない。やることは同じ。まずは左の Keys を押そう。

#### 【ios】アプリにプッシュ設定を追加

- 以下のページから対象のアプリを選択する
  https://developer.apple.com/account/resources/identifiers/list
- Push Notifications を有効にする
- Configure ボタンを押す
- プッシュ通知用の Certificate を２つ作成してダウンロードしてダブルクリックでキーチェーンに登録する

- Provisioning Profile を再作成する

#### 【android】アプリ ID が一致しているかを確認

- 修正方法
  config.xml の`<widget id="com.hoge"`と
  google-services.json の

```
{
  "project_info": {
  },
  "client": [
    {
      "client_info": {
        "android_client_info": {
          "package_name": "com.hoge"
        }
      },
```

の `com.hoge` の部分が一致していないとビルド時に以下のエラーになるので一致しているか確認しておく

- 対象エラー
  `> No matching client found for package name 'com.hoge'`

ちなみに僕はここに`-`を使っていたらエラーになりました

### ライブラリインストール

<!-- 公式サイト -->

https://www.npmjs.com/package/cordova-plugin-fcm-with-dependecy-updated

cordova ルートフォルダで以下のコマンドを実行する

```bash
cordova plugin add cordova-plugin-fcm-with-dependecy-updated@3.2.0
```

※2019/10/29 時点で最新版は 4.1.0 ですがこれだと
FCMPlugin is not defined
のエラーになったので 3.2.0 版を指定してます

ちなみに元の公式サイトはこっち
https://github.com/fechanique/cordova-plugin-fcm

なのですが、こちらはバグがあって上のサイトがその修正バージョンです

### 【ios】準備

cordova ルートフォルダで
`sudo gem install cocoapods` で CocoaPods をインストールする
sudo なので Mac の管理者ログインパスワードを入力する

`pod setup`
15 分ほど待つ

今後 XCODE を開く際は/platforms/ios/ 配下の .xcodeproj ファイルではなく .xcodeworkspace ファイルを選択して XCode を開く

### 【ios】Xcode 設定

Capabilities タブで Push Notifications と Background Modes を ON にして Remote Notifications にチェックを入れておく。

XCode > File > Project Settings... > Build System > Legacy Build System を選択してから再ビルドする
参考：https://github.com/fechanique/cordova-plugin-fcm/issues/553
これをしないとプッシュが届かない

以下のエラーが出るようになるけど無視で OK
問題なくプッシュは届きます

```bash
** ARCHIVE SUCCEEDED **

2019-10-29 13:25:02.969 xcodebuild[93448:11795563] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/pw/29ylxmln7bq5nr29qj8djh940000gn/T/hoge_2019-10-29_13-25-02.968.xcdistributionlogs'.
error: exportArchive: "hoge" requires a provisioning profile with the Push Notifications feature.

Error Domain=IDEProvisioningErrorDomain Code=9 ""hoge" requires a provisioning profile with the Push Notifications feature." UserInfo={NSLocalizedDescription="hoge" requires a provisioning profile with the Push Notifications feature., NSLocalizedRecoverySuggestion=Add a profile to the "provisioningProfiles" dictionary in your Export Options property list.}

** EXPORT FAILED **

```

### プッシュ機能を実装

```js
 register_push() {
      const self = this;
      console.log("start register_push");
      // 1秒後にトークンを取得する
      // 待たないとFCMPluginにアクセスできない
      // devicereadyだとだめだった
      window.setTimeout(() => {
        // tokenを取得してサーバに投げる
        FCMPlugin.getToken(
          fcm_token => {
            if (fcm_token == null) {
              FCMPlugin.onTokenRefresh(fcm_token => {
                console.log(
                  "[onTokenRefresh]fcm_token: " + JSON.stringify(fcm_token)
                );
                self.send_to_server(fcm_token);
              });
            } else {
              console.log("[getToken]fcm_token: " + JSON.stringify(fcm_token));
              self.send_to_server(fcm_token);
            }
          },
          err => {
            console.log("[getToken]err: " + JSON.stringify(err));
          }
        );
        // プッシュを待ち受ける処理
        // eslint-disable-next-line
        FCMPlugin.onNotification(data => {
          console.log("[onNotification]data: " + JSON.stringify(data));
          alert(JSON.stringify(data));
        });
      }, 1000);
    },
```

### ビルド

hoge の部分はアプリ名に変えてください

#### ios

```bash
# plist配置
mkdir platforms/ios/hoge/Resources/Resources
cp GoogleService-Info.plist platforms/ios/hoge/Resources/GoogleService-Info.plist
cp platforms/ios/hoge/Resources/GoogleService-Info.plist platforms/ios/hoge/Resources/Resources/GoogleService-Info.plist
# ビルド
cordova build ios
```

#### android

```bash
# google-services.json配置
cp google-services.json platforms/android/google-services.json
cp platforms/android/google-services.json platforms/android/app/google-services.json
mkdir platforms/android/app/src/release
cp platforms/android/google-services.json platforms/android/app/src/release/google-services.json
# ビルド
cordova build android  --release
```

### 参考

[Cordova iOS アプリ + phonegap-plugin-push でリモートプッシュ通知機能を実装するための全工程](http://neos21.hatenablog.com/entry/2017/12/24/080000)

### おわりに

最初修正バージョンのライブラリがあることを知らなくてめちゃくちゃハマって大変でした、、

プッシュ出来ると良い感じのアプリっぽくなって良いですよね〜（語彙力

ではよきプッシュ通知ライフを〜。

以上です
