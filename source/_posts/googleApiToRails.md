---
title: googleの翻訳APIをrailsで実行する方法
tags:
  - RubyOnRails
date: 2023-05-18
---

## はじめに

googleの翻訳APIをrailsで実行する方法です。
APIキーを使えばjs側でも実行できますが、そうするとAPIキーがユーザーに漏れてしまうので、Railsなどのサーバーを経由するようにしましょう。

### jsのコード

```js
async translate(text) {
                const url = '/translate';
                try {
                    const response = await axios.post(url, {
                        text: text,
                    });

                    const data = response.data;
                    if (data.error) {
                        console.error('Error:', data.error);
                        return '';
                    } else {
                        return data.translation_text;
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                    return '';
                }
            },
```

### Rails

#### gemインストール

Gemfileに以下の行を追加する

```
gem 'google-cloud-translate-v2'
```

ターミナルで以下のコマンドを実行する

```
bundle install
```

#### 認証の設定

APIキーを利用することもできるのですが、gemライブラリを利用する場合はAPIキーではなく認証情報を利用する方法が便利です。

1. GCPを開く
2. API Managerを開く
3. 認証情報を開く
4. 対象のサービスアカウントをクリックもしくは新しく追加
5. 「キー」タブからjsonをダウンロード
6. プロジェクト直下にsecret_keyフォルダを生成
7. secret_keyフォルダにjsonを配置する

参考
https://github.com/googleapis/google-cloud-ruby/blob/main/google-cloud-translate-v2/AUTHENTICATION.md

#### ルーティング

routes.rb

```rb
  Rails.application.routes.draw do
    post 'translate', to: 'google_api/translation#translate'
  end
```

#### controllerのコード

1. controllersフォルダの直下に`google_api`フォルダを作成する
2. `google_api`フォルダにtranslation_controller.rbファイルを作成する

```ruby
require 'google/cloud/translate/v2'

class GoogleApi::TranslationController < ApplicationController
  def translate
    ENV["TRANSLATE_PROJECT"]     = "hoge-project"
    ENV["TRANSLATE_CREDENTIALS"] = "secret_key/hoge.json"
    client = Google::Cloud::Translate::V2.new
    translation = client.translate text, to: 'en'
   render json: { translation: translation.text }
  rescue Google::Cloud::Error => e
    render json: { error: e.message }, status: :internal_server_error
  end
end
```
