---
title: 【Android】ダイアログのサンプルコード
tags:
  - Android
date: 2021-04-22
---

## はじめに

DialogFragmentのサンプルコードです。

最初はインターフェースを使わない方法を模索しましたが、親がアクティビティの時は無理っぽいので諦めました。
もし親がフラグメントのみと断定できるのなら参考リンクの通りに実装すればインターフェースが不要になっていい感じになります。

あと最初はBuilderなしでイケないかなあと模索しましたが、Builderを使わないと画面回転時に変数が初期化されちゃうので諦めました。

### 前提知識

Android のダイアログのクラスが色々あって混乱したので整理します。

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

具体的なコードは以下の通りです。

<!-- more -->

### DialogFragmentを利用する

#### インターフェースの利用を宣言する

```java
public class HogeActivity implements AlertDialogFragment.AlertDialogListener {
```

#### ダイアログを表示する

```java
new AlertDialogFragment.Builder()
        .setTitle(getString(R.string.hoge))
        .setMessage(getString(R.string.hoge))
        .setPositiveButtonText(getString(android.R.string.ok))
        .setNegativeButtonText(getString(android.R.string.cancel))
        .build()
        .show(getSupportFragmentManager(), "DISCARD");
```

#### ダイアログのボタンをクリックした後の処理

```java
/**
  * ダイアログ画面でポジティブボタンを押したら呼ばれる
  * AlertDialogFragmentのInterface
  */
@Override
public void onDialogPositiveClick(DialogFragment dialog) {
    switch (dialog.getTag()) {
        case "DISCARD":
            break;
    }
}

/**
  * ダイアログ画面でネガティブボタンを押したら呼ばれる
  * AlertDialogFragmentのInterface
  */
@Override
public void onDialogNegativeClick(DialogFragment dialog) {
    switch (dialog.getTag()) {
        case "DISCARD":
            break;
    }
}

/**
  * ダイアログ画面でチェックボックスをクリックしたら呼ばれる
  * AlertDialogFragmentのInterface
  */
@Override
public void onDialogCheckBoxChange(boolean isChecked) {
}
```

### DialogFragment

AlertDialogFragment.kt

```kotlin
import android.app.AlertDialog
import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.widget.CheckBox
import android.widget.CompoundButton
import androidx.fragment.app.DialogFragment

/**
 * アクティビティやフラグメントでAlertDialogを直接利用するとリークの原因になる
 * 代わりにこのフラグメントを利用すればOK
 */
open class AlertDialogFragment : DialogFragment() {

    // 親がFragmentのみの場合はsetFragmentResultListenerを使うことでlistenerは不要となるが、
    // 実際は親がActivityの可能性もあるのでlistenerの導入が必須
    internal lateinit var listener: AlertDialogListener

    interface AlertDialogListener {
        fun onDialogPositiveClick(dialog: DialogFragment)
        fun onDialogNegativeClick(dialog: DialogFragment)
        fun onDialogCheckBoxChange(isChecked: Boolean)
    }

    var icon: Int? = null
    var title: String? = null
    var message: String? = null
    var positiveButtonText: String? = null
    var negativeButtonText: String? = null
    var checkBoxText: String? = null

    // クラス単位で一意かつ静的な値
    companion object {
        const val TAG = "AlertDialogFragment"
        private const val ICON_KEY = "ICON_KEY"
        private const val TITLE_KEY = "TITLE_KEY"
        private const val MESSAGE_KEY = "MESSAGE_KEY"
        private const val POSITIVE_BUTTON_TEXT_KEY = "POSITIVE_BUTTON_TEXT_KEY"
        private const val NEGATIVE_BUTTON_TEXT_KEY = "NEGATIVE_BUTTON_TEXT_KEY"
        private const val CHECK_BOX_TEXT_KEY = "CHECK_BOX_TEXT_KEY"
    }

    // Builderを使わないと画面回転時に変数の値が初期化してしまう
    class Builder {
        private val bundle = Bundle()

        fun setIcon(icon: Int): Builder {
            return this.apply { bundle.putInt(ICON_KEY, icon) }
        }

        fun setTitle(title: String): Builder {
            return this.apply { bundle.putString(TITLE_KEY, title) }
        }

        fun setMessage(message: String): Builder {
            return this.apply { bundle.putString(MESSAGE_KEY, message) }
        }

        fun setPositiveButtonText(text: String): Builder {
            return this.apply { bundle.putString(POSITIVE_BUTTON_TEXT_KEY, text) }
        }

        fun setNegativeButtonText(text: String): Builder {
            return this.apply { bundle.putString(NEGATIVE_BUTTON_TEXT_KEY, text) }
        }

        fun setCheckBoxText(text: String): Builder {
            return this.apply { bundle.putString(CHECK_BOX_TEXT_KEY, text) }
        }

        fun build(): AlertDialogFragment {
            return AlertDialogFragment().apply { arguments = bundle }
        }
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        try {
            listener = getParentFragmentOrActivity() as AlertDialogListener;
        } catch (e: ClassCastException) {
            throw ClassCastException(("$context must implement AlertDialogListener"))
        }
    }

    open fun getParentFragmentOrActivity(): Any? {
        return parentFragment ?: activity
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        // ダイアログの背景を透過にする
        val dialog = Dialog(requireContext())
        dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

        val alertDialog = AlertDialog.Builder(context)

        // Bundleに渡した値を取り出す
        arguments?.let { bundle ->
            icon = bundle.getInt(ICON_KEY, -1)
            if (icon != -1) alertDialog.setIcon(icon!!)

            title = bundle.getString(TITLE_KEY, "")
            if (title != "") alertDialog.setTitle(title)

            message = bundle.getString(MESSAGE_KEY, "")
            if (message != "") alertDialog.setMessage(Html.fromHtml(message))

            positiveButtonText = bundle.getString(POSITIVE_BUTTON_TEXT_KEY)
            if (positiveButtonText != "") {
                alertDialog.setPositiveButton(positiveButtonText) { dialog, which ->
                    listener.onDialogPositiveClick(this)
                }
            }

            negativeButtonText = bundle.getString(NEGATIVE_BUTTON_TEXT_KEY)
            if (negativeButtonText != "") {
                alertDialog.setNegativeButton(negativeButtonText) { dialog, which ->
                    listener.onDialogNegativeClick(this)
                }
            }

            checkBoxText = bundle.getString(CHECK_BOX_TEXT_KEY)
            checkBoxText?.let {
                val inflater = requireActivity().layoutInflater
                val root = inflater.inflate(R.layout.dialog_alert_custom, null)
                val checkBox = root.findViewById<CheckBox>(R.id.checkbox)
                checkBox.text = it
                checkBox.setOnCheckedChangeListener { buttonView: CompoundButton?, isChecked: Boolean ->
                    listener.onDialogCheckBoxChange(isChecked)
                }
                alertDialog.setView(root)
            }
        }

        return alertDialog.create()
    }

    override fun onStart() {
        super.onStart()
        val alertDialog = dialog as AlertDialog?
        if (alertDialog != null) (alertDialog.findViewById<View>(android.R.id.message) as TextView).movementMethod = LinkMovementMethod.getInstance()
    }
}
```

### 参考

[DialogFragmentでカスタムダイアログを実装する](https://zenn.dev/m_coder/articles/article-zenn-custom-dialog-by-dialogfragment)

[【Android Studio 4.1】ダイアログにHTMLリンクを表示する方法](https://codeforfun.jp/android-studio-alertdialog-with-html-link/)

