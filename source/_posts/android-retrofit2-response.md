---
title: 【Android開発】Retrofit2のレスポンスを文字列として取り出す方法
tags:
  - Android
date: 2021-03-19
---

Retrofit2のレスポンスを文字列として取り出す方法です。
レスポンスは例えば以下のようなイメージです。

{"error_code":"E100001000","messages":["僕はエラーメッセージだよ"]}

```java
Call<ResponseBody> call = client.hoge();
Response<ResponseBody> response = call.execute();
if (response.isSuccessful()) {
    response.body().close();
} else {
    List<String> list = getErrorMessages(response.errorBody().string());
    Objects.requireNonNull(getActivity()).runOnUiThread(() -> Toast.makeText(getContext(), list.get(0), Toast.LENGTH_LONG).show());
}

/**
  * APIのエラーレスポンスからmessagesを取り出してListとして返す
  */
public static List<String> getErrorMessages(String errorBody) throws JSONException {
    JSONObject errorJson = new JSONObject(errorBody);
    String s = errorJson.getString("messages");
    s = s.replace("[", "").replace("]", "");
    String[] split = s.split(",");
    return Arrays.asList(split);
}
```

replace周りで地味にハマってしまった、、
