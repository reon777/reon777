---
title: 【JavaScript】base64の画像をimgタグにセットする方法
tags:
  - JavaScript
date: 2023-05-08 09:00:00
---

![](/images/ムーミン1.jpg)

```js
async setImageToInput(base64Image, inputElement) {
    // Base64形式の画像を<img>要素にセット
    const img = document.createElement('img');
    img.src = base64Image;

    // 画像の読み込みを待つ
    await new Promise((resolve) => img.onload = resolve);

    // <img>要素の画像を<canvas>要素に描画
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // <canvas>要素の画像をBlobオブジェクトに変換
    const blob = await new Promise((resolve) => canvas.toBlob(resolve));

    // BlobオブジェクトをFileオブジェクトに変換
    const file = new File([blob], 'image.jpg', {type: blob.type});

    // FileオブジェクトをDataTransferオブジェクトに追加
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    // DataTransferオブジェクトをinput要素のfilesプロパティにセット
    inputElement.files = dataTransfer.files;

    // changeイベントを明示的にトリガーする
    inputElement.dispatchEvent(new Event('change'));
},

// input
const base64Image = document.getElementById(imgId).src;
const inputElement = document.getElementById('item_image');
this.setImageToInput(base64Image, inputElement).then(r =>
    // セットした後の処理
);
```
