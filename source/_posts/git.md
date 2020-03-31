---
title: 【Git】忘れやすいgitコマンドまとめ
date: 2020-03-31
---

### はじめに

個人的に忘れやすい git コマンドをメモしておきます

### ブランチ作成

```bash
git checkout -b hoge
```

### ブランチ削除（ローカル）

```bash
git branch -D hoge
```

### ブランチ削除（リモート）

```bash
git push --delete origin hoge
```

### マージ(master の内容を hoge に取り込む)

```bash
git checkout hoge
git merge master
git merge origin/dev-gyas-17num
```

### チェリーピック（特定のコミットを取り込む）

```bash
git cherry-pick 123456789abcde
```

### コミットを戻す

```bash
git reset --hard 123456789abcde
```

### ２つ以上前のコメントの変更

```bash
git log --oneline
git rebase -i 123456789abcde # 直前のコミットを指定する
editに変更して保存
git commit --amend
コミットメッセージを編集
git rebase --continue
```
