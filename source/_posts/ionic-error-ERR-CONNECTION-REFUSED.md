---
date: 2019-11-26
tags:
  - Ionic
title: 【Ionic】net::ERR_CONNECTION_REFUSED (http://localhost:8080/)
---

{% asset_img ionic.png %}

### はじめに

IonicプロジェクトでAndroid起動すると画面に表題のエラーが表示されたので解決策をメモしておきます

### エラー内容

net::ERR_CONNECTION_REFUSED (http://localhost:8080/)


#### 修正内容

```bash
ionic cordova plugin add cordova-plugin-ionic-webview
ionic cordova platforms rm android
rm -rf plugins
ionic cordova build android
```
