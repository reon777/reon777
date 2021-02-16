---
title: git-secrets削除後のエラーの解決策
date: 2021-2-16
---

### エラーメッセージ

Git: git: 'secrets' is not a git command. See 'git --help'.

### 原因

git-secrets がインストールされていないが、git-secrets を利用する設定だけ残ってしまっている

### 解決策

git-secrets を利用する設定を削除する

```
rm .git/hooks/commit-msg
rm .git/hooks/pre-commit
rm .git/hooks/prepare-commit-msg
git config --global --unset-all commit.template
```

### 参考

[git secrets を削除する時の注意](https://piruty2.hatenablog.jp/entry/%3Fp%3D521)
