---
tags:
  - Cordova
title: 【Cordova】ライブ配信アプリを作ってみた
date: 2019-11-27
---

{% asset_img cordova.jpeg %}

### はじめに

Cordovaを使ってライブ配信アプリを作ってみたので作り方をメモしてます

完成系はこちら
https://github.com/reon777/sample_vue_cordova_banbuser

### 作り方

当然ですがライブ配信なんて高度なこと自分でやるのは無理なので、プラグインを使います

色々調べましたが、使えそうなものは以下の１つだけでした

https://github.com/bambuser/cordova-plugin-bambuser

これは以下の会社が運用しているものです

https://bambuser.com


なのでまずは上の会社に登録する必要があります

最初の14日は無料ですが、それからはお金がかかるので注意してください

料金表
https://bambuser.com/pricing

登録したらAPIキーとアプリケーションIDを取得してください

その後は、、コードを載せて解説してもいいんですけど、正直そんなに難しいことはしてないので
直接githubのリポジトリみた方が早いと思います！

https://github.com/reon777/sample_vue_cordova_banbuser

READMEにしたがって起動するとライブ配信と視聴ができるはずです！
端末が２台必要です！

遅延は数秒程度で、画質もライブ配信アプリとしては問題なく使えるレベルだと思いました

ではでは
