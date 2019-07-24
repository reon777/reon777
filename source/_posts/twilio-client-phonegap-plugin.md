---
tags:
  - cordova
  - twilio
date: 2019-06-13
title: 【Cordova】twilio-client-phonegap-pluginのインストールでハマったのでメモ
---

## 環境

- Mac Mojave: 10.14.4
- twilio-client-phonegap-plugin: 1.1.1

<!-- more -->

### 利用するプラグイン

https://www.npmjs.com/package/twilio-client-phonegap-plugin

## インストール

`cordova plugin add twilio-client-phonegap-plugin`

うん、問題ない。

## ビルド

### エラー０

ビルド`cordova build android --release`すると以下のエラーが発生

##### エラー詳細

```bash
* What went wrong:
Execution failed for task ':app:processReleaseManifest'.
> Manifest merger failed : Attribute application@appComponentFactory value=(androidx.core.app.CoreComponentFactory) from [androidx.core:core:1.0.0] AndroidManifest.xml:22:18-86
        is also present at [com.android.support:support-compat:28.0.0] AndroidManifest.xml:22:18-91 value=(android.support.v4.app.CoreComponentFactory).
        Suggestion: add 'tools:replace="android:appComponentFactory"' to <application> element at AndroidManifest.xml:5:5-34:19 to override.
```

##### 解決策

これは以下の２つを追加して解決

- `platforms/android/app/src/main/AndroidManifest.xml`の<manifest>要素に`xmlns:tools="http://schemas.android.com/tools""`を追加
- `platforms/android/app/src/main/AndroidManifest.xml`の<application>要素に`tools:node="replace"`を追加

参考
[エラー Android studio で Manifest merger failed が発生してしまう](https://teratail.com/questions/161601)

### エラー１

##### エラー詳細

ビルドすると、

```bash
> Error: java.util.concurrent.ExecutionException: com.android.tools.aapt2.Aapt2Exception: AAPT2 error: check logs for details
（略）
resource android:attr/fontVariationSettings not found
```

のエラー発生

##### 解決策

これは`android/build.gradle`と`android/app/build.gradle`を以下のように修正して解決

```bash
# 修正前
classpath 'com.android.tools.build:gradle:3.0.1'
# 修正後
classpath 'com.android.tools.build:gradle:3.2.0-alpha13'
```

参考
[AndroidStudio3.1.2 で AAPT2 エラーが出た時の対処法](https://qiita.com/TaigaNatto/items/441cffd7a8bc3095c93a)

### エラー２

##### エラー詳細

で、改めてビルドすると次は

```bash
* What went wrong:
A problem occurred evaluating project ':CordovaLib'.
> Failed to apply plugin [id 'com.android.library']
   > Minimum supported Gradle version is 4.6. Current version is 4.1. If using the gradle wrapper, try editing the distributionUrl in hoge/gradle/wrapper/gradle-wrapper.properties to gradle-4.6-all.zip
```

のエラー

##### 解決策

これは`platforms/android/cordova/lib/builders/StudioBuilder.js`を以下の通りに修正して解決

```bash
# 修正前：
var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'https\\://services.gradle.org/distributions/gradle-4.1-all.zip';
# 修正前：
var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'https\\://services.gradle.org/distributions/gradle-4.6-all.zip';
```

参考
[Cordova で Gradle のバージョンが低いと怒られた](https://qiita.com/mana-bin/items/eaa0c2c2335140e3f707)

### エラー３

##### エラー詳細

```bash
* What went wrong:
Execution failed for task ':app:processReleaseResources'.
> Android resource linking failed
  Output:  platforms/android/app/build/intermediates/incremental/mergeReleaseResources/merged.dir/values/values.xml:221: error: resource android:attr/fontVariationSettings not found.
  platforms/android/app/build/intermediates/incremental/mergeReleaseResources/merged.dir/values/values.xml:221: error: resource android:attr/ttcIndex not found.
  error: failed linking references.
```

この辺で少し心が折れかける、、

##### 解決策

が、`/android/app/build.gralde`を以下の通り修正するといけた

```bash
# 修正前
cdvCompileSdkVersion = null;
# 修正後
cdvCompileSdkVersion = 28;
```

参考
[Cloud Firestore プラグインのバージョン 0.9.0 でビルドエラーが出たのでその対策メモ](https://kwmt27.net/2019/02/02/build-error-with-cloud-firestore-v0.9.0/)

### エラー４

##### エラー詳細

```bash
* What went wrong:
Execution failed for task ':app:compileReleaseJavaWithJavac'.
> Compilation failed; see the compiler error output for details.
(略)
BUILD FAILED in 2s
27 actionable tasks: 2 executed, 25 up-to-date
/platforms/android/gradlew: Command failed with exit code 1 Error output:
/platforms/android/app/src/main/java/com/gae/scaffolder/plugin/MyFirebaseInstanceIDService.java:6: エラー: シンボルを見つけられません
import com.google.firebase.iid.FirebaseInstanceIdService;
                              ^
```

##### 解決策

{% post_link MyFirebaseInstanceIDService-java-6 %}
これでようやくビルド成功

さーてようやくソースの修正に入れる
けどソース修正でもまた何かハマる気がする、、

がんばろ
