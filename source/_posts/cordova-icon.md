---
date: 2019-09-21
tags:
  - Cordova
title: 【cordova】アイコン画像の設定方法
---

{% asset_img cordova.jpeg %}

<!-- more -->

### 環境

- cordova-icon: 1.0.0

### ライブラリインストール

利用ライブラリ
https://www.npmjs.com/package/cordova-icon

cordova プロジェクトルートで

```bash
npm install cordova-icon
```

### 画像作成

1024\*1024 のサイズのアイコン画像を用意する
icon.png という名前にして cordova プロジェクトルートに配置する

ちなみにここで画像のサイズ変更ができます
https://onlinepngtools.com/resize-png

### アイコン配布

```
cordova-icon
```

あとは普通にビルドすれば OK！

ーーーーーーーーーーーーーーーーーーーーーーーーー
2019/10/28 追記
android だと以下のコマンドが必要でした

```bash
# 移動先にデフォルトアイコンがあれば削除する
find platforms/android/app/src/main/res -type f -name "icon.png" -delete
find platforms/android/app/src/main/res -type f -name "screen.png" -delete
# アイコン配置
cordova-icon
# 上のコマンドのアイコンの作成箇所がおかしいので移動する
cp -rf platforms/android/res/* platforms/android/app/src/main/res/
find platforms/android/app/src/main/res -type d -empty -delete
```

ーーーーーーーーーーーーーーーーーーーーーーーーー

ライブラリのおかげで簡単で嬉しい

以上です。
