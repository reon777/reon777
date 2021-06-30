---
title: Bootstrapをカスタマイズする
date: 2021-06-30 12:00
---

Bootstrap をカスタマイズする方法です。

### npm インストール

scss を読み込むライブラリです。

npm install node-sass@5.0.0
npm install sass-loader@10.1.1

ここでバージョン指定しない場合、以下のエラーになるので注意。

this.getOptions is not a function

### scss を作成

node_modules と同じフォルダに scss フォルダを作成し、そこに index.scss を作成する

```scss
@import './mixin';
@import '../node_modules/bootstrap/scss/bootstrap';
```

同じ場所に mixin.scss を作成する

```scss
$primary: #0275d8;
$accent: #ff8b32;
```

### import

main.js などで先ほど作成した index.scss を import する

```js
import { createApp } from 'vue'
import App from './App.vue'

// この行を削除
// import 'bootstrap/dist/css/bootstrap.css'

// この行を追加
import './../scss/index.scss'

createApp(App).mount('#app')
```
