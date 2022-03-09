---
title: 【Android開発】ImageViewをDataBindingする方法【Kotlin】
tags:
  - Android
date: 2022-03-09 09:00:00
---

![](/images/ムーミン1.jpg)

ImageVIewにDataBindingする方法です。

まずはレイアウトファイル
hoge.xml

```xml
<ImageView
    android:id="@+id/icon_menu"/>
```

次にFragment or Activityファイル
hoge.kt

```kotlin
binding.iconMenu.setImageResource(R.drawable.ic_action_hoge)
```

以上。

めちゃくちゃハマったけど最終的にシンプルに書けば良いだけだった。。
ググると複雑なやり方が出てくるのはどういうアレなんだろう。
これが正式なやり方じゃないかもだけど、とりあえず動いたので良かった。
