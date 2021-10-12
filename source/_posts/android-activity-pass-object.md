---
title: Activity間で自作ArrayListを渡す方法
tags:
  - Android
  - Kotlin
date: 2021-10-12 09:00:00
---

![](/images/ムーミン1.jpg)

Activity間で自作ArrayListを渡す方法です。
Kotlinです。
Parcelable化するところが肝です。

<!-- <more> -->

### 流れ

一覧画面から詳細画面に自作クラスのArrayListを渡す流れです。

一覧画面
`MyListActivity.kt`
詳細画面
`MyDetailActivity.kt`
渡すデータ
`MyDataList:ArrayList<MyData>`

### 送信元のActivity（`MyListActivity.kt`）

```kotlin
val intent = Intent(this, MyDetailActivity::class.java)
intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
intent.putParcelableArrayListExtra("MyDataList", MyDataList.list);
startActivity(intent)
```

### 送信するデータのリスト（`MyDataList.kt`）

```kotlin
import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class MyDataList(var list:ArrayList<MyData>) : Parcelable
```

### 送信する個別データ（`MyData.kt`）

```kotlin
import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class MyData(var timeStamp: String) : Parcelable
```

### 送信先のActivity（`MyDetailActivity.kt`）

```kotlin
import android.os.Bundle

class MyDetailActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val myDataList = intent.getParcelableExtra<MyDataList>("MyDataList")
        setContentView(view)
    }
}
```

ちなみにMyDataがただのStringやIntgerなら`putStringArrayListExtra`などを使えば良いのでParcelable化する必要はないです。

今回はMyDataが自作クラスなので`putParcelableArrayListExtra`を使う必要があり、これを使うためにParcelable化が必要だったということです。

以上です。
