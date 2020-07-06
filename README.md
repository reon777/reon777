# 概要

reon777 の個人ブログ（静的サイト）  
https://reon777.com

## 利用技術

| Key            | Value          |
| :------------- | :------------- |
| フレームワーク | Hexo           |
| Hosting        | Netlify        |
| ドメイン       | Route53 at AWS |

## 開発

hexo server

### 新しい記事を作成

```bash
hexo new "numerai-compute"
```

### キャッシュを削除

```bash
hexo clean
hexo g
```

### デプロイ

Netlify で自動化済み
gitlab に push するとデプロイされる

### やったこと

```bash
# サイトマップ
npm install hexo-generator-sitemap --save

# フィード
npm install hexo-generator-feed --save
```

### テーマを最新化する

```bash
cd themes/icarus
git pull
```

### 見出しのデザイン変える

`border-bottom: solid 3px #0080002e;`で検索する
