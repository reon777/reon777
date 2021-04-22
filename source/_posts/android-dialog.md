---
title: 【Android】ダイアログのサンプルコード
tags:
  - Android
date: 2021-04-22
---

## はじめに

Android のダイアログのクラスが色々あって混乱したので整理しました。

まず、ダイアログ関連のクラスは以下の３種類あります。

1. Dialog
2. AlertDialog
3. DialogFragment

1 の Dialog は大元のクラスです。
これを直接扱うことはないです。

2 の AlertDialog は 1 の Dialog のサブクラスです。
一応これを使えばダイアログは表示できるのですが、これを直接使うのはメモリリークするので非推奨です。

参考
[Android のダイアログ表示でメモリリーク？](http://memory.empressia.jp/article/43505886.html)

じゃあどうするのということで、3 の DialogFragment を使うという訳ですね。
これを使えばライフサイクルを使えるのでメモリリークを防げます。

{% asset_img Screenshot_20210422_105835.jpg %}

具体的なコードは以下の通りです。
選択肢にアイコンを使ったパターンです。

※もっと単純なパターンにしたい場合は以下の記事が参考になります。

参考
[コピペしてすぐ使えるアラートダイアログ集](https://qiita.com/suzukihr/items/8973527ebb8bb35f6bb8)

### ダイアログのコード

<!-- more -->

ItemDialog.java

```java
public class ItemDialog extends DialogFragment {

    public static final String TAG = ItemDialog.class.getName();
    public static Integer mLayout = R.layout.select_dialog_item;

    public interface Listener {
        void onClickItemInItemDialog(int item);
    }

    public static class ListItem {
        public final String text;
        public final int icon;

        public ListItem(String text, Integer icon) {
            this.text = text;
            this.icon = icon;
        }

        @Override
        public String toString() {
            return text;
        }
    }

    public Listener mListener;
    public ListItem[] mItems;
    public String mTitle;

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        ListAdapter adapter = new ListAdapter(getContext(), mItems);

        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle(mTitle);
        builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface builder, int item) {
                builder.dismiss();
                mListener.onClickItemInItemDialog(item);
            }
        });
        return builder.create();
    }

    @Override
    public void onPause() {
        super.onPause();
        dismiss();
    }

    /**
     * アイコン付き用リストのアダプター
     */
    public class ListAdapter extends ArrayAdapter<ListItem> {

        public ListAdapter(Context context, ListItem[] items) {
            super(context, mLayout, R.id.text1, items);
        }

        public View getView(int position, View convertView, ViewGroup parent) {

            ListItem item = this.getItem(position);
            View v = super.getView(position, convertView, parent);

            ImageView imageView = v.findViewById(R.id.icon1);
            imageView.setImageDrawable(getResources().getDrawable(item.icon));

            return v;
        }
    }
}

```

### 選択アイテムのレイアウトファイル

select_dialog_item.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="60dp"
    android:background="@color/white"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/icon1"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginStart="24dp"
        android:layout_gravity="center_vertical"
        />

    <TextView
        android:id="@+id/text1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:textColor="@color/black"
        android:layout_gravity="center_vertical"
        android:textSize="20sp" />

</LinearLayout>
```

### ダイアログを呼び出すコード

```java
ItemDialog dialogFragment = new ItemDialog();
dialogFragment.show(getSupportFragmentManager(), ItemDialog.TAG);
```

以上です。

## 参考

[ダイアログ（公式）](https://developer.android.com/guide/topics/ui/dialogs?hl=ja#AddingAList)

[項目にアイコンを表示する AlertDialog.Builder のダイアログ](https://www.takaiwa.net/2013/10/alertdialogbuilder.html)
