---
title: 'MyFirebaseInstanceIDService.java:6: エラー: シンボルを見つけられません'
date: 2019-05-08
description:
tags: [cordova, cordova-plugin-fcm]
---

**環境**

- cordova-plugin-firebase 2.0.5

## エラーについて

`cordova-plugin-fcm` を入れている状態で
`cordova build android` すると表題のエラーになりました

## 解決策

cordova plugin remove cordova-plugin-fcm
cordova plugin add https://github.com/dpa99c/cordova-plugin-firebase#GH-1057-April-05-android-build-issue

## 参考

https://forum.ionicframework.com/t/ionic-4-cordova-run-android-firebase-error-all-of-a-sudden/163204

## 所感

昨日(5/7)から発生し出した、できたてほやほやのエラーのようです
おそらく何日か経てばマスタにマージされるのだと思います
なのでこれは暫定対応ですね
流石にまだ他に日本語記事がなさそうなので 1 番乗りだと思うので嬉しいです

ではでは
