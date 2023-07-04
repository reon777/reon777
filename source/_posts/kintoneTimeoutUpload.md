---
title: 【kintone】プラグインアップロード時のタイムアウトエラー
tags:
  - kintone
date: 2023-07-4
---

`kintone-plugin-uploader`コマンド実行時に以下のエラーが出ました。

>エラーが発生しました TimeoutError: Waiting for selector `.ocean-ui-dialog` failed: Waiting failed: 60000ms exceeded

原因はplugin.zipの指定方法が間違ってました。

以下の通りに修正したらうまくいきました。

```bash
# 修正前
kintone-plugin-uploader plugin.zip
# 修正後
kintone-plugin-uploader dist/plugin.zip
```
言われてみればそうなのですが、エラーからは読み取りにくくて苦戦しました。。
