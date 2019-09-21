---
date: 2019-09-21
tags:
  - cordova
title: 【cordova】アイコン画像を設定してみた
---

{% asset_img cordova.jpeg %}

<!-- more -->

### 環境

- cordova-icon: 1.0.0

### ライブラリインストール

cordova プロジェクトルートで

```bash
npm install cordova-icon
```

### 画像作成

1024\*1024 のサイズのアイコン画像を用意する
icon.png という名前にして cordova プロジェクトルートに配置する

ここでサイズ変更できます
https://onlinepngtools.com/resize-png

### アイコン配布

```
cordova-icon
```

あとは普通にビルドすれば OK！

ライブラリのおかげで簡単で嬉しい

以上です。
