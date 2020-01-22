---
title: Vueサイトにgoogle analyticsを埋め込むシンプルな方法
tags:
  - Vue
date: 2020-01-08
---

### はじめに

Vue サイトに google analytics を埋め込んだのでメモします
めっちゃ簡単です。

<!-- more -->

### ライブラリインストール

公式サイト
https://github.com/MatteoGabriele/vue-gtag

```bash
npm install vue-gtag
```

### 修正

main.js に以下を追加

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// この塊を追加
// google アナリティクス
import VueGtag from 'vue-gtag'
Vue.use(
  VueGtag,
  {
    config: { id: 'UA-123456789-1' }
  },
  router
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

UA-123456789-1 の部分は自分のやつに変えてね！

### おわりに

簡単ですね！
