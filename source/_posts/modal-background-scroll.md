---
title: モーダル表示時に後ろをスクロールしないようにする
photos: images/js.png
tags:
  - js
date: 2020-11-05
---

モーダル表示時のみ body に overflow を追加すれば OK です。

```js
  watch: {
    modalOpened(new_status, old_status) {
      if (new_status) {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').style.overflow = 'visible';
      }
    },
  },
```

モーダル画面に`overflow: auto;`を付けるのも忘れずに。
