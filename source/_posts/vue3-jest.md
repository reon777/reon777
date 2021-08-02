---
title: Vue3でユニットテストツールのJestを入れたけど諦めた
tags:
  - JavaScript
date: 2021-07-29 09:00:00
---

### ライブラリをインストール

```bash
# testライブラリ
npm install --save-dev jest
# for vue
npm install --save-dev babel-jest
npm install --save-dev babel-preset-env
npm install --save-dev babel-core@bridge
# for vue3
npm install --save-dev @vue/test-utils@next
npm install --save-dev vue-jest@next
```

### test準備

プロジェクトルートディレクトリにjest.config.jsを作成する

※作成しない場合、以下のエラーになった。
`Consider using the "jsdom" test environment.`

```js
module.exports = {
  testEnvironment: "jsdom"
};
```

package.jsonに以下を追加する
※`npm test`でテスト実行できるようにするため

```json
"scripts": {
    "test": "jest",
  },
```

### testコード作成

プロジェクトルートディレクトリに`__tests__/unit/index.js`を作成する

```js
import { mount } from "@vue/test-utils";

// The component to test
const MessageComponent = {
  template: "<p>{{ msg }}</p>",
  props: ["msg"]
};

test("displays message", () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: "Hello world"
    }
  });

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain("Hello world");
});
```

ここまで完了すれば、npm testでテスト実行できる。


と、ここまでは良いのだが、Vue.jsのコードに接続するコードを書くと以下のエラーになった
解決できず、諦めた。。

`({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){<template>` 
