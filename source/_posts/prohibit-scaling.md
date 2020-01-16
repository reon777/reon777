---
title: JavaScriptでスマホの拡大縮小を無効にする
tags:
  - JavaScript
date: 2020-01-16
---

{% asset_img cordova.jpeg %}

### はじめに

最近は JavaScript でスマホ向けサイトを開発することも当たり前になりましたね
スマホ表示では拡大縮小しない方がアプリっぽくなりますよね

という訳でスマホで拡大縮小を無効にする方法を紹介します

<!-- more -->

### コード

`index.html` の meta タグの viewport に`user-scalable=no`を追加すれば OK！

```html
<meta name="viewport" content="user-scalable=no" />
```

簡単ですね！

以上です
