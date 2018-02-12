package com.fe_sass;

import com.facebook.react.ReactActivity;

import com.theweflex.react.WeChatPackage;
import java.util.Arrays;
import java.util.List;
import com.umeng.analytics.MobclickAgent;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FE_Sass";
    }

    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }


}
