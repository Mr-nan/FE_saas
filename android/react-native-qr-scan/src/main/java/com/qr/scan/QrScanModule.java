package com.qr.scan;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.Nullable;


import com.baidu.location.BDLocationListener;
import com.baidu.location.BDLocation;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;

/**
 * Created by Administrator on 2017/3/24.
 */

public class QrScanModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private Promise mVLPromise;
    private Promise mBdPromise;

    public QrScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);


        mLocationClient = new LocationClient(reactContext);
        //声明LocationClient类
        mLocationClient.registerLocationListener(myListener);
        //注册监听函数
        LocationClientOption option = new LocationClientOption();

        option.setIsNeedAddress(true);
        //可选，是否需要地址信息，默认为不需要，即参数为false
        //如果开发者需要获得当前点的地址信息，此处必须为true
        mLocationClient.setLocOption(option);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if(requestCode == 0){
            if(mVLPromise != null){
                if(resultCode == Activity.RESULT_CANCELED){
                    mVLPromise.reject("error","Result_Canceled");
                }else if(resultCode == Activity.RESULT_OK){
                    boolean scan_hand = data.getBooleanExtra("SCAN_HAND",false);
                    String scan_result = data.getStringExtra("SCAN_RESULT");
                    WritableMap map = Arguments.createMap();
                    map.putString("scan_hand",scan_hand ? "input" : "scan");
                    map.putString("scan_result",scan_result);
                    mVLPromise.resolve(map);
                    mVLPromise = null;
                }
            }
        }else if(requestCode == 1){
            if(mBdPromise != null){
                if(resultCode == Activity.RESULT_CANCELED){
                    mBdPromise.reject("error","Result_Canceled");
                }else if(resultCode == Activity.RESULT_OK){
                    WritableMap map = Arguments.createMap();
                    map.putString("address",data.getStringExtra("address"));
                    map.putString("longitude",data.getStringExtra("longitude"));
                    map.putString("latitude",data.getStringExtra("latitude"));
                    mBdPromise.resolve(map);
                    mBdPromise = null;
                }
            }
        }


    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return "QrScan";
    }

    @ReactMethod
    public void scan(final Promise promise){
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("error", "Activity doesn't exist");
            return;
        }

        mVLPromise = promise;
        try{
            Intent vlIntent = new Intent(currentActivity,ScanCaptureAct.class);
            currentActivity.startActivityForResult(vlIntent,0);
        }catch (Exception e){
            mVLPromise.reject("error",e.toString());
            mVLPromise = null;
        }
    }


    public void sendEvent(String eventName,
                          @Nullable WritableMap params) {
        getReactApplicationContext()
                .getJSModule(RCTNativeAppEventEmitter.class)
                .emit(eventName, params);
    }

    //百度定位
    @ReactMethod
    public void lbsStart(){
        mLocationClient.start();
    }

    //百度定位
    @ReactMethod
    public void lbsStop(){
        if(mLocationClient != null && mLocationClient.isStarted()){
            mLocationClient.stop();
        }
    }


    public LocationClient mLocationClient = null;
    private MyLocationListener myListener = new MyLocationListener();
    public class MyLocationListener implements BDLocationListener {

        @Override
        public void onReceiveLocation(BDLocation location){
            //此处的BDLocation为定位结果信息类，通过它的各种get方法可获取定位相关的全部结果
            //以下只列举部分获取地址相关的结果信息
            //更多结果信息获取说明，请参照类参考中BDLocation类中的说明
//            String addr = location.getAddrStr();    //获取详细地址信息
//            String country = location.getCountry();    //获取国家
//            String province = location.getProvince();    //获取省份
//            String city = location.getCity();    //获取城市
//            String district = location.getDistrict();    //获取区县
//            String street = location.getStreet();    //获取街道信息
            WritableMap map = Arguments.createMap();
            map.putString("country", location.getCountry());
            map.putString("province", location.getProvince());
            map.putString("city", location.getCity());
            map.putString("district", location.getDistrict());
            map.putString("street", location.getStreet());
            map.putString("addr", location.getAddrStr());
            map.putString("country_code", location.getCountryCode());
            map.putString("city_code", location.getCityCode());
            map.putString("street_number",location.getStreetNumber());
            sendEvent("onReceiveBDLocation",map);
            mLocationClient.stop();
        }
    }

    //利用百度地图选择地址
    @ReactMethod
    public void bdAddress(ReadableMap data,final Promise promise){
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("error", "Activity doesn't exist");
            return;
        }

        mBdPromise = promise;
        try{
            Intent vlIntent = new Intent(currentActivity,BaiduLocationActivity.class);
            vlIntent.putExtra("province",data.getString("provinceName"));
            vlIntent.putExtra("city",data.getString("cityName"));
            vlIntent.putExtra("district",data.getString("districtName"));
            vlIntent.putExtra("address",data.getString("addressName"));
            vlIntent.putExtra("longitude",data.getString("longitude"));
            vlIntent.putExtra("latitude",data.getString("latitude"));
            currentActivity.startActivityForResult(vlIntent,1);
        }catch (Exception e){
            mBdPromise.reject("error",e.toString());
            mBdPromise = null;
        }
    }

}
