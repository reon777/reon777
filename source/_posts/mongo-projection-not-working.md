---
title: 【MongoDB】findでレスポンスデータのフィルタが効かない
tags:
  - MongoDB
date: 2019-12-24 10:00:00
---

{% asset_img mongo.png %}

### エラー内容

findでレスポンスデータのフィルタが効かない

### 原因

MongoDBのバージョンが変わって仕様が変わった

#### 修正内容

```bash
# 修正前
coll.find({ a: 42 }, { someField: 1 });
# 修正後
coll.find({ a: 42 }).project({ someField: 1 });
```

### 参考

https://stackoverflow.com/questions/48451300/projection-not-working-with-db-collection-find-in-mongo

以上
