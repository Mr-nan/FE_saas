package com.qr.scan.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.baidu.mapapi.search.core.PoiInfo;
import com.qr.scan.R;

import java.util.ArrayList;

/**
 * Created by Administrator on 2018/1/9.
 */

public class PoiAddressAdapter extends BaseAdapter {
    private ArrayList<PoiAddressItem> list;
    private Context context;
    private IPoiAddressItemClick click;

    public PoiAddressAdapter(Context context, ArrayList<PoiAddressItem> list,IPoiAddressItemClick click) {
        this.list = list;
        this.context = context;
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
    public PoiAddressItem getItem(int position) {
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
                        R.layout.item_address_listview, null);
            }
            vh = ViewHolder.getHolder(convertView);
            PoiAddressItem ga = list.get(position);
            vh.txt_name.setText(ga.getPoiInfo().name);
            vh.txt_detail.setText(ga.getPoiInfo().address);
            vh.img_status.setVisibility(View.GONE);
            if(ga.isPoiStatus()){
                vh.img_status.setVisibility(View.VISIBLE);
            }
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

    static class ViewHolder {

        public TextView txt_name, txt_detail;

        public ImageView img_status;

        public RelativeLayout ll_borrow_item;

        public ViewHolder(View view) {
            ll_borrow_item = (RelativeLayout) view
                    .findViewById(R.id.ll_address_item);
            img_status = (ImageView) view.findViewById(R.id.img_poi_status);
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
