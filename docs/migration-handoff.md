# reon777.com 移行引き継ぎ

最終更新: 2026-07-01

## 概要

`reon777.com` の Hexo ブログを、Netlify + GitLab/Route53 DNS から GitHub + Cloudflare Pages/Cloudflare DNS へ移行中。

静的サイト本体は Cloudflare Pages で正常にデプロイ済み。独自ドメイン `reon777.com` も Cloudflare Pages の custom domain として `Active / SSL 有効` になっている。

2026-07-01 時点で DNS 切り替えが完了。全 resolver（システム/ルーター含む）で Cloudflare IP を返し、`reon777.com` は `server: cloudflare` で正常応答。Netlify サイトも削除済み。

## 完了済み

- GitHub repository 作成
  - `https://github.com/reon777/reon777`
  - visibility: Public
  - `origin` は GitHub を向いている
- npm 版 Icarus へ移行
  - 旧 `themes/icarus` vendoring は削除
  - `hexo-theme-icarus` を npm dependency として利用
  - テーマ設定は `_config.icarus.yml`
- Hexo/Node 更新
  - Hexo: `8.1.2`
  - Node.js: `22.13.1`
  - `.nvmrc` 更新済み
- npm 運用へ統一
  - `package-lock.json` を利用
  - `yarn.lock` は削除
- Cloudflare Pages デプロイ
  - Project: `reon777`
  - Pages URL: `https://reon777.pages.dev`
  - Production branch: `master`
  - Build command: `npm run build`
  - Build output directory: `public`
  - Environment variables: `NODE_VERSION=22.13.1`, `TZ=Asia/Tokyo`
- GitHub Actions build CI 追加
  - `.github/workflows/build.yml`
  - `npm ci` と `npm run build`
  - GitHub Actions は success 確認済み
- 独自 CSS 復元
  - `source/css/custom.css`
  - `scripts/custom-css.js` で head に読み込み
- AdSense head script 復元
  - `scripts/adsense.js`
- アイコン復元
  - `source/images/avatar.png`
- Cloudflare DNS へ移行
  - Nameserver:
    - `cass.ns.cloudflare.com`
    - `terry.ns.cloudflare.com`
  - Cloudflare zone は Active
- Cloudflare Pages custom domain
  - `reon777.com`
  - Status: `Active`
  - SSL: 有効
- Cloudflare DNS 現在レコード
  - `CNAME reon777.com -> reon777.pages.dev` Proxied
  - `TXT reon777.com -> google-site-verification=miwVKCV2yEd7epc2y5e55s_Ih8pvubyGSo0pAgJSoV8` DNS only

## 確認済みの正常系

`https://reon777.pages.dev` は正常。

確認済み:

- トップページ: 200
- `/css/custom.css`: 200
- `/images/avatar.png`: 200
- `/atom.xml`: 200
- `/sitemap.xml`: 200
- `/ads.txt`: 200
- `/img/og_image.png`: 200
- HTML 内に AdSense script あり
- HTML 内に Google Analytics あり
- タグ一覧ウィジェットは 1 個だけ
- アーカイブウィジェットは 1 個だけ

`reon777.com` も Cloudflare IP を明示すれば Pages が返ることを確認済み。

例:

```bash
curl --resolve reon777.com:443:104.21.62.141 -I https://reon777.com/css/custom.css
curl --resolve reon777.com:443:172.67.136.166 -I https://reon777.com/css/custom.css
```

どちらも `200` で、`server: cloudflare` を返す。

## 現在の注意点

DNS 切り替えは完了済み（2026-07-01）。以前あった旧 Netlify IP のキャッシュ問題はすべて解消。

参考（当時の状況・解決済み）:

- `.com` レジストリの委任は早期に Cloudflare (`cass` / `terry.ns.cloudflare.com`) へ切替済みだった
- 一部環境で旧 Netlify IP `104.198.14.52` が返っていた原因は、ルーター/ISP resolver が旧 NS 委任（AWS Route53）をキャッシュしていたため。NS の TTL が長く（約18時間）、OS のキャッシュフラッシュでは消えなかった
- NS キャッシュ失効後、全 resolver で Cloudflare IP を返すようになり解消

