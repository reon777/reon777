---
title: 【Android開発】TextViewの一部をハイパーリンクにする【Java】
tags:
  - Android
date: 2021-3-17
---

TextView の一部をハイパーリンクにする方法です。
やりたいことはこんな簡単なことなのに、Android 開発ってなんでこんなに複雑なコードになっちゃうんですかね、、

```java
/**
 * テキストにハイパーリンクを設定する
 */
TextView textView = root.findViewById(R.id.hoge);
String link_text = "こちら";
String link_url = "https://hoge.com";
addHyperLink(textView, link_text, link_url, this);

/**
 * テキストにハイパーリンクを設定する関数
 */
public static void addHyperLink(TextView textView, String link_text, String link_url, Fragment fragment) {
    Map<String, String> map = new HashMap<>();
    map.put(link_text, link_url);
    SpannableString ss = MiscUtils.createSpannableString(textView.getText().toString(), map, fragment);
    textView.setText(ss);
    textView.setMovementMethod(LinkMovementMethod.getInstance());
}

/**
 * 内部関数
 */
private static SpannableString createSpannableString(String message, Map<String, String> map, Fragment fragment) {

    SpannableString ss = new SpannableString(message);

    for (final Map.Entry<String, String> entry : map.entrySet()) {
        int start = 0;
        int end = 0;

        // リンク化対象の文字列の start, end を算出する
        Pattern pattern = Pattern.compile(entry.getKey());
        Matcher matcher = pattern.matcher(message);
        while (matcher.find()) {
            start = matcher.start();
            end = matcher.end();
            break;
        }

        // SpannableString にクリックイベント、パラメータをセットする
        ss.setSpan(new ClickableSpan() {
            @Override
            public void onClick(View textView) {
                String url = entry.getValue();
                Uri uri = Uri.parse(url);
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                fragment.startActivity(intent);
            }
        }, start, end, Spanned.SPAN_INCLUSIVE_INCLUSIVE);
    }

    return ss;
}
```

## 参考

[TextView の一部のリンク化＋クリックイベントの指定、をサクッと作る](https://qiita.com/suzukihr/items/19a2ec4b9a163b151164)
