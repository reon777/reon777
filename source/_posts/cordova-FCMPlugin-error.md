---
date: 2019-06-20
tags:
  - cordova
  - FCM
title: 【Cordova】cordova-plugin-fcmプラグインでエラー
---

## 環境

- Mac Mojave10.14.4
- cordova-android: 7.1.4
- cordova-plugin-fcm: 2.1.2

## エラー

`cordova build android --release`実行で以下のエラー発生

```bash
Cannot add task ':app:processDebugGoogleServices' as a task with that name already exists.
```

## 解決策

`plugins/cordova-plugin-fcm/src/android/FCMPlugin.gradle`ファイルを以下の通り修正する

```bash
# 修正前
apply plugin: com.google.gms.googleservices.GoogleServicesPlugin
# 修正後
ext.postBuildExtras = {
    apply plugin: com.google.gms.googleservices.GoogleServicesPlugin
}
```

参考：
https://github.com/fechanique/cordova-plugin-fcm/issues/578
