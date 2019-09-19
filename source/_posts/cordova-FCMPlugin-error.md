---
date: 2019-06-20
tags:
  - cordova
  - FCM
title: 【Cordova】cordova-plugin-fcmプラグインでエラー
---

### 環境

- cordova-plugin-fcm: 2.1.2
- cordova-ios: 4.5.5
- cordova-android: 7.1.4

<!-- more -->

〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜2019.9.19 　追記開始〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜

こんなに頑張らなくても全部エラー解消済みの修正ライブラリがフォークされてました！
これ使えば OK です！
https://www.npmjs.com/package/cordova-plugin-fcm-with-dependecy-updated

cordova-plugin-fcm はアンインストールしよう！
以下の記事は一応残しますが見なくて大丈夫です！
〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜2019.9.19 　追記終了〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜

### 修正１

- 対象ファイル  
  src-cordova/plugins/cordova-plugin-fcm/scripts/fcm_config_files_process.js

- 修正内容
  以下のソースで丸ごと全部置き換える  
  https://github.com/fechanique/cordova-plugin-fcm/issues/213#issuecomment-357162384

### 【android】修正２

- 対象ファイル
  plugins/cordova-plugin-fcm/src/android/FCMPlugin.gradle

- 修正内容

```bash
# 修正前
apply plugin: com.google.gms.googleservices.GoogleServicesPlugin
# 修正後
ext.postBuildExtras = {
  apply plugin: com.google.gms.googleservices.GoogleServicesPlugin
}
```

### 【android】修正３

- 対象ファイル

  - - platforms/android/build.gradle
  - - platforms/android/app/build.gradle

- 修正内容

```bash
# 修正前
classpath 'com.android.tools.build:gradle:3.0.1'
# 修正後
classpath 'com.android.tools.build:gradle:3.2.1'
```

### 【android】修正４

- 対象エラー
  `Daemon: AAPT2 aapt2-3.2.0-4818971-osx Daemon #0`

- 対象ファイル
  platforms/android/cordova/lib/builders/StudioBuilder.js

- 修正内容

```bash
# 修正前
'https\\://services.gradle.org/distributions/gradle-4.1-all.zip'
# 修正後
'https\\://services.gradle.org/distributions/gradle-4.6-all.zip'
```

### 【android】修正５

- 対象ファイル
  platforms/android/project.properties

```bash
# 修正前
cordova.system.library.2=com.google.firebase:firebase-core:+
cordova.system.library.3=com.google.firebase:firebase-messaging:+
# 修正後
cordova.system.library.4=com.google.firebase:firebase-core:16.0.8
cordova.system.library.5=com.google.firebase:firebase-messaging:17.5.0
```

### 【android】修正６

- 対象ファイル
  src-cordova/platforms/android/app/build.gradle

- 修正内容

```bash

android {

    defaultConfig {

        # この２行を追加
        minSdkVersion 19
        targetSdkVersion 28

        versionCode cdvVersionCode ?: new BigInteger("" + privateHelpers.extractIntFromManifest("versionCode"))
        applicationId privateHelpers.extractStringFromManifest("package")
```

28 の部分は以下の最新バージョンをインプットにしているので必要があれば変更すること
https://ja.wikipedia.org/wiki/Android%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E5%B1%A5%E6%AD%B4

### 【android】修正７

- 修正ファイル
  platforms/android/app/src/main/AndroidManifest.xml

- 修正内容

```bash
# 以下の行を削除
<uses-sdk android:minSdkVersion="17" android:targetSdkVersion="27" />
```

### 【android】修正８

- 修正ファイル
  platforms/android/CordovaLib/AndroidManifest.xml

- 修正内容

```bash
# 以下の行を削除
<uses-sdk android:minSdkVersion="19" />
```
