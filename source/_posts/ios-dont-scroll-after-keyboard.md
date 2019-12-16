---
title: 【iOS】キーボード表示後にスクロールできなくなる
tags:
  - 
date: 2019-12-16
---

{% asset_img ios.jpeg %}

### はじめに

iOSでキーボード表示後にスクロールできなくなる不具合の解消方法をメモします
一言で言うとbodyに`height:100%`を付ければ解決しました

Vueの場合のサンプルコードです

<!-- more -->

```js
<script>
export default {
  ...,
  mounted() {
    document.querySelector("body").classList.add("height-110");
   
  },
  beforeDestroy() {
    document.querySelector("body").classList.remove("height-110");
  }
};
</script>
```

```css
<style>
/* bodyを操作しているのでscopedは付けてはいけない */
.height-110 {
  /* iosでキーボード表示後にスクロールできなくなるバグ対応 */
  height: 110% !important;
}
</style>
```


## おわりに

iosはキーボード周りに不具合が多い気がします
androidの方が色々と楽ですね

