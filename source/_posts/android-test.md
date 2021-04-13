---
title: Androidテストについて整理した
tags:
  - Android
date: 2021-4-13
---

## テストの種類とフレームワーク

公式ページ
https://developer.android.com/studio/test/index.html?authuser=3

### Local Test

実機やエミュレータの起動なしに実施可能なテスト
Android の API に依存していない場合など
JVM 上で実行される
テストフォルダは`src/test`

### Instrumented Test

実機やエミュレータの起動が必要なテスト
Android の API に依存しているメソッドの場合など
テストフォルダは`src/androidTest`

## ユニットテスト

任意のクラスのメソッドを実行して返り値が期待通りかを確認するテスト
デファクトスタンダードのフレームワーク

- JUnit4

### テストランナー

複数のテストをまとめて実行するテストランナーと呼ぶ

- org.junit.runners.JUnit4（JUnit4 標準のテストランナー）
- AndroidJUnitRunner（Instrumented Test を実行するための Android 標準のテストランナー）
- MockitoJUnitRunner、RobolectricTestRunner（その他のランナー）

### テストコードを簡潔に書くためのアサーションライブラリ

- AssertJ（ただし Kotlin 未対応）
- assertk
- Expekt

### モックライブラリ

- Mockito（ただし Kotlin 未対応）
- Mockito-Kotlin（Kotlin 対応）

### モックのフレームワーク

ローカルテストなら JUnit4 だけで OK だが、Instrumented Test を行う場合はモックが必要
[Context を利用する方法](https://qiita.com/hotdrop_77/items/adf0d706c0fbc4c0a5c9)

- Robolectric

## インテグレーションテスト

複数画面に跨がる機能や Service を利用する機能などのテスト
主に実機やエミュレータを利用する

## UI テスト

アプリの UI を操作するテスト
基本的に Instrumented Test となる。

デファクトスタンダードのフレームワーク

- Espresso
- Appium

### テスト時に必要な端末の設定

• 設定から開発者オプションを開く
• 次の 3 つの設定項目を「オフ」に変更する
– ウィンドウアニメスケール
– トランジションアニメスケール
– アニメーター再生時間スケール

### 参考書籍

Android テスト全書
https://peaks.cc/books/android_testing

体系的にまとまっていて、かなりオススメです！
