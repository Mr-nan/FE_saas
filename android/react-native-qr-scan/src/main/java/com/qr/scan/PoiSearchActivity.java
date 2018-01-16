package com.qr.scan;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.mapapi.search.core.PoiInfo;
import com.baidu.mapapi.search.core.SearchResult;
import com.baidu.mapapi.search.poi.OnGetPoiSearchResultListener;
import com.baidu.mapapi.search.poi.PoiCitySearchOption;
import com.baidu.mapapi.search.poi.PoiDetailResult;
import com.baidu.mapapi.search.poi.PoiIndoorResult;
import com.baidu.mapapi.search.poi.PoiResult;
import com.baidu.mapapi.search.poi.PoiSearch;
import com.qr.scan.adapter.IPoiAddressItemClick;
import com.qr.scan.adapter.PoiKeywordAdapter;

import java.util.ArrayList;


/**
 * Created by Administrator on 2018/1/10.
 */

public class PoiSearchActivity extends Activity implements
        OnGetPoiSearchResultListener {

    private TextView txt_city_find = null;
    private EditText et_find = null;
    private ListView poi_listview = null;
    private PoiSearch mPoiSearch = null;
    private PoiKeywordAdapter poiAdapter = null;
    private String keyword = "";
    private String city = "";
    ArrayList<PoiInfo> pois = null;
    private LinearLayout back_layout = null;
    private LinearLayout sure_layout = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);//去掉标题栏
        setContentView(R.layout.activity_poi_search);
        Intent intent = getIntent();
        city = intent.getStringExtra("city");
        txt_city_find = (TextView) findViewById(R.id.txt_city_find);
        txt_city_find.setText(city);
        et_find = (EditText) findViewById(R.id.et_find);
        et_find.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if (charSequence.length() <= 0) {
                    return;
                }

                keyword = charSequence.toString();
                PoiCitySearchOption option = new PoiCitySearchOption();
                option.city(city);
                option.mPageCapacity = 50;
                option.keyword(keyword);
                mPoiSearch.searchInCity(option);
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
        poi_listview = (ListView) findViewById(R.id.sug_address_list);
//        ArrayList<PoiInfo> poiList = new ArrayList<>();
//        PoiAddressAdapter poiAdapter = new PoiAddressAdapter(PoiSearchActivity.this,poiList);
//        poi_listview.setAdapter(poiAdapter);

        // 初始化搜索模块，注册搜索事件监听
        mPoiSearch = PoiSearch.newInstance();
        mPoiSearch.setOnGetPoiSearchResultListener(this);

        back_layout = (LinearLayout)findViewById(R.id.back);
        back_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PoiSearchActivity.this.finish();
            }
        });

        sure_layout = (LinearLayout) findViewById(R.id.sure_layout);
        sure_layout.setVisibility(View.GONE);
    }


    /**
     * 获取POI搜索结果，包括searchInCity，searchNearby，searchInBound返回的搜索结果
     * @param result
     */
    public void onGetPoiResult(PoiResult result) {
        if (result == null || result.error == SearchResult.ERRORNO.RESULT_NOT_FOUND) {
            Toast.makeText(PoiSearchActivity.this, "未找到结果", Toast.LENGTH_LONG)
                    .show();
            return;
        }
        if (result.error == SearchResult.ERRORNO.NO_ERROR) {

            pois = new ArrayList<>();
            for(PoiInfo poi : result.getAllPoi()){
                if(poi.location != null){
                    pois.add(poi);
                }
            }
            poiAdapter = new PoiKeywordAdapter(PoiSearchActivity.this, pois, keyword, new IPoiAddressItemClick() {
                @Override
                public void itemClick(int position) {
                    Intent rIntent = new Intent();
                    rIntent.putExtra("address", pois.get(position).address);
                    rIntent.putExtra("longitude", pois.get(position).location.longitude+"");
                    rIntent.putExtra("latitude", pois.get(position).location.latitude+"");
                    PoiSearchActivity.this.setResult(RESULT_OK, rIntent);
                    PoiSearchActivity.this.finish();
                }
            });
            poi_listview.setAdapter(poiAdapter);
            poiAdapter.notifyDataSetChanged();
        }
        if (result.error == SearchResult.ERRORNO.AMBIGUOUS_KEYWORD) {
            Log.e("22222222","AMBIGUOUS_KEYWORD");
        }
    }

    @Override
    protected void onDestroy() {
        mPoiSearch.destroy();
        super.onDestroy();
    }

    @Override
    public void onGetPoiIndoorResult(PoiIndoorResult poiIndoorResult) {

    }

    /**
     * 获取POI详情搜索结果，得到searchPoiDetail返回的搜索结果
     * @param result
     */
    public void onGetPoiDetailResult(PoiDetailResult result) {
        if (result.error != SearchResult.ERRORNO.NO_ERROR) {
            Toast.makeText(PoiSearchActivity.this, "抱歉，未找到结果", Toast.LENGTH_SHORT)
                    .show();
        } else {
            Toast.makeText(PoiSearchActivity.this, result.getName() + ": " + result.getAddress(), Toast.LENGTH_SHORT)
                    .show();
        }
    }
}
