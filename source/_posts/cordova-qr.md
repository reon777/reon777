---
date: 2019-08-23
tags:
  - cordova
title: 【Cordova】QRコード読み取りを実装してみた
---

{% asset_img code_smartphone_barcode_qrcode.png %}

### はじめに

Cordova ライブラリで QR コード読み取りを実装したので手順をメモしておきます。

<!-- more -->

### 環境

- cordova-plugin-qrscanner: 3.0.1

### ライブラリインストール

https://www.npmjs.com/package/cordova-plugin-qrscanner

```bash
cordova plugin add cordova-plugin-qrscanner@2.6.2
```

### ライブラリを修正

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

### js コード

vue のコードですが js の部分を抜き出せば他のフレームワークでも流用できるはずです

```js
export default {
  mounted() {
    // カメラプレビューを有効にするために背景を透明にする
    document.querySelector('body').classList.add('transparent-body')
    QRScanner.prepare(this.onDone) // show the prompt
  },
  methods: {
    // カメラ利用の許可を要求
    onDone(err, status) {
      if (err) {
        console.log('err: ' + err)
        this.$router.go(-1)
      }
      // カメラ利用の許可を受けた後の処理
      if (status.authorized) {
        QRScanner.scan(this.displayContents)
        QRScanner.show()
      } else {
        this.$router.go(-1)
      }
    },
    // QRコード読み取り後の処理
    displayContents(err, text) {
      if (err) {
        console.log('err: ' + err)
      } else {
        console.log('text: ' + text)
      }
    }
  },
  destroyed() {
    document.querySelector('body').classList.remove('transparent-body')
    QRScanner.destroy(function(status) {
      console.log(status)
    })
  }
}
```

### css

vue の場合、scoped を付けると body タグに css が効かないので以下のように scoped を付けないように注意してください。

```css
<style>
/* 背景を透明にしてカメラのプレビューを表示させる */
.transparent-body {
  background: none transparent !important;
}
</style>
```

### おわりに

css で背景を透明にしないといけない所でけっこうハマってツラかったです、、

以上です。
