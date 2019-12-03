---
tags:
  - Firebase
  - Cordova
title: Firebaseの認証をCordovaで行う方法
date: 2019-12-02
---

{% asset_img firebase.png %}

### はじめに

CordovaプロジェクトにFirebaseを導入したい時は、基本的にはWebと同様に以下の通りに導入すれば良いのですが、

[Vue.jsへのfirebaseの導入と基本的な使い方](https://qiita.com/reon777/items/c5218371ce73b0840326)

認証機能だけは上のままだとうまく動かないので修正する必要があります


で、その修正方法は以下の公式ドキュメントに載っているのですが、

https://firebase.google.com/docs/auth/web/cordova?hl=ja

そのままだとエラーになるので以下の修正が必要でした

<!-- more -->

### 修正１(android)

```bash
# 修正前
cordova plugin add cordova-universal-links-plugin-fix --save
# 修正後
cordova plugin add https://github.com/walteram/cordova-universal-links-plugin --save
```

この修正をやらなかった場合、androidビルド実行時に
`Cannot read property 'manifest' of undefined`
というエラーになりました

### 修正２(ios)

https://developer.apple.com/account/resources/certificates/list
にログイン

Identifiersから対象のアプリを選択して、CapabilitiesのAssociated Domainsにチェックを付けて保存する

Provisioning profileを再作成する

XCode > Capabilities > Associated Domains
がONになっていることを確認する

この修正をやらなかった場合、iosビルド実行時に
`error: Provisioning profile "hoge" doesn't include the com.apple.developer.associated-domains entitlement. (in target 'hoge')`
というエラーになりました

### 修正３(ios)

cordova ルートフォルダで
`sudo gem install cocoapods` で CocoaPods をインストールする
sudo なので Mac の管理者ログインパスワードを入力する

`pod setup`
15 分ほど待つ

今後 XCODE を開く際は/platforms/ios/ 配下の .xcodeproj ファイルではなく .xcodeworkspace ファイルを選択して XCode を開く

これをやらなった場合、デバイス起動時に以下のエラーになりました
`ld: library not found for -lPods-hoge`

### おわりに

以上の３つで問題なく認証機能が使えるようになりました！
参考になれば幸いです

### おまけ

ちなみに僕は公式ドキュメントの以下の部分のURL_SCHEMEを変更せずにそのまま実行していて
iosでアドレスが無効で開けないエラーでハマったので注意してください

```bash
cordova plugin add cordova-plugin-customurlscheme --variable \
    URL_SCHEME=com.firebase.cordova --save
```

