---
title: cocoapodsのバージョンが変更できない時の解決策
tags:
  - iOS開発
date: 2022-03-25 09:00:00
---

cocoapodsのバージョンが変更できない時の解決策

他記事だとbrewではなくgemで管理する方法がよく紹介されていましたが、
自分の環境だとむしろgemだとダメでbrewだとうまくいきました。

```bash
# 変更前の状態
pod --version
# 1.8.4
which pod
# /Users/hoge/.rbenv/shims/pod

# gem→brewに変更する
gem uninstall cocoapods
brew install cocoapods
rm '/usr/local/bin/pod'
rm '/usr/local/bin/xcodeproj'
brew link cocoapods

pod --version
# 1.11.3
which pod
# /usr/local/bin/pod
```
