---
title: 【Cordova】Minimum supported Gradle version is 4.10.1. Current version is 4.6.
date: 2020-01-01
tags:
  - Cordova
---

{% asset_img cordova.jpeg %}

### はじめに

Cordova プロジェクトで Android のビルド時に表題のエラーになったので解決策をメモしておきます

### エラー内容

Minimum supported Gradle version is 4.10.1. Current version is 4.6.

### 修正ファイル

platforms/android/gradle/wrapper/gradle-wrapper.properties

#### 修正内容

```bash
# 修正前
distributionUrl=https\://services.gradle.org/distributions/gradle-4.6-all.zip
# 修正前
distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.1-all.zip
```

修正後、Android Studio > Build > Clean Project してから Android Studio を開きなおすと正常にビルドされました
