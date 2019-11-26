---
date: 2019-10-11
tags:
  - Cordova
title: 【cordova-plugin-file】内部ストレージを使ってみた【Vue】
---

{% asset_img cordova.jpeg %}

### はじめに

これまではデフォルトの vuex を利用してて、結果的に local storage に保存してましたがされますが、以下の記事によるとセキュリティリスクが高いらしいので自分のアプリからしか利用できない内部ストレージを利用する方法を調べてみたので使い方をメモしておきます。

[HTML5 の Local Storage を使ってはいけない（翻訳）](https://techracho.bpsinc.jp/hachi8833/2019_10_09/80851)

<!-- more -->

### 環境

- cordova-plugin-file: 6.0.2

### ライブラリインストール

```bash
cordova plugin add cordova-plugin-file
```

### データを保存・取得する

操作はデフォルトで非同期なので Promise などを活用して同期処理に修正してます。

```js
export default {
  methods: {
    async init() {
      // データ保存
      await this.set_data_to_internal_storage('file_name.txt', 'test data')
      // データ取得
      const data = await this.get_data_from_internal_storage('file_name.txt')
      console.log('data: ' + data)
    },
    async set_data_to_internal_storage(file_name, data) {
      console.log('start set_data_to_internal_storage')
      const fileSystem = await new Promise(function(resolve, reject) {
        window.resolveLocalFileSystemURL(
          // eslint-disable-next-line
          cordova.file.dataDirectory,
          resolve,
          reject
        )
      })
      const fileEntry = await new Promise(function(resolve, reject) {
        fileSystem.getFile(
          file_name,
          { exclusive: false, create: true },
          resolve,
          reject
        )
      })
      return new Promise((resolve, reject) => {
        fileEntry.createWriter(function(writer) {
          console.log('書き込み開始')
          // 書き込み終了時の処理を定義する
          writer.onwriteend = function(event) {
            if (this.error) {
              console.log(
                'ファイル追記 追記処理中にエラー発生',
                this.error,
                event
              )
              // Promiseの結果を返す
              reject('reject!!')
            } else {
              console.log('ファイル追記 成功', event)
              // Promiseの結果を返す
              resolve('resolve!!')
            }
          }
          // 書き込み
          writer.write(data)
        })
      })
    },
    async get_data_from_internal_storage(file_name) {
      console.log('start get_data_from_internal_storage')
      var options = {
        exclusive: false,
        create: false
      }
      const fileSystem = await new Promise(function(resolve, reject) {
        window.resolveLocalFileSystemURL(
          // eslint-disable-next-line
          cordova.file.dataDirectory,
          resolve,
          reject
        )
      })
      const fileEntry = await new Promise(function(resolve, reject) {
        fileSystem.getFile(file_name, options, resolve, reject)
      })
      return new Promise(resolve => {
        fileEntry.file(
          function(file) {
            var reader = new FileReader()

            reader.onloadend = function() {
              console.log('Successful file read: ' + this.result)
              console.log(fileEntry.fullPath + ': ' + this.result)
              resolve(this.result)
            }

            reader.readAsText(file)
          },
          function(error) {
            console.log('readFile エラーが発生', error.code)
          }
        )
      })
    }
  }
}
```

### 参考

[Cordova アプリ内でファイル操作を行える「cordova-plugin-file」](http://neos21.hatenablog.com/entry/2017/07/12/080000)

以上です。
