---
title: 「session deleted because of page crash」エラーの解決方法
tags:
  - RSpec
date: 2024-04-19
---

Rspecでテストを実行すると、以下のエラーが発生しました。

```bash
RSpec::Core::MultipleExceptionError: unknown error: session deleted because of page crash
from unknown error: cannot determine loading status
from tab crashed
  (Session info: headless chrome=117.0.5938.62)
```

### 解決策

Chromeブラウザを最新化すると解決しました。
