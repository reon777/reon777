---
title: Docker ComposeでMongoDBを構築したら権限エラーでハマった
tags:
  - Docker
  - MongoDB
date: 2019-12-23
---

{% asset_img docker.png %}

# はじめに

Docker ComposeでMongoDBを構築したら権限エラーでハマったので解決策をメモしておきます

<!-- more -->

### 事象

詳しい原因は不明ですが、docker-compose.ymlでcommandを利用した場合に権限エラーになりました
また、docker-compose.yml＋DockerFileを使った場合も同様のエラーになりました

### 解決策

以下のようにcommandを実行するコンテナを別にするとうまくいきました

`docker-compose.yml`

```yml
version: '3'

services:
  mongo:
    image: mongo:4.2
    container_name: mongo-DB
    ports:
      - 27017:27017
    volumes:
      - ./mongo_db:/data/db

  # commandを利用するための一時的なコンテナ。command完了後に破棄される
  mongo-seed:
    image: mongo:4.2
    container_name: mongo-seed
    command: bash -c "cd mongo_seed && ./create_db.sh"
    volumes:
      - ./mongo_seed:/mongo_seed
    depends_on:
      - mongo
```

`./mongo_seed/create_db.sh`は以下の通り

```sh
#!/bin/sh

#DB作成、DBユーザ作成
mongo admin --host mongo:27017 < /mongo_seed/create_db.js

#ドキュメント作成、データインポート(CSV)
ls -l /mongo_seed/import_data | grep .csv | while read LINE 
do 
  FILE=`echo ${LINE} | awk '{print $9}'`
  COLLECTION=`echo ${FILE} | sed 's/\.[^\.]*$//'`
  mongoimport --host mongo:27017 --db foxcopeDB --collection ${COLLECTION} --type csv --file /mongo_seed/import_data/${FILE} --headerline --columnsHaveTypes
done

#ドキュメント作成、データインポート(JSON)
ls -l /mongo_seed/import_data | grep .json | while read LINE 
do 
  FILE=`echo ${LINE} | awk '{print $9}'`
  COLLECTION=`echo ${FILE} | sed 's/\.[^\.]*$//'`
  mongoimport --host mongo:27017 --db foxcopeDB --collection ${COLLECTION} --file /mongo_seed/import_data/${FILE} --jsonArray
done

```

`./mongo_seed/create_db.js`は以下の通り

```js
db = db.getSiblingDB('testDB');
db.createUser(
  {
    user:"admin",
    pwd:"admin",
    roles:[
       { 
           "role" : "userAdmin",
            "db" : "testDB"
       }
    ]
  } 
);
```

`./mongo_seed/import_data/test_csv.csv`は以下の通り

```csv
user_id.double(), user_name.string()
"1", "test1"
"2", "test2"
```

`./mongo_seed/import_data/test_json.json`は以下の通り

```json
[
  {
    "user_id": "",
    "user_name": ""
  }
]
```

### おわりに

ググってもほとんど情報がなかったので多分自分の環境の問題なのかなあ
ていうか何でこの解決策で解決できたのかよく分かってないっていう、、
