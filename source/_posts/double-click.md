---
title: JavaScriptでのダブルクリック処理の実装方法
tags:
  - JavaScript
date: 2020-03-09 10:00:00
---

### コード

```js
data: {
  delay: 500,
  clicks: 0,
  timer: null
},
```

```js
click_one(){
  this.clicks++
  if(this.clicks === 1) {
    var self = this
    this.timer = setTimeout(function() {
      // ここにシングルクリック書処理
      self.clicks = 0
    }, this.delay);
  } else{
    clearTimeout(this.timer);
    // ここにダブルクリックの処理
    this.clicks = 0;
  }
},
```

### 参考

https://stackoverflow.com/questions/41303982/vue-js-how-to-handle-click-and-dblclick-events-on-same-element/56046910
