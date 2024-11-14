---
title: 【Android】ビーコン受信時のクラッシュ対応
tags:
  - Android
date: 2024-11-14 15:00:00
---

### エラー内容

```
org.altbeacon.beacon.service.RangedBeacon.addMeasurement (RangedBeacon.java:79)
```

### 解決策

app/proguard-project.txtに以下を追加する

```
-keep class org.altbeacon.beacon.service.** { *; }
```

### 参考

https://github.com/AltBeacon/android-beacon-library/issues/1164

### その他

debugモードでビルドした時は再現できないので注意
releaseモードでビルドした時に再現する

