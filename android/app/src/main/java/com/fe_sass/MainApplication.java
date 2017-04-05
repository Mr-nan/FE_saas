package com.fe_sass;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.update.UpdatePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.vin.scan.VinScanPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.microsoft.codepush.react.CodePush;
import java.util.Arrays;
import java.util.List;
import com.react.rnspinkit.RNSpinkitPackage;


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
          new ImagePickerPackage(),
          new PickerViewPackage(),
          new ReactNativeWheelPickerPackage(),
          new VinScanPackage(),
          new RNSpinkitPackage(),
          new CodePush("nud3l-FlqnIsfZLXl71g-CDlIHIzVJvFYEdiG", getApplicationContext(), BuildConfig.DEBUG)
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