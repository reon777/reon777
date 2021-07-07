---
title: 【JS】json内のデータの位置を並び替える方法
tags:
  - JavaScript
date: 2021-07-07 09:00:00
---

JavaScriptでjson内のデータの位置を並び替える方法です。

例えば
```json
{
  "1":"test1",
  "2":"test2",
  "3":"test3",
}
```

これを
```json
{
  "3":"test3",
  "1":"test1",
  "2":"test2",
}
```
にしたい時に使う方法です。

以下は"hoge"データを3番目に入れる例です。

```js
  let pairs = Object.entries(beforeJson);
  pairs.splice(3, 0, ["hoge", beforeJson["hoge"]]);
  afterJson = Object.fromEntries(pairs);
```

上にある通り、一度配列にしてから順番を入れ替え、その後にjsonに戻せばOKです。

以上です。
