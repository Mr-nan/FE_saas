package cn.udesk;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

import cn.udesk.config.UdeskConfig;

/**
 * Created by zhengnan on 2018/11/3.
 */

public class UdeskModule extends ReactContextBaseJavaModule {

    public UdeskModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Udesk";
    }

    @ReactMethod
    public void openChat(ReadableMap data){
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            return;
        }

        try{
            UdeskSDKManager.getInstance().initApiKey(currentActivity, "dycd.udesk.cn","8a47dfb721e3d97782866278d46f91a4","6b4112b63158cfce");
            String sdktoken = "zuopeng@dycd.com";
            Map<String, String> info = new HashMap<String, String>();
            info.put(UdeskConst.UdeskUserInfo.USER_SDK_TOKEN, sdktoken);
            //以下信息是可选
            info.put(UdeskConst.UdeskUserInfo.NICK_NAME,"昵称");
            info.put(UdeskConst.UdeskUserInfo.EMAIL,"0631@163.com");
            info.put(UdeskConst.UdeskUserInfo.CELLPHONE,"15651818750");
            info.put(UdeskConst.UdeskUserInfo.DESCRIPTION,"描述信息");

            UdeskSDKManager.getInstance().setUserInfo(currentActivity, sdktoken, info);

            UdeskSDKManager.getInstance().entryChat(currentActivity);

        }catch (Exception e){

        }


    }

}
