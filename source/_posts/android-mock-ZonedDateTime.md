---
title: 【Android】ZonedDateTime型のモック
tags:
  - Android
date: 2022-07-13 09:00:00
---

ZonedDateTime型のモックの作成方法

```kotlin
import org.threeten.bp.ZonedDateTime

every { user.contractedAt } returns ZonedDateTime.parse("2022-07-13T09:00:00Z")
```

以上

---

余談だが、最初は以下のような書き方をしようとして、

```kotlin
every { user.contractedAt } returns ZonedDateTime.of(2022, 7, 13, 0, 0, 0, 0, ZoneId.of("Asia/Tokyo"));
```

`io.mockk.MockKException: no answer found for: ZoneId`のエラーが出て詰んだ。
