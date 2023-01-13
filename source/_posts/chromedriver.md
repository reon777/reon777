---
title: ChromeDriverのバージョンエラー
date: 2023-01-13 09:00:00
---

### エラー

```
session not created: This version of ChromeDriver only supports Chrome version 94
Current browser version is 96.0.4664.55 with binary path /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

### 原因

ブラウザのバージョンを上げたので、合わせてchromeDriverのバージョンを上げないといけないっぽい

### 解決策

```
brew upgrade chromeDriver
```
