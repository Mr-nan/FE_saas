package com.qr.scan.adapter;

import android.content.Context;
import android.text.Html;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.baidu.mapapi.search.core.PoiInfo;
import com.qr.scan.R;

import java.util.ArrayList;

/**
 * Created by Administrator on 2018/1/10.
 */

public class PoiKeywordAdapter extends BaseAdapter {
    private ArrayList<PoiInfo> list;
    private Context context;
    private String keyword;
    private IPoiAddressItemClick click;

    public PoiKeywordAdapter(Context context, ArrayList<PoiInfo> list, String keyword,IPoiAddressItemClick click) {
        this.list = list;
        this.context = context;
        this.keyword = keyword;
        this.click = click;
    }

    @Override
    public int getCount() {
        if (list != null) {
            return list.size();
        } else {
            return 0;
        }

    }

    @Override
    public PoiInfo getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        try {
            ViewHolder vh;
            if (convertView == null) {
                convertView = View.inflate(context,
                        R.layout.item_poi_listview, null);
            }
            vh = ViewHolder.getHolder(convertView);
            PoiInfo ga = list.get(position);
            vh.txt_name.setText(Html.fromHtml(wrapKeyword(ga.name)));
            vh.txt_detail.setText(ga.address);
            vh.ll_borrow_item.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    click.itemClick(position);
                }
            });

        } catch (Exception e) {
        }
        return convertView;
    }

    private String wrapKeyword(String srcStr){
        String rep = srcStr;
        if(srcStr.contains(this.keyword)){
            rep = rep.replace(keyword,"<font color='red'>" + this.keyword +"</font>");
        }
        return rep;
    }

    static class ViewHolder {

        public TextView txt_name, txt_detail;

        public LinearLayout ll_borrow_item;

        public ViewHolder(View view) {
            ll_borrow_item = (LinearLayout) view
                    .findViewById(R.id.ll_address_item);
            txt_name = (TextView) view.findViewById(R.id.txt_address_name);
            txt_detail = (TextView) view.findViewById(R.id.txt_address_detail);
        }

        public static ViewHolder getHolder(View convertView) {
            ViewHolder friendHolder = (ViewHolder) convertView.getTag();
            if (friendHolder == null) {
                friendHolder = new ViewHolder(convertView);
                convertView.setTag(friendHolder);
            }
            return friendHolder;
        }
    }
}
