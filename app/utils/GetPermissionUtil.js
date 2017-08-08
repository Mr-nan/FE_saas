import React from 'react';
import {
    PixelRatio,
    Platform,
} from 'react-native';
import StoreReceptionManageNewScene from "../crm/StoresReception/StoreReceptionManageNewScene";
import KeepCustomerManageScene from "../crm/KeepCustomer/KeepCustomerManageScene";
import {BacklogListScene} from "../message/backlog/BacklogListScene";
import DailyReminderScene from "../message/dailyReminder/DailyReminderScene";
import {HeadLineListScene} from "../message/headLine/HeadLineListScene";
import Setting from "../mine/setting/Setting";
import CarMySourceScene from "../carSource/CarMySourceScene";
import CarPublishFirstScene from "../carSource/carPublish/CarPublishFirstScene";
import CarTrimScene from "../carSource/carBuy/CarTrimScene";
import CarBuyScene from "../carSource/carBuy/CarBuyScene";
import CollectionIntent from "../collectionIntent/CollectionIntent";
import CarSharedListScene from "../carSource/CarSharedListScene";
import {SysMessageListScene} from "../message/sysMessage/SysMessageListScene";
const data = require('./quanxian.json');
const GetPermissionUtil = React.createClass({

    render(){
        return null;
    },
    /**
     * from @zhaojian
     *
     * 获取底部导航栏权限列表
     **/
    getFirstList(){
        let list = [];
        let image = {};
        let unImage = {};
        data.data.response.sort(function (a, b) {
            return a.sort_id - b.sort_id;
        });
        for (let i = 0; i < data.data.response.length; i++) {
            if (data.data.response[i].id == 1) {
                image = require('../../images/mainImage/homeSelect.png');
                unImage = require('../../images/mainImage/homeUnSelect.png');
            } else if (data.data.response[i].id == 2) {
                image = require('../../images/mainImage/carSelect.png');
                unImage = require('../../images/mainImage/carUnSelect.png');
            } else if (data.data.response[i].id == 3) {
                image = require('../../images/workbench/gztxz.png');
                unImage = require('../../images/workbench/gztwxz.png');
            } else if (data.data.response[i].id == 4) {
                image = require('../../images/mainImage/moneySelect.png');
                unImage = require('../../images/mainImage/moneyUnSelect.png');
            } else if (data.data.response[i].id == 5) {
                image = require('../../images/mainImage/mineSelect.png');
                unImage = require('../../images/mainImage/mineUnSelect.png');
            }
            list.push({
                name: data.data.response[i].name, id: data.data.response[i].id,
                image: image, unImage: unImage, ref: '', key: 'page' + data.data.response[i].id
            });
        }
    }, getLastList(){
        let list = [];
        data.data.response.sort(function (a, b) {
            return a.sort_id - b.sort_id;
        });
        for (let i = 0; i < data.data.response.length; i++) {
            data.data.response[i].children.sort(function (a, b) {
                return a.sort_id - b.sort_id;
            });
            for (let j = 0; j < data.data.response[i].children.length; j++) {
                data.data.response[i].children[j].children.sort(function (a, b) {
                    return a.sort_id - b.sort_id;
                });
            }
        }
        for (let i = 0; i < data.data.response.length; i++) {
            if (data.data.response[i].id == 3) {
                for (let j = 0; j < data.data.response[i].children.length; j++) {
                    for (let k = 0; k < data.data.response[i].children[j].children.length; k++) {
                        list.push(this.getInfoById(data.data.response[i].children[j].children[k].id,
                            data.data.response[i].children[j].children[k].name));
                    }
                }
            }
        }
        return this.removal(list);
    }, getInfoById(id, name){
        let image = {};
        let names = '';
        let component = {};
        let componentName = '';
        if (id == 20) {
            image = require('../../images/workbench/fc.png');
            names = name;
            component = CarPublishFirstScene;
            componentName = 'carpublishfirstscene';
        } else if (id == 21 || id == 22 || id == 23 || id == 24 || id == 25) {
            image = require('../../images/workbench/zb.png');
            names = '整备';
            component = CarTrimScene;
            componentName = 'cartrimscene';
        } else if (id == 19) {
            image = require('../../images/workbench/kcgl.png');
            names = name;
            component = CarMySourceScene;
            componentName = 'carmysourcescene';
        } else if (id == 26) {
            image = require('../../images/workbench/sc.png');
            names = name;
            component = CarBuyScene;
            componentName = 'carbuyscene';
        } else if (id == 28) {
            image = require('../../images/workbench/mdjd.png');
            names = name;
            component = StoreReceptionManageNewScene;
            componentName = 'storereceptionmanagenewscene';
        } else if (id == 29) {
            image = require('../../images/workbench/khgl.png');
            names = name;
            component = KeepCustomerManageScene;
            componentName = 'keepcustomermanagescene';
        } else if (id == 27) {
            image = require('../../images/workbench/yxzx.png');
            names = name;
            component = Setting;
            componentName = 'setting';
        } else if (id == 17) {
            image = require('../../images/workbench/plfx.png');
            names = name;
            component = CarSharedListScene;
            componentName = 'carsharedlistscene';
        } else if (id == 30) {
            image = require('../../images/workbench/dbsx.png');
            names = name;
            component = BacklogListScene;
            componentName = 'backloglistscene';
        } else if (id == 31) {
            image = require('../../images/workbench/mrtx.png');
            names = name;
            component = DailyReminderScene;
            componentName = 'dailyreminderscene';
        } else if (id == 33) {
            image = require('../../images/workbench/hdxx.png');
            names = name;
            component = Setting;
            componentName = 'setting';
        } else if (id == 18) {
            image = require('../../images/workbench/dycy.png');
            names = name;
            component = CollectionIntent;
            componentName = 'collectionintent';
        } else if (id == 32) {
            image = require('../../images/workbench/cstt.png');
            names = name;
            component = HeadLineListScene;
            componentName = 'headlinelistscene';
        } else if (id == 34) {
            image = require('../../images/workbench/xtxx.png');
            names = name;
            component = SysMessageListScene;
            componentName = 'sysmessagelistscene';
        }
        return {name: names, id: id, image: image, component: component, componentName: componentName}
    }, removal(array){
        let r = [];
        for (let i = 0, l = array.length; i < l; i++) {
            for (let j = i + 1; j < l; j++)
                if (array[i].name === array[j].name) j = ++i;
            r.push(array[i]);
        }
        return r;
    }, getAllList(){
        let list = [];
        data.data.response.sort(function (a, b) {
            return a.sort_id - b.sort_id;
        });
        for (let i = 0; i < data.data.response.length; i++) {
            data.data.response[i].children.sort(function (a, b) {
                return a.sort_id - b.sort_id;
            });
            for (let j = 0; j < data.data.response[i].children.length; j++) {
                data.data.response[i].children[j].children.sort(function (a, b) {
                    return a.sort_id - b.sort_id;
                });
            }
        }
        for (let i = 0; i < data.data.response.length; i++) {
            if (data.data.response[i].id == 3) {
                for (let j = 0; j < data.data.response[i].children.length; j++) {
                    let childList = [];
                    for (let k = 0; k < data.data.response[i].children[j].children.length; k++) {
                        childList.push(this.getInfoById(data.data.response[i].children[j].children[k].id,
                            data.data.response[i].children[j].children[k].name));
                    }
                    list.push({
                        name: data.data.response[i].children[j].name,
                        id: data.data.response[i].children[j].id,
                        childList: this.removal(childList)
                    });
                }
            }
        }
        return list;

    }
});

module.exports = GetPermissionUtil;