---
title: Liquidハマりポイントまとめ
date: 2020-06-01 10:00:00
---

[公式ドキュメント](https://developers.liquid.com/#introduction)

-  best_ask/best_bid がよく逆転する（スリッページ設定した成行？）

-  レバレッジ取引するのにつまづく
   → おそらく leverage_level を api でしか変更できない謎仕様

-  ポジション個別に決済を求められる。（ドキュメント無し
   → デフォルトが両建てになってる。発注時 'order_direction' : 'netout'

-  注文の通りは基本遅い。キャンセルはもっと遅い。
   →cancel のレスポンスが live になる時があるのが謎。必要に迫られたら調査

6:55 ～ 7:05 が定期メンテです。
[定期メンテナンスについて](https://quoinexjp.zendesk.com/hc/ja/articles/360037709852-%E5%AE%9A%E6%9C%9F%E3%83%A1%E3%83%B3%E3%83%86%E3%83%8A%E3%83%B3%E3%82%B9%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

ポジション管理料は、日本時間の午前 1 時、午前 9 時、午後 5 時のそれぞれの基準時を繰り越す度に0.1%を3分割の金額の支払いが生します
[手数料一覧](https://quoinexjp.zendesk.com/hc/ja/articles/360031264131-%E6%89%8B%E6%95%B0%E6%96%99%E4%B8%80%E8%A6%A7)

画面は自動更新されない
→F5 する必要がある

nonce エラーになる
→api キーを使いまわそう
