---
title: 【JavaScript】CSVをインポートするコード
tags:
  - JavaScript
date: 2020-03-18
---

{% asset_img cordova.jpeg %}

### はじめに

JavaScript で CSV を取り込むコードです

CSV 取り込みの文字をクリックでファイル選択するか、ドラッグアンドドロップでもできます。

<!-- more -->

### コード

html

```html
<input @change="fileChange" type="file" id="file_input_expense" name="file_input_expense" hidden />
<label for="file_input_expense" @dragover.prevent @drop.prevent="fileChange">CSV取り込み</label>
```

JavaScript

```js
fileChange(e) {
  console.log('start fileChange');

  let file = null;
  if (e.target.files) file = e.target.files[0];
  else if (e.dataTransfer.files) file = e.dataTransfer.files[0];
  else return;

  const file = e.target.files[0];
  const reader = new FileReader();

  const loadFunc = async () => {
    if (this.check_file_extension(file.type)) return
    let lines = reader.result
    // 改行コードのCRLFをLFに変更
    lines = lines.replace(/\r\n/g, "\n");
    lines = lines.split('\n');
    // ヘッダ
    let header = lines.shift();
    header = header.split(',');
    // バリデーション
    if (this.column_count_is_not_2(header.length, 1)) return;
    for (let value of header) {
      value = value.trim();
      if (!['hoge1', 'hoge2'].includes(value)) {
        console.log('[1行目] 正しいカラム名を入力してください。エラーのカラム名：' + value);
        var obj = document.getElementById('file_input_expense');
        obj.value = '';
        return true;
      }
    }

    // コンテンツ
    // バリデーション
    let row_num = 1;
    for (let line of lines) {
      row_num += 1;
      line = line.split(',');
      if (line.length <= 1) continue;
      if (this.column_count_is_not_2(line.length, row_num)) return;
    }
    // 取り出し
    let csv_list = []
    let line_data = {};
    for (let line of lines) {
      line = line.split(',');
      // 以下の１行がないと最終行の空白行で不具合が起きる可能性がある
      if (line.length <= 1) continue;
      line.forEach((value, i) => {
        line_data[header[i]] = value;
      });
      csv_list.push(line_data)
    }
    var obj = document.getElementById('file_input_expense');
    obj.value = '';
  };

  // onloadはreadAsTextでファイルを読み込んだ後に実行されます.
  reader.onload = loadFunc;
  reader.readAsText(file);
},
check_file_extension(type) {
  if (type == 'text/csv') return false
  // Windowsのcsvはこの拡張子になる
  if (type == 'application/vnd.ms-excel') return false
  console.log('エラー：ファイル形式をcsvにしてください。現在のファイル形式：' + type);
  var obj = document.getElementById('file_input_expense');
  obj.value = '';
  return true;
},
column_count_is_not_2(column_count, row_num) {
  if (column_count != 2) {
    console.log('[' + row_num + '行目] カラム数を2にしてください。現在のカラム数：' + column_count);
    var obj = document.getElementById('file_input_expense');
    obj.value = '';
    return true;
  }
  return false;
},
```

csv

```csv
hoge1,hoge2
aa,bb
cc,dd
```

### 参考

[Vue.js で CSV をインポート](https://qiita.com/WallyNegima/items/67a16915fbd77e2e0f03)
