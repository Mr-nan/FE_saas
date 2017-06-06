package com.vin.scan;

import android.app.Activity;
import android.content.Intent;
import android.telephony.TelephonyManager;
import android.content.Context;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;

/**
 * Created by Administrator on 2017/3/2.
 */

public class VinScanModule extends ReactContextBaseJavaModule implements ActivityEventListener{

    private Promise mVLPromise;
    private Context mContext;

    public VinScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mContext = reactContext;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if(mVLPromise != null){
            if(resultCode == Activity.RESULT_CANCELED){
                mVLPromise.reject("error","Result_Canceled");
            }else if(resultCode == Activity.RESULT_OK){
                if(requestCode == 1){
                    String vl = data.getStringExtra("vl");
                    mVLPromise.resolve(vl);
                    mVLPromise = null;
                }else if(requestCode == 0){
                    String vl = data.getStringExtra("vin");
                    mVLPromise.resolve(vl);
                    mVLPromise = null;
                }
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
    public void scan(int vinType,final Promise promise){
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("error", "Activity doesn't exist");
            return;
        }

        mVLPromise = promise;
        try{
            if(vinType == 1){
                Intent vlIntent = new Intent(currentActivity,VLScanActivity.class);
                currentActivity.startActivityForResult(vlIntent,1);
            }else if(vinType == 0){
                Intent vinIntent = new Intent(currentActivity,FDScanActivity.class);
                currentActivity.startActivityForResult(vinIntent,0);
            }
        }catch (Exception e){
            mVLPromise.reject("error",e.toString());
            mVLPromise = null;
        }
    }

     @ReactMethod
        public void goBack(){
        Activity currentActivity = getCurrentActivity();
                Intent intent = new Intent(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_HOME);
                                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                currentActivity.startActivity(intent);
        }
    @ReactMethod
    public void getIMEI(Callback callback){
        TelephonyManager mTm = (TelephonyManager)mContext.getSystemService(Context.TELEPHONY_SERVICE);
        String imei = mTm.getDeviceId();
        callback.invoke(imei);
    }
    @ReactMethod
    public void getPhoneVersion(Callback callback){
        String verison = "phoneVersion=" +android.os.Build.VERSION.RELEASE  +
                ",phoneModel=" + android.os.Build.MODEL+
                ",appVersion="+getAppVersionName(mContext);
        callback.invoke(verison);
    }
    private String getAppVersionName(Context context) {
        String versionName = "";
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo("cn.testgethandsetinfo", 0);
            versionName = packageInfo.versionName;
            if (TextUtils.isEmpty(versionName)) {
                return "";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return versionName;
    }

}
