---
title: 【Cordova】Failed to load resource net::ERR_FILE_NOT_FOUND
tags:
  - Cordova
date: 2019-12-24
---

{% asset_img cordova.jpeg %}

### はじめに

CordovaプロジェクトでAndroidの起動時にコンソールに表題のエラーが表示されたので解決策をメモしておきます

### エラー内容

Failed to load resource: net::ERR_FILE_NOT_FOUND cordova_plugins.js:1 

### 解決策

cordovaプラグインが適切にインストールされていないことが原因でした
以下の２つのフォルダを見比べて、

- plugins
- platforms/android/platform_www/plugins

不足しているプラグインがあれば、以下の通り再インストールすれば直りました

```bash
cordova plugin rm cordova-plugin-camera
cordova plugin add cordova-plugin-camera
```

そもそもプラグインをインストールするとconfig.xmlに反映される気がしてましたが、
今見るとされていないですね。
何か設定が必要だったかな？うーん、分からん

まあとりあえず動いたので良しとしましょうw

### 参考

https://github.com/apache/cordova-android/issues/753

### おわりに

cordovaのエラーは大体経験し尽くしたと思ってましたがまだ先があったのかと思ってびっくりしました

