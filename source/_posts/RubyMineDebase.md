---
title: RubyMineでデバッグするための設定
tags:
  - RubyMine
date: 2024-07-12
---

### はじめに

RubyMineでデバッグ実行しようとしたら色々とハマりまくって半日潰れて悔しかったので、完全体となった今の設定をメモしておきます。

gemのinstallはRubyMineでアプリ実行時に自動的に行われるので、自分で`bundle install`する必要はありません。
必要はないというか、やるとエラーになります。。

### 環境

- Rubyのバージョン

```bash
ruby --version
ruby 3.0.5p211 (2022-11-24 revision ba5cf0f7c5) [x86_64-darwin22]
```

- RubyMineのバージョン

```bash
RubyMine 2023.2.6  
```
※最新版だとうまく動かなかった。このバージョンまで落としたらうまく動きました。。

- docker-compose.yml

```yaml
  web:
    command: bash -c 'rm -f tmp/pids/server.pid && bundle install --jobs=4 --retry=3 && yarn install && ./bin/rails i18n:js:export && ./bin/dev'
    ports:
      - "1234:1234" # for debug
      - "3000:3000"
      - "33333:33333" # for selenium-grid
      - "26162:26162" # for debug
      - "26166:26168"
      - "3036:3036" # vite
      - "3037:3037" # vite
```

- Gemfile

```bash
  gem 'ruby-debug-ide'
  gem 'debase', '~> 0.2.5.beta2', require: false
  gem "debug", ">= 1.0.0", require: false
```

- RubyMineのDockerComposeの設定

{% asset_img docker_compose.png %}

※docker-compose（V1の方）になっていたので、dockerに変更しました。

- RubyMineのRuby SDKの設定

{% asset_img Ruby_SDK_Gem.png %}

※(2)の方は最初は存在しないと思います。「＋」ボタンから作ってください。

### エラー一覧

色々エラー出すぎてどのエラーがどの解決策に対応しているのかわからなくなったけど、
とりあえずメモしておきます。

```bash
An error occurred while installing debase (0.2.5.beta2), and Bundler cannot continue.

In Gemfile:
  debase
```
  
```bash
Attaching to web-1
web-1  | /usr/local/bin/ruby: No such file or directory -- /opt/.rubymine_gems/gems/ruby-debug-ide-3.0.0.beta.17/bin/rdebug-ide (LoadError)
Aborting on container exit...
```

```bash
Caused by: java.io.IOException: Cannot run program "/usr/local/bin/docker-compose" (in directory "/Users/ryosuke/Public/20221219_zaico_web/zaico_web"): error=2, No such file or directory
```

```bash
Docker ボリューム 'Rubymine_2024_internal_gems_storage_4a5bbe64_dockercomposeUsersryosukePubli' をセットアップできませんでした。
```
