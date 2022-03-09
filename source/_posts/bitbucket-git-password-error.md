---
title: BitbucketにGitリモート認証エラーになった
date: 2022-03-11 09:00:00
---

いつものようにgit pullしたら以下のエラーに遭遇した。

```bash
remote: Bitbucket Cloud recently stopped supporting account passwords for Git authentication.
remote: See our community post for more details: https://atlassian.community/t5/x/x/ba-p/1948231
remote: App passwords are recommended for most use cases and can be created in your Personal settings:
remote: https://bitbucket.org/account/settings/app-passwords/
```

なんか認証周りが変わったらしい。
bitbucketにwebでログインするパスワードだと通らなくなった。

代わりに以下のURLからアプリパスワードとかいうの設定して、それを入力したら通るようになった。

https://bitbucket.org/account/settings/app-passwords/

普段はVSCodeのメニューからgit pullしてて、その場合だと上のエラーメッセージが出ないのでハマった。。
