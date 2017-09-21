package com.share.wechat.utils;

import android.app.Activity;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.widget.Toast;

import com.share.wechat.view.ImageSelectorActivity;


public class ImageSelector {

    private static String[] urls;
    public static final int IMAGE_REQUEST_CODE = 1002;
    public static final int IMAGE_CROP_CODE = 1003;

    private static ImageConfig mImageConfig;

    public static ImageConfig getImageConfig() {
        return mImageConfig;
    }

    public static void open(Activity activity, ImageConfig config,String[] finalUrls) {
        if (config == null) {
            return;
        }
        urls=finalUrls;
        mImageConfig = config;

        if (config.getImageLoader() == null) {
            Toast.makeText(activity, "相册初始化失败!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!Utils.existSDCard()) {
            Toast.makeText(activity, "没有SD卡", Toast.LENGTH_SHORT).show();
            return;
        }


        Intent intent = new Intent(activity, ImageSelectorActivity.class);
        intent.putExtra("urls",urls);
        activity.startActivityForResult(intent, mImageConfig.getRequestCode());
    }

    public static void open(Fragment fragment, ImageConfig config) {
        if (config == null) {
            return;
        }
        mImageConfig = config;

        if (config.getImageLoader() == null) {
            Toast.makeText(fragment.getActivity(), "相册初始化失败!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!Utils.existSDCard()) {
            Toast.makeText(fragment.getActivity(), "没有SD卡", Toast.LENGTH_SHORT).show();
            return;
        }


        Intent intent = new Intent(fragment.getActivity(), ImageSelectorActivity.class);
        fragment.startActivityForResult(intent, IMAGE_REQUEST_CODE);
    }

}
