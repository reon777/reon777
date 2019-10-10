---
date: 2019-10-10
tags:
  - LocalForage
title: 【Vue.js】LocalForageを導入してみた
---

{% asset_img vue.png %}

### はじめに

Vue.js プロジェクトに LocalForage を導入してみたので手順をメモしておきます。

<!-- more -->

### 環境

- localforage: 1.7.3

### ライブラリインストール

```bash
npm install localforage --save
```

### 初期設定

main.js に以下のコードを挿入する

```js
// インポート
import * as localforage from 'localforage'
const myLF = localforage.createInstance({
  driver: localforage.LOCALSTORAGE, // LocalForage を使用する
  name: 'MyLocal', // 名前空間
  storeName: 'example', // 名前空間内のインスタンスの識別名
  version: 1 // バージョン
})
// グローバル変数として登録
Vue.prototype.myLF = myLF
```

### データの保存と取得

```js
  methods: {
    async init() {
      // データを保存する
      await this.myLF.setItem("キー", [
        "保存したい値",
        "文字列や数値だけでなく",
        "配列やオブジェクトも渡せる2"
      ]);
      // データを取り出す
      const test = await this.myLF.getItem("キー");
      console.log("test: " + test);
    }
  }
```

### vuex と併用する

そのままだと変更監視してくれないので vuex と併用して変更監視をさせてみました
変更するたびに update_completed を更新して update_completed の変更検知の中でデータを取り出してます

```js
  data() {
    return {
      test: []
    };
  },
  computed: {
    update_completed() {
      return this.$store.state.update_completed;
    }
  },
  watch: {
    update_completed(newVal, oldVal) {
      this.get_test();
    }
  },
  methods: {
    async set_test() {
      // データを登録する
      await this.myLF.setItem("キー", [
        "保存したい値",
        "文字列や数値だけでなく",
        "配列やオブジェクトも渡せる2"
      ]);
      this.$store.commit("set_update_completed", update_completed);
    },
    async get_test() {
      // データを取り出す
      this.test = await this.myLF.getItem("キー");
      console.log("this.test: " + this.test);
    }
  }
```

store.js に以下を追加

```js
export default new Vuex.Store({
  state: {
    update_completed: false
  },
  mutations: {
    set_update_completed(state, update_completed) {
      state.update_completed = !update_completed
    }
  }
})
```

### 参考

[LocalForage を使ってアプリ内 DB を簡単構築](http://neos21.hatenablog.com/?page=1509577200)

### おわりに

以下の記事にあるように Local Storage は便利ですがあんまり使わない方が良さそうなので今後は localforage の方を使っていこうと思います
デフォルトで indexedDB です

[HTML5 の Local Storage を使ってはいけない（翻訳）](https://techracho.bpsinc.jp/hachi8833/2019_10_09/80851)

以上です。
