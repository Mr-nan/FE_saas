package com.qr.scan.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.baidu.mapapi.search.sug.SuggestionResult;
import com.qr.scan.R;

import java.util.ArrayList;

/**
 * Created by Administrator on 2018/1/9.
 */

public class SuggestAddressAdapter extends BaseAdapter {

    private ArrayList<SuggestionResult.SuggestionInfo> list;
    private Context context;

    public SuggestAddressAdapter(Context context, ArrayList<SuggestionResult.SuggestionInfo> list) {
        this.list = list;
        this.context = context;
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
    public SuggestionResult.SuggestionInfo getItem(int position) {
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
            SuggestionResult.SuggestionInfo ga = list.get(position);
            vh.txt_name.setText(ga.key);
            vh.txt_detail.setText(ga.district);
            vh.ll_borrow_item.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                }
            });

        } catch (Exception e) {
        }
        return convertView;
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
