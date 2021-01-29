---
title: フォームボタンを連打したら多重送信されてしまうバグを防ぐ方法
tags:
  - JavaScript
date: 2020-12-7
---

![](/images/ムーミン1.jpg)

フォームボタンを連打したら多重送信されてしまうバグを防ぐ方法です。

```
$('form').submit(function() {
    $('input[name="submit"]').prop('disabled', true);
})
```
