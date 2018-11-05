package com.fe_sass;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;
import android.util.Log;

import com.baidu.mapapi.CoordType;
import com.baidu.mapapi.SDKInitializer;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import com.beefe.picker.PickerViewPackage;
import com.growingio.android.sdk.collection.Configuration;
import com.growingio.android.sdk.collection.GrowingIO;
import com.growingio.plugin.rnsdk.rnPackge.GrowingIOPackage;
import com.imagepicker.ImagePickerPackage;
import com.vin.scan.VinScanPackage;
import com.qr.scan.QrScanPackage;
import com.custom.camera.CustomCameraPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.microsoft.codepush.react.CodePush;
import java.util.Arrays;
import java.util.List;
import com.fe_sass.react_native_umeng_push.UmengPushApplication;
import com.fe_sass.react_native_umeng_push.UmengPushPackage;
import com.theweflex.react.WeChatPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.share.wechat.ShareWechatPackage;

import cn.udesk.UdeskPackage;


public class MainApplication extends UmengPushApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SQLitePluginPackage(),
          new UmengPushPackage(),
          new ImagePickerPackage(),
          new PickerViewPackage(),
          new ReactNativeWheelPickerPackage(),
          new WeChatPackage(),
          new VinScanPackage(),
          new QrScanPackage(),
          new CustomCameraPackage(),
          new RNSpinkitPackage(),
          new CodePush("xmOhd_I_phLbpA3a4AKSbAMFaN5DVJvFYEdiG", getApplicationContext(), BuildConfig.DEBUG),
          new GrowingIOPackage(),
          new ShareWechatPackage(),
              new UdeskPackage()

      );
    }
  };

  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }


  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    GrowingIO.startWithConfiguration(this, new Configuration()
            .useID()
            .trackAllFragments()
            .setChannel("huangning"));

    GrowingIO.enableRNNavigatorPage();    // 开启Navigator页面采集
    GrowingIO.enableRNOptimizedPath();    // 开启RN页面元素识别优化
    // 在使用 SDK 各组间之前初始化 context 信息，传入 ApplicationContext
    SDKInitializer.initialize(this);
    //自4.3.0起，百度地图SDK所有接口均支持百度坐标和国测局坐标，用此方法设置您使用的坐标类型.
    //包括BD09LL和GCJ02两种坐标，默认是BD09LL坐标。
    SDKInitializer.setCoordType(CoordType.BD09LL);
  }
}