---
date: 2019-08-
tags:
  - bitcoin
  - js
title: 【Vue.js】ビットコインを生成・送金してみた
---

{% asset_img bitcoin.png %}

### はじめに

Vue プロジェクトでビットコインを生成・送金したので手順をメモしておきます。

<!-- more -->

### 環境

- bitcore-lib: 8.5.1
- bitcore-explorers: 1.0.1

### ライブラリインストール

```bash
npm install bitcore-lib
npm install bitcore-explorers
```

### ビットコインアドレスを生成する

hoge.vue の created などの部分に以下のコードを挿入する

```js
export default {
  created() {
    //秘密鍵の生成
    var private_key = new bitcore.PrivateKey('livenet')
    console.log('秘密鍵 : ' + private_key.toString())

    //公開鍵
    var public_key = private_key.toPublicKey()
    console.log('公開鍵：' + public_key.toString())

    //アドレス
    var address = public_key.toAddress()
    console.log('アドレス：' + address.toString())
  }
}
```

### 参考

[Bitcore でビットコインを送金してみる](https://qiita.com/oggata/items/40c952955f5d31c13452)

https://www.edureka.co/community/11639/how-to-solve-more-than-one-instance-of-bitcore-lib-found-error

### おわりに

思ったより簡単でびっくりしました

以上です。
