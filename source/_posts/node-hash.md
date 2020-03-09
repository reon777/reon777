---
title: 【Node.js】文字列をハッシュ化する方法
tags:
  - Node.js
date: 2020-01-30
---

{% asset_img Node.png %}

### はじめに

Node.js で文字列を hash 化する手順をメモしておきます

他の記事で crypto ライブラリを使っているものをよく見ますが、crypto ライブラリは deprecated になったので使わない方が良いです
以下では crypto-js ライブラリを使ってます

### 手順

```js
const CryptoJS = require('crypto-js')
const password = 'hoge'
const hashed_password = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Base64)
```

以上です
