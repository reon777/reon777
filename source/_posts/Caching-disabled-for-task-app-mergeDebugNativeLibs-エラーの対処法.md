---
title: "Caching disabled for task ':app:mergeDebugNativeLibs' エラーの対処法"
tags:
  - Android
date: 2021-11-20 09:00:00
---

## エラーについて

ビルド時に以下のエラーが発生しました

```
Caching disabled for task ':app:mergeDebugNativeLibs' because:
  Build cache is disabled
Skipping task ':app:mergeDebugNativeLibs' as it is up-to-date.
Task :app:mergeDebugNativeLibs in app Finished
:app:mergeDebugNativeLibs (Thread[Execution worker for ':',5,main]) completed. Took 0.034 secs.
:app:stripDebugDebugSymbols (Thread[Execution worker for ':',5,main]) started.

> Task :app:stripDebugDebugSymbols NO-SOURCE
Task :app:stripDebugDebugSymbols in app Starting
Skipping task ':app:stripDebugDebugSymbols' as it has no source files and no previous output files.
Task :app:stripDebugDebugSymbols in app Finished
:app:stripDebugDebugSymbols (Thread[Execution worker for ':',5,main]) completed. Took 0.003 secs.
```

## 解決策

おそらくこのエラーの原因はtargetSDKバージョンが31以上であり、かつJDKバージョンが11より小さいことです。
以下の通りにすれば解決します。

- JDKバージョンを11以上にする
- Android Studio 2020.3（もしくはそれより最新版）をインストールする

JDKバージョンを11以上にするには、最新のAndroid Studioをダウンロードして、Android Studio → Preferences → Build Tools → GradleのGradle JDKを11以上に指定してください。

{% asset_img 2021-11-26-14-35-05.png %}
