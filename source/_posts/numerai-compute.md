---
title: Numerai-Computeのエラー対応
date: 2020-07-6
tags:
  - Numerai
---

![](/images/numerai.png)

## はじめに

Numerai の提出を自動化しようとしたらめちゃくちゃハマったので解決策をメモしておきます。

公式チュートリアル
https://docs.numer.ai/help/compute-tutorial

## 最初に試すこと

<!-- more -->

`numerai destroy`

普通はこれで初期化できるはずらしいです

自分の場合はダメだったので以下、エラーと解決策を列挙します
ほとんどは`numerai setup`で前のデータが残ってしまっていることが原因です
なので前のデータを削除する対応が必要となります

## エラー一覧

### `Error: error using credentials to get account ID: error calling sts:GetCallerIdentity: InvalidClientTokenId: The security token included in the request is invalid.`

- IAM の id とパスワードが間違っている。
  `~/.numerai`を修正する

### `Error: Error creating VPC: VpcLimitExceeded: The maximum number of VPCs has been reached.`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/vpc/home?region=us-east-1#vpcs:sort=VpcId
  上限は５つまで

### `Error: Error creating IAM Role numerai-submission-ecs:`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/iam/home?region=us-east-1#/roles

### `Error: Error creating IAM policy numerai-submission_lambda_logging: EntityAlreadyExists: A policy called numerai-submission_lambda_logging already exists. Duplicate names are not allowed.`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/iam/home?region=us-east-1#/policies

### `Error: Error creating Lambda function: ResourceConflictException: Function already exist: numerai-submission`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions

### `Error: Error waiting for internet gateway (igw-0fe357aa54217a5d7) to detach: couldn't find resource (31 retries)`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/apigateway/main/apis?region=us-east-1

### `Error: Creating CloudWatch Log Group failed: ResourceAlreadyExistsException: The specified log group already exists:`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups

### `Error: error creating ECR repository: RepositoryAlreadyExistsException:`

- 以下の URL から対象のデータを削除する
  https://console.aws.amazon.com/ecr/repositories?region=us-east-1#

### `subprocess.CalledProcessError: Command 'docker run --rm -it -v /Users/hoge/example-numerai:/opt/app -w /opt/app 385897885420.dkr.ecr.us-east-1.amazonaws.com/numerai-submission python train.py' returned non-zero exit status 137.`

- メモリ不足
  Docker のメモリを増やす
  元々 2GB だったのを 16GB に増やすと成功しました(フォーラム上では 12GB で成功したとあるが、自分の場合は 12GB だとダメだった)

### `AttributeError: module 'model' has no attribute 'model_id'`

- `predict.py`の以下の行(51 行目)を修正する

```python
    - model_id=model.model_id)
    + model_id=model.LinearModel.model_id)
```

- `model.py`の以下の行(12 行目)にモデル ID をセットする
  モデル ID は以下から取得可能
  https://numer.ai/models

```python
    - model_id = None
    + model_id = 'hoge'
```

### `ERROR numerapi.base_api: Your session is invalid or has expired.`

- すでに提出済みのモデルがある場合に発生する
  複数モデルの提出について同意する必要がある
  https://numer.ai/models ＞ ENABLE MULTI-MODEL SUPPORT ＞ NumeraAPI(Python)にチェック・同意するにチェック＞ ADD NEW MODEL
  でモデルを作成して、モデル ID をコピーして`model.py`の以下の行(12 行目)にをセットする

```python
    - model_id = None
    + model_id = 'hoge'
```

- API キーが正しいか確認する
  `cat ~/.numerai`

### おわりに

上でもダメだったら公式フォーラムで調べると出てくるかもです
https://community.numer.ai/channel/support

以上です
