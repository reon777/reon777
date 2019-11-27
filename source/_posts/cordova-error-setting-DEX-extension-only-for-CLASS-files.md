---
tags:
  - Cordova
title: 【Cordova】setting .DEX extension only for .CLASS files【エラー】
date: 2019-11-27
---

{% asset_img cordova.jpeg %}

### はじめに

CordovaプロジェクトでAndroidのビルド時に表題のエラーになったので解決策をメモしておきます

### エラー内容

setting .DEX extension only for .CLASS files

#### 解決策

```bash
cordova clean
```

シンプルですね
