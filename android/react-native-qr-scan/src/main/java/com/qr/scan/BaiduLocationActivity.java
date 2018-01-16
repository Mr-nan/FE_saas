package com.qr.scan;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Toast;


import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.MapPoi;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.search.core.PoiInfo;
import com.baidu.mapapi.search.core.SearchResult;
import com.baidu.mapapi.search.geocode.GeoCodeOption;
import com.baidu.mapapi.search.geocode.GeoCodeResult;
import com.baidu.mapapi.search.geocode.GeoCoder;
import com.baidu.mapapi.search.geocode.OnGetGeoCoderResultListener;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeOption;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeResult;
import com.baidu.mapapi.search.sug.SuggestionResult;
import com.qr.scan.adapter.IPoiAddressItemClick;
import com.qr.scan.adapter.PoiAddressAdapter;
import com.qr.scan.adapter.PoiAddressItem;

import java.util.ArrayList;


public class BaiduLocationActivity extends Activity implements
        OnGetGeoCoderResultListener {

    GeoCoder mSearch = null; // 搜索模块，也可去掉地图模块独立使用
    BaiduMap mBaiduMap = null;
    MapView mMapView = null;
    private PoiAddressAdapter poiAdapter = null;
    private ListView addressListview = null;
    private ArrayList<SuggestionResult.SuggestionInfo> sugList = null;
    private ArrayList<PoiAddressItem> poiList = null;
    private EditText find_edit = null;


    private String province = "";
    private String city = "";
    private String district = "";
    private String address = "";
    private String longitude = "";
    private String latitude = "";

    private LinearLayout back_layout = null;
    private LinearLayout sure_layout = null;

    Handler handler = new Handler();
    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            // handler自带方法实现定时器
            try {
                if(longitude.equals("")){
                    mSearch.geocode(new GeoCodeOption().city(city).address(district));
                }else{
                    LatLng poi = new LatLng(Double.parseDouble(latitude),Double.parseDouble(longitude));
                    mBaiduMap.clear();
                    mBaiduMap.addOverlay(new MarkerOptions().position(poi)
                            .icon(BitmapDescriptorFactory
                                    .fromResource(R.drawable.icon_gcoding)));
                    mBaiduMap.setMapStatus(MapStatusUpdateFactory.newLatLng(poi));

                    /**
                     * 使用建议搜索服务获取建议列表，结果在onSuggestionResult()中更新
                     */
                    mSearch.reverseGeoCode(new ReverseGeoCodeOption()
                            .location(poi));
                }

            } catch (Exception e) {

            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);//去掉标题栏
        setContentView(R.layout.activity_baidu_location);

        Intent mIntent = getIntent();
        province = mIntent.getStringExtra("province");
        city = mIntent.getStringExtra("city");
        district = mIntent.getStringExtra("district");
        address = mIntent.getStringExtra("address");
        longitude = mIntent.getStringExtra("longitude");
        latitude = mIntent.getStringExtra("latitude");


        // 地图初始化
        mMapView = (MapView) findViewById(R.id.bmapView);
        mMapView.showZoomControls(false);
        mBaiduMap = mMapView.getMap();
        addressListview = (ListView) findViewById(R.id.sug_address_list);

        mBaiduMap.setOnMapClickListener(new BaiduMap.OnMapClickListener() {
            /**
             * 单击地图
             */
            public void onMapClick(LatLng point) {
                mBaiduMap.clear();
                mBaiduMap.addOverlay(new MarkerOptions().position(point)
                        .icon(BitmapDescriptorFactory
                                .fromResource(R.drawable.icon_gcoding)));
                mBaiduMap.setMapStatus(MapStatusUpdateFactory.newLatLng(point));
                mSearch.reverseGeoCode(new ReverseGeoCodeOption()
                        .location(point));
            }

            /**
             * 单击地图中的POI点
             */
            public boolean onMapPoiClick(MapPoi poi) {
                return false;
            }
        });
        find_edit = (EditText) findViewById(R.id.et_find);
        find_edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(BaiduLocationActivity.this,PoiSearchActivity.class);
                intent.putExtra("city",city);
                BaiduLocationActivity.this.startActivityForResult(intent,0);
            }
        });

        // 初始化搜索模块，注册事件监听
        mSearch = GeoCoder.newInstance();
        mSearch.setOnGetGeoCodeResultListener(this);
        handler.postDelayed(runnable, 1000); //每隔1s执行


        back_layout = (LinearLayout)findViewById(R.id.back);
        back_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                BaiduLocationActivity.this.finish();
            }
        });

        sure_layout = (LinearLayout) findViewById(R.id.sure_layout);
        sure_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(poiList == null){
                    Toast.makeText(BaiduLocationActivity.this, "请先选择地址", Toast.LENGTH_SHORT).show();
                    return;
                }
                boolean flag = false;
                PoiAddressItem sItem = null;
                for (PoiAddressItem item : poiList){
                    if(item.isPoiStatus()) {
                        sItem = item;
                        flag = true;
                    }
                }
                if(!flag){
                    Toast.makeText(BaiduLocationActivity.this, "请先选择地址", Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent rIntent = new Intent();
                rIntent.putExtra("address", sItem.getPoiInfo().name);
                rIntent.putExtra("longitude", sItem.getPoiInfo().location.longitude+"");
                rIntent.putExtra("latitude", sItem.getPoiInfo().location.latitude+"");
                BaiduLocationActivity.this.setResult(RESULT_OK, rIntent);
                BaiduLocationActivity.this.finish();
            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == 0 && resultCode == RESULT_OK){
            Intent rIntent = new Intent();
            rIntent.putExtra("address", data.getStringExtra("address"));
            rIntent.putExtra("longitude",data.getStringExtra("longitude"));
            rIntent.putExtra("latitude", data.getStringExtra("latitude"));
            BaiduLocationActivity.this.setResult(RESULT_OK, rIntent);
            BaiduLocationActivity.this.finish();
        }
    }

    @Override
    protected void onPause() {
        mMapView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        mMapView.onResume();
        // Geo搜索
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        mMapView.onDestroy();
        mSearch.destroy();
        super.onDestroy();
    }


    @Override
    public void onGetGeoCodeResult(GeoCodeResult result) {

        if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
            Log.e("address geo ","抱歉，未能找到结果");
            return;
        }
        mBaiduMap.clear();
        mBaiduMap.addOverlay(new MarkerOptions().position(result.getLocation())
                .icon(BitmapDescriptorFactory
                        .fromResource(R.drawable.icon_gcoding)));
        mBaiduMap.setMapStatus(MapStatusUpdateFactory.newLatLng(result
                .getLocation()));
