---
title: 【docker-compose】PostgreSQLを導入してみた
date: 2021-07-15 00:00:00
---

### はじめに

docker-composeにPostgreSQLを導入したので、コードをメモしておきます。

./docker/postgresql/initdbフォルダにsqlファイルを入れれば自動的に実行されます。


```yml
#docker-composeのバージョンを指定
version: '3.8'

services:
  db:
    image: postgres:13.3
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      TZ: Asia/Tokyo
    ports:
      - '5432:5432'
    volumes:
      - ./docker/postgresql/data:/var/lib/postgresql/data
      - ./docker/postgresql/initdb:/docker-entrypoint-initdb.d
```
