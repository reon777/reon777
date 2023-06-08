---
title: Railsでアプリログのフォーマットを変更する方法
tags:
  - Rails
date: 2023-06-08
---

Railsでアプリログのフォーマットを変更する方法です。

以下の２ファイルを追加・修正します。

（追加）app/lib/local_dev_log_formatter.rb

```ruby
class LocalDevLogFormatter < ActiveSupport::Logger::SimpleFormatter
  def call(severity, timestamp, progname, msg)
    formatted_severity = sprintf("%-5s", "#{severity}")
    formatted_time = timestamp.strftime("%Y-%m-%d %H:%M:%S.") << timestamp.usec.to_s[0..2].rjust(3)
    "[#{formatted_severity} #{formatted_time} ##{Process.pid}]  #{msg}\n"
  end
end
```

（修正）config/environments/development.rb

```ruby
Hoge::Application.configure do

  # 中略

  config.log_formatter = LocalDevLogFormatter.new # 日時を出力するためにカスタムフォーマッターを指定
  logger = ActiveSupport::Logger.new("log/#{Rails.env}.log", 5, 100 * 1024 * 1024)
  logger.formatter = config.log_formatter
  config.logger = ActiveSupport::TaggedLogging.new(logger)
end
```

app/lib配下に配置することとconfig.loggerの方にも設定が必要なところが分からなくてハマりました。。
