---
title: '【cordova-plugin-fcm】「MyFirebaseInstanceIDService.java:6: エラー: シンボルを見つけられません」エラーの解決策'
date: 2019-05-08
tags:
  - Cordova
---

## 環境

- cordova-plugin-fcm 2.1.2

## 事象

`cordova-plugin-fcm` を入れている状態で
`cordova build android` すると表題のエラーになりました

<!-- more -->

## 解決策

`platforms/android/project.properties`ファイルを以下の通りに書き換えれば OK
→ つまりバージョンを固定しましょうってことですね。

```project.properties
cordova.system.library.4=com.google.firebase:firebase-core:16.0.8
cordova.system.library.5=com.google.firebase:firebase-messaging:17.5.0
cordova.system.library.6=com.google.firebase:firebase-config:16.4.1
cordova.system.library.7=com.google.firebase:firebase-perf:16.2.4
```

- `cordova.system.library.4`の数字の部分は異なる可能性がある
- 自分の場合は`firebase-config`と`firebase-perf`はなかったので上の２つだけ修正しました
- 末尾に空白があるとエラーになるので注意すること

## 参考

https://forum.ionicframework.com/t/ionic-4-cordova-run-android-firebase-error-all-of-a-sudden/163204/29

## 所感

2019/5/7 から発生し出したライブラリのエラーのようです
エラーこわい

ではでは
