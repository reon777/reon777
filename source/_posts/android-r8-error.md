---
title: 【Android】ProGuardからR8に変更したらアプリが落ちるようになった原因と解決策
tags:
  - Android
date: 2021-2-18
---

### 事象

ProGuard から R8 に乗り換えた後、アプリをビルドして起動したところ、
いくつかの画面がクラッシュしてアプリが落ちる不具合が発生しました

### 原因

GSON を利用していた場合、文字列をそのまま利用する必要があるが、難読化されてしまったため

### 解決策

proguard-project.txt に以下のコードを追加する

```
### for Gson in R8
-keepclassmembers,allowobfuscation class * {
  @com.google.gson.annotations.SerializedName <fields>;
}
-keep,allowobfuscation @interface com.google.gson.annotations.SerializedName
```

これ結構重要なところなのに情報が少なすぎてビビる、、
Android 開発の情報もっと増えてくれ〜

### 参考

[R8 互換性 FAQ](https://r8.googlesource.com/r8/+/refs/heads/master/compatibility-faq.md)
