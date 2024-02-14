---
title: RailsにRedisを導入した際のメモ
tags:
  - Rails
date: 2024-02-14 09:00:00
---

### redisライブラリの導入

Gemfileに以下を追加する。

```ruby
gem 'redis'
gem 'hiredis-client'
```

### Railsのキャッシュの設定

- Railsのキャッシュのデフォルトの保存先はtmpファイルになっている（[キャッシュストアの設定](https://railsdoc.com/page/config_assets_cache_store)）
- Redisを使うように変更するには以下のようにする

対象ファイル：`config.enveronments/production.rb`

変更内容：
```ruby
  config.cache_store = :redis_cache_store, {
    url: ENV['REDIS_URL'],
    ssl: true, # この行はAmazon ElastiCache For Redisの場合のみ。ローカルのDocker開発環境の場合は不要
  }
```

###  `ENV['REDIS_URL']`について

`ENV['REDIS_URL']`については、それぞれ以下のように設定する。

#### Amazon ElastiCache For Redis の場合

`redis://hoge.serverless.apne1.cache.amazonaws.com:6379/0`

#### ローカルのDocker開発環境の場合


`redis://redis:6379/0`


`docker-compose.yml`に以下のように追記する。

```yml
web:
  environment:
    REDIS_URL: 'redis://redis:6379/0'
  depends_on:
    - redis

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

  volumes:
    redis-data:
      driver: local
```

### キャッシュを利用するコード

上記の設定完了後、以下のコードでキャッシュが効くようになる。

```ruby
key = "cache_count_" + params[:id]
result = Rails.cache.fetch(key, expires_in: 5.minutes) do
  # キャッシュがなければここが実行される
  count = get_count(params[:id])
  count
end
```

と、基本的にはこれだけでOK。


### 注意点

- Redisでは正規表現を使ってキャッシュを削除することができる
- 例えば`Rails.cache.delete_matched('cache_count_*')`
- ただし、`Amazon ElastiCache For Redis` は正規表現を使ってキャッシュを削除することができない
- `Amazon ElastiCache For Redis` はクラスター構成となっていて、キャッシュの保存先が分散されているため
- 以下のエラーが発生する
- `CROSSSLOT Keys in request don't hash to the same slot`

### リストやハッシュをキャッシュする場合

- 上記の設定では、キャッシュの対象は文字列のみ
- リストやハッシュをキャッシュする場合は、`$redis`インスタンスを直接利用する必要がある

### `$redis`の設定

`config/initializers/redis.rb`を作成し、以下のように記述する。

```ruby
$redis = Redis.new(url: ENV['REDIS_URL'])
```

#### リストをキャッシュする場合

```ruby
$redis.lpush('list_key', 'value')
$redis.lrange('list_key', 0, -1)
```

### 注意点

sslを有効にする場合、Rails.cacheでは`ssl: true`のオプションがあったが、`$redis`では`url`に`rediss://`を指定する必要がある。 
例えば、`rediss://hoge.serverless.apne1.cache.amazonaws.com:6379/0`とすると、sslが有効になる。
