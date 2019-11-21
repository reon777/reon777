---
date: 2019-11-21
tags:
  - css
title: 【CSS】特定の要素だけをスクロール禁止にする方法
---

{% asset_img bitcoin.png %}


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

