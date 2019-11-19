---
date: 2019-11-19
tags:
  - cordova
title: 【cordova】deviceready has not fired after 5 seconds.
---

{% asset_img cordova.jpeg %}

### はじめに

androidのcordova実行時にコンソールで
`deviceready has not fired after 5 seconds.`
というエラーになったので解決策をメモしておきます

<!-- more -->

### 解決策

index.htmlの中でcordova.jsを読み込んでいると思いますが、読み込む順番が大事です
以下のようにCDNを先に読み込んでしまうとエラーになります

```html
<body>
  <!-- 以下の順番が逆！ -->
  <script src="https://rootprojects.org/keypairs/bluecrypt-keypairs.min.js"></script>
  <script src="cordova.js"></script>
  
  <div id="app"></div>
</body>
```

以下のように先にcordova.jsを読み込む必要があります

```html
<body>
  <!-- これが正しい順番！ -->
  <script src="cordova.js"></script>
  <script src="https://rootprojects.org/keypairs/bluecrypt-keypairs.min.js"></script>
  
  <div id="app"></div>
</body>
```

### おわりに

初見殺し過ぎですね、、

以上です。
