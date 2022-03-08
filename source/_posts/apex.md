---
title: 【Salesforce】Apexの使い方メモ
date: 2022-03-09
---

![](/images/ムーミン1.jpg)

### Apexとは

Salesforceの開発に特化したプログラミング言語
→ライブラリのインストール不要でいきなりオブジェクトにアクセスできたりする
雰囲気はJavaに似てる

<!-- more -->

### デバッグログを表示する

```java
System.debug('表示したいログ')
```

右上の設定アイコン＞開発者コンソール＞Logs
を開いた状態で、Debug Onlyにチェックを入れる

また、開発者コンソール＞Debug＞Open Execute Anonymous Window
から使い捨てのテストコードを実行できる

### 通常のSELECT

```java
String targetDepartment = 'Wingo';
Contact[] techContacts = [SELECT FirstName,LastName FROM Contact WHERE Department=:targetDepartment];
```

SOQL クエリを作成する
https://trailhead.salesforce.com/ja/content/learn/modules/apex_database/apex_database_soql

### SOSLでのSELECT

以下の場合はSOQLではなくSOSLを利用する必要がある
- 全てのオブジェクト（いわゆるテーブル）を対象に検索をしたい場合
- 部分一致で検索したい場合

```java
List<List<SObject>> searchList = [FIND '検索対象の単語をここに入れる' IN ALL FIELDS RETURNING Account(Name), Contact(FirstName,LastName)];
```


### DBへのCRUD

```java
// 取引先レコードを作成
Account acct = new Account(Name='Acme', Phone='(415)555-1212', NumberOfEmployees=100);
// DBに登録する
insert acct;
// IDを取得する
ID acctID = acct.Id;
// ログ表示
System.debug('ID = ' + acctID);
```

リスト形式で一括挿入とかもできる。

DML を使用してレコードを操作する
https://trailhead.salesforce.com/ja/content/learn/modules/apex_database/apex_database_dml

### トリガ

レコード追加・更新・削除の直前or直後にアクションしたい場合はトリガを利用する

例えば取引先オブジェクトにレコードを追加する直前に何か操作を行いたい場合は以下の通り

```java
trigger HelloWorldTrigger on Account (before insert) {
	System.debug('Hello World!');
}
```

Apex トリガ入門
https://trailhead.salesforce.com/ja/content/learn/modules/apex_triggers/apex_triggers_intro

### 外部APIの実行

外部APIは全て非同期で実行される
futureを付与するのがポイント

```java
public class CalloutClass {
    @future(callout=true)
    public static void makeCallout() {
        HttpRequest request = new HttpRequest();
        String endpoint = 'http://yourHost/yourService';
        request.setEndPoint(endpoint);
        request.setMethod('GET');
        HttpResponse response = new HTTP().send(request);
    }
}

CalloutClass.makeCallout();
```
