---
title: JavaScriptでバーコードを読み取る方法
photos: images/js.png
tags:
  - JavaScript
date: 2020-10-27
---

![](/images/ムーミン1.jpg)

## 利用ライブラリ

利用ライブラリ
https://github.com/ericblade/quagga2

※元々はhttps://github.com/serratus/quaggaJS の方ですが保守されていないのでフォークされた上の方が良いです

## コード

html

```html
<button type="button" class="btn btn-fab btn-round btn-info btc_scan" name="btc_scan"></button>
<!-- スキャンエリア -->
<div class="scan_area">
  <div id="photo-area" class="viewport"></div>
</div>
```

js

```js
// スキャン
function register_btc_scan() {
  $('.btc_scan').on('click', (event) => {
    $('.scan_area').show()
    startScanner()
  })
  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          numOfWorkers: 0,
          frequency: 1,
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#photo-area'),
          constraints: {
            decodeBarCodeRate: 3,
            successTimeout: 500,
            codeRepetition: false,
            tryVertical: true,
            frameRate: 15,
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      function (err) {
        if (err) {
          console.log(err)
          return
        }
        console.log('Initialization finished. Ready to start')
        Quagga.start()
        _scannerIsRunning = true
      }
    )
    Quagga.onProcessed(_onProcessed)
    Quagga.onDetected(_onDetected)
  }
}
// スキャン中
function _onProcessed(result) {
  var drawingCtx = Quagga.canvas.ctx.overlay,
    drawingCanvas = Quagga.canvas.dom.overlay
  if (result) {
    if (result.boxes) {
      drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')))
      result.boxes
        .filter(function (box) {
          return box !== result.box
        })
        .forEach(function (box) {
          Quagga.ImageDebug.drawPath(
            box,
            {
              x: 0,
              y: 1,
            },
            drawingCtx,
            {
              color: 'green',
              lineWidth: 2,
            }
          )
        })
    }
    if (result.box) {
      Quagga.ImageDebug.drawPath(
        result.box,
        {
          x: 0,
          y: 1,
        },
        drawingCtx,
        {
          color: '#00F',
          lineWidth: 2,
        }
      )
    }
    if (result.codeResult && result.codeResult.code) {
      Quagga.ImageDebug.drawPath(
        result.line,
        {
          x: 'x',
          y: 'y',
        },
        drawingCtx,
        {
          color: 'red',
          lineWidth: 3,
        }
      )
    }
  }
}

function _getMedian(arr) {
  arr.sort((a, b) => a - b)
  const half = Math.floor(arr.length / 2)
  if (arr.length % 2 === 1)
    // Odd length
    return arr[half]
  return (arr[half - 1] + arr[half]) / 2.0
}

let codes = []

// 検知した
function _onDetected(result) {
  // １つでもエラー率0.16以上があれば除外
  let is_err = false
  $.each(result.codeResult.decodedCodes, function (id, error) {
    if (error.error != undefined) {
      if (parseFloat(error.error) > 0.16) {
        is_err = true
      }
    }
  })
  if (is_err) return

  // エラー率のmedianが0.05以上なら除外
  const errors = result.codeResult.decodedCodes.filter((_) => _.error !== undefined).map((_) => _.error)
  const median = _getMedian(errors)
  if (median > 0.05) {
    return
  }

  // ３連続同じ数値だった場合のみ採用する
  codes.push(result.codeResult.code)
  if (codes.length < 3) return
  let is_same_all = false
  if (codes.every((v) => v === codes[0])) {
    is_same_all = true
  }
  if (!is_same_all) {
    codes.shift()
    return
  }

  alert(result.codeResult.code)
  $('.scan_area').hide()
  Quagga.stop()
  Quagga.offProcessed(_onProcessed)
  Quagga.offDetected(_onDetected)
}
```
