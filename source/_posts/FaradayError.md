---
title: Faraday::Error::ConnectionFailedエラーの解消
date: 2023-05-25 09:00:00
---

## エラー

```bash
rake aborted!  
NameError: uninitialized constant Faraday::Error::ConnectionFailed  
Did you mean?  Faraday::ConnectionFailed
```

## 解決策

```bash
# cdする先のディレクトリは人によって違う。下のコマンドで確認できる。
# bundle show rails
cd /Users/hoge/.rbenv/versions/3.0.5/lib/ruby/gems/3.0.0/gems
grep -r "Faraday::Error::" .
sed -i '' 's/Faraday::Error::/Faraday::/g' ./elasticsearch-api-7.4.0/Rakefile
sed -i '' 's/Faraday::Error::/Faraday::/g' ./elasticsearch-transport-7.4.0/spec/elasticsearch/transport/client_spec.rb
sed -i '' 's/Faraday::Error::/Faraday::/g' ./elasticsearch-transport-7.4.0/lib/elasticsearch/transport/transport/http/faraday.rb
```
