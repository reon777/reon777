---
tags:
  - cordova
  - twilio
date: 2019-06-13
title: 【Cordova】twilio-client-phonegap-pluginのインストールでハマったのでメモ
---

## 環境

- Mac Mojave: 10.14.4
- twilio-client-phonegap-plugin: 1.1.1

### 利用するプラグイン

https://www.npmjs.com/package/twilio-client-phonegap-plugin

## インストール

`cordova plugin add twilio-client-phonegap-plugin`

うん、問題ない。

## ビルド

### エラー１

ビルドすると、
`resource android:attr/fontVariationSettings not found`
のエラー発生

これは
`android/build.gradle`と`android/app/build.gradle`を
`classpath 'com.android.tools.build:gradle:3.2.0-alpha13'`
てな感じに修正すればいけた

参考
[AndroidStudio3.1.2 で AAPT2 エラーが出た時の対処法](https://qiita.com/TaigaNatto/items/441cffd7a8bc3095c93a)

### エラー２

で、改めてビルドすると次は
`Minimum supported Gradle version is 4.6. Current version is 4.1`
のエラー

これは
[Cordova で Gradle のバージョンが低いと怒られた](https://qiita.com/mana-bin/items/eaa0c2c2335140e3f707)
の`GradleBuilder.js`ではなく`StudioBuilder.js`の方を修正するといけた

### エラー３

`resource android:attr/fontVariationSettings not found`

この辺で少し心が折れかける、、

が、
[Cloud Firestore プラグインのバージョン 0.9.0 でビルドエラーが出たのでその対策メモ](https://kwmt27.net/2019/02/02/build-error-with-cloud-firestore-v0.9.0/)
を参考にして
`/android/app/build.gralde`を以下の通り修正するといけた

```bash
# 修正前
cdvCompileSdkVersion = null;
# 修正後
cdvCompileSdkVersion = 28;
```

これでようやくビルド成功

さーてようやくソースの修正に入れる
けどソース修正でもまた何かハマる気がする、、

がんばろ
