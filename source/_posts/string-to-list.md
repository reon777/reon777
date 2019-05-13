---
title: Pythonで中括弧付きの文字列をリストに変換する方法
date: 2019-05-13
tags:
  - python
---

{% asset_img python.jpeg %}

中括弧がない文字列をリストに変換する方法はたくさん出てきましたが中括弧付きの文字列をリストに変換する方法が意外と出てこなかったので記載しておきます。

```python
import ast
fruits = "['apple', 'orange', 'banana']"
fruits_list = ast.literal_eval(fruits)
print(f'{fruits_list[1]}, {fruits_list[0]}')

# 出力
orange, apple
```

ちなみに中括弧がない場合は以下の通りです。

```python
import ast
fruits = "apple orange banana"
fruits_list = fruits.split()
print(f'{fruits_list[1]}, {fruits_list[0]}')

# 出力
orange, apple
```

シンプルですが、意外と使うんですよね

ではでは

## 参考

https://www.tutorialspoint.com/How-to-convert-string-representation-of-list-to-list-in-Python
