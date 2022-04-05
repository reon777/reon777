---
title: 【plantUML】VSCodeでのエクスポート設定を変更する
date: 2022-04-05 09:00:00
---

plantUMLをVSCodeでエクスポートすると変なフォルダに作成されちゃいました。
以下の設定にするとpuフォルダと同じ所に作成されて良い感じになりました。

```json
  "plantuml.exportOutDir": ".",
  "plantuml.exportFormat": "png",
  "plantuml.exportSubFolder": false,
```

ちなみにファイル名はpuファイルのファイル名ではなく、1行目の`@startuml hoge`の部分が使われますのでご注意を。
