---
title: 【Hexo】画像を使い回す方法
tags:
  - Hexo
date: 2020-04-15
---

## はじめに

Hexoで画像を表示する方法を検索するとよく出てくるのが
`_config.yml`で`post_asset_folder: true`とすることで、`_posts`配下に記事名と同じ名前のフォルダを作成して、その中に画像を入れて、
記事中では
```
{% asset_img hoge.jpeg %}
```
のように使う方法ですよね

しかし！

これだと同じ画像を使い回しできなくて不便ですよね、、

なんと調べてみると画像を使い回せる方法を見つけたのでメモしておきます

## 手順

まず、`source`フォルダの直下に`images`フォルダを作成します
で、その中に画像を入れます

記事中では`![](/images/hoge.jpeg)`ってやるだけです

簡単すぎワロタ

### 参考

https://hexo.io/docs/asset-folders.html
