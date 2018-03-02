package com.qr.scan.adapter;

import com.baidu.mapapi.search.core.PoiInfo;

/**
 * Created by Administrator on 2018/1/10.
 */

public class PoiAddressItem {
    private PoiInfo poiInfo;
    private boolean poiStatus;

    public PoiInfo getPoiInfo() {
        return poiInfo;
    }

    public void setPoiInfo(PoiInfo poiInfo) {
        this.poiInfo = poiInfo;
    }

    public boolean isPoiStatus() {
        return poiStatus;
    }

    public void setPoiStatus(boolean poiStatus) {
        this.poiStatus = poiStatus;
    }
}
