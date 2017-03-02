package com.vin.scan;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Administrator on 2017/3/2.
 */

public class VinScanModule extends ReactContextBaseJavaModule implements ActivityEventListener{

    private Promise mVLPromise;

    public VinScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if(mVLPromise != null){
            if(resultCode == Activity.RESULT_CANCELED){
                mVLPromise.reject("error","Result_Canceled");
            }else if(resultCode == Activity.RESULT_OK){
                String vl = data.getStringExtra("vl");
                mVLPromise.resolve(vl);
                mVLPromise = null;
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return "VinScan";
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
            final Intent vlIntent = new Intent(currentActivity,VLScanActivity.class);
            currentActivity.startActivityForResult(vlIntent,1);
        }catch (Exception e){
            mVLPromise.reject("error",e.toString());
            mVLPromise = null;
        }
    }
}
