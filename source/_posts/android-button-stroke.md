---
title: Androidのボタンに枠線を付ける方法
tags:
  - Android
date: 2022-06-10 10:00:00
---

Androidのボタンに枠線を付ける方法です。
OutlinedButtonを使えば簡単なのですが、そこに気付かずにハマってしまいました。。

hoge.xml

```xml
<com.google.android.material.button.MaterialButton
    android:id="@+id/hoge"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    style="@style/HogeButton" />

```

styles.xml

```xml
  <style name="HogeButton" parent="Widget.Material3.Button.OutlinedButton">
      <item name="android:layout_marginLeft">7dp</item>
      <item name="android:layout_marginRight">7dp</item>
      <item name="android:paddingTop">17dp</item>
      <item name="android:paddingBottom">17dp</item>
      <item name="android:textSize">18sp</item>
      <item name="android:textStyle">bold</item>
      <item name="cornerRadius">3dp</item>
      <item name="strokeWidth">2dp</item>
      <item name="strokeColor">#EDA844</item>
  </style>
```
