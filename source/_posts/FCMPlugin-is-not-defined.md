---
title: 「FCMPlugin is not defined」エラーの解決策
tags:
  - FCMPlugin
date: 2019-05-15
---

cordova アプリを起動した際に表題のエラーになりました

※以下のエラーメッセージの場合もあり

```baash
Can't find variable: FCMPlugin
```

## 解決策

<!-- more -->

もしログに`FCMPlugin Ready OK`などの表示があれば、`FCMPlugin`変数の準備完了よりも前に`FCMPlugin`変数を利用しようとしていてエラーになっています
なので１秒ごとに`FCMPlugin`変数をチェックして利用可能になれば利用するようにすれば OK です。

```js
// FCMPluginが利用可能になるまで１秒ループ
let fcmCheck = setInterval(() => {
  if (typeof FCMPlugin != 'undefined') {
    FCMPlugin.onTokenRefresh(function(token) {
      clearInteval(fcmCheck) // ループを止める
    })
  }
}, 1000)
```

ではでは

## 参考

https://github.com/fechanique/cordova-plugin-fcm/issues/177
