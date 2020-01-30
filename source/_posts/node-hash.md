---
title: 【Node.js】文字列をハッシュ化するシンプルな方法
tags:
  - Node.js
date: 2020-01-30
---

{% asset_img Node.png %}

### はじめに

Node.js で文字列を hash 化する手順をメモしておきます

最初は npm パッケージとか色々探してたのですが良い感じのがなくてどうしようかな〜と思ってたら、なんと公式のライブラリがあって機能が充実してて良い感じでした
npm インストール不要で使えます

### 手順

```js
const crypto = require('crypto')
const password = 'hoge'
const hashed_password = crypto
  .createHash('sha256')
  .update(password)
  .digest('hex')
```

### 参考 URL

https://nodejs.org/api/crypto.html#crypto_class_hash

以上です
