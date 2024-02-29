---
title: Android開発でJavaバージョンに関するビルドエラー
tags:
  - Android
date: 2024-02-29 10:00:00
---

### ビルドエラーの内容

```bash
> Could not resolve all files for configuration ':classpath'.
   > Could not resolve com.android.tools.build:gradle:7.4.2.
     Required by:
         project :
      > No matching variant of com.android.tools.build:gradle:7.4.2 was found. The consumer was configured to find a runtime of a library compatible with Java 8, packaged as a jar, and its dependencies declared externally, as well as attribute 'org.gradle.plugin.api-version' with value '7.5' but:
          - Variant 'apiElements' capability com.android.tools.build:gradle:7.4.2 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares an API of a component compatible with Java 11 and the consumer needed a runtime of a component compatible with Java 8
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
          - Variant 'javadocElements' capability com.android.tools.build:gradle:7.4.2 declares a runtime of a component, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 8)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
          - Variant 'runtimeElements' capability com.android.tools.build:gradle:7.4.2 declares a runtime of a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component compatible with Java 11 and the consumer needed a component compatible with Java 8
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
          - Variant 'sourcesElements' capability com.android.tools.build:gradle:7.4.2 declares a runtime of a component, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 8)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '7.5')
```

### 原因

Java のバージョンが合っていない

### IDEの設定

Android Studio>Settings>Build,Execution,Deployment>Build Tools>Gradle>Gradle JKDでjava11を設定する  
パスをコピーしておく

### プロジェクト本体の設定

`gradle.properties`ファイルにコピーしたパスを追記する。  
例えば以下など

```bash
/Library/Java/JavaVirtualMachines/openjdk-11.0.1.jdk/Contents/Home
```
