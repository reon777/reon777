---
title: Kotlinの勉強メモ
tags:
  - Kotlin
date: 2020-10-12
---

![](/images/ムーミン1.jpg)

日本語化
https://sukkiri.jp/technologies/ides/intellij-idea/intellij-idea-mac.html

Kotlin Bootcamp for Programmers 2
https://codelabs.developers.google.com/codelabs/kotlin-bootcamp-basics/#0

- 変数を宣言する時に自動的に型が設定される（明示的に型を宣言することも可能）
- 変数に別の方の値を代入するとエラーになる（自動的に型変換されない）
- val→ 値を変更不可能
- var→ 値を変更可能
- 変数の結合は+演算子
- 通常は変数に null を入れることはできない
- 入れたい場合は`var marbles: Int? = null`のように?を付けて宣言する
- null だったらエラーを吐く場合は`!!`を使う →`val len = s!!.length `
- リストの宣言は listOf→`val school = listOf("mackerel", "trout", "halibut")`
- 配列の宣言は listOf→`val school = arrayOf("shark", "salmon", "minnow")`
- リストは要素数が可変だけど配列の方がアクセスが早い

配列を for ループ

```kotlin
val school = arrayOf("shark", "salmon", "minnow")
for (element in school) {
    print(element + " ")
}
```

配列をインデックス付きの for ループ

```kotlin
for ((index, element) in school.withIndex()) {
    println("Item at $index is $element\n")
}
```

- main()に引数を渡す →[実行]> [構成の編集]>[プログラム引数]

関数を１行で書く

```kotlin
fun isTooHot(temperature: Int) = temperature > 30
```

リストから一部だけ抽出

```kotlin
val decorations = listOf("rock", "pagoda", "plastic plant", "alligator", "flowerpot")
// 先頭がpの文字列だけを抽出
val eager = decorations.filter({x -> x[0] == 'p'})
// 以下は等価
// val eager = decorations.filter {it[0] == 'p'}
println("eager: $eager")
```

ラムダ関数

- ラムダ関数（無名関数）を waterFilter 変数に入れている
- 引数として Int 型を受け取り、Int 型を返す

```kotlin
val waterFilter: (Int) -> Int = { dirty -> dirty / 2 }

// 引数が1つの場合はitとして表現可能
val waterFilter: (Int) -> Int = { it / 2 }

waterFilter(10)
```

関数を引数に与える時は`::`を使う

```kotlin
fun increaseDirty( start: Int ) = start + 1
println(updateDirty(15, ::increaseDirty))
```

```kotlin
fun increaseDirty( start: Int ) = start + 1
println(updateDirty(15, ::increaseDirty))
```

クラスの変数に設定できる修飾子は以下の４つ
アクセス可能な範囲は以下の通り

1. public→ どこからでも
2. internal→ 同じモジュール内であれば
3. private→ 同じクラス内であれば
4. protected→ 同じサブクラス内であれば

クラスやクラス内変数はデフォルトだとサブクラスによる上書きはできない
上書きを許可する場合は`open`をつける →`open val shape = "rectangle"`

Aquarium クラスを TowerTank がオーバーライドする例

```kotlin
class TowerTank (override var height: Int, var diameter: Int): Aquarium(height = height, width = diameter, length = diameter) {
  override var volume: Int
    // ellipse area = π * r1 * r2
    get() = (width/2 * length/2 * height / 1000 * PI).toInt()
    set(value) {
        height = ((value * 1000 / PI) / (width/2 * length/2)).toInt()
    }
```

- ラムダ式の`return`は外側の関数の`return`となる
- 関数の早期脱出が目的であればラムダ式ではなく代わりに匿名関数を利用する必要がある
