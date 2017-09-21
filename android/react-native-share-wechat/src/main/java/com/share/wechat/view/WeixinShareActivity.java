package com.share.wechat.view;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.share.wechat.R;
import com.share.wechat.utils.MD5Utils;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okio.BufferedSink;
import okio.Okio;


public class WeixinShareActivity extends Activity {

    private static final String TAG = "WeixinShareActivity";
    private String[] urls;
    private String shareData;
    private String type;
    private int num = 0;
    private String[] tempUrls;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.upload_image);

        Intent intent = getIntent();
        tempUrls = intent.getStringArrayExtra("dataToWeixin");

        type = intent.getStringExtra("typeWx");


        if (tempUrls != null) {
            urls = new String[tempUrls.length];
            for (int i = 0; i < tempUrls.length; i++) {
                urls[i] = tempUrls[i].substring(0, tempUrls[i].length() - 1);
            }

        }
        shareData = intent.getStringExtra("shareData");

        beginShare();

    }

    private void beginShare() {
        if (urls.length != 0) {
            //Log.d(TAG, "卡死了");
            new MyTask(urls).execute();
        } else {
            Toast.makeText(WeixinShareActivity.this, "内部错误", Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    private void sendToWeixinShare() {
        // Log.d(TAG, "我是断点2");
        ArrayList<Uri> uris = new ArrayList<>();
        ArrayList<URI> uris2 = new ArrayList<>();

        for (String url : urls) {
            File file = getFileByUrl(url);

            if (file.exists()) {

                //适配7.0
                if (Build.VERSION.SDK_INT < 23) {

                    uris.add(Uri.fromFile(file));
                } else {
                    uris.add(Uri.fromFile(file));
                }

            }
        }

        if (uris.isEmpty() && uris2.isEmpty()) {
            Toast.makeText(WeixinShareActivity.this, "请先下载图片", Toast.LENGTH_SHORT).show();
            finish();
        } else {
            if (Build.VERSION.SDK_INT < 23) {

                shareToTimeLine(shareData, uris);
            } else {
                shareToTimeLine2(shareData, uris);
            }
//            for (int i = 0; i < uris.size(); i++) {
//                Log.d(TAG, "uris.get(i):" + uris.get(i));
//
//            }
        }
    }

    private class MyTask extends AsyncTask<Void, Integer, Void> {

        private ProgressDialog mProgressDialog;
        private String[] mUrls;

        public MyTask(String[] urls) {
            this.mUrls = urls;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            mProgressDialog = new ProgressDialog(WeixinShareActivity.this);
            mProgressDialog.setMessage("图片上传中......");
            //  mProgressDialog.setIndeterminate(true);
            // mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
            mProgressDialog.setCancelable(false);
            mProgressDialog.show();
        }

        @Override
        protected Void doInBackground(Void... params) {

            for (int i = 0; i < mUrls.length; i++) {
                // Log.d(TAG, mUrls[i].substring(0, mUrls[i].length() - 1));
                downloadPicToSDCard(mUrls[i]);

                //to onProgressUpdate
                publishProgress(i);

            }

            return null;
        }

        @Override
        protected void onProgressUpdate(Integer... progress) {
            super.onProgressUpdate(progress);
            mProgressDialog.setIndeterminate(false);
            mProgressDialog.setMax(mUrls.length);
            mProgressDialog.setProgress(progress[0]);
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            mProgressDialog.dismiss();
            sendToWeixinShare();
        }
    }

    private File getFileByUrl(String url) {
        String filename = MD5Utils.md5(url);
        return new File(getExternalCacheDir(), filename);
    }


    private boolean downloadPicToSDCard(final String url) {

        final File file = getFileByUrl(url);

        if (file.exists()) {
            file.delete();
            final OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(url)
                    .build();


            try {
                Response response = client.newCall(request).execute();

                BufferedSink sink = Okio.buffer(Okio.sink(file));
                sink.writeAll(response.body().source());
                sink.close();

                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            final OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(url)
                    .build();


            try {
                Response response = client.newCall(request).execute();
                BufferedSink sink = Okio.buffer(Okio.sink(file));
                sink.writeAll(response.body().source());
                sink.close();

                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return false;

    }

    /**
     * 分享多图到朋友圈,多张图片加文字
     *
     * @param uris
     */
    private void shareToTimeLine(String title, ArrayList<Uri> uris) {
        for (int i = 0; i < uris.size(); i++) {
            Log.e(TAG, "uris.get(i):" + uris.get(i));

        }

        Intent intent = new Intent();
        ComponentName comp = new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareToTimeLineUI");
        intent.setComponent(comp);
        intent.setAction(Intent.ACTION_SEND_MULTIPLE);
        intent.setType("image/*");
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        intent.putExtra("Kdescription", title);

        intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
        //intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);


        try {
            // Log.d(TAG, "我是断点3");
            startActivityForResult(intent, 666);
            //临时取消
            // finish();
        } catch (Throwable e) {
            if (e instanceof ActivityNotFoundException) {
                Toast.makeText(this, "还没有安装微信", Toast.LENGTH_SHORT).show();
                finish();
            }
            Log.d(TAG, e.getMessage());
        }
    }


    private void shareToTimeLine2(String title, ArrayList<Uri> uris) {


        Intent intent = new Intent();
        ComponentName comp = new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareToTimeLineUI");
        intent.setComponent(comp);
        intent.setAction(Intent.ACTION_SEND_MULTIPLE);
        intent.setType("image/*");
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.putExtra("Kdescription", title);

        intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
        //intent.putStringArrayListExtra(Intent.EXTRA_STREAM, uris);
        //intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);


        try {
            //  Log.e(TAG, "我是断点3");
            startActivityForResult(intent, 999);

//            if ("1".equals(type)){
//                num = 1;
//                //分享次数
//                shareSuccess();
//                //分数
//                numMore(num);
//                //友盟统计 批量分享
//                MobclickAgent.onEvent(WeixinShareActivity.this, "07");
//            }else if ("2".equals(type)){
//                num = tempUrls.length;
//                shareSuccess();
//
//                //友盟统计 批量分享
//                MobclickAgent.onEvent(WeixinShareActivity.this, "07");
//                numMore(num);
//
//            }else {
//
//            }



            //临时取消
            //finish();
        } catch (Throwable e) {
            if (e instanceof ActivityNotFoundException) {
                Toast.makeText(this, "还没有安装微信", Toast.LENGTH_SHORT).show();
                finish();
            }
            Log.e(TAG, e.getMessage());
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Intent intent = new Intent("DYCDSHARE");
        intent.putExtra("isShareOk", 1);
        sendBroadcast(intent);
        finish();
    }

}
