---
title: EC2に構築したWordpressでお問い合わせフォームを設置した話
date: 2020-06-01
---

![](/images/wordpress.jpeg)

## はじめに

ホームページを作って欲しいという依頼があり、
[AWSのEC2にDocker ComposeでWordPress環境を構築する手順](https://qiita.com/reon777/items/05e7ad47ed75597470e8)でWordPressを構築しました。

お問い合わせ機能が欲しくなりました。

Contact Form 7のプラグインを追加してみました。

お問い合わせフォーム画面ができました。

実際にお問い合わせテストをしてみました

以下のエラーになりました。。
（まあこの文言はプラグインの設定で変えられるのであまり意味はないですが、、）

`メッセージの送信に失敗しました。後でまたお試しください。`

どうやらEC2の場合、セキュリティ上の理由から、デフォルトではメール送信はできないようです。

調べたら申請すれば制限を解除できるとのことでやってみました。


## 解除申請

まずは申請画面を開く

https://console.aws.amazon.com/support/contacts?#/rdns-limits

**Email address**

受信するメールアドレスを書く。

**Use case description**

「inquiry on my website」って書く

**Elastic IP address - optional**

自分のElastic IP addressを書く（例：111.222.333.444）

**Reverse DNS record**

自分のドメイン名を書く（例：google.com）

Submitボタンを押す

## 結果

次の日にメールが来ました

> Unfortunately, we are unable to process your request at this time, please consider looking into the Simple Email Service. https://aws.amazon.com/ses

日本語に訳すと

> 申し訳ありませんが、現時点ではリクエストを処理することができませんので、簡易メールサービス https://aws.amazon.com/ses をご検討ください。

なるほど。。。

## Amazon SESを使う

言われた通りにAmazon SESを使ってみることにする

まずはお問い合わせで送信するメールの送信元のアドレスを設定する必要がある

Contact Form 7のプラグインの設定だとできないっぽい

WP Mail SMTPのプラグインを入れる

WP Mail SMTPの設定からメーラーが選べる

Amazon SESを選ぶ

{% asset_img amazon-ses.png %}

どうやら有料機能らしい

おわた

## 最終的に

最終的にGmailを使うことで解決しました！

### 参考

[EC2 インスタンスからポート 25 の制限を削除するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/ec2-port-25-throttle/)
