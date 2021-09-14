---
title: Android Studioでアイコン画像を追加する
tags:
  - Android
date: 2021-04-22
---

※これはアプリ内に設置するアイコン画像の話です！
アプリ自体のアイコンの話ではないので注意！

### 画像を追加する

Android Studio > リソース・マネージャー（左のタブにあります）＞「＋」アイコン＞ベクターアセット＞クリップアート
から追加したいアイコン画像を選ぶ

自分の環境だと
色：FFFFF
透明度：100%
にするといい感じになった

例えばnotifications アイコンを選択した場合、
`res/drawable/ic_baseline_notifications_24.xml`ファイルが作成される

### 画像を利用する

```xml
<hoge.view.AppCompatImageView
    android:id="@+id/hoge"
    android:layout_marginTop="2dp"
    android:src="@drawable/ic_baseline_notifications_24" />
```

公式のアイコン、結構数が多くてありがたいですね。
