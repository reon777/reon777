---
title: bitflyerのDBメンテナンス時刻判定(python)
date:
description:
tags: [bot, bitflyer, python]
---

{% asset_img bf.png %}

上の画像の通り bitflyer は土曜日の午前２時〜１１時頃まで DB メンテナンスを行っており、この間は処理が遅れることを公式に発表しています。

実際、4/27(土)のデータは以下の通りで、数十秒の遅延が多発しています。

{% asset_img delay.png %}

という訳で DB メンテナンス時間の判定を行う関数を書きました。
大した処理ではないですが誰かのググる時間を１秒でも短くできれば幸いです。

```python
from datetime import datetime
def is_under_maintenance_db(self):
    # 5が土曜日
    if datetime.today().weekday() == 5:
        hour = datetime.now().hour
        if 2 <= hour and hour <= 11:
            return True

    return False
```

それではよき bot ライフを。

以上です。
