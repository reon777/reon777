---
title: bitflyerのDBメンテナンス時間判定(python)
date: 2019-05-04
description:
tags: [bot, bitflyer, python]
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">毎週土曜日の午前 2 時～午前 11 時頃にデータベースのバックアップ作業を実施しております。作業中は複数回、数十秒にわたり通常よりも注文処理が遅れる可能性がございます。ご不便をおかけいたしますが、何卒よろしくお願いいたします。 <br>※ 作業時間は前後する可能性がございます。</p>&mdash; bitFlyer（ビットフライヤー） (@bitFlyer) <a href="https://twitter.com/bitFlyer/status/1119187130473783296?ref_src=twsrc%5Etfw">April 19, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

上記の通り bitflyer は土曜日の午前２時〜１１時頃まで DB メンテナンスを行っており、この間は処理が遅れることを公式に発表しています。

実際、4/27(土)のデータは以下の通りで、数十秒の遅延が多発しています。

{% asset_img delay.png %}

という訳で DB メンテナンス時間の判定を行う関数を書きました。
大した処理ではないですが誰かのググる時間を１秒でも短くできれば幸いです。
...

<!-- more -->

```python
from datetime import datetime
def is_under_maintenance_db(self):
    # 5が土曜日
    if datetime.today().weekday() == 5:
        hour = datetime.now().hour
        if 2 <= hour and hour < 11:
            return True

    return False
```

それではよき bot ライフを。

以上です。
