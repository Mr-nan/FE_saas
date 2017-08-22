package com.share.wechat.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;


import com.share.wechat.R;
import com.share.wechat.bean.Image;
import com.share.wechat.utils.ImageConfig;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;


public class ImageAdapter extends BaseAdapter {

    private Context context;
    private LayoutInflater mLayoutInflater;
    private List<Image> imageList;
    private final static String TAG = "ImageAdapter";

    private static final int TYPE_CAMERA = 0;
    private static final int TYPE_NORMAL = 1;

    private boolean showCamera = true;
    private boolean showSelectIndicator = true;

    private List<Image> selectedImageList = new ArrayList<>();

    private int mItemSize;
    private GridView.LayoutParams mItemLayoutParams;

    private ImageConfig imageConfig;



    public ImageAdapter(Context context, List<Image> imageList, ImageConfig imageConfig) {
        mLayoutInflater = LayoutInflater.from(context);
        this.context = context;
        this.imageList = imageList;
        this.imageConfig = imageConfig;
        mItemLayoutParams = new GridView.LayoutParams(GridView.LayoutParams.MATCH_PARENT, GridView.LayoutParams.MATCH_PARENT);
    }


    public void setDefaultSelected(ArrayList<String> resultList) {
        for (String filePath : resultList) {
            Image image = getImageByPath(filePath);
            if (image != null) {
                selectedImageList.add(image);
            }
        }
        if (selectedImageList.size() > 0) {
            notifyDataSetChanged();
        }
    }

    private Image getImageByPath(String filePath) {
        if (imageList != null && imageList.size() > 0) {
            for (Image image : imageList) {
                if (image.path.equalsIgnoreCase(filePath)) {
                    return image;
                }
            }
        }
        return null;
    }

    public void setItemSize(int columnWidth) {
        if (mItemSize == columnWidth) {
            return;
        }
        mItemSize = columnWidth;
        mItemLayoutParams = new GridView.LayoutParams(mItemSize, mItemSize);
        notifyDataSetChanged();
    }

    @Override
    public int getCount() {
        return showCamera ? imageList.size() + 1 : imageList.size();
    }

    @Override
    public Image getItem(int position) {
        if (showCamera) {
            if (position == 0) {
                return null;
            }
            return imageList.get(position - 1);
        } else {
            return imageList.get(position);
        }
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        int type = getItemViewType(position);

        if (type == TYPE_CAMERA) {
            convertView = mLayoutInflater.inflate(R.layout.imageselector_item_camera, parent, false);
            convertView.setTag(null);
        } else if (type == TYPE_NORMAL) {
            ViewHolder holder;
            if (convertView == null) {
                convertView = mLayoutInflater.inflate(R.layout.imageselector_item_image, parent, false);
                holder = new ViewHolder(convertView);
                convertView.setTag(holder);
            } else {
                holder = (ViewHolder) convertView.getTag();
            }
            if (mItemSize > 0) {

                imageConfig.getImageLoader().displayImage(context, getItem(position).path.substring(0,getItem(position).path.length()-1), holder.photo_image);
                // Glide.with(context).load(getItem(position).path).into(holder.photo_image);

                Log.d(TAG, "position:" + position);
            }


        }

        GridView.LayoutParams layoutParams = (GridView.LayoutParams) convertView.getLayoutParams();
        if (layoutParams.height != mItemSize) {
            convertView.setLayoutParams(mItemLayoutParams);
        }

        return convertView;
    }

    class ViewHolder {
        ImageView photo_image;
        View photo_mask;
        ImageView photo_check;

        ViewHolder(View itemView) {
            photo_image = (ImageView) itemView.findViewById(R.id.photo_image);
            photo_mask = itemView.findViewById(R.id.photo_mask);
            photo_check = (ImageView) itemView.findViewById(R.id.photo_check);
            //itemView.setTag(this);
        }

    }


    @Override
    public int getItemViewType(int position) {
        if (showCamera && position == 0) {
            return TYPE_CAMERA;
        }
        return TYPE_NORMAL;
    }

    public void setShowSelectIndicator(boolean showSelectIndicator) {
        this.showSelectIndicator = showSelectIndicator;
    }

    public void setShowCamera(boolean showCamera) {
        if (this.showCamera == showCamera)
            return;
        this.showCamera = showCamera;
        notifyDataSetChanged();
    }

    public void select(Image image, int position, GridView gridView) {

        Log.d(TAG, "我被选择了————测试");


        if (selectedImageList.contains(image)) {
            selectedImageList.remove(image);
        } else {
            selectedImageList.add(image);
        }


        /**
         *  自己测试
         */

        //   int visiblePosition = gridView.getFirstVisiblePosition();

        View view = gridView.getChildAt(position);
        Log.d(TAG, "position:                  " + position);
        ImageView photo_check = (ImageView) view.findViewById(R.id.photo_check);
        View photo_mask = view.findViewById(R.id.photo_mask);

        if (photo_mask.getVisibility() == View.GONE) {

            photo_mask.setVisibility(View.VISIBLE);
        } else {

            photo_mask.setVisibility(View.GONE);
        }

        Field[] fields = photo_check.getClass().getDeclaredFields();
        int imgid = 0;
        for (Field f : fields) {
            if (f.getName().equals("mResource")) {

                f.setAccessible(true);
                try {
                    imgid = f.getInt(photo_check);
                    if (imgid == R.drawable.imageselector_select_checked) {
                        photo_check.setImageResource(R.drawable.imageselector_select_uncheck);

                    } else {
                        photo_check.setImageResource(R.drawable.imageselector_select_checked);

                    }

                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }

    }


    public boolean isShowCamera() {
        return showCamera;
    }

}