---
date: 2019-09-06
tags:
  - cordova
title: 【cordova-plugin-splashscreen】スプラッシュスクリーンの設定方法
---

{% asset_img images.jpeg %}

### はじめに

cordova-plugin-splashscreen プラグインを利用したスプラッシュスクリーンの設定方法をメモしておきます。
プラグインを使うことで全ての画面サイズに自動的に対応してくれるので便利です
これまで手動対応してましたが iPhone XR でレイアウトがズレてて追加するのが面倒だったのでプラグインにしたらすごく楽になりました

<!-- more -->

### 利用プラグイン

https://www.npmjs.com/package/cordova-plugin-splashscreen

### インストール

```bash
cordova plugin add cordova-plugin-splashscreen
```

### 画像配置

src-cordova/res/screen フォルダに以下の６つのスプラッシュ画像を置く

| no  | 横サイズ | 縦サイズ | ファイル名                      |
| --- | -------- | -------- | ------------------------------- |
| 1   | 2732     | 2732     | Default@2x~universal~anyany.png |
| 2   | 1278     | 2732     | Default@2x~universal~comany.png |
| 3   | 1334     | 750      | Default@2x~universal~comcom.png |
| 4   | 2208     | 2208     | Default@3x~universal~anyany.png |
| 5   | 2208     | 1242     | Default@3x~universal~anycom.png |
| 6   | 1242     | 2208     | Default@3x~universal~comany.png |

### ファイル読み込み設定

config.xml に以下を追加

```xml
<widget>
    <splash src="res/screen/Default@2x~universal~anyany.png" />
    <splash src="res/screen/Default@2x~universal~comany.png" />
    <splash src="res/screen/Default@2x~universal~comcom.png" />
    <splash src="res/screen/Default@3x~universal~anyany.png" />
    <splash src="res/screen/Default@3x~universal~anycom.png" />
    <splash src="res/screen/Default@3x~universal~comany.png" />
</widget>
```

あとは普通にビルドしたら自動的にいい感じの画像サイズが適用されてます

以上です。
