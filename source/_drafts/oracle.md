---
date: 2019-09-07
tags:
  - solidity
title: 【Oraclize】solidityで外部APIを利用してみた
---

{% asset_img solidity.png %}

### はじめに

Solidity は 基本的にはスマートコントラクト内の情報しか参照できないのですが、
Oraclize というツールを利用することで外部 API を利用できるらしいのでやってみました

<!-- more -->

### 設定

公式ページ
https://docs.provable.xyz/#ethereum-quick-start

コンパイラバージョンを 0.4.25 に設定する

{% asset_img compile.png %}

環境は injected web3 を利用する
metamask を連携する
※JavaScript VM だと ether 不足エラーになります

{% asset_img env.png %}

### サンプルコード

test.sol

```js
pragma solidity ^0.4.25;
import "github.com/provable-things/ethereum-api/provableAPI_0.4.25.sol";

contract ExampleContract is usingProvable {

   string public ETHUSD;
   event LogConstructorInitiated(string nextStep);
   event LogPriceUpdated(string price);
   event LogNewProvableQuery(string description);

   function ExampleContract() payable {
       LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
   }

   function __callback(bytes32 myid, string result) {
       if (msg.sender != provable_cbAddress()) revert();
       ETHUSD = result;
       LogPriceUpdated(result);
   }

   function updatePrice() payable {
       if (provable_getPrice("URL") > this.balance) {
           LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           LogNewProvableQuery("Provable query was sent, standing by for the answer..");
           provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
       }
   }
}
```

コンパイル・デプロイする

### ハマったところ

### おわりに

思ったより簡単でびっくりしました

以上です。
