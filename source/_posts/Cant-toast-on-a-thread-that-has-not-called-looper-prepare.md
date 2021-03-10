---
title: Can’t toast on a thread that has not called looper.prepare()エラーの解決策
tags:
  - Android
date: 2021-3-9
---

表題のエラーの解決策です。

原因としては、本来Toastはメインスレッドでのみ実行できる仕様ですが、サブスレッドで実行してしまっていることです。

解決策はHandlerを使ってメインスレッドで実行するように変更すればOKです。
以下、具体例です。

### 修正前

```java
ExecutorService executor = Executors.newSingleThreadExecutor();
executor.execute(() -> {
  Toast.makeText(getContext(), "エラーメッセージ", Toast.LENGTH_LONG).show()
});
```

### 修正前

```java
final Handler handler = new Handler();
ExecutorService executor = Executors.newSingleThreadExecutor();
executor.execute(() -> {
  handler.post(() -> {
    Toast.makeText(getContext(), "エラーメッセージ", Toast.LENGTH_LONG).show()
  });
});
```

`handler.post`の処理は`new Handler()`したスレッドで実行されるので`new Handler()`はメインスレッドで実行する必要があります！

Android開発は非同期処理が鬼門ですよね、、

おわり
