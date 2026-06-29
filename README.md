# 概要

reon777 の個人ブログ（静的サイト）  
https://reon777.com

## 利用技術

| Key            | Value          |
| :------------- | :------------- |
| フレームワーク | Hexo           |
| Hosting        | Cloudflare Pages |
| ドメイン       | Route53 at AWS |
| Node.js        | 22.13.1 |

## 開発

```bash
npm run server
```

## 初期設定

```bash
nvm install
npm install
```

### 新しい記事を作成

```bash
npx hexo new "AndroidBeaconCrash"
```

### キャッシュを削除

```bash
npm run clean
npm run build
```

### デプロイ

Cloudflare Pages で自動化済み
GitLab に push するとデプロイされる

Cloudflare Pages の設定:

| Key | Value |
| :-- | :-- |
| Framework preset | Hexo |
| Build command | `npm run build` |
| Build output directory | `public` |
| Environment variables | `NODE_VERSION=22.13.1`, `TZ=Asia/Tokyo` |

Hexo 8 系のため、Cloudflare Pages では `NODE_VERSION=22.13.1` でビルドする。

### やったこと

```bash
# サイトマップ
npm install hexo-generator-sitemap --save

# フィード
npm install hexo-generator-feed --save
```

### テーマを最新化する

```bash
npm install hexo-theme-icarus@latest
```

### 見出しのデザイン変える

`source/css/custom.css`を編集する。
