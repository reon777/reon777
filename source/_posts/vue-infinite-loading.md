---
title: 【Vue.js】無限スクロール処理
tags:
  - Vue
---

{% asset_img vue.png %}

### ライブラリ公式ページ

https://peachscript.github.io/vue-infinite-loading/

### ライブラリインストール

```bash
npm install vue-infinite-loading -S
```

### コンポーネント登録

main.js

```js
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading, {
  slots: {
    noResults: '',
    noMore: ''
  }
})
```

### HTML コード

```js
<template>
  <div>
    <div v-for="hoge in hoge_list"></div>
    <infinite-loading ref="infiniteLoading" spinner="bubbles" v-on:infinite="infiniteHandler"></infinite-loading>
  </div>
</template>
```

### JavaScript コード

```js
infiniteHandler() {
  if (/* 無限するロールする条件 */) {
    this.get_news_list();
  } else {
    console.log("無限スクロール完了")
    this.$refs.infiniteLoading.stateChanger.complete();
  },
},

async get_news_list() {
  const params = {
    page: this.page,
  };
  const res = await this.gm_api_get("news", params)
  this.page += 1;
  this.$refs.infiniteLoading.stateChanger.loaded();
}
```
