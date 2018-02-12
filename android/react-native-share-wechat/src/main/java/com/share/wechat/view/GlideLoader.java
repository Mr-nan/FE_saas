package com.share.wechat.view;

import android.content.Context;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.share.wechat.R;
import com.share.wechat.utils.ImageLoader;



public class GlideLoader implements ImageLoader {
    @Override
    public void displayImage(Context context, String path, ImageView imageView) {
        Glide.with(context)
                .load(path)
                .placeholder(R.drawable.imageselector_photo)
                .centerCrop()
                .into(imageView);
    }
}
