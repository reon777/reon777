---
date: 2019-07-18
tags:
  - PWA
title: iosのPWAでキャッシュを削除する方法
---

{% asset_img sheep.png %}

### はじめに

ios の PWA のキャッシュって全然消えなくないですか？？？
まあそれが PWA の良いところだとは思うんですけどせっかくコンテンツを新しくしてもそれがユーザが検知できないのは良くないですよね。

<!-- more -->

本来であれば`service-worker.js`に以下のように書けばキャッシュではなく最新のコンテンツを利用してくれるはずなのですが、
どうやら調べた感じだとまだ Safari の PWA 対応が遅れてるっぽいです。。

```js
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      console.log('keys: ' + keys)
      return Promise.all(
        keys.map(key => {
          console.log('不要なキャッシュを削除')
          return caches.delete(key)
        })
      )
    })
  )
})
```

一応無理やり削除する方法が分かったのでメモしておきます。
早く対応してくれ〜。apple さん〜。

## キャッシュを削除する方法

```bash
window.location.reload(true);
```

はい、これです。
なので、サーバの DB にバージョン情報を記録しておいて、定期的にそれをチェックして、更新されていればこれでキャッシュを削除して新しいソースを読み込む、という流れが良さそうです。
良さそうというか、そうするしかないと思います。

### おわりに

もし ios でも良い感じにキャッシュを削除する方法をご存知であれば教えてください〜。

### 参考

https://forum.quasar-framework.org/topic/2560/solved-pwa-force-refresh-when-new-version-released/26
[PWA： ServiceWorker を使って、キャッシュをコントロールする](https://qiita.com/OMOIKANESAN/items/13a3dde525e33eb608ae)
