---
title: 【Git】Pullの時に不要なマージコミットをしない方法
tags:
  - Git
date: 2020-04-20 10:00:00
---

![](/images/git.png)

Pullした時に

`Merge branch 'dev' of github.com:hoge/piyo into dev`

みたいな不要なマージコミットができることがありますよね

これ、特に困ってはなかったので放置してたのですが、せっかくなので調べてみると簡単に取り除ける方法が分かりました

pullするときに`git pull --rebase`という風にrebaseオプションをつけると良いらしいです

rebaseに関する詳細はこちらが分かりやすかったです。
[git pull と git pull –rebase の違いって？図を交えて説明します！](https://kray.jp/blog/git-pull-rebase/)

VSCodeだといつもクリックしているプルの表示のしたにプル（リベース）というものがありますね！
全然気づかなかった！w

{% asset_img スクリーンショット.png %}

この機会に他のgitコマンドについても勉強しなおそうかな〜

以上です
