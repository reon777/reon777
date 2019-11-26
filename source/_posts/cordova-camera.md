---
date: 2019-09-20
tags:
  - Cordova
title: 【cordova】写真・カメラ機能を使ってみた【写真】
---

{% asset_img camera_actioncamera.png %}

### はじめに

cordova プラグインを使って写真・カメラ機能を実装したので手順をメモしておきます。

公式サイト
https://github.com/apache/cordova-plugin-camera

<!-- more -->

### 環境

- cordova-plugin-camera: 4.1.0

### ライブラリインストール

```bash
cordova plugin add cordova-plugin-camera
```

インストール後に ios のビルドすると`doc.find is not a function`のエラーになりましたが

```bash
cordova platform rm ios
cordova platform add ios
```

すると直りました

### 【ios】準備１

config.xml に以下を追加

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>need camera access to take pictures</string>
</edit-config>
<edit-config file="*-Info.plist" mode="merge" target="NSPhotoLibraryUsageDescription">
    <string>need photo library access to get pictures from there</string>
</edit-config>
<edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
    <string>need location access to find things nearby</string>
</edit-config>
<edit-config file="*-Info.plist" mode="merge" target="NSPhotoLibraryAddUsageDescription">
    <string>need photo library access to save pictures there</string>
</edit-config>
```

### 【android】準備２

26 で動かしたかったので config.xml の以下の行を削除
動きました（いいのか？）

```xml
<variable name="ANDROID_SUPPORT_V4_VERSION" value="27.+" />
```

### 実装

html で画像を表示する

```html
<img v-if="main_img" :src="main_img" style="height: 25vh;" />
```

js のコード

```js
    take_picture() {
      const self = this;
      const options = {
        destinationType: Camera.DestinationType.DATA_URL,
        // 写真ライブラリから選択
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        // jpeg形式
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        // トリミング
        allowEdit: true,
        correctOrientation: true,
        // 横幅
        targetWidth: 200,
        // 縦幅
        targetHeight: 200
      };
      navigator.camera.getPicture(
        image => {
          console.log("image: " + image);
          self.main_img = "data:image/jpeg;base64," + image;
        },
        message => {
          console.log("画像選択エラー: " + message);
        },
        options
      );
    },
```

### サイズ変更の仕様

#### allowEdit が true の場合

- 縦横両方とも targetWidth と targetHeight の小さい方の正方形になる。

#### allowEdit が false の場合

- targetWidth と targetHeight のどちらか一方の指定だけだと変更なしになる
- targetWidth と targetHeight の小さい方に合わせられる。縦横比率は維持。大きい方のサイズ指定は無視される。

以上です。
