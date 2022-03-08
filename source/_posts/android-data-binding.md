---
title: 【kotlin】FragmentでViewBindingを導入する方法【Android開発】
tags:
  - Android
date: 2022-03-8 09:00:00
---

kotlinでFragmentのViewBindingを導入する方法です。

初めに、xmlファイルに対して、全体をlayoutで挟みます。

```xml
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

<!-- 元のコード -->

</layout>
```

次に、Fragmentのkotlinファイルで以下の通りに実装します。

```kotlin
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment

class WalkThroughFirstFragment : Fragment(), View.OnClickListener {

    private lateinit var binding: FragmentWalkThroughBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentWalkThroughBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.walkThroughButton1.setOnClickListener(this)
    }

    override fun onClick(view: View?) {

        val intent = Intent(activity, SettingActivity::class.java)
        startActivity(intent)
    }
}
```

以上です。
