---
date: 2019-07-11
tags:
  - Vue
title: 【Vue.js】ポップアップを自作してみた【ダイアログ】
---

{% asset_img modal.png %}

**-----------2020/5/14 追記-----------**

簡単に支えてカスタマイズ性もあるライブラリを見つけたのでこれで良い気がする、、
https://sweetalert2.github.io/#examples

**-----------追記終わり-----------**

Vue.js でポップアップを自作してみたのでやり方をメモしておきます。
（ポップアップというかモーダルウインドウ？ダイアログウインドウ？何が正式名称のかよく分かりませんがここではポップアップと呼びます。）

最初はサボってこのライブラリ使ってたんですけど
https://www.npmjs.com/package/vuejs-dialog
やっぱり細かい CSS とか動きとか調整しようとすると自作の方が都合が良いんですよね。

<!-- more -->

## 環境

- Mac Mojave: 10.14.5
- vue: 2.6.7
- vuex: 3.1.0

## 表示制御

App.vue に以下を追加します。
`showModalDialog`のオンオフで表示制御します。
`showModalDialog`はコンポーネントをまたぐので`vuex`を利用します。

```html
<template>
  <div id="app">

    <!-- これを追加 -->
    <ModalDialog v-if="$store.state.showModalDialog">
    </ModalDialog>

    <router-view />
  </div>
</template>

<script>
```

## ポップアップコンポーネント作成

上の`ModalDialog`で表示されるコンポーネントを作成します。
いいえを押した場合は単にポップアップを閉じるだけで、
はいを押した場合はコールバック関数を実行します。

/src/components/ModalDialog.vue

```html
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header"></div>

          <div class="modal-body">
            {{$store.state.modal_msg}}
          </div>

          <div class="btns">
            <button
              class="btn"
              @click="$store.commit('set_showModalDialog', false);"
            >
              キャンセル
            </button>
            <button class="btn" @click="do_yes()">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ModalDialog',
    methods: {
      do_yes() {
        this.$store.state.callback_func()
        this.$store.commit('set_showModalDialog', false)
      }
    }
  }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  /* 画面上下真ん中に配置 */
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  /* ポップアップ外枠 */
  .modal-container {
    width: 300px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  /* ヘッダー */
  .modal-header {
    display: block;
    text-align: center;
    border: 0px;
    padding: 20px 0 0 0;
    font-weight: bold;
  }
  /* ボディ */
  .modal-body {
    display: block;
    text-align: center;
    padding: 5px 15px 0 15px;
    border: 0px;
    font-size: 0.9rem;
  }
  /* ボタン達 */
  .btns {
    display: inline-block;
    margin-top: 15px;
    width: 300px;
  }
  /* ボタン */
  .btn {
    width: 50%;
    border-top: 1px solid #ddd;
    color: rgb(66, 133, 245);
    height: 50px;
    font-weight: bold;
  }
  .btn + .btn {
    border-left: 1px solid #ddd;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
```

## グローバルコンポーネントとして登録

`ModalDialog`をコンポーネントとして利用できるように
`src/main.js` に以下の行を追加します。

```js
// ポップアップのモーダルウィンドウ
import ModalDialog from '@/components/ModalDialog'
Vue.component('ModalDialog', ModalDialog)
```

## vuex の store の設定

表示のオンオフの変数と表示内容とコールバック関数を設定します。
`/src/store.js`を以下の通り修正する

```js
export default {
  strict: true,
  namespaced: true,
  state: {
    showModalDialog: false,
    modal_msg: '',
    callback_func: null
  },
  mutations: {
    set_showModalDialog(state, showModalDialog) {
      state.showModalDialog = showModalDialog
    },
    set_modal_msg(state, modal_msg) {
      state.modal_msg = modal_msg
    },
    set_callback_func(state, callback_func) {
      state.callback_func = callback_func
    }
  }
}
```

## ポップアップを表示する

使いたい画面に以下の`show_dialog`関数を追加して、これを実行すれば表示されるはずです！

```js
methods: {
  // 確認ポップアップ表示
  show_dialog() {
    this.$store.commit("set_showModalDialog", true);
    this.$store.commit("set_modal_msg", "本当に削除しますか？");
    this.$store.commit("set_callback_func", this.callback_func);
  },
  callback_func() {
    console.log('コールバック関数が実行されました')
  }
}
```

## 終わりに

最初は少し手間ですが一度やっておくと使い回しは簡単なので早めにやっておくとお得な感じです。
ではでは、よきポップアップライフを。
以上です。
