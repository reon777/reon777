---
title: 【node-forge】Maximum call stack size exceededエラーの原因【vue-i18n】
date: 2019-10-1
tags:
  - vue
  - Cordova
---

{% asset_img cordova.jpeg %}

### はじめに

表題のエラーが発生して原因特定にかなり手こずったのでメモしておきます

<!-- more -->

### 環境

- node-forge: 0.75
- vue-i18n: 8.9.0

### エラー

cordova 実行時に以下のエラーが発生
ただしワーニングに近い。
機能は普通に使える
けど最初の表示に数十秒かかるので取り除く必要は大きい

```bash
webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:620 [Vue warn]: Error in beforeCreate hook: "RangeError: Maximum call stack size exceeded"

(found in <Root>)
warn @ webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:620
webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:1887 RangeError: Maximum call stack size exceeded
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
    at _traverse (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2122)
logError @ webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:1887
vue.runtime.esm.js?2b0e:8423 Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools
cordova.js:1219 deviceready has not fired after 5 seconds.
cordova.js:1212 Channel not fired: onDOMContentLoaded
```

### 原因と解決策

node-forge と vue-i18n を両方とも利用していることが原因でした
どうやらこの組み合わせは相性が悪いようです

node-forge を node-rsa に置き換えることで対応しました

### おわりに

２つのライブラリの組み合わせで起きるエラーは特定がすごく難しく大変でした、、
