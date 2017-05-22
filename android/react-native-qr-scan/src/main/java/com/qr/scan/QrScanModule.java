package com.qr.scan;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by Administrator on 2017/3/24.
 */

public class QrScanModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private Promise mVLPromise;

    public QrScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
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


}
