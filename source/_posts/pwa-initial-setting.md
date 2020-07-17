---
date: 2019-06-16
tags:
  - PWA
title: pwaの導入方法(ios, android)
---

基本的にはこれで OK
[PWA 導入までの 3 ステップと、簡単なオフライン対応まで](https://qiita.com/yshrkn/items/519cc58cb54e0f7f61ae)
なんだけど実はこれだけだと ios だとアイコンが反映されない

なので解決策として index.html に以下の行を追加すれば OK

```html
<link rel="manifest" href="manifest.webmanifest" />
<!-- include PWACompat _after_ your manifest -->
<script
  async
  src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js"
  integrity="sha384-VcI6S+HIsE80FVM1jgbd6WDFhzKYA0PecD/LcIyMQpT4fMJdijBh0I7Iblaacawc"
  crossorigin="anonymous"
></script>
```

なんか google 様が ios 用にいい感じに色々してくれてるらしい。
神かよ

あとアイコン画像は１枚用意すれば後は
[Web App Manifest Generator](https://app-manifest.firebaseapp.com/)
で複数サイズ一気に作成できるから便利

参考
[初心者がつまづいた、PWA アプリ Safari 版でホームボタンのアイコンが読み込まれない件](https://qiita.com/bonkeenu/items/0c8766e5f3e94c0e68c9)
[PWACompat: the Web App Manifest for all browsers](https://developers.google.com/web/updates/2018/07/pwacompat)

以上
