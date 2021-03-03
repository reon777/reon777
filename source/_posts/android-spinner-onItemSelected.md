---
title: 【Android】Spinnerの初期表示時にonItemSelectedが呼ばれちゃう対処法
tags:
  - Android
date: 2021-3-3
---

Spinnerの初期表示時にonItemSelectedが呼ばれちゃう対処法です。
初回に呼ばれるまでfocusableをfalseにしておき、初回に呼ばれたらtrueにする作戦です。

```java
public class HogeFragment extends BaseFragment implements AdapterView.OnItemSelectedListener {

    public View onCreateView(final LayoutInflater inflater, final ViewGroup container, final Bundle savedInstanceState) {
        spinner.setFocusable(false);
    })

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        // 画面表示時にonItemSelectedが呼ばれちゃう対処法
        Spinner spinner = mRoot.findViewById(R.id.spinner_id);
        if (!spinner.isFocusable()) {
            spinner.setFocusable(true);
            return;
        }
    }
  }
```

以上です！
