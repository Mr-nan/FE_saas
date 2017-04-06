package com.custom.camera;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.File;

/**
 * Created by Administrator on 2016/10/13.
 */

public class CameraActivity extends Activity {

    private CameraSurfaceView mCameraSurfaceView;
    private Button takePicBtn;

    private boolean isClicked = false;
    private TextView tv_back;
    private RelativeLayout rl_image;
    private TextView tv_ok;
    private String path = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        // 全屏显示
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_camera);
        mCameraSurfaceView = (CameraSurfaceView) findViewById(R.id.cameraSurfaceView);
        takePicBtn = (Button) findViewById(R.id.takePic);
        rl_image = (RelativeLayout) findViewById(R.id.rl_image);
        tv_back = (TextView) findViewById(R.id.tv_back);
        tv_ok = (TextView) findViewById(R.id.tv_ok);
        File file = new File("/sdcard/mycamera/photo/");
        file.mkdirs();
        mCameraSurfaceView.setBack(new ICameraBack() {
            @Override
            public void itemclick(String paths) {
                Log.e("1111111111111", "" + path);
                rl_image.setVisibility(View.GONE);
                path = paths;
                isClicked = true;
            }
        });
        takePicBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!isClicked) {
                    mCameraSurfaceView.takePicture();
                }
            }
        });
        tv_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (path.equals("")) {
                    finish();
                } else {
                    path = "";
                    isClicked = false;
                    File file = new File(path);
                    file.delete();
                    mCameraSurfaceView.stopPreview();
                    rl_image.setVisibility(View.VISIBLE);
                }
            }
        });
        tv_ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!path.equals("")) {
                    Intent intent = new Intent();
                    Bundle bundle = new Bundle();
                    bundle.putString("file_path", "" + path);
                    intent.putExtras(bundle);
                    setResult(RESULT_OK, intent);
                    finish();
                }
            }
        });
    }

}
