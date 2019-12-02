---
date: 2019-09-26
tags:
  - Vue
title: 【Vue.js】後ろの要素のクリックイベントを発生させないようにする方法
---

{% asset_img vue.png %}

一瞬なのでコードだけ載せます

```html
<!-- 修正前 -->
<div @click="hoge()"></div>
<!-- 修正後 -->
<div v-on:click.stop="hoge()"></div>
```

参考
https://vuejs.org/v2/guide/events.html

知ってれば一瞬なのですが、知らなかったので少しハマりました、、

以上です。
