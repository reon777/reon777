---
title: 【OAuth2】クライアントアプリのサンプルコード【NodeJS】
tags:
  - JavaScript
date: 2021-07-10 09:00:00
---

![](/images/ムーミン1.jpg)

### はじめに

OAuth2のクライアントアプリを作成したので、手順をメモしておきます。

### 環境

Vue.js：3.0.0
Express：4.17.1

<!-- more -->

### ライブラリインストール

利用ライブラリ
<https://www.npmjs.com/package/client-oauth2>

```bash
npm install client-oauth2 --save
```

### OAuth認証が必要な画面を用意

OAuth認証を行う画面を用意します。
このページにアクセスすると接続先アプリのログイン画面が開く想定です。
ウェブサーバのAPIを実行し、レスポンスに入っている認証画面のURLを開きます。

src/views/Auth.vue

```js
<template>
  <div>OAuth認証を行います。</div>
</template>

<script>
// API実行
import axios from "axios";

export default {
  name: "Auth",
  created() {
    this.getAuth();
  },
  methods: {
    async getAuth() {
      const res = await axios.get("/auth", {});
      console.log({ res });
      window.open(res.data);
    },
  },
};
</script>

<style>
</style>
```

上の画面にアクセスするためのルーターも追加します。

router.js

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
// 追加　ここから
import Auth from './views/Auth.vue'
// 追加　ここまで

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // 追加　ここから
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  // 追加　ここまで
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
```

### OAuth認証画面のURLを取得するサーバコード

上で作成した画面から呼ばれるAPIです。
このAPIでは、OAuthで利用する認証画面のURLを取得し、レスポンスとして返します。

srv/index.js

```js
app.get('/auth', function(req, res) {
  var uri = githubAuth.code.getUri()
  console.log({ uri })
  res.json(uri)
})
```

ここでgithubAuthが初登場してます。
githubAuthは以下の通りにインスタンス化しておきます。

```js
var ClientOAuth2 = require('client-oauth2')

var githubAuth = new ClientOAuth2({
  clientId: 'abc',
  clientSecret: '123',
  accessTokenUri: '<https://github.com/login/oauth/access_token'>,
  authorizationUri: '<https://github.com/login/oauth/authorize'>,
  redirectUri: '<http://example.com/auth/github/callback'>,
  scopes: ['notifications', 'gist']
})
```

以下の値はログイン先のサーバ管理者に教えてもらって下さい。

* clientId
* clientSecret
* accessTokenUri
* authorizationUri
* scopes

「redirectUri」はクライアントアプリのURLです。
あとで画面を作成します。

### OAuth認証画面を開くところまで完了

ここまでの設定が完了していれば、`http://example.com/auth`にアクセスしたら
接続先アプリのログイン画面が開くはずです。

そしてログインを行うと、`http://example.com/auth/github/callback`が開くはずです。
codeパラメータが付与されていることを確認できます。

`http://example.com/auth/github/callback`の画面をこれから作成します。

### コールバック画面を作成する

コールバック画面を新規作成します。
APIにはcodeパラメータを渡します。
APIからのレスポンスとしてアクセストークンを取得します。

src/views/Callback.vue

```js
<template>
  <div>callback</div>
</template>

<script>
// API実行
import axios from "axios";
export default {
  name: "Callback",
  created() {
    this.getAuthCallback();
  },
  methods: {
    async getAuthCallback() {
      console.log(this.$route.query.code);
      const res = await axios.get("/auth/callback", {
        params: {
          code: this.$route.query.code,
        },
      });
      console.log({ res });
      // アクセストークンが取得できる
      console.log(res.data);
    },
  },
};
</script>

<style>
</style>
```

上の画面にアクセスするためのルーターも追加します。

router.js

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
// 追加　ここから
import Callback from './views/Callback.vue'
// 追加　ここまで

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  // 追加　ここから
  {
    path: '/auth/github/callback',
    name: 'Callback',
    component: Callback,
  },
  // 追加　ここまで
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
```

### コールバックのサーバコード

上の画面からアクセスするサーバコード(API)を作成します。
レスポンスとしてアクセストークンを返します。

srv/index.js

```js
app.get('/auth/callback', function(req, res) {
  console.log(req.originalUrl)
  githubAuth.code.getToken(req.originalUrl).then(function(user) {
    try {
      console.log({ user })

      // Refresh the current users access token.
      user.refresh().then(function(updatedUser) {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      })

      return res.send(user.accessToken)

    } catch (e) {
      console.log('/auth/callback　でエラー')
      console.log(e)
      res.send('')
    }
  })
})
```

ここまでの開発が完了していれば、`http://example.com/auth/github/callback`画面のコンソールにはアクセストークンが表示されているはずです。

### 終わりに

OAuth認証は仕組みを理解するのは難しいですが、クライアントアプリを作るだけであればそこまで難しくなくて良かったです。

OAuth認証は仕組みについては、以下の記事はとても参考になりました。

[OAuth 2.0 全フローの図解と動画](https://qiita.com/TakahikoKawasaki/items/200951e5b5929f840a1f)

参考になれば幸いです。
以上です。

