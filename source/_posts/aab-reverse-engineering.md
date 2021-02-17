---
title: 【Android】aabファイルをリバースエンジニアリングしてみた
tags:
  - Android
date: 2021-02-17
---

```bash
# abb→apk
brew install bundletool
bundletool build-apks  --mode=universal --bundle=./app-release.aab --output=./app-release.apks
unzip app-release.apks

# apk→dex
unzip universal.apk

# dex→jar
# dexをjarに変換するためのツールをダウンロードする
# https://sourceforge.net/projects/dex2jar/files/
chmod 777 dex2jar-2.0/d2j-dex2jar.sh
./dex2jar/d2j-dex2jar.sh classes.dex

# jar→class
unzip classes-dex2jar.jar
# classファイルの中身が見れるツールをダウンロード
wget https://github.com/java-decompiler/jd-gui/releases/download/v1.6.6/jd-gui-1.6.6.jar
java -jar jd-gui-1.6.6.jar

# あとは見たいclassファイルを選択すればOK

```

こんな感じ

{% asset_img a.png %}

良いね！

参考
[Android の APK を逆コンパイルする](https://qiita.com/chibi929/items/940623d33d9f6eb3877f)
[Java Decompiler project の JD-GUI で JAR ファイルからソースコードを生成する](https://qiita.com/niwasawa/items/d89e7cef0c749c6afea6)
