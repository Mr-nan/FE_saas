package com.fe_sass;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.theweflex.react.WeChatPackage;
import com.liuchungui.react_native_umeng_push.UmengPushPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.zyu.ReactNativeWheelPickerPackage;

import java.util.Arrays;
import java.util.List;
import com.fe_sass.react_native_umeng_push.UmengPushApplication;
import com.fe_sass.react_native_umeng_push.UmengPushPackage;
import com.theweflex.react.WeChatPackage;
public class MainApplication extends UmengPushApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WeChatPackage(),
            new UmengPushPackage(),
            new RNSpinkitPackage(),
          new SQLitePluginPackage(),
          new UmengPushPackage(),
          new ImagePickerPackage(),
          new PickerViewPackage(),
          new ReactNativeWheelPickerPackage(),
          new WeChatPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}