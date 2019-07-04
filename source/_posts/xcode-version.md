---
date: 2019-07-04
tags:
  - XCode
  - ios
title: XCodeとiosのバージョンエラーでハマったので解決手順をメモ
---

{% asset_img xcode.jpeg %}

XCode と ios のバージョンエラーでハマったので解決手順をメモしておきます。

<!-- more -->

**作業環境**

- Mac Mojave10.14.4

## 事象

`cordova run ios`でビルドすると以下のエラーに。
もしくは XCode を開いても同様のエラーポップアップが表示されます。

```bash
device support files., NSLocalizedRecoverySuggestion=This iPhone 7 (Model 1660, 1778, 1779, 1780) is running iOS 12.3.1 (16F203), which may not be supported by this version of Xcode.}) {
    DeviceType = "iPhone9,1";
    NSLocalizedDescription = "Could not locate device support files.";
    NSLocalizedRecoverySuggestion = "This iPhone 7 (Model 1660, 1778, 1779, 1780) is running iOS 12.3.1 (16F203), which may not be supported by this version of Xcode.";
}
```

## 原因

まず前提として、XCode 10.2 以上だと Swift 3 がサポートされていません。
なので Swift 3 を使っている僕みたいな時代遅れの人は XCode 10.2 以上を使う資格はありません。
XCode 10.1 以下をインストールし直しましょう。

ただし XCode 10.1 以下 は ios 12.2 以上をサポートしてません。
なので自分でデバイスサポートファイルを配置してやる必要があります。

まとめると、以下の通りです。

| Swift のバージョン | ios のバージョン | 対応                                                       |
| ------------------ | ---------------- | ---------------------------------------------------------- |
| 3                  | 12.1 以下        | XCode 10.1 以下ををそのまま使う                            |
| 3                  | 12.2 以上        | XCode 10.1 以下 を使い、デバイスサポートファイルを配置する |
| 4 以上             | 12.1 以下        | XCode 10.2 以上をそのまま使う                              |
| 4 以上             | 12.2 以上        | XCode 10.2 以上をそのまま使う                              |

## デバイスサポートファイルを配置する方法

以下のリンクから対象のデバイスサポートファイルをダウンロードする
https://github.com/filsv/iPhoneOSDeviceSupport

解凍して
`/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport/`
に配置してから XCode を開き直す
※`/Applications/Xcode.app`の部分は環境によっては変更する必要があるかもしれません。

## ハマったところ

自分のハマりポイントとしては、XCode を 10.1 と 10.2 の両方をインストールしておりそれがごっちゃになってしまってました。。
開いているのとは別の XCode の方をいじってました。そりゃ反映されんわ。

あと XCode.app がアプリケーションなのでその下のフォルダの開き方が分からなくてハマりました
以下の手順でひらけます。

1. XCode.app を２本指クリック
2. 「フォルダに新規ターミナル」を選択
3. cd Contents
4. pwd
5. Finder に戻って`Command + Shift + G`
6. 4 の結果を貼り付けて Enter

## おわりに

バージョンはすぐ変わっちゃうので多分半年後には使えない情報になっている気もしますが、数カ月以内にまたハマる自信があるので（w）、一応書いておきました〜
それではよき XCode ライフを〜

## 参考記事

[Xcode10.1 で iOS12.2 以降の検証が出来ない場合](https://qiita.com/1901drama/items/838831c13da5f59a9792)
[Mac の Finder で Windows みたいにファイルパス指定でディレクトリやファイルにアクセスしたい](https://qiita.com/luccafort/items/7eefe4dcf50cca9d8c02)
