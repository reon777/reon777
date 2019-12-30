---
title: 【Cordova】Minimum supported Gradle version is 4.10.1. Current version is 4.6.
tags:
  - Cordova
date: 2019-11-26 09:00:00
---

{% asset_img cordova.jpeg %}

### はじめに


### アイコン画像の設定

### スプラッシュスクリーンの設定

#### スプラッシュスクリーン表示中のローディング表示をなくす

`config.xml`に以下を追加する

```xml
<preference name="ShowSplashScreenSpinner" value="false" />
```

### iPhone Xで上下の空白をなくす

### 内部ストレージ

cordova plugin add cordova-plugin-file

## 画面の向きを縦向きに固定

`config.xml`に以下を追加する

```xml
<preference name="Orientation" value="portrait" />
```
## [ios]画面外のバウンスを無効にする

`config.xml`に以下を追加する

```xml
<preference name="DisallowOverscroll" value="true" />
```

