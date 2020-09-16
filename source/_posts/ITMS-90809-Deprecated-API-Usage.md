---
title: ITMS-90809-Deprecated-API-Usageエラーの解消
photos: images/php.png
tags:
  - Cordova
date: 2020-09-15
---

![](/images/ムーミン1.jpg)

ITMS-90809-Deprecated-API-Usage エラーの解消方法です。

```bash
# cordova-iosを6.0.0に
cordova platform remove ios
cordova platform add ios@6.0.0

# 最新のcordova-plugin-ionic-webviewプラグインをインストール
cordova plugin rm cordova-plugin-ionic-webview
cordova plugin add cordova-plugin-ionic-webview@latest

# 他のプラグインも最新化する
npm install -g cordova-check-plugins
cordova-check-plugins --update=auto

# 反映
cordova prepare ios
```

参考
https://ionicframework.com/blog/understanding-itms-90809-uiwebview-api-deprecation/
