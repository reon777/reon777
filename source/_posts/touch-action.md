---
date: 2019-11-21
tags:
  - css
title: 【CSS】特定の要素だけをスクロール禁止にする方法
---

{% asset_img bitcoin.png %}


## 2019/11/22 追記

一部のスクロールを禁止にするのではなく一部のスクロールのみ許可して他は全て禁止にするという逆転の発想の方が
使い勝手が良かったので紹介します

このライブラリを使うと色々な問題が解決されていい感じでした
https://github.com/willmcpo/body-scroll-lock

Vueならこっちですね
https://github.com/phegman/v-scroll-lock

### 以下、原文

普通スクロール禁止といえば以下を使うのだと思いますが、

```js
document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});
```

これだと画面全体に効いてしまいます

画面の一部の要素だけをスクロール禁止にするCSSを見つけたのでメモしておきます


```css
touch-action: none;
```

https://caniuse.com/#feat=css-touch-action

caniuseを見るとデスクトップSafari以外は問題なく使えるので導入しても大丈夫ですね！（）

