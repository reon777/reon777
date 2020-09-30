---
title: VSCode で複数行に跨がる文字列を検索したいとき
date: 2020-09-30
---

例えば以下のような状態で appole と orange が含まれる箇所を検索したい場合など

hoge hoge apple hogehoge
ダミー行
ダミー行
hoge orange hogehoge

以下のように指定すれば OK
入力欄の右端にある正規表現チェックにチェックするのを忘れずに

```bash
apple
*[\s\S]*?orange
```
