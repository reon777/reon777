---
date: 2019-08-09
tags:
  - js
title: 【JavaScript】RSA方式で暗号化・復号化してみた
---

{% asset_img computer_document_angou.png %}

### はじめに

JavaScript で RSA 方式で暗号化・復号化したので手順をメモしておきます。

<!-- more -->

### 環境

- node-rsa: 1.0.5

### ライブラリインストール

https://github.com/rzcoder/node-rsa

```bash
npm install node-rsa
```

### 暗号化・復号化など

```js
// 初期化
const NodeRSA = require('node-rsa')
const key = new NodeRSA({ b: 512 })
console.log(key)

// 暗号化したい文字列
const text = 'Hello RSA!'

// 暗号化
const encrypted = key.encrypt(text, 'base64')
console.log('encrypted: ', encrypted)

// RSA公開鍵のPEMを生成
let rsa_public_key = key.exportKey('pkcs1-public-pem')
console.log('rsa_public_key: ', rsa_public_key)

// RSA秘密鍵のPEMを生成
let rsa_private_key = key.exportKey('pkcs1-private-pem')
console.log('rsa_private_key: ', rsa_private_key)

// 秘密鍵からkeyオブジェクトを復元してtextを復号化
const key2 = new NodeRSA(rsa_private_key, 'pkcs1-private-pem')
const decrypted = key2.decrypt(encrypted, 'utf8')
// 以下の２つが一致すればOK!
console.log('decrypted: ', decrypted)
console.log('text: ', text)
```

### 参考

[Javascript で公開鍵ペア生成・暗号化/復号をしてみた](https://qiita.com/poruruba/items/272bdc8f539728d5b076)

### おわりに

参考 URL とやってることはあんまり変わらないんですけどコメントがなかったり復元フローがなかったりで少し分かりにくかったので改めて整理しておきました。
あと参考 URL だと`browserify`というのをやってますが自分の環境だと特に不要でした。
詳しいことはよく分かりません！w

以上です。
