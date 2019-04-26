---
title: bitflyerでwebsocketに接続できない子羊たちへ
tags: [bot]
---

{% asset_img sheep.png %}

ようこそ、迷える子羊たちよ。
bitflyer の websocket が繋がらなくて困ってるのですね？

それともまだ
pip install websocket-client==0.47.0
で騙し騙しやってるのですか？

安心してください。
そんな隠れキリシタンみたいな生活も今日でおさらばです。

すぐ以下のツイートを見るのです。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr">横から失礼します。<br>websocket-clientは0.47以降ぐらいからWebSocketAppに渡すon_〜系の引数の数の定義が変更されてます。<br>最新版で動かす為には<br>on_〜系の引数wsを削除して、on_openのws.sendを<a href="https://t.co/vHT6LADVRo">https://t.co/vHT6LADVRo</a>.sendにすればOKです👌<br>(勿論バージョンを下げるだけでも動くと思います) <a href="https://t.co/lPy2xt6ouY">pic.twitter.com/lPy2xt6ouY</a></p>&mdash; まちゅけん@botter (@mtkn1btcfx) <a href="https://twitter.com/mtkn1btcfx/status/1095527646253862914?ref_src=twsrc%5Etfw">February 13, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">callbackからws外したら動いた。 <a href="https://t.co/3QIIVx59fm">pic.twitter.com/3QIIVx59fm</a></p>&mdash; arms22 (@arms22) <a href="https://twitter.com/arms22/status/1113776588233920512?ref_src=twsrc%5Etfw">April 4, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

はい。これで分かりましたね。
つまり`hoge(self, ws)`を`hoge(self)`に修正すれば OK なのです！
簡単ですね。

え？良く分からない？
仕方ないですね、それでは以下のツイートを見るのです！

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr">【追記】<br>上記のライブラリの書き換えは間違った方法でした。<br>0.47付近で ismethod==True の場合の引数が変更されているとのことでした。<br>websocket-client 0.56.0であれば以下のコードでbitflyer wsに接続できました。 <a href="https://t.co/NNtax4SbCB">pic.twitter.com/NNtax4SbCB</a></p>&mdash; grr / testbot (@GRRtestbot) <a href="https://twitter.com/GRRtestbot/status/1121803191757074432?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

はい、これコピーすれば動きます。

という訳で今すぐ最新バージョンにしましょう。

`pip install --upgrade websocket-client`

それではよき websocket ライフを！
