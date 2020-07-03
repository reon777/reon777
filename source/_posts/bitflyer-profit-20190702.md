---
title: 【bitFlyer】2019年6月のbot成績【損益公開】
tags:
  - bot
  - bitflyer
  - 損益公開
date: 2019-07-02
---

## はじめに

久しぶりのブログ更新です！
ブログは気付けば忘れちゃうのでもうちっちゃいことでいいから毎日書くとかしてなんとか習慣付けないといけないなあと思っている今日この頃です

少し遅くなりましたが６月の損益を公開します！

# ６月の損益

どうぞ！

{% asset_img 20190630_235801_Discord_ChartWithValue_M.png %}

どーん！

・・・ネッシーかな？

<!-- more -->

はい、220 万円です。
意味不明です。
もはやバグです。

何が起きたかっていうと、SFD 様が降臨した訳ですね。

もうすごい。
入れ食い。

脳汁がすごい。
これ現実？夢？何これ？って感じです。

いやー、SFD は確かこれで３回目ですかね。
毎回参加してて全然勝てなくて、爆益の人とかを指くわえて見てていいな〜って思ってたので嬉しいです！
決め手は何だろう、やっぱり泥臭く原因分析したことだと思います。

SFD 払っちゃった時はなんで払っちゃったのかを約定履歴とにらめっこして徹底的に調べる
受け取れなかった時も同じ

それで１つ１つ地道に修正していったらある時急に覚醒した感じです。

皆さんも頑張ってください＾＾（上から目線）

# 試行錯誤

せっかくなので自分のツイートで SFD 検索して見ました

2018 年 2 月

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">私はSFD botはもう止めます。<br><br>14.9%で買い注文しても約定時には15%超えてるんで、もう無理です。<br><br>SFDで稼いでる人すごいです。 <a href="https://t.co/0O74bgBHhm">pic.twitter.com/0O74bgBHhm</a></p>&mdash; reon777 (@reo3313) <a href="https://twitter.com/reo3313/status/966837386763124737?ref_src=twsrc%5Etfw">2018年2月23日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">SFD botも止めたしいなご botも止めたしでもうやることなくて暇になってしまった<br><br>裁定 botは動かしてるけどもう特にメンテナンス不要だし<br><br>明日から真面目にコツコツJPYマイニングしていくしかないのか<br><br>なんか儲かるロジックないかなあ</p>&mdash; reon777 (@reo3313) <a href="https://twitter.com/reo3313/status/967761550667759616?ref_src=twsrc%5Etfw">2018年2月25日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

完全に諦めとる www
っていうか 15%ってすげーな
SFD とかじゃなくて FX 売りの現物買いで乖離縮小でウハウハじゃないですか。
これから１年半後にこんな復活劇を見せるとか本人が一番びっくりだ
コツコツ諦めない事だなあ

上のツイートから５ヶ月後
2018 年７月

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">SFD全然取れなくなったどころかむしろ取られるようになってしまったのでbot停止させました。、<br>4.9%のところの買い指値でなんで取られるんだろ<br>5%よりだいぶ上に指しても貰えないし<br><br>多分、ある程度取られることを恐れずに取っていった方がいいんだろなあ<br>多少取られてもそれ以上に取り返せばok的な</p>&mdash; reon777 (@reo3313) <a href="https://twitter.com/reo3313/status/1022338895147483137?ref_src=twsrc%5Etfw">2018年7月26日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

また諦めてる www

上のツイートから１０ヶ月後
2019 年 5 月

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/sfd?src=hash&amp;ref_src=twsrc%5Etfw">#sfd</a><br>SFD bot むず！無理！寝る！<br><br>APIリミットよりも、前回と比べて現物の価格変化が早すぎて追えない！</p>&mdash; reon777 (@reo3313) <a href="https://twitter.com/reo3313/status/1127969925748801536?ref_src=twsrc%5Etfw">2019年5月13日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

どんだけ諦めてるんだコイツ www

# おわりに

いやー、けどその日は諦めるんですけど次の日になるとまたやりたくなるんですよね。。
そうやって文字通り七転び八起きでやった結果だと思います。

多分 SFD bot の開発時間もかなり長い方だと思います。

よく頑張った俺！

# 年次

あ、ちなみに年次も一応公開しておこうかな

{% asset_img 20190630_235801_Discord_ChartWithValue_Y.png %}

はい、もう月次と一緒ですね。
今までの苦労がほとんど見えなくなって虚無感がすごいです
