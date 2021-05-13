---
title: 【Android】【ビルドエラー】Could not find method setVariantDir()エラーの解決策
tags:
  - Android
date: 2021-5-13
---

## エラー

Androidのビルドで以下のエラーが出ました

>com.android.build.gradle.internal.crash.ExternalApiUsageException: org.gradle.internal.metaobject.AbstractDynamicObject$CustomMessageMissingMethodException: Could not find method setVariantDir() for arguments [debug] on task ':app:processDebugGoogleServices' of type com.google.gms.googleservices.GoogleServicesTask.

## 解決策

google-servicesの4.3.6のバージョンが原因らしく、4.3.5に修正するとうまく行きました。

対象ファイル
build.gradle

```
// 前
classpath 'com.google.gms:google-services:4.3.6'
// 後
classpath 'com.google.gms:google-services:4.3.5'
```

## 参考

https://stackoverflow.com/questions/67496084/why-am-i-getting-abstractdynamicobjectcustommessagemissingmethodexception-error

