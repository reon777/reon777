---
title: cordovaのiosでinputタグのタッチ反応が悪い時の解決策
tags:
  - cordova
date: 2019-05-16
---

{% asset_img cordova.jpeg %}

### 環境

- Mac Mojave 10.14.4
- cordova-ios: 4.5.5

## 事象

エラーという訳ではないのですが、cordova の ios で input タグのタッチ反応が悪かったです。
スクロールした後にタッチすると選択できない。
けどその後にもう一度タッチすると選択できる。
という状況でした。

## 解決策

<!-- more -->

色々調べてみても原因は分かりませんでした。
ただしクリックイベントを使って JavaScript で無理やりフォーカスすれば解決しました。

#### html

```html
<input id="hoge" @click="focus('hoge')" type="text" />
```

#### JavaScript

```js
 focus(id) {
   window.document.getElementById(id).focus()
}
```

暫定対応感がすごいので誰か正解を教えてほしい、、

ではでは
