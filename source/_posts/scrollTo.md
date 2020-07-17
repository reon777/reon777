---
tags:
  - JavaScript
date: 2019-06-03
title: jsで特定要素をスクロールする方法
---

表題の通りです。

```js
// hogeクラスの最初の要素を取得する
const hoge = window.document.getElementsByClassName('hoge')[0]

// 現在の横スクロール位置を取得する
const now_x = hoge.scrollLeft
console.log('now_x: ' + now_x)

// 右に100pxスクロールする
hoge.scrollTo(now_x + 100, 0)

// おまけ
// 画面の横幅を取得する
const window_x = window.parent.screen.width
console.log('window_x: ' + window_x)
```
