---
title: DockerComposeでNuxt.jsとMongoDBを構築した
tags:
  - Docker
date: 2019-12-12
---

{% asset_img docker.png %}

# はじめに

DockerCompose で Nuxt.js と MongoDB を構築したので手順をメモ

<!-- more -->

# Docker インストール

## 1. Ubuntu の場合

以下の通り
https://qiita.com/youtangai/items/ff67ceff5497a0e0b1af

## 2. Amazon Linux の場合

### 2.1 Docker インストール

```bash
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
docker --version
```

### 2.2 Docker Compose インストール

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.25.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

# docker 設定

```bash
mkdir mydocker
cd mydocker
```

以下の`docker-compose.yml`を設置する
※hoge はリポジトリ名に変更する

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
      - ./hoge:/hoge
    working_dir: /hoge
    command: npm run start
    links:
      - mongo
  mongo:
    image: mongo
    restart: always
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
      - ./configdb:/data/configdb
```

# Nuxt アプリ起動

## クローンとビルド

```bash
git clone hoge.git
cd hoge

curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum install -y nodejs
npm -v
npm run build
```

## mongodb 接続コードサンプル

```js
;async () => {
  try {
    const mongodb = require('mongodb')
    const MongoClient = mongodb.MongoClient
    // ユーザパスワードなし
    const client = await MongoClient.connect('mongodb://mongo:27017', { useUnifiedTopology: true })
    // ユーザパスワードあり
    // const client = await MongoClient.connect('mongodb://user:pass@mongo:27017', {
    //   useUnifiedTopology: true
    // })

    const db = client.db('testDB')
    const col = db.collection('users')

    const data = await col.find({ id: 'test' }).toArray()
    console.log(data)
    client.close()
  } catch (err) {
    console.log({ err })
  }
}
```

# Docker 起動

```bash
docker-compose up -d
docker ps -a
# 停止したい時は
docker-compose stop
```

## 結果確認

### mongodb インストール

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

### 結果確認

```bash
# 挿入結果を確認
mongo
use test_db
db.stats()
db.createCollection('test_col');
db.test_col.insert( { name:'test_name_1007' } );
db.test_col.find()
```

# エラー対応

エラー
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
原因
docker が起動できていない
解決策
sudo service docker start

エラー
Address already in use
原因
前の起動のプロセスが終了してなくてポートがかぶってる
解決策(PID は変えること)
ps ax | grep mongo
kill -9 3990
