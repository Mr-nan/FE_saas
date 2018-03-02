import React from 'react';
import {
    PixelRatio,
    Platform,
    DeviceEventEmitter,
} from 'react-native';
import StoreReceptionManageNewScene from "../crm/StoresReception/StoreReceptionManageNewScene";
import KeepCustomerManageScene from "../crm/KeepCustomer/KeepCustomerManageScene";
import BacklogListScene from "../message/backlog/BacklogListScene";
import DailyReminderScene from "../message/dailyReminder/DailyReminderScene";
import HeadLineListScene from "../message/headLine/HeadLineListScene";
import Setting from "../mine/setting/Setting";
import CarMySourceScene from "../carSource/CarMySourceScene";
import CarNumberScene   from '../carSource/CarNumberScene';
import CarPublishFirstScene from "../carSource/carPublish/CarPublishFirstScene";
import NewCarPublishFirstScene from "../carSource/carPublish/NewCarPublishFirstScene";
import CarTrimScene from "../carSource/carBuy/CarTrimScene";
import CarBuyScene from "../carSource/carBuy/CarBuyScene";
import WuliuWebScene from "../mine/myOrder/wuliuweb/WuliuWebScene";
import CollectionIntent from "../collectionIntent/CollectionIntent";
import CarSharedListScene from "../carSource/CarSharedListScene";
import SysMessageListScene from "../message/sysMessage/SysMessageListScene";
import  StorageUtil from './StorageUtil';
import * as storageKeyNames from '../constant/storageKeyNames';
import SoftArticlesCenterScene from "../main/SoftArticlesCenterScene";
import YaoQingDeHaoLi from "../mine/setting/YaoQingDeHaoLi";
const GetPermissionUtil = React.createClass({

    render(){
        return null;
    }, getData(callBack){
        StorageUtil.mGetItem(storageKeyNames.GET_USER_PERMISSION, (result) => {
            if (result.code == 1) {
                let data = JSON.parse(result.result);
                callBack(data);
            } else {
            }
        })
    },
    /**
     * from @zhaojian
     *
     * 获取底部导航栏权限列表
     **/
    getFirstList(callBack){
        this.getData((data) => {
            console.log(data);
            let list = [];
            let image = {};
            let unImage = {};
            let ref = '';
            data.data.sort(function (a, b) {
                return a.sort_id - b.sort_id;
            });
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].id == 1) {
                    image = require('../../images/mainImage/homeSelect.png');
                    unImage = require('../../images/mainImage/homeUnSelect.png');
                    ref = 'firstpage';
                } else if (data.data[i].id == 2) {
                    image = require('../../images/mainImage/carSelect.png');
                    unImage = require('../../images/mainImage/carUnSelect.png');
                    ref = 'carpage';
                } else if (data.data[i].id == 3) {
                    image = require('../../images/workbench/gztxz.png');
                    unImage = require('../../images/workbench/gztwxz.png');
                    ref = 'sendpage';
                } else if (data.data[i].id == 4) {
                    image = require('../../images/mainImage/moneySelect.png');
                    unImage = require('../../images/mainImage/moneyUnSelect.png');
                    ref = 'financePage';
                } else if (data.data[i].id == 5) {
                    image = require('../../images/mainImage/mineSelect.png');
                    unImage = require('../../images/mainImage/mineUnSelect.png');
                    ref = 'mypage';
                }
                list.push({
                    name: data.data[i].name, id: data.data[i].id,
                    image: image, unImage: unImage, ref: ref, key: 'page' + data.data[i].id
                });
            }
            callBack(list);
        });
    }, getLastList(callBack){
        this.getData((data) => {
            let list = [];
            data.data.sort(function (a, b) {
                return a.sort_id - b.sort_id;
            });
            for (let i = 0; i < data.data.length; i++) {
                data.data[i].children.sort(function (a, b) {
                    return a.sort_id - b.sort_id;
                });
                for (let j = 0; j < data.data[i].children.length; j++) {
                    data.data[i].children[j].children.sort(function (a, b) {
                        return a.sort_id - b.sort_id;
                    });
                }
            }
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].id == 3) {
                    for (let j = 0; j < data.data[i].children.length; j++) {
                        for (let k = 0; k < data.data[i].children[j].children.length; k++) {
                            list.push(this.getInfoById(data.data[i].children[j].children[k].id,
                                data.data[i].children[j].children[k].name));
                        }
                    }
                }
            }
            callBack(this.removal(list));
        });
    }, getInfoById(id, name){
        let image = {};
        let names = '';
        let component = {};
        let componentName = '';
        let pushAction =()=>{};
        if (id == 30) {
            image = require('../../images/workbench/fc.png');
            names = name;
            component = NewCarPublishFirstScene;
            componentName = 'NewCarPublishFirstScene';
        } else if (id == 31 || id == 32 || id == 33 || id == 34 || id == 35) {
            image = require('../../images/workbench/zb.png');
            names = '二手车整备';
            component = CarTrimScene;
            componentName = 'CarTrimScene';
        } else if (id == 29) {
            image = require('../../images/workbench/carNumber.png');
            names = name;
            component = CarNumberScene;
            componentName = 'CarNumberScene';
        } else if (id == 36) {
            image = require('../../images/workbench/sc.png');
            names = name;
            component = CarBuyScene;
            componentName = 'carbuyscene';
        } else if (id == 38) {
            image = require('../../images/workbench/mdjd.png');
            names = name;
            component = StoreReceptionManageNewScene;
            componentName = 'storereceptionmanagenewscene';
        } else if (id == 39) {
            image = require('../../images/workbench/khgl.png');
            names = name;
            component = KeepCustomerManageScene;
            componentName = 'keepcustomermanagescene';
        } else if (id == 37) {
            image = require('../../images/workbench/yxzx.png');
            names = name;
            component = SoftArticlesCenterScene;
            componentName = 'SoftArticlesCenterScene';
        } else if (id == 27) {
            image = require('../../images/workbench/plfx.png');
            names = name;
            component = CarSharedListScene;
            componentName = 'carsharedlistscene';
        } else if (id == 41) {
            image = require('../../images/workbench/dbsx.png');
            names = name;
            component = BacklogListScene;
            componentName = 'backloglistscene';
        } else if (id == 42) {
            image = require('../../images/workbench/mrtx.png');
            names = name;
            component = DailyReminderScene;
            componentName = 'dailyreminderscene';
        } else if (id == 44) {
            image = require('../../images/workbench/hdxx.png');
            names = name;
            component = Setting;
            componentName = 'setting';
        } else if (id == 28) {
            image = require('../../images/workbench/dycy.png');
            names = name;
            component = CollectionIntent;
            componentName = 'collectionintent';
        } else if (id == 43) {
            image = require('../../images/workbench/cstt.png');
            names = name;
            component = HeadLineListScene;
            componentName = 'headlinelistscene';
        } else if (id == 45) {
            image = require('../../images/workbench/xtxx.png');
            names = name;
            component = SysMessageListScene;
            componentName = 'sysmessagelistscene';
        } else if (id == 40) {
            image = require('../../images/workbench/wd.png');
            names = name;
            component = SysMessageListScene;
            componentName = 'sysmessagelistscene';
        }else if (id == 57) {
            image = require('../../images/mainImage/my_yqdhl.png');
            names = name;
            component = YaoQingDeHaoLi;
            componentName = 'yaoqingdehaoli';
        }else if(id == 62){
            image = require('../../images/workbench/fUserCar.png');
            names = name;
            component = CarPublishFirstScene;
            componentName = 'CarPublishFirstScene';
        }else if(id == 63){
            image = require('../../images/workbench/sNewCar.png');
            names = name;
            pushAction=()=>{
                DeviceEventEmitter.emit('pushNewCarListScene');
            }
        }else if(id == 64){
            image = require('../../images/workbench/sUserCar.png');
            names = name;
            pushAction=()=>{
                DeviceEventEmitter.emit('pushUserCarListScene');
            }
        }else if(id == 65){
            image = require('../../images/workbench/kcgl.png');
            names = name;
            component = CarMySourceScene;
            componentName = 'CarMySourceScene';
        }else if(id == 72){
            image = require('../../images/wuliu_service_icon.png');
            names = name;
            component = WuliuWebScene;
            componentName = 'WuliuWebScene';
        }
        return {name: names, id: id, image: image, component: component, componentName: componentName ,pushAction:pushAction}
    }, removal(array){
        let r = [];
        for (let i = 0, l = array.length; i < l; i++) {
            for (let j = i + 1; j < l; j++)
                if (array[i].name === array[j].name) j = ++i;
            r.push(array[i]);
        }
        return r;
    }, getAllList(callBack){
        this.getData((data) => {
            let list = [];
            data.data.sort(function (a, b) {
                return a.sort_id - b.sort_id;
            });
            for (let i = 0; i < data.data.length; i++) {
                data.data[i].children.sort(function (a, b) {
                    return a.sort_id - b.sort_id;
                });
                for (let j = 0; j < data.data[i].children.length; j++) {
                    data.data[i].children[j].children.sort(function (a, b) {
                        return a.sort_id - b.sort_id;
                    });
                }
            }
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].id == 3) {
                    for (let j = 0; j < data.data[i].children.length; j++) {
                        let childList = [];
                        for (let k = 0; k < data.data[i].children[j].children.length; k++) {
                            childList.push(this.getInfoById(data.data[i].children[j].children[k].id,
                                data.data[i].children[j].children[k].name));
                        }
                        list.push({
                            name: data.data[i].children[j].name,
                            id: data.data[i].children[j].id,
                            childList: this.removal(childList)
                        });
                    }
                }
            }
            callBack(list);
        });
    }, getMineList(callBack){
        this.getData((data) => {
            let list = [];
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].id == 5) {
                    for (let j = 0; j < data.data[i].children.length; j++) {
                        list.push({
                            id: data.data[i].children[j].children[0].id,
                            name: data.data[i].children[j].children[0].name
                        });
                    }
                }
            }
            callBack(list);
        });
    },getCertificateVisiable(callBack){
		this.getData((data) => {
		    let back = false;
			for (let i = 0; i < data.data.length; i++) {
				if (data.data[i].id == 5) {
					for (let j = 0; j < data.data[i].children.length; j++) {
					    if(data.data[i].children[j].id==59){
					        back = true;
					        break;

                        }
					}
				}
			}
			if(back){
			    callBack(true);
            }else{
			    callBack(false);
            }

		});
    }
});

module.exports = GetPermissionUtil;