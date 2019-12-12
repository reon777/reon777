---
title: DockerComposeでNuxt.jsとMongoDBを構築した
tags:
  - Docker
date: 2019-12-12
---

{% asset_img docker.png %}

### はじめに

DockerComposeでNuxt.jsとMongoDBを構築したので手順をメモ

<!-- more -->

### Dockerインストール

#### Ubuntuの場合

以下の通り
https://qiita.com/youtangai/items/ff67ceff5497a0e0b1af

### Amazon Linuxの場合

#### Dockerインストール

```bash
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
docker --version
```

#### Docker Composeインストール
```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.25.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### docker設定

```bash
mkdir mydocker
cd mydocker
```

以下の`docker-compose.yml`を設置する

```yml
version: '3'
services:
  web:
    image: node:8.15.0-alpine
    ports:
      - 3000:3000
    environment:
      PORT: 3000
      HOST: 0.0.0.0
    volumes:
      - .:/app
    working_dir: /app/nuxt-app-sample
    command: npm run dev
    links:
      - mongo
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_DATABASE: my-db
      MONGO_INITDB_ROOT_USERNAME: user
      MONGO_INITDB_ROOT_PASSWORD: pass
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
      - ./configdb:/data/configdb
```

### Nuxt 設定

#### npm 設定

```bash
curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -
# npxコマンドもインストールされる
sudo yum install -y nodejs
npm -v

npx create-nuxt-app nuxt-app-sample
```

### Docker起動

```bash
docker-compose up -d
docker ps -a
# 停止したい時は
docker-compose stop
```

### mongodbインストール

```bash
sudo vi /etc/yum.repos.d/mongodb-org-4.2.repo
```

以下を貼り付け

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

```bash
sudo yum install -y mongodb-org
```

参考
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/

### サーバからmongoコマンドでmongodbにアクセス


```bash
docker exec -it  mydocker_mongo_1 /bin/bash
# 以下の結果をメモしておく
hostname -i
exit
```

### Nuxt.jsコンテナからmongodbにアクセス

```bash
mkdir mongo_test
cd mongo_test
npm init
```

以下の内容で`app.js`を作成する
```js
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const assert = require('assert')

// hostnameは変更すること
MongoClient.connect('mongodb://user:pass@172.19.0.2').then(client => {
  const db = client.db('test_db');
  db.collection('test_col').insertMany([
    { tes1211: 1008 }
  ], (err, result) => {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log("Inserted 1 test_col into the collection")
  })
  client.close()
}).catch(err => {
  console.log(err)
})
```

```bash
cd ..
```


```bash
docker exec -it  mydocker_web_1 /bin/ash
cd ..
cd mongo_test/
# データ挿入
node app.js
exit
```


```bash
# 挿入結果を確認
# hostnameは変更すること
mongo admin --host 172.19.0.2:27017 -u user -p pass
use test_db
db.stats()
db.createCollection('test_col');
db.test_col.insert( { name:'test_name_1007' } );
db.test_col.find()
```

## エラー対応

エラー
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
原因
dockerが起動できていない
解決策
sudo service docker start

エラー
Address already in use
原因
前の起動のプロセスが終了してなくてポートがかぶってる
解決策(PIDは変えること)
ps ax | grep mongo
kill -9  3990
