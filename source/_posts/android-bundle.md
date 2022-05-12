---
title: 【Android】Activity/Fragment周りのデータ受け渡し方法(Java)
tags:
  - Android
date: 2022-05-12 09:00:00
---

## はじめに

Activity/Fragment周りのデータ受け渡しの方法まとめです。
Javaです。

## ActivityからActivity

送信元のActivity

```java
  Intent intent = new Intent(this, ToActivity.class);
  bundle.putExtra("NAME", "太郎");
  startActivity(intent);
  finish();
```

送信先のActivity(ToActivity)

```java
  @Override
  protected void onCreate(final Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent intent = getIntent();
    String name = intent.getStringExtra("NAME");
  }
```

ポイントはbundleが不要なところです。

## ActivityからFragment

送信元のActivity

```java
  ToFragment fragment = new ToFragment();
  Bundle bundle = new Bundle();
  bundle.putString("NAME", "太郎");
  fragment.setArguments(bundle);
  getSupportFragmentManager()
          .beginTransaction()
          .add(android.R.id.content, fragment)
          .commit();
```

送信先のFragment(ToFragment)

```java
    @Override
    public void onResume() {
    super.onCreate();

    Bundle args = getArguments();
    if (args != null) {
        String name = args.getString("NAME");
    }
  }
```

ポイントはbundleを使うところです。

## FragmentからActivity

確認中

## FragmentからFragment

確認中
