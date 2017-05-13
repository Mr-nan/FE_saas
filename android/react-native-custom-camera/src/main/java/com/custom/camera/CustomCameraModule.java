package com.custom.camera;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Administrator on 2017/3/24.
 */

public class CustomCameraModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private Promise mVLPromise;
    private final ReactApplicationContext reactContext;

    public CustomCameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        this.reactContext = reactContext;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if(mVLPromise != null){
            if(resultCode == Activity.RESULT_CANCELED){
                mVLPromise.reject("error","Result_Canceled");
            }else if(resultCode == Activity.RESULT_OK){
                String filePath = data.getStringExtra("file_path");
                WritableMap map = Arguments.createMap();
                map.putString("data",getBase64StringFromFile(filePath));
                map.putString("uri",getImageContentUri(reactContext,filePath));
                mVLPromise.resolve(map);
                mVLPromise = null;
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return "CustomCamera";
    }

    @ReactMethod
    public void takePic(final Promise promise){
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("error", "Activity doesn't exist");
            return;
        }

        mVLPromise = promise;
        try{
            Intent vlIntent = new Intent(currentActivity,CameraActivity.class);
            currentActivity.startActivityForResult(vlIntent,0);
        }catch (Exception e){
            mVLPromise.reject("error",e.toString());
            mVLPromise = null;
        }
    }

    private String getBase64StringFromFile(String absoluteFilePath) {

        Bitmap image = BitmapFactory.decodeFile(absoluteFilePath);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        image.compress(Bitmap.CompressFormat.JPEG, 100, baos);// 质量压缩方法，这里100表示不压缩，把压缩后的数据存放到baos中
        int options = 60;

        while (baos.toByteArray().length / 1024 > 600) { // 循环判断如果压缩后图片是否大于100kb,大于继续压缩
            baos.reset();// 重置baos即清空baos
            image.compress(Bitmap.CompressFormat.JPEG, options, baos);// 这里压缩options%，把压缩后的数据存放到baos中
            if(options == 0) break;
            options -= 10;// 每次都减少10
            Log.e("==========>>>>>",options + "===" + baos.toByteArray().length / 1024);
        }

        byte[] bytes = baos.toByteArray();
        return Base64.encodeToString(bytes, Base64.NO_WRAP);



//        ByteArrayInputStream isBm = new ByteArrayInputStream(baos.toByteArray());// 把压缩后的数据baos存放到ByteArrayInputStream中
//        Bitmap bitmap = BitmapFactory.decodeStream(isBm, null, null);// 把ByteArrayInputStream数据生成图片
//        return bitmap;

//        InputStream inputStream = null;
//        try {
//            inputStream = new FileInputStream(new File(absoluteFilePath));
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        }

//        byte[] bytes;
//        byte[] buffer = new byte[8192];
//        int bytesRead;
//        ByteArrayOutputStream output = new ByteArrayOutputStream();
//        try {
//            while ((bytesRead = inputStream.read(buffer)) != -1) {
//                output.write(buffer, 0, bytesRead);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        bytes = output.toByteArray();
//        return Base64.encodeToString(bytes, Base64.NO_WRAP);
    }

    public static String getImageContentUri(Context context, String filePath) {
        Cursor cursor = context.getContentResolver().query(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                new String[] { MediaStore.Images.Media._ID },
                MediaStore.Images.Media.DATA + "=? ",
                new String[] { filePath }, null);
        if (cursor != null && cursor.moveToFirst()) {
            int id = cursor.getInt(cursor
                    .getColumnIndex(MediaStore.MediaColumns._ID));
            Uri baseUri = Uri.parse("content://media/external/images/media");
            return Uri.withAppendedPath(baseUri, "" + id).toString();
        } else {
            return "";
//            if (imageFile.exists()) {
//                ContentValues values = new ContentValues();
//                values.put(MediaStore.Images.Media.DATA, filePath);
//                return context.getContentResolver().insert(
//                        MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
//            } else {
//                return null;
//            }
        }
    }
}
