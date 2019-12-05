---
tags:
  - Cordova
  - Firebase
title: 【Cordova】Firebaseを導入する方法
date: 2019-12-05
---

{% asset_img firebase.png %}

CordovaプロジェクトにFIrebaseを導入する方法をメモしておきます

まずは以下を参考にしてWebアプリにFirebaseを導入します
https://qiita.com/reon777/items/c5218371ce73b0840326

次にFirebaseコンソールからiosとandroidのアプリをそれぞれ追加します
バンドルIDが必要と言われるので`config.xml`の`widget id="hoge"`のhogeの部分を入力してください

基本的にはこれだけでOKです

ただし、認証機能だけは追加の作業が必要となります

手順は以下に記載したので必要あればご確認ください
[Firebaseの認証をCordovaで行う方法](/2019/12/02/firebase-auth-in-cordova/)