//        String strInfo = String.format("纬度：%f 经度：%f",
//                result.getLocation().latitude, result.getLocation().longitude);
//        Toast.makeText(BaiduLocationActivity.this, strInfo, Toast.LENGTH_LONG).show();

        /**
         * 使用建议搜索服务获取建议列表，结果在onSuggestionResult()中更新
         */
        mSearch.reverseGeoCode(new ReverseGeoCodeOption()
                .location(new LatLng(result.getLocation().latitude,result.getLocation().longitude)));
    }

    @Override
    public void onGetReverseGeoCodeResult(ReverseGeoCodeResult result) {
        if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
            Toast.makeText(BaiduLocationActivity.this, "抱歉，未能找到结果", Toast.LENGTH_LONG)
                    .show();
            return;
        }
        poiList = new ArrayList<>();
        for(PoiInfo poi : result.getPoiList()){
            if(poi.location != null){
                PoiAddressItem item = new PoiAddressItem();
                item.setPoiStatus(false);
                item.setPoiInfo(poi);
                poiList.add(item);
            }
        }
        poiList.get(0).setPoiStatus(true);
        poiAdapter = new PoiAddressAdapter(BaiduLocationActivity.this, poiList, new IPoiAddressItemClick() {
            @Override
            public void itemClick(int position) {
                for(int i=0;i < poiList.size();i++){
                    if(i == position){
                        poiList.get(i).setPoiStatus(true);
                    }else {
                        poiList.get(i).setPoiStatus(false);
                    }
                }
                poiAdapter.notifyDataSetChanged();
            }
        });
        addressListview.setAdapter(poiAdapter);
        poiAdapter.notifyDataSetChanged();

    }
}
