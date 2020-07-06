---
title: Macの初期設定とか入れたツールとかまとめ
date: 2020-06-01 11:00:00
---

### はじめに

Mac が壊れた時のために初期設定とか入れたツールとかをメモしておきます

<!-- more -->

### インストールしたやつ

- Chrome
- 1 password
- Clipy
- Docker
- Karabiner
- VSCode
- Skype
- Xcode
- homebrew
  インストール手順：https://qiita.com/pypypyo14/items/4bf3b8bd511b6e93c9f9
- nvm(node)
  インストール手順：https://diwao.com/2017/01/nvm-install-homebrew.html
- pyenv(python)
  インストール手順：https://qiita.com/takeruw/items/3540c1c618d5459195ad
- Karabiner
  キーボードの配列を変えるやつ
- BetterTouchTool
  ショートカットを登録できるやつ

#### git 設定

```bash
git config --global user.name "reon777"
git config --global user.email "your mail"
```

#### mac で matplotlibrc を使うための呪文

```bash
pip install PyQt5 PyQt5-sip QtAwesome qtconsole QtPy
echo "backend : Qt4Agg" >> ~/.matplotlib/matplotlibrc
```

#### brew でインストールするやつ

```bash
brew install yarn
brew install chromedriver
brew install mongodb
brew install nginx
brew install grafana
brew install cmake
brew install gradle ## cordova run android コマンドで必要
```

#### grafana

```bash
brew tap homebrew/services
brew services start grafana
```

`vi /usr/local/etc/grafana/grafana.ini`
でポート変えれる

http://localhost:3000
にアクセス可能になる

ユーザ名/パスワード
admin/admin

参考
https://grafana.com/docs/installation/mac/

#### HyperSwitch

ウィンドウごとの切り替えが出来るようになる
インストール手順：https://aprico-media.com/posts/1377

#### ios console 見るやつ

https://lemonjar.com/iosconsole/

#### スクショの保存場所をデスクトップからピクチャに変更

```bash
mkdir ~/Pictures/スクリーンショット
defaults write com.apple.screencapture location ~/Pictures/スクリーンショット
killall SystemUIServer
```

#### ll コマンドのエイリアスを登録する

```bash
vi ~/.bash_profile
alias ll='ls -la'
source ~/.bash_profile
killall SystemUIServer
```

#### マウスの操作を良い感じにする

USB Overdrive
http://doranekohc.hatenablog.com/entry/2015/09/14/131916

#### jdk インストール

バージョンは８にすること（cordova のため（参考：https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#java-development-kit-jdk）
https://qiita.com/seijikohara/items/56cc4ac83ef9d686fab2

```bash
brew tap caskroom/versions
brew cask install java8
/usr/libexec/java_home -V
```

~/.bash_profile に以下を追加

```bash
export PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_192.jdk/Contents/Home
```

```bash
source ~/.bash_profile
echo$PATH
echo \$JAVA_HOME
```

#### Alfred

検索が便利なやつ

##### ファイルを検索対象にする

https://lovemac.jp/3157

##### ブックマークを検索対象にする

https://qiita.com/ashidaka/items/e783cd2fc9a317321c84

#### その他 Tips

- ssh 接続設定を変えたい時
  ~/.ssh/config
