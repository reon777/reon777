---
title: 「Cannot add task ':app:processDebugGoogleServices' as a task with that name already exists」エラーの解決策
tags:
  - cordova
date: 2019-05-14
---

`cordova build android --release`した時に表題のエラーになりました。

## 解決策

<!-- more -->

このエラーでググると解決策がたくさん出てきましたが結局`cordova-plugin-fcm`と`cordova-plugin-firebase`が競合していたらしく、以下で解消しました

```bash
cordova plugin list
cordova plugin remove cordova-plugin-fcm
cordova plugin remove cordova-plugin-firebase
cordova platforms rm android
cordova plugin add https://github.com/dpa99c/cordova-plugin-firebase#GH-1057-April-05-android-build-issue
cordova platforms add android
```

`https://github.com/dpa99c/cordova-plugin-firebase#GH-1057-April-05-android-build-issue`は`cordova-plugin-fcm`の代わりです

理由は {% post_link MyFirebaseInstanceIDService-java-6 %} を参照

## おわりに

多分このエラーの原因の中で一番しょーもない理由ですが、一年後の自分がもう一度ハマる自信があるので(w)、書いておきました

ではでは
