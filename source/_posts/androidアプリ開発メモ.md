---
title: 【Android】アプリ開発メモ
tags:
  - Android
date: 2021-06-30 10:00
---

![](/images/ムーミン1.jpg)

### レイアウトとアクティビティ

画面はレイアウトと呼ぶ
web でいう html と css の部分
xml ファイル
配置してあるパスは以下（例）
/app/src/main/res/layout/activity_main.xml
レイアウトの中のテキストやボタンなどの要素を View（ビュー）と呼ぶ
ビューの高さや文字サイズなどは属性と呼ぶ
ロジック部分はアクティビティと呼ぶ
web でいう JavaScript の部分
Java や Kotlin
配置してあるパスは以下（例）
/app/src/main/java/com/example/diceroller/MainActivity.kt

レイアウトとアクティビティは一対一となっている

文字列は基本的にレイアウトにハードコーディングせず、`values/res/string.xml`ファイルに記載する

<!-- more -->

### Activity から layout の中の要素を取得したいとき

layout
`android:id="@+id/result_text"`

Activity
`val resultText: TextView = findViewById(R.id.result_text)`

### Design editor is unavailable until after a successful project sync

原因
ビルドに失敗していた。。
一度ビルドしてみてビルド出力タブで成功しているか確認しよう

### Gradle ビルドエラー

原因
例えば build.gradle の`targetSdkVersion 29`の場合、API レベル 29 の SDK がインストールされていない
解決策
API レベル 29 の SDK をインストールする

### エラー: Android SDK を選択してください

ファイル>Gradle ファイルとプロジェクトを同期　をクリック

### その他

View の属性で tools ってあるやつは、Android Studio でのレイアウトプレビューで表示する時に使うもの
例えばインターネットから動的に生成する画像のような物はソース時点ではプレビューできないので tools にダミー画像を設定して確認できる
コンパイルしたら消える

build.gradle の`compileSdkVersion`はアプリがサポートする Android の最新バージョン
build.gradle の`minSdkVersion`はアプリがサポートする Android の最も古いバージョン

### DialogFragment に直接、値をセットしてはダメ

DialogFragment に直接、値をセットしてはダメです。
Bundle を使いましょう。

> DialogFragment は画面回転などで Activity が破棄されるとそのたびに再生成され、再生成時は 引数なしコンストラクタで初期化されてしまう からです。

参考：https://zenn.dev/m_coder/articles/article-zenn-custom-dialog-by-dialogfragment

メソッドを渡すことはできないので、代わりに interface を使いましょう。
参考：[DialogFragment の利用方法](https://qiita.com/derakudo/items/15b05250d734f6a1b9d3)

### Bundle 変数に格納できない型を Activity(Fragment)のメンバ変数にしてはいけない

Bundle 変数に格納できない型を Activity(Fragment)のメンバ変数にしてはいけないです。

詳細は以下の記事を参照。
http://mobileapplication.blog.fc2.com/blog-entry-4.html

### Activity のメモリリークについて

Activity から context(Application Context)を誰かに渡して、そいつが context を保持する場合、メモリリークの危険性があります。

Activity がいなくなった後、context への参照だけ残り続けるからです。

なのでメモリリークを防ぐために、Activity の onDetach メソッドで null を入れてメモリを解放しよう。

もしくは Activity がいなくなった後も context の参照を保持したいなら`Application Context`を渡すようにしよう。
`Application Context`は Activity がいなくなっても残り続けるから大丈夫。

ちなみにこれは Activity だけじゃなくて Fragment でも同様。

詳細は以下の記事を参照。
https://android.gcreate.jp/337/

### json を扱う時は JSONObject ではなく Gson を使おう

JSON だと JSONException の例外の処理が必要だし、Gson の方が扱いやすいので、Android 開発で json を使う時は Gson を利用しよう

参考
[gson の使い方](https://qiita.com/naoi/items/6b184700b2a41fb46356)

### バックグラウンドやメインスレッド以外で Context を使う時は null チェックしよう

バックグラウンドやメインスレッド以外では画面が表示されていない可能性があります。
ホームボタンが押された場合などです。
その時は Context は null になるので、必ず null チェックしよう。
特にネットワーク越しの処理がある場合は必須です。
API でのデータ取得などです。

以下、例です。

```java
  final Handler handler = new Handler();
  ExecutorService executor = Executors.newSingleThreadExecutor();
  executor.execute(() -> {
      try {
          ApiClient client = ApiClientManager.apiClient();
          Call<ResponseBody> call = client.fetchHoge();
          Response<ResponseBody> response = call.execute();
          String result = response.body().string();
          if (getContext() == null) return; // この行が必須！
          getContext()
      } catch (IOException e) {
            e.printStackTrace();
        }
```

### レイアウト・インスペクターが表示されない

デバッグ実行していたら表示されない。
シンプルにアプリ実行しよう。
