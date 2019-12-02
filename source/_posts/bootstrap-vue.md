---
date: 2019-07-29
tags:
  - Vue
title: 【Vue】「$attrs is readonly.」エラーの解決策
---

{% asset_img warning.jpg %}

### はじめに

bootstrap-vue を導入すると`[Vue warn]: $attrs is readonly.`というワーニングがコンソールに表示されるようになったので
解決策をメモしておきます。

<!-- more -->

## 環境

- Mac Mojave: 10.14.4
- bootstrap-vue: 2.0.0-rc.27

## 解決策

`webpack.renderer.config.js`を以下の通り修正する

```js
// 修正前
let whiteListedModules = ['vue']
// 修正後
let whiteListedModules = ['vue', 'bootstrap-vue']
```

## 参考

https://github.com/bootstrap-vue/bootstrap-vue/issues/3040

以上です。
