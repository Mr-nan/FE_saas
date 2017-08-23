import React from 'react';
import {
    PixelRatio,
    Platform,
} from 'react-native';
import  StorageUtil from './StorageUtil';
import * as storageKeyNames from '../constant/storageKeyNames';
const GetPermissionUtil = React.createClass({

    render(){
        return null;
    }, getRoleList(callBack){
        this.getData((data) => {
            let list = [];
            for (let i = 0; i < data.data.response.length; i++) {
                if (data.data.response[i].id == 3) {
                    for (let j = 0; j < data.data.response[i].children.length; j++) {
                        for (let k = 0; k < data.data.response[i].children[j].children.length; k++) {
                            let id = data.data.response[i].children[j].children[k].id;
                            if (id == 31 || id == 32 || id == 33 || id == 34 || id == 35) {
                                list.push({
                                    id: data.data.response[i].children[j].children[k].id,
                                    name: data.data.response[i].children[j].children[k].name
                                });
                            }
                        }
                    }
                }
            }
            callBack(list);
        });
    }, getData(callBack){
        StorageUtil.mGetItem(storageKeyNames.GET_USER_PERMISSION, (result) => {
            if (result.code == 1) {
                let data = JSON.parse(result.result);
                callBack(data);
            } else {
            }
        })
    }
});

module.exports = GetPermissionUtil;