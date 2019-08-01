---
date: 2019-07-31
tags:
  - bot
title: JavaScriptでC言語(C++)のプログラムを動かす
---

{% asset_img Emscripten.png %}

### はじめに

JavaScript で C 言語を動かす方法で丸 1 日ハマって泣きそうになったので
やり方をメモしておきます。

<!-- more -->

C 言語のプログラムを JS で動くようにするには [wasm という形式にコンパイルする](https://qiita.com/umamichi/items/c62d18b7ed81fdba63c2)必要があります。
この方法には以下の２種類あります。

1. 自分でコンパイルする
2. Emscripten ツールを利用する

今回は 2 で行います
（他の記事だと結構 1 が多いですが手順が複雑で私には無理でした、、

## 環境

- Mac Mojave: 10.14.4

## emscripten SDK をインストールする

以下の手順通りに行えばできました
https://emscripten.org/docs/getting_started/downloads.html

## C 言語プログラムを作成する

上の手順で作成した`emsdk`フォルダと並列の場所に`hello_world.cpp`を作成する

```c
#include <stdio.h>

int main()
{
  printf("hello, world!\n");
  return 0;
}

extern "C" int myFunc(int a)
{
  printf("hello, %d, from_cpp!\n", a);
  return 0;
}
```

## html と js を作成する

`emsdk`フォルダと`hello_world.cpp`ファイルがあるフォルダで、以下のコマンドを実行する

```bash
./emsdk/fastcomp/emscripten/emcc -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']" -s EXPORTED_FUNCTIONS="['_main', '_myFunc']" ./hello_world.cpp -o hello_world.html
```

以下の３つのファイルが作成される

- hello_world.html
- hello_world.js
- hello_world.wasm

## hello_world.html を修正する

以下の通り`do_myFunc`関数を追加する

```html
<!-- 省略 -->
<script type="text/javascript">
  // 省略
  var Module = {
    // これを追加する
    do_myFunc: function() {
      console.log('start do_myFunc from html')
      do_myFunc_from_js()
    },
    preRun: []
    // 省略
  }
  // 省略
</script>
<!-- 省略 -->
```

以下の通り`do_myFunc`ボタンを追加する

```html
<!-- 省略 -->
<div class="emscripten_border">
  <!-- 省略 -->
</div>
<textarea id="output" rows="8"></textarea>

<!-- これを追加する -->
<div>
  <input type="button" value="do_myFunc" onclick="Module.do_myFunc()" />
</div>

<script type="text/javascript">
  // 省略
</script>
<!-- 省略 -->
```

## hello_world.js を修正する

```js
// 省略
var runtimeExited = false;

// これを追加する
function do_myFunc_from_js () {
  console.log('start do_myFunc_from_js')
  var result = Module.ccall('myFunc', // name of C function
    'number', // return type
    ['number'], // argument types
    [28]); // arguments
  console.log('result: ' + result)
}

function preRun() {
// 省略
```

## 実行する

Web サーバを起動して hello_world.html をブラウザで表示して do_test ボタンを押すと`hello_world.cpp`で書いた`myFunc`関数が実行される！

{% asset_img 2019-07-31.png %}

## エラー

たまに以下のエラーが出ます

```bash
WebAssembly.Memory(): could not allocate memory
```

エラーが出たら開発者用コンソールを閉じてから画面を更新すると治ります

参考
https://github.com/emscripten-core/emscripten/issues/8126

### おわりに

公式サンプルだと main 関数しかなくて自作関数の実行方法が載ってなくて辛かったです。
何回も諦めかけたけどなんとかできてよかった、、

ではでは。
