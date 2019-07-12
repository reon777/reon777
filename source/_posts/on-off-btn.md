---
title: 【Vue.js】ON/OFF スイッチを CSS で自作してみた。
date: 2019-07-12
tags:
  - Vue
  - css
---

{% asset_img on.png %}
{% asset_img off.png %}

### はじめに

ON/OFF スイッチを CSS で自作しました。
コピペで動きます。

<!-- more -->

## 環境

- Mac Mojave: 10.14.4
- vue: 2.6.6

### html

```html
<template>
  <div class="app">
    <label class="custom-control custom-checkbox" for="agree">
      <input
        type="checkbox"
        class="custom-control-input"
        name="agree"
        id="agree"
        v-model="is_agree"
      />
      <span class="custom-control-indicator"></span>
      同意する
    </label>
  </div>
</template>
```

### script

```js
<script>
export default {
  data() {
    return {
      is_agree: false
    };
  }
};
</script>
```

### style

```css
<style scoped>
.custom-checkbox {
  min-height: 1rem;
  padding-left: 0;
  margin-right: 0;
  cursor: pointer;
}
.custom-checkbox .custom-control-indicator {
  content: '';
  display: inline-block;
  position: relative;
  width: 35px;
  height: 17px;
  background-color: #818181;
  border-radius: 15px;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
  vertical-align: middle;
  margin: 0 5px 0 0;
  box-shadow: none;
}
.custom-checkbox .custom-control-indicator:after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #f1f1f1;
  border-radius: 21px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);
  left: -2px;
  top: -2px;
  -webkit-transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease;
  transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {
  background-color: rgb(100, 195, 154);
  background-image: none;
  box-shadow: none !important;
}
.custom-checkbox
  .custom-control-input:checked
  ~ .custom-control-indicator:after {
  background-color: white;
  left: 17px;
}
.custom-checkbox .custom-control-input:focus ~ .custom-control-indicator {
  box-shadow: none !important;
}
</style>
```

### おわりに

モバイルと相性が良さそうでいい感じですね。
ではよきスイッチ ON/OFF ライフを〜

### 参考

https://bootsnipp.com/snippets/gv6Pe
[ON/OFF スイッチを CSS のみで実装](https://webparts.cman.jp/button/onoff/)
