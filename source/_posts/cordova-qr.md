---
date: 2019-08-23
tags:
  - Cordova
title: 【Cordova】QRコード読み取りを実装してみた
---

{% asset_img code_smartphone_barcode_qrcode.png %}

### はじめに

Cordova ライブラリで QR コード読み取りを実装したので手順をメモしておきます。

<!-- more -->

### 環境

```bash
# Xcode が 10.2 以上の場合
cordova-plugin-qrscanner: 3.0.1
# Xcode が 10.1 以下の場合
cordova-plugin-qrscanner: 2.6.2
```

### ライブラリインストール

https://www.npmjs.com/package/cordova-plugin-qrscanner

```bash
# Xcode が 10.2 以上の場合
cordova plugin add cordova-plugin-qrscanner
# Xcode が 10.1 以下の場合
cordova plugin add cordova-plugin-qrscanner@2.6.2
```

XCode が 10.1 以下の場合は 2.6.2 より最新のものだとエラーになるので 2.6.2 を指定してます

### Xcode が 10.1 以下の場合

Xcode が 10.1 以下の場合は以下の修正をしないとエラーになります。

#### エラー

```bash
note: 'openSettingsURLString' was introduced in Swift 4.2
public class let openSettingsURLString: String
```

#### 修正ファイル

/platforms/ios/pb-wallet/Plugins/cordova-plugin-qrscanner/QRScanner.swift

#### 修正内容

`UIApplication.openSettingsURLString`
を
`UIApplicationOpenSettingsURLString`
に置換する。
２箇所あります。

##### 参考

https://github.com/bitpay/cordova-plugin-qrscanner/issues/238

### Swift バージョン変更

Xcode を開いて
Build Settings > Swift Compiler - Language
から Swift のバージョンを 4.2 以上にする

### js コード

vue のコードですが js の部分を抜き出せば他のフレームワークでも流用できるはずです

```js
export default {
  mounted() {
    // カメラプレビューを有効にするために背景を透明にする
    document.querySelector("html").classList.add("transparent-body");
    document.querySelector("body").classList.add("transparent-body");
    QRScanner.prepare(this.onDone); // show the prompt
  },
  methods: {
    // カメラ利用の許可を要求
    onDone(err, status) {
      if (err) {
        console.log("err: " + err);
        this.$router.go(-1);
      }
      // カメラ利用の許可を受けた後の処理
      if (status.authorized) {
        QRScanner.scan(this.displayContents);
        QRScanner.show();
      } else {
        this.$router.go(-1);
      }
    },
    // QRコード読み取り後の処理
    displayContents(err, text) {
      if (err) {
        console.log("err: " + err);
      } else {
        console.log("text: " + text);
      }
    }
  },
  destroyed() {
    document.querySelector("html").classList.remove("transparent-body");
    document.querySelector("body").classList.remove("transparent-body");
    // androidはdestroyするとレイアウト不具合になったので対象はiosだけにしている
    if (cordova.platformId == "ios") {
      QRScanner.destroy(function(status) {
        console.log(status);
      });
      // 以下はライブリバグ対応（参考：https://github.com/bitpay/cordova-plugin-qrscanner/issues/234）
      setTimeout(() => {
        window.document.body.style.backgroundColor = "";
      }, 500);
    }
  }
};
```

### css

vue の場合、scoped を付けると body タグに css が効かないので以下のように scoped を付けないように注意してください。

```css
<style>
/* 背景を透明にしてカメラのプレビューを表示させる */
.transparent-body {
  background-color: transparent;
}
</style>
```

### おわりに

css で背景を透明にしないといけない所でけっこうハマってツラかったです、、

以上です。
