---
title: VuetifyのバリデーションをJavaScriptで実行する
tags:
  - JavaScript
date: 2023-08-01 09:00:00
---

html

```html
<v-form ref="form">
  <v-text-field
      :rules="[rules.required]"
  ></v-text-field>
</v-form>
```

JavaScript

```js
// バリデーション
let form = ref(null)
const rules = ref({
  required: value => !!value || '',
})

const submit = async () => {
  const validResult = await form.value.validate()
  if (!validResult.valid) {
    return
  }
  //以下、submitの処理
}
```
