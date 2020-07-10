---
title: 【PHP】Laravelの使い方メモ
date: 2020-07-10
photos: images/php.png
tags:
  - PHP
---

![](/images/php.png)

## はじめに

最近 Laravel を使うことが増えました。
だんだん使い方が分かってきたのですが、おそらく数年後には忘れてしまっていると思います。。
その時のために使い方を簡単にメモしておきます

<!-- more -->

## 目次

<!-- toc -->

## テンプレート

### ファイルを分けたい時

１ファイルに大量にコードを書くと使いにくいですよね。
ファイルを分割する方法です。

- 呼び出される方

layout/header.blade.php

```php
@section('header')
aaa
@endsection
```

- 呼び出す方

index.blade.php

```php
@include('layout.header')
@yield('layout.header')
```

### コードを共通化したい時

`<head>`タグやスクリプト読み込みなどを全ファイルに書くのは非効率ですよね。
コードを共通化（継承）する方法です。

- 共通コード

基本的にはそのままコードを記載する
共通じゃない部分に`@yield('content')`を書く

- 共通コードを呼び出す時

```php
// 共通コードのファイル名が`resources/views/layout/base.blade.php`の場合
@extends('layout.base')

@section('content')
aaa
@endsection
```

### ソートしたい時

以下のライブラリを利用する
https://github.com/Kyslik/column-sortable

デフォルトのソート順を変更したい時は以下ファイルを変更する

config/columnsortable.php

```php
- 'default_direction'             => 'asc',
+ 'default_direction'             => 'desc',

- 'default_direction_unsorted'             => 'asc',
+ 'default_direction_unsorted'             => 'desc',
```

## モデル

### テーブル 作成（マイグレーション）

Laravel はマイグレーション機能があります
つまりコードから DB を自動作成できます

参考
https://readouble.com/laravel/5.5/ja/migrations.html

```bash
# マイグレーションファイル作成
# usersの部分をDB名に変更すること
php artisan make:migration create_users_table
# マイグレーション実行（DB反映）
php artisan migrate
# ロールバック（上のマイグレーション単位）
php artisan migrate:rollback
```

### データベース から Model ファイルを作成したい時

以下の手順に従う

[Laravel + Eloquent で reliese/laravel を用いてモデルクラスを Scaffolding する](https://qiita.com/pinekta/items/f1f4415ba8190b90aab6)

## コントローラー

### URL とコントローラーの紐付けを設定したい時

参考
https://readouble.com/laravel/5.5/ja/controllers.html

`routes/web.php`を以下のように記載する

```php
// GET
Route::get('/user/edit', 'User\HomeController@edit');
// POST
Route::post('/user/edit', 'User\HomeController@postEdit');
```

### ログを出力したい時

- ログ出力

```php
\Log::info('test');
```

- ログ確認

```bash
tail -f storage/logs/laravel.log
```

## その他

### 変更が画面反映されない時

おそらくキャッシュが残ってしまっているのでキャッシュを削除する

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### ベストプラクティス

- [laravel-best-practices](https://github.com/alexeymezenin/laravel-best-practices/blob/master/japanese.md)
- [Laravel でウェブアプリケーションをつくるときのベストプラクティスを探る](https://qiita.com/nunulk/items/b1e2da51b5dabab92da0)
