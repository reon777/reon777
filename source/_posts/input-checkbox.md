---
title: 【ラベルあり】inputタグのcheckboxで複数項目を配列で送信する方法
date: 2020-07-15
---

![](/images/ムーミン1.jpg)

input タグの checkbox で複数項目を配列で送信する方法です
大した内容じゃないけどラベル付きのサンプルがなくて微妙にハマったので一応メモ
たまにしか使わないから使い方忘れちゃうんですよね、、

```html
<div class="form-group">
  <div>ジャンル</div>
  <input type="checkbox" id="option1" name="genre[]" value="ジャンル１" /><label for="option1"> ジャンル１</label>
  <input type="checkbox" id="option2" name="genre[]" value="ジャンル２" /><label for="option2"> ジャンル２</label>
</div>
```
