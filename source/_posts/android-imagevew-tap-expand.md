---
title: 【Android】画像タップで拡大表示。さらにピンチインアウト可能にする。
tags:
  - Android
date: 2021-02-19
---

### これは何

Android 開発で ImageView をタップしたら画像を拡大表示し、それをピンチインアウトでズームできるようにする方法です。

### 利用ライブラリ

https://github.com/davemorrissey/subsampling-scale-image-view

ライブラリインストール方法は上にあるので割愛します

### 修正内容

```java
// 拡大対象のImageViewにタップ時のリスナーをセット
mImageView.setOnClickListener(v -> {
    SubsamplingScaleImageView imageViewEnlarged = new SubsamplingScaleImageView(getContext());
    Bitmap bitmap = ((BitmapDrawable) mImageView.getDrawable()).getBitmap();
    imageViewEnlarged.setImage(ImageSource.bitmap(bitmap));
    AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
    builder.setView(imageViewEnlarged);
    builder.setNegativeButton(R.string.label_close, null);
    builder.show();
});
```

てか Android 開発、情報少なすぎません？泣
ただ画像をタップして拡大表示してピンチインアウトするだけのことがなんでこんなに情報がないのか？
なかなかライブラリに辿り着けなくて、結構ハマっちゃいました、、
ツライけどお互い頑張りましょう、、w

### 参考

[[Android]ImageView の scaleType を秒で決める](http://rikisha-android.hatenablog.com/entry/2014/04/21/145013)
[[Android]メモリリークを起こさずに大きな画像を表示させるライブラリ「Subsampling Scale Image View」](https://minpro.net/android-subsampling-scale-image-view)
