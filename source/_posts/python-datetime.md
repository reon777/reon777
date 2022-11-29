---
title: 【Python】datetime変換まとめ
tags:
  - Python
date: 2021-12-24 09:00:00
---

## はじめに

pythonとかpandasのdatetime変換でいつもハマるので
変換方法をメモしておきます。

### 文字列からdatetimeに変換

```python
from datetime import datetime

date_time_str = '2021-12-24T01:02:03.123456Z'
date_time_format = '%Y-%m-%dT%H:%M:%S.%fZ'

date_time_obj = datetime.strptime(date_time_str, date_time_format)

# The type of the date is now <class 'datetime.datetime'>
print("The type of the date is now",  type(date_time_obj))
# The date is 2021-12-24 01:02:03.123456
print("The date is", date_time_obj) 
```
