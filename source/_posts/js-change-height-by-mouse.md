---
title: 【Vue.js】要素の枠線をマウスで掴んでサイズ変更する
tags:
  - Vue
date: 2020-3-24
---

{% asset_img vue.png %}

### はじめに

要素の枠線をマウスで掴んでサイズ変更するやり方をメモします

html

```html
<!-- 上の要素 -->
<div :style="computed_upper_height"></div>

<!-- マウスで掴む枠線 -->
<div class="border" @mousedown="start_change_height"></div>

<!-- 下の要素 -->
<div :style="computed_under_height"></div>
```

computed を使ってマウスの動きに合わせて高さを自動変更する

```js
computed: {
  computed_upper_height() {
    return { height: `${this.upper_height}%` };
  },
  computed_under_height() {
    return { height: `${this.under_height}%` };
  },
}
```

methods
マウスの動きに追随するための処理

```js
  methods: {
    start_change_height() {
      window.addEventListener('mousemove', this.change_height);
      window.addEventListener('mouseup', this.finish_change_height);
    },
    change_height(event) {
      let page_y_ratio = (event.pageY / (window.innerHeight)) * 100;
      this.upper_height = page_y_ratio < 20 ? 20 : page_y_ratio;
      this.under_height = 100 - this.upper_height;
    },
    finish_change_height() {
      window.removeEventListener('mousemove', this.change_height);
      window.removeEventListener('mouseup', this.finish_change_height);
    },
    }
```

css はご自由にどうぞ

```css
.border {
  width: 100%;
  height: 3px;
  position: relative;
}
.border:hover {
  background-color: #708090;
  cursor: row-resize;
}
```
