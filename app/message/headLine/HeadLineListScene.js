/**
 * Created by hanmeng on 2017/7/31.
 * 车市头条
 *
 * 数据持久化流程
 * 1.读取数据库中最新的一条数据，取其create_time作为参数http请求
 * 2.如数据库中没有数据则取进入app的时间
 * 3.将请求下来的数据isRead字段全部置为false, 将用户手机号写入tel字段
 * 4.将所有数据写入数据库
 * 5.将请求下来的数据与数据库中数据结合成为列表中数据
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ListView,
    Modal
} from 'react-native';

import NavigatorView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import DailyReminderScene from "../dailyReminder/DailyReminderScene";
const Pixel = new PixelUtil();
import * as AppUrls from "../../constant/appUrls";
import {request, requestNoToken} from "../../utils/RequestUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import HeadLineDetailScene from "./HeadLineDetailScene";
import StorageUtil from "../../utils/StorageUtil";
import SQLiteUtil from "../../utils/SQLiteUtil";
import {MessageListItem} from "../component/MessageListItem";
const SQLite = new SQLiteUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');

export class HeadLineListScene extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.headLineListData = [];
        this.createTime = '';
        this.custPhone = '';
        this.state = {
            dataSource: [],
            isRefreshing: false,
            renderPlaceholderOnly: 'blank'
        };
    }

    /**
     *
     **/
    initFinish = () => {
        /*        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
         dataSource: ds.cloneWithRows(['0', '1']),
         renderPlaceholderOnly: 'success'
         });*/
        /*        StorageUtil.mGetItem(StorageKeyNames.INTO_TIME, (res) => {
         console.log('INTO_TIME=====', res);
         });*/
        this.loadData();
    };

    /**
     *   加载数据
     **/
    loadHttpData = () => {
        StorageUtil.mGetItem(StorageKeyNames.PHONE, (data) => {
            if (data.code == 1 && data.result != null) {
                this.custPhone = data.result;
                let maps = {
                    pushTo: '15102373842',
                    //pushTo: this.custPhone,
                    token: '5afa531b-4295-4c64-8d6c-ac436c619078',
                    contentType: 'advertisement',
                    //createTime: '2017-08-09 15:18:47'
                    createTime: this.createTime
                };
                let url = AppUrls.SELECT_MSG_BY_CONTENT_TYPE;
                requestNoToken(url, 'post', maps).then((response) => {
                    let listData = response.mjson.data;
                    if (listData && listData.length > 0) {
                        let batch = {sql: '', array: []};
                        let batches = [];
                        for (let i = 0; i < listData.length; i++) {
                            //console.log('listData[i]===',listData[i]);
                            this.headLineListData.unshift(listData[i]);
                            listData[i].isRead = false;
                            listData[i].tel = this.custPhone;

                            batch = {
                                sql: 'INSERT INTO messageHeadLineModel (id,content,contentType,createTime,enable,pushFrom,pushStatus,pushTo,roleName,taskId,title,isRead,tel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                array: []
                            };
                            batch.array.push(listData[i].id, listData[i].content, listData[i].contentType, listData[i].createTime, listData[i].enable, listData[i].pushFrom,
                                listData[i].pushStatus, listData[i].pushTo, listData[i].roleName, listData[i].taskId, listData[i].title, listData[i].isRead, listData[i].tel);
                            batches.push(batch)
                            /*SQLite.changeData('INSERT INTO messageHeadLineModel (id,content,contentType,createTime,enable,pushFrom,pushStatus,pushTo,roleName,taskId,title,isRead,tel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
                             [listData[i].id, listData[i].content, listData[i].contentType, listData[i].createTime, listData[i].enable, listData[i].pushFrom,
                             listData[i].pushStatus, listData[i].pushTo, listData[i].roleName, listData[i].taskId, listData[i].title, listData[i].isRead, listData[i].tel]);*/
                        }
                        SQLite.changeDataBatch(batches);
                    }
                    if (this.headLineListData && this.headLineListData.length > 0) {
                        //console.log('this.headLineListData===',this.headLineListData);
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(this.headLineListData),
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success'
                        });
                    } else {
                        this.setState({
                            isRefreshing: false,
                            renderPlaceholderOnly: 'null'
                        });
                    }
                }, (error) => {
                    this.setState({
                        isRefreshing: false,
                        renderPlaceholderOnly: 'error'
                    });
                });
            } else {
                //this.props.showToast('确认验收失败');
            }
        });
    };

    /**
     *   读取数据库中的缓存数据
     **/
    loadData = () => {
        this.headLineListData = [];
        SQLite.selectData('SELECT * FROM messageHeadLineModel order by createTime desc', [],
            (data) => {
                //console.log('SELECT * FROM messageHeadLineModel', data);
                //数据库中有数据
                let count = data.result.rows.length;
                if (count > 0) {
                    this.createTime = data.result.rows.item(0).createTime;
                    for (let i = 0; i < count; i++) {
                        //console.log(data.result.rows.item(i));
                        this.headLineListData.push(data.result.rows.item(i));
                    }
                } else {
                    StorageUtil.mGetItem(StorageKeyNames.INTO_TIME, (data) => {
                        if (data.code == 1 && data.result != null) {
                            this.createTime = data.result;
                        } else {
                            //this.props.showToast('确认验收失败');
                        }
                    });
                }
                this.loadHttpData();
            });
    };

    /**
     *
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            // 加载中....
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='车市头条' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='车市头条' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(80)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          renderSeparator={this._renderSeperator}/>
            </View>);
        }

    }

    /**
     *
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    /**
     *
     **/
    _renderRow = (rowData, selectionID, rowID) => {
        return (
            <MessageListItem ref='msi' navigator={this.props.navigator} rowData={rowData} type='advertisement'/>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),
        backgroundColor: fontAndColor.COLORA3,
    },
    listItem: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        backgroundColor: '#ffffff',
        borderRadius: Pixel.getPixel(4),
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    title: {
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(20),
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT),
        color: fontAndColor.COLORA0
    },
    describe: {
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color: fontAndColor.COLORA1
    },
    separatedLine: {
        marginTop: Pixel.getPixel(10),
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    subItem: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: '#ffffff'
    },
    subTitle: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color: fontAndColor.COLORA2
    },
    image: {
        marginRight: Pixel.getPixel(15)
    }
});