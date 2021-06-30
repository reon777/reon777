---
title: 【Android】Espressoに関するメモ
tags:
  - Android
date: 2021-06-30 09:00:00
---

![](/images/ムーミン1.jpg)

## はじめに

<!-- more -->

## 目次

<!-- toc -->

### Espresso Test Recorder

手動で画面を操作した記録をテストコードに変換してくれる
ただ自分の環境だとメニューに表示がなくてできなかった、、

### レイアウトインスペクタ

Espresso では TextView などの id を指定する必要がある。
対象の id を調べるための代表的なレイアウトインスペクタは次の３つ
自分は 1 の Layout Inspector で必要十分だったので下２つは触ってない。
ちなみに Layout Inspector はデバッグ実行していたら表示されないので注意

1. Android Studio 付属の Layout Inspector
2. uiautomatorviewer
3. Appium Desktop

### 非同期処理の待ち合わせについて

AsyncTask は自動的 に完了を待ってくれるが、それ以外（Executor など）の非同期処理は完了を待ってくれない。

#### 方法１：`Thread.sleep()`

一番簡単だけど本当に待っている間に非同期処理が完了するかどうかは不安定。。

#### 方法 2：`自作コード`

簡単で便利なので自分はこれ使ってる。

view が表示されるまで待つ
ただしスクロールが必要な場合は事前にスクロールしておくこと。
`Espresso.onView(withId(R.id.hoge)).perform(scrollTo())`

```kotlin
public static void waitUntilVisible(String resId) {
    UiDevice device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
    boolean waitSuccess = device.wait(Until.hasObject(By.res(BuildConfig.APPLICATION_ID  + ":id/" + resId))), 50_000);
    if (!waitSuccess) throw new RuntimeException(resId + "のViewが表示されないエラー");
}
```

#### 方法 3：IdlingResource

ググるとこれの紹介が多い。
けどまだ使ったことない。

#### 方法 4：CountingIdlingResource

けどまだ使ったことない。

#### 方法 5：UI Automator の wait()メソッド

ググるとこれの紹介が多い。
けどまだ使ったことない。

### context にアクセス

```kotlin
val context = InstrumentationRegistry.getInstrumentation().context
```

### ListView の中の１データをテストターゲットにしたい場合

```kotlin
Espresso.onData(anything())
        .inAdapterView(withId(R.id.list))
        .atPosition(0)
        .onChildView(withId(R.id.hoge))
        .check(matches(not(isDisplayed())));
```

余談ですが、最初 inAdapterView をつけ忘れてて以下のエラーが出てました、、
```Error performing 'load adapter data' on view 'is assignable from class: class android.widget.AdapterView'.`
