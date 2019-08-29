---
date: 2019-08-07
tags:
  - bitcoin
title: 【Vue.js】ビットコインアドレスを生成する手順
---

{% asset_img bitcoin.png %}

### はじめに

Vue プロジェクトでビットコインアドレスを生成したので手順をメモしておきます。

<!-- more -->

### 環境

- bitcore-lib: 8.5.1

### ライブラリインストール

```bash
npm install bitcore-lib
```

### プロジェクト内でライブラリを使えるようにする

`main.js` に以下の１行を追加

```js
import bitcore from 'bitcore-lib'
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

[ビットコインのアドレス生成の仕方](https://qiita.com/you21979@github/items/5d3bd71ae2107d03973a)

### おわりに

思ったより簡単でびっくりしました

以上です。
