---
title: 【RSpec】current_companyのメソッドで特定の値を返す
tags:
  - Rails
date: 2022-11-29 09:00:00
---

```ruby
before do
  company.created_at = Time.local(2022, 12, 02, 0, 0, 0)
  allow_any_instance_of(HogeController).to receive(:current_company).and_return(company)
end
```

いつもモックやスタブでは`allow(hoge).to receive(:fuga).and_return(piyo)`の書き方でやってたので、それがうまく効かなくてハマりました。。

以上です。
