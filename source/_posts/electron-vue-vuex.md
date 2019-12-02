---
date: 2019-07-24
tags:
  - Vue
title: electron-vueのテンプレートのvuexの初期エラーの解決策
---

### はじめに

electron-vue のテンプレートに vuex が入ってますがその使い方にクセがあったのでメモしておきます

<!-- more -->

## 環境

- Mac Mojave: 10.14.4
- vue-electron: 1.0.6

## アクションの実行方法

```bash
this.$store.dispatch("someAsyncTask");
```

詳しい理由は不明ですが、src/renderer/store/index.js の`createSharedMutations()`をコメントアウトする必要があります。

```bash
# 修正前
createSharedMutations()
# 修正後
# createSharedMutations()
```

以上です。

## 参考

https://github.com/SimulatedGREG/electron-vue/issues/733
