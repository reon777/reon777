---
title: 【随時更新】個人的にJavaScriptでよく使う記法まとめ
tags:
  - JavaScript
date: 2020-03-30
---

個人的にJavaScriptでよく使う記法をまとめました

<!-- more -->

## 配列

### for で回す

```js
let cars = ['BMW', 'Volvo', 'Mini']
for (let car of cars) {
  console.log(car) // 'BMW'
}
```
### for で回す（index付き）

```js
let cars = ['BMW', 'Volvo', 'Mini']
for (let [index, car] of cars.entries()) {
  console.log(car) // 'BMW'
}
```

### forEach で回す

```js
let cars = ['BMW', 'Volvo', 'Mini']
cars.forEach(car => { console.log(car) }) // 'BMW'
```

### 値を取り除く

```js
let cars = ['BMW', 'Volvo', 'Mini']
cars = cars.filter(car => { car !== 'Volvo' })
console.log(cars) // ['BMW', 'Mini']
```

### ある値が含まれるかどうか

```js
let cars = ['BMW', 'Volvo', 'Mini']
cars.includes('Volvo') // true
```

## 連想配列（JSON)

### 初期化

```js
for (var member in myObject) delete myObject[member];
```

### for で回す

```js
let person = { full_name: 'John', last_name: 'Doe', age: 25 }
for (let key in person) {
  console.log(key) // 'full_name'
  console.log(person[key]) // 'John'
}
```

### キーの配列を作成

```js
let person = { full_name: 'John', last_name: 'Doe', age: 25 }
Object.keys(person) // ['full_name', 'last_name', 'age']
```

### 件数を取得

```js
let person = { full_name: 'John', last_name: 'Doe', age: 25 }
Object.keys(person).length // 3
```

### ディープコピー

```js
let person = { full_name: 'John', last_name: 'Doe', age: 25 }
JSON.parse(JSON.stringify(person))
```

### 配列を csv ファイルとしてダウンロードする

https://code-maven.com/create-and-download-csv-with-javascript

### 参考

https://www.w3schools.com/js/js_loop_for.asp
