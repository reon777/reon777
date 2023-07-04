---
title: 【mitmproxy】スマホ端末のネットワーク通信内容をパソコンで監視する方法
date: 2022-11-30 09:00:00
---

公式ページ
https://mitmproxy.org/


Macにmitmproxyをインストール

```bash
brew install mitmproxy
```

MacとAndroidで同じWi-fiに接続する

MacのWi-fiのIPアドレスを確認する  
リンゴマーク>システム設定>ネットワーク>Wi-fi>詳細>TCP/IP>IPアドレス

Macで監視アプリを起動

```bash
mitmweb --web-port 10081 --listen-port 10080
```

Androidの設定>ネットワークとインターネット>対象のWi-fiの設定>プロキシを手動に変更する  
- プロキシのホスト名：MacのWi-fiのIPアドレス  
- プロキシポート：10080

Androidで`http://mitm.it/`にアクセスする  
Androidの証明書をダウンロードする  
設定>セキュリティ>詳細設定>暗号化と認証情報>証明書のインストール>CA証明書 から証明書をインストールする

Macで`http://127.0.0.1:10081`を開くとAndroidで通信した内容が表示される

Androidアプリを開発している場合はその設定も必要


AndroidManifest.xmlにnetworkSecurityConfigの行を追加する

```xml
    <application
        android:name=".Hoge"
        android:networkSecurityConfig = "@xml/network_security_config">
```

app/src/main/res/xml/network_security_config.xmlを作成する

```xml
<network-security-config>
    <debug-overrides>
        <trust-anchors>
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
</network-security-config>

```


参考
[iOS 14 端末での mitmproxy 設定方法](https://qiita.com/sugurutakahashi12345/items/45e2b6809c6fc54051a6)
[AFNetworkingのリクエストでCookieを扱う方法](https://redwing.moo.jp/cocoa/archives/4028)
[MITMProxy - Set up Android Devices](https://www.youtube.com/watch?v=ktNUs4KdcZk)
