# 概要

reon777 の個人ブログ（静的サイト）  
https://reon777.com

Repository: https://github.com/reon777/reon777

## 利用技術

| Key | Value |
| :-- | :-- |
| フレームワーク | Hexo 8 |
| テーマ | Icarus（npm package） |
| Hosting | Cloudflare Pages |
| Repository | GitHub |
| ドメイン | Route53 at AWS |
| Node.js | 22.13.1 |

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

Cloudflare Pages でホスティングする。
GitHub の `master` に push するとデプロイされる構成にする。

Cloudflare Pages の設定:

| Key | Value |
| :-- | :-- |
| Repository | `reon777/reon777` |
| Branch | `master` |
| Framework preset | Hexo |
| Build command | `npm run build` |
| Build output directory | `public` |
| Environment variables | `NODE_VERSION=22.13.1`, `TZ=Asia/Tokyo` |

Hexo 8 系のため、Cloudflare Pages では `NODE_VERSION=22.13.1` でビルドする。

### テーマ設定

Icarus は `themes/icarus` に vendoring せず、`hexo-theme-icarus` npm package を使う。
テーマ設定は `_config.icarus.yml` に置く。

### テーマを最新化する

```bash
npm install hexo-theme-icarus@latest
npm run build
```

### 独自 CSS

見出しなどの独自 CSS は `source/css/custom.css` を編集する。  
`scripts/custom-css.js` で全ページに読み込む。

### 広告

AdSense の head script は `scripts/adsense.js` で挿入する。
