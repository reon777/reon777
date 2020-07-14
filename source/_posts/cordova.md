---
title: 【Cordova】ビルド・リリース手順
tags:
  - Cordova
date: 2020-07-14
---

![](/images/cordova.jpeg)

## はじめに

Cordova を利用していた場合のアプリリリースまでの手順です。
半年前くらい(2020/01 くらい)の情報なので古い情報があるかもしれませんのでご了承ください

アプリへの Cordova 導入手順は手前味噌ですが以下をご参考ください
[Vue CLI 3.0 で Cordova を導入したら割とハマった](https://qiita.com/reon777/items/82f6292248d76d1f3360)

ビルドで xcode-select: error が発生した場合は以下を参考に解決する  
[Ionic の iOS のビルドのエラー](http://shinriyo.hateblo.jp/entry/2018/02/17/Ionic%E3%81%AEiOS%E3%81%AE%E3%83%93%E3%83%AB%E3%83%89%E3%81%AE%E3%82%A8%E3%83%A9%E3%83%BC)

<!-- more -->

## ios・android 共通手順

#### バージョン変更

config.xml の version を変更する
以下は 1.0.0 の場合

```xml
<widget id="hoge" version="1.0.0"
```

### プラットフォーム構築

```bash
npm install cordova
cordova platforms add ios
cordova platforms add android
```

- プラットフォーム削除

※何か不具合があった場合に利用する

```bash
cordova platforms rm ios
cordova platforms rm android
```

## ios のビルド・テスト・リリース

### 前提

- ios は Mac のみ

### appstoreconnect にアプリを登録する

https://appstoreconnect.apple.com

### XCode インストール（初回のみ）

XCode をインストールする  
バージョンは 10.1 にすること  
10.2 以上だと Swift3 がサポートされていないため、エラーになる

### 証明書などの準備（初回のみ）

[Apple の開発者サイト](https://developer.apple.com/account)にアクセスする

- iOS Certificate の作成とダウンロード (開発 PC 単位)  
  ※名前は developer チーム固定なので他の開発者のものと同じになることに注意。有効期限で自分のものかどうかを判断可能
- iOS App IDs の登録 (アプリ単位)
- テスト用端末の登録 (テスト用端末単位)
- Provisioning Profile の作成とダウンロード (上の３つ単位)  
  手順を参考にして開発用（Development）と本番用（Distribution）の２つを作成する

以下の手順が参考になりました  
[[iPhone] iOS アプリを登録、申請して公開するまで](https://i-app-tec.com/ios/app-release.html)

概要は以下が参考になりました
[iOS アプリのプロビジョニング周りを図にしてみる](https://qiita.com/fujisan3/items/d037e3c40a0acc46f618)

### XCode の操作

- Xcode を起動して File>Open で 'platforms/ios/hoge.xcodeproj'を選択
- 左サイドメニューのプロジェクトフォルダ（hoge）を選択
- XCode>Preferences>Accounts を開いて左下の「＋」ボタンから新しい Apple ID を追加する
- XCode>File>Project Settings...>Build System>Legacy Build System を選択
- Product>Scheme>Edit Scheme...>Debug executions のチェックを外す
- General>Signing>Automatically manage signing のチェックが付いていれば外す
- General>Signing(Debug)>作成した開発用（Development）の Provisioning Profile を選択する
- General>Signing(Release)>作成した本番用 (Distribution) の Provisioning Profile を選択する
- Build Setting>Code Signing Identify が iOS Distribution になっていることを確認する
- Build Setting>Development Team が想定通りの チーム名になっていることを確認する
- Build Setting>Swift Language Version を Swift 4.2 にする

### ビルド(ipa ファイル作成)

アイコンについては手前味噌ですが以下を参考に設定可能です
[【cordova】アイコン画像の設定方法](/2019/09/21/cordova-icon/)

```bash
# アイコン配置
cordova-icon
# cordova用ビルドも自動的にやってくれる
cordova build ios  --buildFlag='-UseModernBuildSystem=0'
```

### テスト

- 実機を使う場合は USB 接続する
- 左上のデバイス切り替えボタンでエミュレータ or 実機を選択
- 左上の再生ボタンを押下すればビルド＆デプロイ完了（自動的にアプリが起動される）

### リリース

- XCode>Product>Archive
  ※Archive が disable になっている場合は端末を「Generic iOS Device」に変更すること
- 対象アプリが選択されているのを確認し、Distribute APP ボタンを押す
- iOS App Store を選択する（デフォルトのまま）
- Upload を選択する（デフォルトのまま）
- Strip〜と Upload〜のチェックはデフォルトのまま Next を押す
- Select Plofile で作成した本番用の Provisioning Profile を選択する

※`ITMS-90809: Deprecated API Usage`のワーニングメールが届くが無視する
Cordova 本体のチームが対応中。アプリ開発者としてはできることがないので。

### TestFlight の登録

TestFlight の登録を行う場合は以下の手順を参考に登録する
[iOS TestFlight でベータ版公開](https://qiita.com/koooooo/items/0b4497aa46c2039431e6)

### スクリーンショット取得

リリース時に以下の４つのスクリーンショットが必要
以下４つのシミュレーターで Command + S でスクリーンショットを取得・アップロードする

- iPhone 6Plus(5.5 インチ)
- iPhone XS Max(6.5 インチ)
- iPad Pro 第２世代
- iPad Pro 第３世代

## android のビルド・テスト・リリース

### 初期準備

- android studio をインストールする（初回のみ）  
  参考：[Android Studio のインストール](https://developer.android.com/studio/install?hl=ja)

### API レベル変更

修正ファイル
config.xml

```bash
<?xml version='1.0' encoding='utf-8'?>
<widget id="hoge" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    # 以下の行を追加
    <platform name="android">
        <preference name="android-targetSdkVersion" value="28" />
    </platform>
</widget>
```

### ビルド

```bash
# 移動先にデフォルトアイコンがあれば削除する
find platforms/android/app/src/main/res -type f -name "*screen.png" -delete
find platforms/android/app/src/main/res -type d -empty -delete
# アイコン配置
cordova-icon
# 上のコマンドのアイコンの作成箇所がおかしいので移動する
cp -rf platforms/android/res/* platforms/android/app/src/main/res/
# ビルド
cordova build android --release
```

### テスト

- android stdio を起動する  
  「open an existing android studio project」を選択する  
  platforms/android フォルダを選択する
  自動的にビルドが始まるので 1 分くらい待つ

- テスト実行  
  実機を USB 接続する  
  「^R」か右上の Run ボタンを押下する  
  接続した実機を選択すると実機でアプリが起動する

### android リリース

src-cordova/platforms/android/app/src/main/AndroidManifest.xml の`versionCode`と`versionName`が変更されていることを確認する

#### 鍵作成（最初の１回だけ）（アプリ単位）

※※※２回目以降は実施しないこと！※※※  
２回以上実施すると鍵のパスワードが変わってしまいアプリを登録し直す必要があります

```bash
keytool -genkey -v -keystore .keystore -alias test -keyalg RSA -storetype PKCS12 -validity 36500
# パスワードの設定を求められるので`hoge_password`を入力する
# 氏名など聞かれるので入力する（そのままEnterすればUnknownで登録できる。最後の確認だけ「はい」）
# プロジェクトルートディレクトリに.keystore ファイルが作成される
```

#### 署名

```bash
jarsigner -verbose -tsa http://timestamp.digicert.com -keystore .keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk test
# パスワードを求められるので`hoge_password`を入力する
jarsigner -verify -verbose -certs ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
# 上記フォルダに app-release-unsigned.apk ファイルが作成される
```

#### 最適化（ビルドファイル生成）

以下のコマンドの最後のファイル名の部分をバージョン no 等に変更する

```bash
~/Library/Android/sdk/build-tools/28.0.3/zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./platforms/android/app/build/outputs/apk/release/app-release-optimized_100.apk
```

上記フォルダに app-release-optimized_optimized_xxx.apk が作成される

## エラー一覧

- Task failed with exit 1 signal 0  
  参考：[XCODE で　 Task failed with exit 1 signal 0 {　が出て Build Failed になってしまいます。](https://teratail.com/questions/99243)
