---
title: JavaScriptでクリップボードにコピーする
photos: images/js.png
tags:
  - JavaScript
date: 2020-08-20
---

html 部分

```html
<input id="user_id" type="text" style="display: none" value="コピー対象の文言" />
<button class="btn btn-secondary" onclick="copyToClipboard('user_id')">クリップボードにコピー</button>
```

JavaScript 部分

```html
<script type="text/javascript">
  function copyToClipboard(id) {
    var copyTarget = document.getElementById(id)

    var textarea = document.createElement('textarea')
    textarea.textContent = copyTarget.value
    document.body.appendChild(textarea)

    var selection = document.getSelection()
    var range = document.createRange()
    range.selectNode(textarea)
    selection.removeAllRanges()
    selection.addRange(range)

    console.log('copy success', document.execCommand('copy'))
    selection.removeAllRanges()

    document.body.removeChild(textarea)

    alert('コピー完了 : ' + copyTarget.value)
  }
</script>
```

ググると以下のやり方が出てきましたが、これだと Chrome でコピーできないので上のやり方にしました
https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

参考
https://stackoverflow.com/questions/47879184/document-execcommandcopy-not-working-on-chrome?rq=1
