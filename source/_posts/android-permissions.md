---
title: 【Android開発】[Java]許可ダイアログを出すシンプルな方法
tags:
  - Android開発
date: 2021-01-29
---

![](/images/ムーミン1.jpg)

Androidで許可ダイアログを出す方法です。

利用ライブラリ
https://github.com/permissions-dispatcher/PermissionsDispatcher

### 1. AndroidManifestの設定

AndroidManifest.xml

```xml
<!-- この行を追加する -->
<uses-permission android:name="android.permission.CAMERA" />
```

### 2. 許可が必要な機能を持っているクラスにアノテーションを付与する

```java
@RuntimePermissions // この行を追加する
public class HogeFragment {

// いろいろな処理

}
```

### 3. 許可が必要な機能を実行する関数を修正する

関数の後ろに`WithPermissionCheck`を追加するだけ

```java
@RuntimePermissions
public class HogeFragment {

    public void onClick(final View v) {
      // needPermission()
      needPermissionWithPermissionCheck(this)
    }

}
```

### 4. 許可が必要な関数にアノテーションを付与する

```java
@RuntimePermissions
public class HogeFragment {

    @NeedsPermission(Manifest.permission.CAMERA) // この行を追加する
    public void piyo() {
      // 許可が必要な処理
    }

}
```

### 5. 許可の結果を受け取る関数を作成する

```java
@RuntimePermissions
public class HogeFragment {

    // 以下の関数を追加する
    @SuppressLint("NeedOnRequestPermissionsResult") // この行はライブラリのバージョンが古い時に出るワーニング対策
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (PermissionUtils.verifyPermissions(grantResults)) {
            piyo();
        }
    }
  }
```

以上です

参考
[PermissionsDispatcherによる権限管理](https://qiita.com/beyondseeker/items/1f964d011ee0a10d9376)
