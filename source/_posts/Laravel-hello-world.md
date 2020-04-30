---
title: エラー「Installation failed, reverting ./composer.json to its original content.」の解決策
date: 2020-04-30
---

![](/images/php.png)

Laravelの環境構築で以下のエラーでハマったので解決策をメモしておきます

### 実行コマンド

`composer global require "laravel/installer"`

### エラー文言

Installation failed, reverting ./composer.json to its original content.

### 解決策

`composer global update`

### 終わりに

いつも思うけど環境構築がプログラミングで一番難しいんだよなあ、、、

### 参考

[Installation failed, reverting ./composer.json to its original content.](https://medium.com/@wotanwotan/installation-failed-reverting-composer-json-to-its-original-content-6235d3f848ca)
[macOSに Laravel 5.6 をインストールする手順をまとめてみる](https://qiita.com/igz0/items/bd5ab0aedc75d8476c76)
