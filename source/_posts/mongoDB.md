---
title: 【mongoDB】よく使う書き方まとめ【JavaScript】
tags:
  - mongoDB
date: 2020-01-16 10:00:00
---

{% asset_img mongo.png %}

## はじめに

最近数年ぶりに mongoDB を触ったのですが、これだけ時間が経つとほとんど使い方忘れちゃってますね、、
また数年後に１からやり直しになるのはツライのでよく使うコマンドをメモしておきます

<!-- more -->

## インストール

公式サイト
https://github.com/mongodb/node-mongodb-native

```bash
npm install mongodb
```

## DB 接続

```js
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
async function init() {
  // ユーザパスワードなし
  // client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
  // ユーザパスワードあり
  client = await MongoClient.connect('mongodb://user:pass@localhost:27017', {
    useUnifiedTopology: true
  })
}
init()

const db = client.db('testDB')
const col = db.collection('testCOL')
```

## データ取得(SELECT)

```js
// 検索条件
const req_data = {
  user_id: 123
}
// 取得データフィルタ
const res_fields = {
  _id: 0,
  user_id: 1,
  user_name: 1
}
// データ取得
const res_data = await col
  .find(req_data)
  .project(res_fields)
  .toArray()
```

### 検索条件で OR を使う

```js
// 検索条件
let req_data = {
  $or: [{ user_id: 123 }, { use_flg: 1 }]
}
```

### 検索条件で json のキーを使う

```js
const user_id = 123
let req_data = {}
req_data['user.' + user_id] = { $exists: true }
```

## データ更新(UPDATE)

```js
// 検索条件
const req_data = {
  user_id: 123
}
// 更新データ
const update_data = { $set: { status: 9 } }
// データ更新
const data = await col.updateOne(req_data, update_data)
```

`$set`を使わないとドキュメントごと上書きになるので注意

## 連想配列の特定のデータのみ更新

```js
let update_data = {}
update_data['hoge_json.' + hoge_id + '.piyo_json.' + piyo_id + '.name'] = 'test name'
let data = await col.updateOne(req_data, { $set: update_data })
// データがなければ追加するオプション
// let data = await col.updateOne(req_data, { $set: update_data }, { upsert: true })
```

## 配列になければ追加

```js
const req_data = {
  user_id: 123
}
const data = await col.updateOne(req_data_team, {
  $addToSet: { hoge_list: '123' }
})
```

## 連想配列から特定のデータだけ削除

```js
let update_data = {}
update_data['hoge_json.' + json_key] = ''
let data = await col.updateOne(req_data, { $unset: update_data })
```

## ドキュメント追加(INSERT)

```js
// 挿入データ
let req_data = {
  user_id: 123
}
// データ挿入
const data = await col.insertOne(req_data)
```

## おわりに

他にもあれば追加します

以上です
