---
title: iPad向けCSS対応
tags:
  - css
date: 2020-11-24
---

![](/images/ムーミン1.jpg)

端末サイズによって font-size を変えたい時、rem を使うと思いますが、意外と rem は万能ではなく、iPad だとかなり小さく見えます。

なので以下のように端末サイズによって分岐して指定した方が良いです。

```css
/* for iPad */
@media screen and (min-width: 768px) {
  html {
    font-size: 1.2rem;
  }
}

/* for iPhone */
@media screen and (max-width: 767px) {
  html {
    font-size: 0.7rem;
  }
}
```
