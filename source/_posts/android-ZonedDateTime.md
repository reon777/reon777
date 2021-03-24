---
title: 【Android開発】タイムゾーンを考慮した日付・時刻の取得方法
tags:
  - Android
date: 2021-03-24
---

タイムゾーンを考慮した日付・時刻の取得方法です。

```java
import org.threeten.bp.ZoneId;
import org.threeten.bp.ZonedDateTime;

// 現在時刻
ZonedDateTime now = ZonedDateTime.now();
// 任意の日付
ZonedDateTime target = ZonedDateTime.of(2021, 04, 01, 0, 0, 0, 0, ZoneId.systemDefault());
if (now.compareTo(target_date) < 0) {
  // targetが未来日付の場合はここに入る！
}
```
