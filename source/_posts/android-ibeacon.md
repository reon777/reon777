---
title: AndroidアプリでiBeaconを受信する
tags:
  - Android
date: 2021-02-17
---

![](/images/ムーミン1.jpg)

### 利用ライブラリ

https://github.com/AltBeacon/android-beacon-library

### 設定を変更

app/build.gradle に以下を追加

```gradle
dependencies {
    implementation 'org.altbeacon:android-beacon-library:2+'
}
```

### 受信コード

```kt
import org.altbeacon.beacon.*
import kotlin.collections.ArrayList

class HogeActivity : AppCompatActivity(), BeaconConsumer {
    private val TAG: String = "HogeActivity"
    // ビーコンマネージャ宣言
    private lateinit var mBeaconManager: BeaconManager
    // iBeaconのデータを認識するためのParserフォーマット
    private val IBEACON_FORMAT: String = "m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"

    private val mRegion = Region("unique-id-001", null, null, null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_Hogee)
        // ビーコンマネージャのインスタンス作成
        mBeaconManager = BeaconManager.getInstanceForApplication(this)
        // iBeaconのフォーマットをParserへ渡す
        mBeaconManager.beaconParsers.add(BeaconParser().setBeaconLayout(IBEACON_FORMAT))
    }

    override fun onPause() {
        super.onPause()
        mBeaconManager.unbind(this)
        Log.d(TAG, "ビーコンサービスを解除した")
    }

    override fun onResume() {
        super.onResume()
        mBeaconManager.bind(this)
        Log.d(TAG, "ビーコンサービスを起動した")
    }

    override fun onBeaconServiceConnect() {

        // 初期化。これがないと画面を２回以上開いた時に２重でデータを受信してしまう
        mBeaconManager.removeAllMonitorNotifiers()
        mBeaconManager.removeAllRangeNotifiers()
        mBeaconManager.rangedRegions.forEach {region ->
            mBeaconManager.stopRangingBeaconsInRegion(region)
        }

        mBeaconManager.addMonitorNotifier(object : MonitorNotifier {
            // ビーコン信号の領域内へ侵入した際に呼ばれる
            override fun didEnterRegion(region: Region) {
                Log.d(TAG, "ビーコンが近くにいる！ビーコンが発信するデータの受信を開始する")
            }

            // ビーコン信号の領域外へ退出した際に呼ばれる
            override fun didExitRegion(region: Region) {
                Log.d(TAG, "ビーコンが近くにいなくなった。。ビーコンが発信するデータの受信を停止する")
            }

            // 領域への侵入/退出のステータスが変化した際に呼ばれる
            // 一見didEnterRegionやdidExitRegionで十分に見えるが、実際にはこっちしか呼ばれないことがある
            override fun didDetermineStateForRegion(state: Int, region: Region) {
                Log.d(TAG, "ビーコンの侵入/退出ステータスが変化: $state")
                try {
                    if (state == 1) {
                        mBeaconManager.startRangingBeaconsInRegion(region)
                    } else {
                        mBeaconManager.stopRangingBeaconsInRegion(region)
                    }
                } catch (e: RemoteException) {
                    Log.d(TAG, "didDetermineStateForRegion e = " + e.message)
                }
            }
        })

        try {
            mBeaconManager.startMonitoringBeaconsInRegion(mRegion)
            Log.d(TAG, "ビーコンが近くにいるかどうかの監視を開始した。")
        } catch (e: RemoteException) {
            Log.e(TAG, "Exception", e)
            e.printStackTrace()
        }

        mBeaconManager.addRangeNotifier(RangeNotifier { beacons, region ->
            // ビーコンにデータが入っていない場合はbeaconsは[]となる
            // また、設定から位置情報を許可した状態でない場合もbeaconsは[]となる
            Log.d(TAG, "ビーコンデータ：${beacons}")
            for (beacon in beacons) {
                Log.d(TAG, "UUID:" + beacon.id1 + ", major:" + beacon.id2
                        + ", minor:" + beacon.id3 + ", Distance:" + beacon.distance
                        + ",RSSI" + beacon.rssi)
            }
        })
    }
}
```

### その他

検索したら一番上に出てくる qiita の記事とかだと removeAllMonitorNotifiers がなかったりして動かなかくて結構ハマった。。
以下の参考記事のおかげで解決した！
ありがてえ！

### 参考

[[Android]AltBeacon を使って iBeacon を受信する](https://friegen.xyz/androidaltbeacon%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6ibeacon%E3%82%92%E5%8F%97%E4%BF%A1%E3%81%99%E3%82%8B/)
