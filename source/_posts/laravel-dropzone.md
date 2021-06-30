---
title: 【ajax】LaravelでDropzone.jsを使ってみた
tags:
  - PHP
date: 2021-06-30 11:00
---

### View

<!-- more -->

```php
<script src="https://rawgit.com/enyo/dropzone/master/dist/dropzone.js"></script>
<link rel="stylesheet" href="https://rawgit.com/enyo/dropzone/master/dist/dropzone.css">

<meta name="csrf-token" content="{{ Session::token() }}">

// 中略

// ここにファイルをD&Dする
// widthやheightを調整しよう
<div id="hoge" style="height: 200px;width: 100px;"></div>

// 中略

<script type="text/javascript">
    let _token = $('meta[name="csrf-token"]').attr('content');
    window.onload = (function() {
        var myDropzone = new Dropzone("div#hoge", {
            url: "/file_updade",
            params: {
                '_token': _token
            },
        });
    })
</script>
```

### Cotroller

```php
public function file_updade(Request $request)
{

  $file = $request->file('file');
  $extension = $request->file('file')->extension();
  $file_name = md5(uniqid(mt_rand(), true)) . '.' . $extension;
  $path = Storage::putFileAs("public/patient/" . $id, $file, $file_name, 'public');

  $input = [];
  $input["patient_id"] = $id;
  $input["file_name"] = $file->getClientOriginalName();
  $input["file_path"] = "/storage/patient/" . $id . "/" . $file_name;
  $this->correct_image_rotation($input["file_path"]);
  \Log::info($input);

  // PatientFile::create($input);
}
```
