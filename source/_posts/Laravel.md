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
# create_users_tableの部分はなんでも良いけど一意でないとエラーになる
php artisan make:migration create_users_table
# マイグレーション実行（DB反映）
php artisan migrate
# ロールバック（上のマイグレーション単位）
php artisan migrate:rollback
```

### データベース から Model ファイルを作成したい時

```bash
php artisan code:models --table=users
```

初回は設定が必要
以下の手順に従う

[Laravel + Eloquent で reliese/laravel を用いてモデルクラスを Scaffolding する](https://qiita.com/pinekta/items/f1f4415ba8190b90aab6)

### INSERT・UPDATE

```php
if (User::where("hoge_id", $hoge["id"])->exists()) {
  // UPDATE
  $user = User::where("hoge_id", $hoge["id"])->first();
  $user->fill($request->except(['_token']))->save();
} else {
  // INSERT
  User::create($request->except(['_token']));
}
```

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

### ページネーションを利用したいとき

- コントローラ

```php
$users = DB::table('users')->paginate(15);
```

- ビュー

```php
<div class="container">
    @foreach ($users as $user)
        {{ $user->name }}
    @endforeach
</div>

{{ $users->links() }}
```

参考
https://laravel.com/docs/7.x/pagination

### 全文検索したい時

基本的には以下の記事の通りにすれば OK
[Laravel + MySQL5.7 で日本語全文検索をする方法とちょっとした注意点](https://qiita.com/niisan-tokyo/items/33c254bf8c4da3379ad1)

上の記事はテーブル生成と同時にインデックスを作成してますが、後からインデックスを貼りたい場合は以下のようにすれば可能です。
対象の複数カラムを結合した新しいカラム(fulltext_column)を作成してます。

```php
DB::statement("ALTER TABLE videos ADD fulltext_column TEXT AS (CONCAT(video_name, '　', overview, '　', product_name)) STORED");
DB::statement('ALTER TABLE videos ADD FULLTEXT index fulltext_index (`fulltext_column`) with parser ngram');
```

#### ページネーションを利用している場合

記事にあるようにクラスのスコープを利用すると取得データが 0 件になる不具合があるので以下のように記載すると良いです

```php
- $videos = Video::freeword($request->search_word)->sortable()->paginate(2);
+ $videos = Video::whereRaw("match(`fulltext_column`) against (? IN NATURAL LANGUAGE MODE)", [$request->search_word])->sortable()->paginate(2);
```

ページネーション部分には以下のように`withQueryString()`を付けると２ページ目以降に検索ワードが引き継がれます

```php
{!! $videos->withQueryString()->appends(\Request::except('page'))->render() !!}
```

### 変更が画面反映されない時

おそらくキャッシュが残ってしまっているのでキャッシュを削除する

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### コメントアウトしてるのにエラーになる

コメントアウトしている箇所も読み込まれます
ので内容が不正であればエラーになります

### link タグが読み込まれない

パスの最初に`/`がないとトップページ以外の画面で読み込まれませんでした

```html
<!-- 修正前 -->
<link rel="stylesheet" type="text/css" href="fontawesome/css/all.css" />
<!-- 修正後 -->
<link rel="stylesheet" type="text/css" href="/fontawesome/css/all.css" />
```

### Class 'App\Http\Controllers\Hoge' not found

コントローラーファイルの位置に合わせて namespace も変更する必要がある
修正箇所は`Hoge.php`の以下の行

```php
namespace App\Http\Controllers\Hoge;
```

### ログイン機能

以下の記事に従う
[Laravel のログイン認証の基本(Authentication)を完全理解する](https://reffect.co.jp/laravel/laravel-authentication-understand)

Laravel のバージョンによっては`php artisan make:auth`がエラーになる
その場合は以下で同じコマンドになる

```bash
composer require laravel/ui --dev
php artisan ui vue --auth
php artisan clear-compiled
php artisan optimize
php artisan view:clear
```

### ベストプラクティス

- [laravel-best-practices](https://github.com/alexeymezenin/laravel-best-practices/blob/master/japanese.md)
- [Laravel でウェブアプリケーションをつくるときのベストプラクティスを探る](https://qiita.com/nunulk/items/b1e2da51b5dabab92da0)
