---
date: 2019-10-28
tags:
  - Cordova
title: 【cordova】iPhone X レイアウト対応
---

{% asset_img cordova.jpeg %}

### はじめに

デフォルトだと iPhone X だと上下に変な空白が出るのでその修正方法です

<!-- more -->

### 修正１（上下の白い余白を削除する）

index.html に以下の meta タグを追加する

```html
<head>
  <!-- for Iphone X -->
  <meta
    name="viewport"
    content="initial-scale=1, width=device-width, height=device-height, viewport-fit=cover"
  />
</head>
```

ちなみに僕はここで無駄にめちゃくちゃハマって数日無駄にしてしまったのですが、もしすでに
`<meta name="viewport" content="width=device-width,initial-scale=1.0" />`
の記述がすでに inde.html に存在している場合はちゃんと削除して追加（＝上書き）してください。
僕はその存在に気付かずにただ単に追加してしまい、うまく追加が効かなくてひたすらハマりました、、

### 修正２（まだ残っている余白を削除する）

以下の設定を行うことでスプラッシュスクリーンだけでなく、通常の画面についてもフルスクリーンになる

[スプラッシュスクリーンの設定方法](/2019/09/06/cordova-plugin-splashscreen/)

### 修正３（重なりを避ける）

そのままだとフルスクリーンになりすぎて上下で画面の端が見切れてしまうので以下の対応を行い、見切れないようにする

css に以下を追加する

```css
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
```

### 参考

https://blog.phonegap.com/displaying-a-phonegap-app-correctly-on-the-iphone-x-c4a85664c493

### おわりに

以上です。
