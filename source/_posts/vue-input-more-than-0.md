---
title: 【Vue】inputのv-modelの値を0以上に制限する方法
tags:
  - Vue
date: 2020-02-06
---

input の v-model の値を 0 以上に制限する方法をメモします

filter だと表示上は制限できますが実際の値は制限できないんですよね

コツとしては `v-model` を使うのではなく、`:value` と`@change` に分けることですね

分かってしまえば簡単ですが微妙にハマったので一応メモしておきます

```html
<div>
  <label>test label</label>
  <input type="number" :value="hoge" @change="min($event.target.value)" />
</div>
```

```js
methods: {
  min(val) {
    if (val < 0) {
      this.hoge = 0;
    } else {
      this.hoge = val;
    }
  },
```
