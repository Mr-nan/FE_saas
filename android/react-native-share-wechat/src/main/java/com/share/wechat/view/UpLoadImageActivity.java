package com.share.wechat.view;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;


import com.share.wechat.R;
import com.share.wechat.utils.ImageConfig;
import com.share.wechat.utils.ImageSelector;

import java.util.ArrayList;
import java.util.List;

public class UpLoadImageActivity extends Activity {


    private Button btn;
    private Button btn_submit;


    private ArrayList<String> path = new ArrayList<>();

    //图片网址数组 入口
    private String[] urls;
//            = new String[]{
//            "http://f.hiphotos.baidu.com/image/pic/item/b3b7d0a20cf431ad06c0d4f14836acaf2fdd98ec.jpg",
//            "http://e.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a29e1fa28879b25bc315c607c4d.jpg",
//            "http://a.hiphotos.baidu.com/image/pic/item/10dfa9ec8a1363278af8b6f6938fa0ec09fac7da.jpg",
//
//            "http://c.hiphotos.baidu.com/image/pic/item/7acb0a46f21fbe09694ab7d169600c338644adda.jpg",
//            "http://c.hiphotos.baidu.com/image/pic/item/aa64034f78f0f7368df7aa4d0855b319ebc41374.jpg",
//            "http://e.hiphotos.baidu.com/image/pic/item/b17eca8065380cd7d5c4b6d8a544ad3459828128.jpg",
//
//            "http://a.hiphotos.baidu.com/image/pic/item/11385343fbf2b2113b300928c98065380cd78ebe.jpg",
//            "http://c.hiphotos.baidu.com/image/pic/item/267f9e2f07082838650a741cba99a9014c08f1b7.jpg",
//
//            "http://f.hiphotos.baidu.com/image/pic/item/37d3d539b6003af3df5a9d61362ac65c1138b6cb.jpg"
//    };

    //分享的话 入口
    private String shareData;
    private String type;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.upload_image);
        Intent intent=getIntent();
        urls= intent.getStringArrayExtra("shareUrls");
        shareData=intent.getStringExtra("shareData");
        if (!TextUtils.isEmpty(intent.getStringExtra("type"))){
            type = intent.getStringExtra("type");
        }else {
            type = "6";
        }


        if (urls!=null){
            if(!(0<urls.length)){
                Toast.makeText(UpLoadImageActivity.this, "由于网络问题，图片网址解析失败，请重试", Toast.LENGTH_SHORT).show();
                finish();
            }else {
                beginShare();
            }

        }else {
            Toast.makeText(this, "内部错误，请重试", Toast.LENGTH_SHORT).show();
            finish();
        }


        /**
         * 测试内容
         */
//        final ArrayList<String> data=new ArrayList<>();
//        for (int i = 0; i < urls.length; i++) {
//            data.add(urls[i]);
//
//        }


        btn = (Button) findViewById(R.id.btn);
        btn_submit = (Button) super.findViewById(R.id.btn_submit);
//        recycler = (RecyclerView) super.findViewById(R.id.recycler);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            }
        });

        btn_submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (path.size() == 0) {
                    Toast.makeText(UpLoadImageActivity.this, "请先选择需要上传的图片", Toast.LENGTH_SHORT).show();
                } else {
                    for (int i = 0; i < path.size(); i++) {
                        Log.e("vvvvvvvv", path.get(i));
                    }
                }
            }
        });

//        GridLayoutManager gridLayoutManager = new GridLayoutManager(this, 3);
//        recycler.setLayoutManager(gridLayoutManager);
//        adapter = new Adapter(this, path);
//        recycler.setAdapter(adapter);

    }

    private void beginShare() {

        path.clear();
        ImageConfig imageConfig
                = new ImageConfig.Builder(new GlideLoader())
                .steepToolBarColor(getResources().getColor(R.color.black))
                .titleBgColor(getResources().getColor(R.color.black))
                .titleSubmitTextColor(getResources().getColor(R.color.white))
                .titleTextColor(getResources().getColor(R.color.white))
                .mutiSelect()
                .mutiSelectMaxSize(9)
                .pathList(path)
                .filePath("/ImageSelector/Pictures")
                .build();

            ImageSelector.open(UpLoadImageActivity.this, imageConfig, urls);

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode==0){
            finish();
        }


        Log.e("ccccccccc", path.size() + "");

        if (path.size() == 0) {
            //   adapter = new Adapter(this, path);
            // recycler.setAdapter(adapter);
        } else if (resultCode == RESULT_OK) {
            List<String> pathList = data.getStringArrayListExtra(ImageSelectorActivity.EXTRA_RESULT);


            if (!(pathList.size()>0)){
                Toast.makeText(this, "内部错误", Toast.LENGTH_SHORT).show();

            }else {
                String[] dataToWeixin=new String[pathList.size()];
                for (int i = 0; i < pathList.size(); i++) {
                    dataToWeixin[i]=pathList.get(i);
                }

               Intent intent=new Intent(UpLoadImageActivity.this, WeixinShareActivity.class);
                intent.putExtra("dataToWeixin",dataToWeixin);
                intent.putExtra("typeWx",type);
                intent.putExtra("shareData",shareData);
                startActivity(intent);
                finish();
            }


//
//            for (String path : pathList) {
//                Log.e("ImagePathList", path);
//            }

            path.clear();
            path.addAll(pathList);
            // adapter.notifyDataSetChanged();
        }

        // finish();
    }
}