## 次にやること

### 1. 独自ドメイン再確認 ✅ 完了 (2026-07-01)

確認コマンド:

```bash
dig +short A reon777.com
curl -I https://reon777.com
curl -I https://reon777.com/css/custom.css
```

完了条件（すべて達成）:

```text
dig が Cloudflare IP を返す         → 172.67.136.166 / 104.21.62.141
curl https://reon777.com            → server: cloudflare
/css/custom.css                     → 200
```

### 2. Netlify を停止/削除 ✅ 完了 (2026-07-01)

全 resolver で Cloudflare 切替を確認後に削除。削除後も top / CSS / avatar / atom.xml すべて `200` / `server: cloudflare` で正常配信を確認済み。

### 3. Route53 Hosted Zone を削除 ✅ 完了 (2026-07-01)

`.com` レジストリの委任が Cloudflare (`cass` / `terry`) を向いていること、および Route53 Hosted Zone がもう参照されていないことを確認後に削除。削除後も top / CSS / avatar すべて `200` / `server: cloudflare` で正常配信を確認済み。

あわせて未使用の Hosted Zone `reon777.tech` も削除（NS 委任なし・名前解決も死んでいた完全な未使用ゾーン）。

削除したもの:

- Route53 Hosted Zone `reon777.com`
- Route53 Hosted Zone `reon777.tech`（未使用）

残したもの（削除していない・してはいけない）:

- Amazon Registrar の Registered domain `reon777.com`（ドメイン所有そのもの）

補足:

- Hosted Zone 削除時は NS / SOA 以外のレコードを先に削除する必要がある（残っていると `non-required resource record sets` エラーで削除不可）
- これで毎月 200 円前後の Route53 Hosted Zone 課金は停止する見込み

## AWS 請求について

毎月 200 円前後の AWS 請求は、Route53 Hosted Zone 料金の可能性が高い。

Route53 Hosted Zone は通常 `$0.50/month` 程度の固定費がある。DNS query、税、為替で月 100〜200 円程度になることがある。

`.com` ドメイン登録料は通常年額で、毎月 200 円の細かい請求とは別。

## Cloudflare DNS の補足

Cloudflare に移したのは DNS 管理。ドメイン登録自体は Amazon Registrar のまま。

現在の nameserver:

```text
cass.ns.cloudflare.com
terry.ns.cloudflare.com
```

DNSSEC は Cloudflare 移行時に OFF 推奨。Route53 側で有効にしていた場合は確認が必要。

## www について

現時点で `www.reon777.com` は未設定。

Cloudflare 画面には `www` がない旨の警告が出るが、現在 `www` を使っていないなら急ぎではない。

必要なら後で Pages custom domain に `www.reon777.com` も追加し、`www -> reon777.com` の redirect rule を設定する。

## ローカル開発

```bash
nvm install
npm install
npm run server
```

ビルド:

```bash
npm run clean
npm run build
```

CI 相当:

```bash
npm ci
npm run build
```

## 主要ファイル

- `README.md`: 現在の開発/デプロイ概要
- `_config.yml`: Hexo 本体設定
- `_config.icarus.yml`: Icarus テーマ設定
- `package.json`: scripts と dependencies
- `.nvmrc`: Node.js version
- `.github/workflows/build.yml`: GitHub Actions build CI
- `source/css/custom.css`: 独自 CSS
- `scripts/custom-css.js`: 独自 CSS 読み込み
- `scripts/adsense.js`: AdSense script 挿入
- `source/images/avatar.png`: サイトアイコン/プロフィール画像

## 最終的な理想状態 ✅ 達成 (2026-07-01)

移行はすべて完了。以下の状態に到達済み。

```text
GitHub              reon777/reon777          ✅
Cloudflare Pages    reon777                  ✅
Cloudflare DNS      reon777.com              ✅
Custom domain       https://reon777.com      ✅ server: cloudflare
Netlify             削除済み                  ✅
Route53 Hosted Zone 削除済み (com / tech)     ✅
Amazon Registrar    reon777.com 登録維持      ✅
```
