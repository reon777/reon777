---
title: liquidtapの使い方
date: 2019-04-28
tags:
---

{% asset_img liquid.png %}

手っ取り早く動くコード見せろやって人は以下のページ内リンクへどうぞ！
[動くコード へ](#動くコード)

以下、ほぼ蛇足です w

## はじめに

よし、Liquid bot を作るぞい！

普通に注文したりするのは ccxt 使えば良いと思うんだけど、せっかくならリアルタイムで情報が欲しいですよね

bitflyer なら websocket がありますが、Liquid の場合は pusher というのを使うらしい！なんじゃそれ！

てことで pusher の公式ページを見てみた
https://pusher.com/

{% asset_img pusher_en.png %}

英語分からんマンなので Chrome の拡張機能で日本語に変換

{% asset_img pusher_jp.png %}

＞当社のホスト型 pub / sub メッセージング API を使用して、スケーラブルなリアルタイムグラフ、ジオトラッキング、マルチプレイヤーゲームなどを Web アプリケーションやモバイルアプリケーションで簡単に構築できます。

うん、全然分からん w
分からない言葉を分からない言葉で説明するんじゃねええええええええええええ

## 公式サイトを見てみる

てことでもう何者か知らんけどとりあえず動けば良いんやろ！

てことで liquidtap の公式サイトをコピペじゃあああああああああああ

公式サイト
https://pypi.org/project/liquidtap/

```bash
pip3 install liquidtap
```

でインストールしてから以下を実行してみる

```python
import liquidtap
import time

def update_callback(data):
    print(data)

def on_connect(data):
    tap.pusher.subscribe("price_ladders_cash_btcjpy_buy").bind('updated', update_callback)


if __name__ == "__main__":
    tap = liquidtap.Client()
    tap.pusher.connection.bind('pusher:connection_established', on_connect)
    tap.pusher.connect()

    while True:
        time.sleep(1)
        print('a')

```

って動かねえええええええええええええ

いや、動くは動くんだけどひたすら a が表示されるだけのゴミ bot じゃねーか！
data が取得できないなあ

なぜだ、、

## 困った時のツイッタランド！

ってことで僕らの味方、ツイッターで検索すると良い感じのツイートが！

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr">💩ードです（合ってんのかな<br><br>最初繋がらんかったけど、websocket-clientのバージョン上げたら繋がった<br><br>pip install websocket-client==0.56.0 <a href="https://t.co/j7C4SOdsP3">pic.twitter.com/j7C4SOdsP3</a></p>&mdash; ゆうしゃのぴーちゃん(ああああ) (@AAAAisBraver) <a href="https://twitter.com/AAAAisBraver/status/1115955786381836288?ref_src=twsrc%5Etfw">April 10, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ふむ、websocket-client のバージョンとな！

早速バージョンアップ！
※バージョンアップでバグった時は以下の記事を参照しよう！
{% post_link websocket %}

```bash
pip install websocket-client==0.56.0
```

で、改めて実行すると！

```
[["580376.29881","0.00300000"],["580365.00000","0.20000000"],["580356.32000","0.01795637"],["580341.31408","0.00100000"],["580318.98000","0.00200000"],["580304.00000","0.52000013"],["580303.21000","0.24648366"],["580301.43008","0.04000000"],["580269.00005","0.03325812"],["580269.00003","0.03035871"],["580267.73327","0.20000000"],["580265.00000","1.00000013"],["580260.00000","0.01000000"],["580259.51089","0.03700000"],["580255.51067","0.00300000"],["580251.43008","0.00300000"],["580245.31408","0.00100000"],["580239.51045","0.00300000"],["580214.62736","0.02970827"],["580213.62732","0.22316665"],["580210.26634","0.00300000"],["580197.51089","0.00300000"],["580194.13317","0.00300000"],["580194.00000","0.10000000"],["580184.26634","0.00300000"],["580176.02178","0.00300000"],["580175.19834","0.00300000"],["580174.39667","0.00300000"],["580174.00000","2.00000013"],["580170.70922","0.00300000"],["580170.29000","0.10000000"],["580141.31288","0.11800000"],["580130.00000","0.04000000"],["580123.63553","0.00100000"],["580119.41924","0.02000000"],["580087.85090","0.00300000"],["580009.37006","0.00100000"],["580008.24898","0.00100000"],["580005.82573","0.00300000"],["580003.44000","0.10000000"]]
```

おおお！なんかそれっぽい！

勇者さんありがとおおおおおおおおおおお

## 動くコード

てことで改めて勇者さんのコードをコピペ
※user_id の部分はよく分からなかったので削除してます（いいのか？）

```python
import liquidtap
from time import sleep

token = ''
secret = ''

def update_callback(data):
    print(data)

tap = liquidtap.Client(token, secret)
tap.pusher.connect()
order_channel = tap.subscribe(f'user_account_jpy_orders')
btcjpy_channel_buy = tap.subscribe(f'price_ladders_cash_btcjpy_buy')
btcjpy_channel_sell = tap.subscribe(f'price_ladders_cash_btcjpy_sell')

order_channel.bind('updated', update_callback)
btcjpy_channel_buy.bind('updated', update_callback)
btcjpy_channel_sell.bind('updated', update_callback)

while True:
    sleep(1)
```

## 全パラメータを確認

色々取得していて何がなんやらってなったので１つずつ確認してみる

### user_account_jpy_orders

これは自分の注文かな？
動かしても何も取得できねえやん！とか思ったら注文してないからでした（あほ）

ってことで注文してみる

Web 画面を開いて 50 万円でビットコに買いを入れるとすぐに取得でけた！

```json
{
  "id": "1001592277",
  "order_type": "limit",
  "quantity": 0.001,
  "disc_quantity": 0,
  "iceberg_total_quantity": 0,
  "side": "buy",
  "filled_quantity": 0,
  "price": 500000,
  "created_at": 1556286190,
  "updated_at": 1556286190,
  "status": "live",
  "leverage_level": 2,
  "source_exchange": "QUOINE",
  "product_id": "5",
  "product_code": "CASH",
  "funding_currency": "JPY",
  "crypto_account_id": null,
  "currency_pair_code": "BTCJPY",
  "average_price": 0,
  "target": "open",
  "order_fee": 0,
  "source_action": "manual",
  "unwound_trade_id": null,
  "trade_id": null,
  "margin_used": 250,
  "margin_interest": 0.3,
  "unwound_trade_leverage_level": null
}
```

え、リアルタイムに自分の注文が取得できるのめっちゃ便利やな！  
bitflyer でもぜひ対応してくれ〜〜〜  
細かい項目の意味はおいおい調べるとしてとりあえず取得出来てるっぽくて何より！

で、改めて公式ページ見たら以下の情報が指定できるっぽいので全部試してみる

{% asset_img liquid_api_docs.png %}

### products

何も取得出来ねえ！
なんやこれ！
次！

### product*cash\_\${currency_pair_code}*\${product_id}

実際には以下で確認
product_cash_btcjpy_5

```json
{
  "id": 5,
  "product_type": "CurrencyPair",
  "code": "CASH",
  "name": " CASH Trading",
  "market_ask": "579793.81681",
  "market_bid": "579790.32352",
  "indicator": -1,
  "currency": "JPY",
  "currency_pair_code": "BTCJPY",
  "symbol": "¥",
  "btc_minimum_withdraw": null,
  "fiat_minimum_withdraw": null,
  "pusher_channel": "product_cash_btcjpy_5",
  "low_market_bid": "556698.01",
  "high_market_ask": "615854.47676",
  "volume_24h": "47843.830252959999999946",
  "last_price_24h": "610188.479",
  "last_traded_price": "579799.81685",
  "last_traded_quantity": "0.02",
  "quoted_currency": "JPY",
  "base_currency": "BTC",
  "disabled": false,
  "margin_enabled": false,
  "cfd_enabled": false,
  "last_event_timestamp": "1556286887.9128284"
}
```

bitflyer でいう ticker 的なやつかな？
ベスト価格は板見れば良いし直近約定価格は約定履歴見れば良いしでこいつの使わない気がするなあ
次！

### price_ladders*cash\_\${currency_pair_code}*\${side}

実際には以下で確認
price_ladders_cash_btcjpy_sell

```bash
[["579303.22650","0.21452064"],["579330.46153","0.00300000"],["579337.39267","0.00300000"],["579357.72496","0.05000000"],["579387.99996","0.02259079"],["579388.99993","0.03055928"],["579410.98997","0.00100000"],["579411.00000","0.50000013"],["579412.00000","0.02000000"],["579415.36994","0.05070166"],["579416.37000","0.10000000"],["579427.44364","0.10000000"],["579443.00000","0.15220000"],["579444.00025","0.00100000"],["579446.00000","1.10000013"],["579455.99000","0.00100000"],["579457.00000","0.04000000"],["579467.00000","0.12100000"],["579478.00000","1.00000000"],["579482.50120","0.10900000"],["579483.00000","2.00000013"],["579490.00000","0.01000000"],["579494.00000","0.14780000"],["579495.46000","0.07170000"],["579506.82961","0.10000000"],["579520.76538","0.10000000"],["579526.28753","0.00100000"],["579575.75000","0.10000000"],["579581.08084","0.00100000"],["579582.39980","0.11000000"],["579598.00000","0.00100000"],["579601.25999","0.00300000"],["579611.00000","4.02000000"],["579620.00000","0.29380000"],["579637.23244","0.00100000"],["579643.23250","0.00100000"],["579654.00000","4.00000013"],["579663.62000","0.00100000"],["579670.66887","0.00300000"],["579687.77987","0.00500000"]]
```

これは買い板かな
sell なのに買い板なんだね
なんとなく違和感あるけど bitflyer もそんな感じなのでそういうもんなのかな

それは良いけどちょっと待って、たった 40 個しかないんだが！？
bitflyer でも 300 はあるよ！？
たった 40 個でどうしろと。。
こりゃ板は rest api 使う方が良いかもな〜
次！

### executions_cash\_\${currency_pair_code}

実際には以下で確認
executions_cash_btcjpy

うーん、何も取得出来ない、、
なんか ドキュメントみると Event の欄が create になってるからそれが関係してそうだけど良く分からず、、
まあ良いやっ

と思ったけどなんかビビッときて

```python
products.bind('created', update_callback)
```

を追加したら取得出来た！
多分どっかに書いてあるんだろうけど w

```json
{
  "id": 113605850,
  "quantity": "0.002",
  "price": "579217.88127",
  "taker_side": "buy",
  "created_at": 1556287572
}
```

約定ですね！
良い感じ！
次！

### execution_details_cash_btcusd

```json
{
  "id": 113604780,
  "quantity": "0.04857758",
  "price": "5194.06392",
  "taker_side": "buy",
  "created_at": 1556287255,
  "buy_order_id": 1001625505,
  "sell_order_id": 1001625251
}
```

お、こっちは注文 id があるのね
ってことはこっちの方が上位互換では？
executions_cash_btcjpy の方を使うメリットはあるのだろうか。。？

てことでここまではパブリックなので実はトークンとかなくても取得できるやつで、ここからがプライベート！
自分の情報だけ！

### user_account\_\${funding_currency}\_trades

実際には以下で確認
user_account_jpy_trades

注文入れても約定しても反応しない！なんだこれ！
アカウントってあるし入金とかそんな感じかな？
とりあえず使わなそうなのでスルー

・・・と書いたところで情報来た！

```json
{
  "id": 23135695,
  "currency_pair_code": "BTCJPY",
  "status": "open",
  "side": "long",
  "margin_used": 289.29876,
  "open_quantity": 0.001,
  "close_quantity": 0.0,
  "quantity": 0.001,
  "leverage_level": 2,
  "product_code": "CASH",
  "product_id": 5,
  "open_price": 578597.5252,
  "close_price": 578587.5252,
  "trader_id": 72395,
  "open_pnl": -0.01,
  "close_pnl": 0.0,
  "pnl": -0.01,
  "stop_loss": 0.0,
  "take_profit": 0.0,
  "funding_currency": "JPY",
  "total_interest": 0.0,
  "created_at": 1556287837,
  "updated_at": 1556287837,
  "total_fee": 0.0,
  "close_fee": 0.0
}
```

普通に注文情報って感じかな？
他との違いは何だろう？
てか全然リアルタイムじゃねえ！

### user_executions_cash\_\${currency_pair_code}

実際には以下で確認
user_executions_cash_btcjpy

ちなみにこれなんか変だと思ったら公式ドキュメント、`user_`付け忘れてる w

{% asset_img liquid_api_docs_user.png %}

かわいいなあ全く

```json
{
  "id": 113609417,
  "quantity": "0.001",
  "price": "578868.0",
  "taker_side": "buy",
  "created_at": 1556288465,
  "my_side": "buy",
  "pnl": null,
  "order_id": 1001662778,
  "target": "new"
}
```

お、これめっちゃ来るの早かった
なんなら Web 画面に反映されるより早かった
良いね！

## おわりに

てことでこれで全部っぽいね！

あとはこれをスレッドで回したり list に入れて push/pop したりする感じか〜
誰かライブラリ作ってくれええええええええ

いや、俺か？
俺が作るのか？？？

てことで疎通確認もできたのでこれから bot に組み込みます〜
ライブラリっぽくできたら公開しよかな

ではでは〜
