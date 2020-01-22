---
title: 【Cordova】よく利用するプラグイン一覧
tags:
  - Cordova
date: 2020-01-17 10:00:00
---

{% asset_img cordova.jpeg %}

### はじめに

最近は Cordova を利用したハイブリッドアプリが流行ってきてますね
Cordova を導入した時にいつも入れているプラグインをメモしておきます

<!-- more -->

### アイコン画像の設定

以下の記事を参照
[【cordova】アイコン画像の設定方法](/2019/09/21/cordova-icon/)

### スプラッシュスクリーンの設定

以下の記事を参照
[cordova-plugin-splashscreen】スプラッシュスクリーンの設定方法](/2019/09/06/cordova-plugin-splashscreen/)

#### スプラッシュスクリーン表示中のローディング表示をなくす

`config.xml`に以下を追加する

```xml
<preference name="ShowSplashScreenSpinner" value="false" />
```

### iPhone X で上下の空白をなくす

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
