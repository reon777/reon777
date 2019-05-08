---
title: liquid
date:
description:
tags:
---

{% asset_img sheep.png %}

序文

**作業環境**

- Mac Mojave10.14.4

## 章タイトル

全体的にドキュメントの質が低いです
例えばが間違っていたりが不足していたりしています

2. 板 → かなり遅延する。
3. ticker→ 板より遅い
4. best_ask/best_bid がよく逆転する（スリッページ設定した成行？）約定ログより前に板情報に現れる
5. レバレッジ取引するのにつまづく
   → おそらく leverage_level を api でしか変更できない謎仕様

6. ポジション個別に決済を求められる。（ドキュメント無し
   → デフォルトが両建てになってる。発注時 'order_direction' : 'netout'

liquid 初心者的感想 3 7.ログの絶対量が少ないから全体把握がしやすい
→ 板と約定みてるだけでなんとなくどんな bot が、いるか把握できる

8. 注文の通りは基本遅い。キャンセルはもっと遅い。
   →cancel のレスポンスが live になる時があるのが謎。必要に迫られたら調査

6:55 ～ 7:05 が定期メンテです。
https://quoinexjp.zendesk.com/hc/ja/articles/360020364951-%E3%83%A1%E3%83%B3%E3%83%86%E3%83%8A%E3%83%B3%E3%82%B9%E5%AE%9F%E6%96%BD%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B

ポジション管理料は、日本時間の午前 1 時、午前 9 時、午後 5 時のそれぞれの基準時を繰り越す度に支払いが生します
https://quoinexjp.zendesk.com/hc/ja/articles/360013294331-%E6%89%8B%E6%95%B0%E6%96%99%E4%B8%80%E8%A6%A7

画面は自動更新されない
→F5 する必要がある

nonce エラーになる
api キーを使いまわそう

https://twitter.com/Nickel_Mekki/status/1124890593778327552
