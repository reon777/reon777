---
date: 2019-10-28
tags:
  - cordova
title: 【cordova】iPhone X レイアウト対応
---

{% asset_img bitcoin.png %}

### はじめに

デフォルトだと iPhone X だと上下に変な空白が出るのでその修正方法です

<!-- more -->

### 修正１

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

### 修正２

plist ファイルに以下を追加する

```
	<key>UILaunchStoryboardName</key>
	<string>CDVLaunchScreen</string>
```

### 修正３

css に以下を追加する

```css
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
```

### 修正４

以下の設定を行う

[スプラッシュスクリーンの設定方法](/2019/09/06/cordova-plugin-splashscreen/)

### おわりに

以上です。
