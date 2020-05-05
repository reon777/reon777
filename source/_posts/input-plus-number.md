---
title: 【HTML】Formバリデーションのサンプル
date: 2020-05-05
---

![](/images/html.png)

### はじめに

フォームのバリデーションについて毎回同じことを調べている気がするのでここにメモしていきます
随時追加します

### 0以上の整数値のみ(0,1,2,3,...)

html

```html
<input type="number" id="hoge">
```

JavaScript

```js
document.getElementById('hoge').addEventListener('blur', function() {
  if (!this.value || this.value < 0) this.value = 0;
  else this.value = Number(this.value)
}, false)
```

`blur`
→フォーカスを外れた時に実行されます。`input`でも可能なのですが0を消せなくて使いにくかったので`blur`にしました

`Number(this.value)`
→先頭の0を除外するためです
