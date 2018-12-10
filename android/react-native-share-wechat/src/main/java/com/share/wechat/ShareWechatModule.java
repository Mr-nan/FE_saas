package com.share.wechat;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.share.wechat.view.UpLoadImageActivity;


/**
 * Created by Administrator on 2017/8/1.
 */

public class ShareWechatModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    //分享的广播
    private MyBR myBR;
    private Promise mSharePromise;
    private Context mContext;
    private ReadableArray totalImgArray;
    private ReadableArray totalTxtArray;
    private int k = 0;

    public ShareWechatModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        //多图，多车分享完成的广播
        mContext = reactContext;

    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public String getName() {
        return "ShareNative";
    }

    //微信批量分享
    @ReactMethod
    public void share(ReadableMap data, final Promise promise){

        mSharePromise = promise;
        totalImgArray = data.getArray("image");
        totalTxtArray = data.getArray("title");
        if(totalImgArray.size() != totalImgArray.size()){
            promise.reject("error", "数组和图片不匹配！");
            return;
        }

        int size = totalImgArray.getArray(0).size();
        String[] arrayPicG = new String[size];
        for (int i1 = 0; i1 < size; i1++) {
            arrayPicG[i1] = totalImgArray.getArray(0).getString(i1);
        }
        k = 0;

        if(myBR == null){
            myBR = new MyBR();
        }
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("DYCDSHARE");
        mContext.registerReceiver(myBR, intentFilter);

        beginShare(arrayPicG,totalTxtArray.getString(0));

    }

    private void beginShare(String[] imgUrls2,String shareText){
        try{

            Activity currentActivity = getCurrentActivity();

            if (currentActivity == null) {
                mSharePromise.reject("error", "Activity doesn't exist");
                return;
            }

            Intent vlIntent = new Intent(currentActivity,UpLoadImageActivity.class);
            vlIntent.putExtra("shareUrls",imgUrls2);
            vlIntent.putExtra("shareData",shareText);
            currentActivity.startActivityForResult(vlIntent,0);

        }catch (Exception e){
            mSharePromise.reject("error",e.toString());
            mSharePromise = null;
        }


    }

    class MyBR extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            k++;
            if(k == totalImgArray.size()){

                Toast.makeText(mContext,"分享完成",Toast.LENGTH_SHORT).show();
                mSharePromise.resolve("share success!");
                if (myBR != null) {
                    mContext.unregisterReceiver(myBR);
                }

            }else{
                Toast.makeText(mContext,"分享下一个",Toast.LENGTH_SHORT).show();
                int size = totalImgArray.getArray(k).size();
                String[] arrayPicG = new String[size];
                for (int i1 = 0; i1 < size; i1++) {
                    arrayPicG[i1] = totalImgArray.getArray(k).getString(i1);
                }
                beginShare(arrayPicG,totalTxtArray.getString(k));
            }

        }
    }
}
