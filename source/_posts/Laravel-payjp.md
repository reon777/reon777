---
title: 【PHP】LaravelでPAYJPを使ってみた
date: 2020-09-16
photos: images/php.png
tags:
  - PHP
---

![](/images/php.png)

## はじめに

Laravel で PAYJP を使ってみました
やり方をメモしておきます

## 目次

<!-- toc -->

<!-- more -->

## 事前準備

### PAY.JP に登録して秘密鍵と公開鍵を取得する

PAY.JP
https://pay.jp/

API ドキュメント
https://pay.jp/docs/api/?php

### composer インストール

```bash
composer require payjp/payjp-php
```

## クレジットカード登録

### 画面からユーザがカード情報を入力 → トークン変換して POST 送信

・以下のスクリプトでクレジットカードの入力フォームが表示される。
・入力フォームに情報を入力して、カードを登録ボタンをクリックするとトークンが`payjp-token`パラメータとして POST される

View

```html
<form action="" method="post" class="text-center mt-xxl">
  @csrf
  <script
    src="https://checkout.pay.jp/"
    class="payjp-button"
    data-key="pkから始まる公開鍵を入力する"
    data-text="カード情報を入力する"
    data-submit-text="カードを登録"
  ></script>
</form>
```

### ユーザ ID をインプットとして ユーザオブジェクト を取得

・初回はユーザ情報を持っていないので新規登録してユーザ ID を取得し、 DB に保存する
・二回目以降は DB のユーザ ID を利用する

Controller

```php
		$user = $request->user;

		$this->validate($request, [
			'payjp-token' => 'required',
		]);

		\Payjp\Payjp::setApiKey('ここに秘密鍵を入れる');

		$user = User::where('id', $user->id)->first();
		$payjp_user_id = $user['payjp_user_id'];

		// 顧客情報を取得
		try {
			$cu = \Payjp\Customer::retrieve($payjp_user_id);
		} catch (Exception $e) {
			\Log::info($e);
			// ユーザ未登録の場合は登録する
			if (strpos($e, 'No such customer') !== false || strpos($e, 'invalid ID') !== false) {
				$cu = \Payjp\Customer::create();
				$user['payjp_user_id'] = $cu->id;
				$user->save();
			} else {
				return redirect()->back()->withInput()->withErrors($e->getMessage());
			}
		}
```

### ユーザオブジェクトとトークンをインプットとしてユーザのカードを登録

Controller

```php
		// カードを登録
		try {
			$cu->cards->create(array(
				"card" => $request["payjp-token"],
				"default" => true,
			));
		} catch (Exception $e) {
			\Log::info($e);
			if (strpos($e, 'same card') !== false) {
				return redirect()->back()->withInput()->withErrors('登録済みのカードです');
			} else {
				return redirect()->back()->withInput()->withErrors($e->getMessage());
			}
		}
```

## 決済

### ユーザ ID と金額をインプットとして決済

```php
		// PAYJP登録チェック
		$user = User::where("id", $user["id"])->first();
		if ($user['payjp_user_id'] == False) {
			return redirect('clinic/credit_card/register')->with('is_after_complete', '先にクレジットカードを登録する必要があります。');
		}

		\Payjp\Payjp::setApiKey('ここに秘密鍵を入れる');
		$charge = \Payjp\Charge::create([
			"customer" => $user['payjp_user_id'],
			"amount" => $request->purchase_point * 100,
			"currency" => "jpy",
			"capture" => true,
		]);

```

## クレジットカード削除

```php
		// PAYJP登録チェック
		$user = User::where("id", $user["id"])->first();
		if ($user['payjp_user_id'] == False) {
			return redirect('clinic/credit_card/register')->with('is_after_complete', '先にクレジットカードを登録する必要があります。');
		}

		\Payjp\Payjp::setApiKey('ここに秘密鍵を入れる');
		$cu = \Payjp\Customer::retrieve("cus_から始まる顧客ID");
		$card = $cu->cards->retrieve("car_から始まるカードID");
		$card->delete();

```
