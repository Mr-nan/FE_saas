/**
 * Created by hanmeng on 2017/8/2.
 * 消息列表
 *  获取未读消息数量流程:
 *  1.获取待办消息未读数量(http请求)
 *  2.获取数据库中系统消息最新一条的create_time作为请求参数，如数据库没数据则取StorageKeyNames.INTO_TIME
 *  3.获取系统消息未读数量(http请求)
 *  4.获取数据库中车市头条最新一条的create_time作为请求参数，如数据库没数据则取StorageKeyNames.INTO_TIME
 *  5.获取车市头条未读数量(http请求)
 *  目前为嵌套请求，最好改成网关统一请求
 **/
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
    Image
} from  'react-native'
const {width, height} = Dimensions.get('window');
import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from '../constant/fontAndColor';
import NavigatorView from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil'
import * as AppUrls from "../constant/appUrls";
import {request, requestNoToken} from "../utils/RequestUtil";
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import DailyReminderScene from "./dailyReminder/DailyReminderScene";
import {BacklogListScene} from "./backlog/BacklogListScene";
import {HeadLineListScene} from "./headLine/HeadLineListScene";
import {SysMessageListScene} from "./sysMessage/SysMessageListScene";
import SQLiteUtil from "../utils/SQLiteUtil";
const SQLite = new SQLiteUtil();
var Pixel = new PixelUtil();


export default class MessageListScene extends BaseComponent {

    /**
     *  初始化
     **/
    constructor(props) {
        super(props);
        this.custPhone = '';
        this.backlogNum = 0;
        this.sysMessageNum = 0;
        this.headLineNum = 0;
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank'
        };
    }

    /**
     *   初始化数据
     *
     **/
    initFinish = () => {
        /*        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
         dataSource: ds.cloneWithRows(['0', '1', '3', '4']),
         renderPlaceholderOnly: 'success'
         });*/
        StorageUtil.mGetItem(StorageKeyNames.PHONE, (data) => {
            if (data.code == 1 && data.result != null) {
                //this.custPhone = data.result;
                this.custPhone = '15102373842';
                this.loadData();
            } else {
                this.props.showToast('查询账户信息失败');
            }
        });
    };

    /**
     *   获取待办消息未读数量
     **/
    loadData = () => {
        let maps = {
            accountMobile: this.custPhone,
            token: '5afa531b-4295-4c64-8d6c-ac436c619078'
        };
        let url = AppUrls.HANDLE_COUNT;
        requestNoToken(url, 'post', maps).then((response) => {
            this.backlogNum = response.mjson.data;
            this.getSysMessageNum();
            //console.log('this.backlogNum======', this.backlogNum);
        }, (error) => {
            this.getSysMessageNum();
        });
    };

    /**
     *   获取系统消息未读数量
     **/
    getSysMessageNum = () => {
        SQLite.selectData('SELECT * FROM messageSystemModel WHERE tel = ? order by createTime desc', [this.custPhone],
            (data) => {
                if (data.result.rows.length > 0) {
                    let dbLastTime = data.result.rows.item(0).createTime;
                    let dbCount = 0;
                    for (let i = 0; i < data.result.rows.item.length; i++) {
                        if (!data.result.rows.item(i).isRead) {
                            dbCount++;
                        }
                    }
                    StorageUtil.mGetItem(StorageKeyNames.SYSTEMS_LAST_MESSAGE_TIME, (timeData) => {
                        if (timeData.code == 1 && timeData.result != null) {
                            if (timeData.result > data.createTime) {
                                dbLastTime = timeData.result;
                            }
                        }
                        // http
                        let maps = {
                            type: 'systems',
                            timestamp: new Date(dbLastTime.replace(/-/g, '/')).valueOf(),
                            token: '5afa531b-4295-4c64-8d6c-ac436c619078'
                        };
                        let url = AppUrls.SELECT_UNREAD_MESSAGE_COUNT;
                        requestNoToken(url, 'post', maps).then((response) => {
                            this.sysMessageNum = response.mjson.data + dbCount;
                            //console.log('this.sysMessageNum======', this.sysMessageNum);
                            this.getHeadLineNum();
                        }, (error) => {
                            this.getHeadLineNum();
                        });
                    });
                } else {
                    StorageUtil.mGetItem(StorageKeyNames.INTO_TIME, (data) => {
                        if (data.code == 1 && data.result != null) {
                            let dbLastTime = data.result;
                            let maps = {
                                type: 'systems',
                                timestamp: new Date(dbLastTime.replace(/-/g, '/')).valueOf(),
                                token: '5afa531b-4295-4c64-8d6c-ac436c619078'
                            };
                            let url = AppUrls.SELECT_UNREAD_MESSAGE_COUNT;
                            requestNoToken(url, 'post', maps).then((response) => {
                                this.sysMessageNum = response.mjson.data;
                                //console.log('this.sysMessageNum======', this.sysMessageNum);
                                this.getHeadLineNum();
                            }, (error) => {
                                this.getHeadLineNum();
                            });
                        } else {
                            //this.props.showToast('确认验收失败');
                        }
                    });
                }
            });
    };

    /**
     *   获取车市头条未读数量
     **/
    getHeadLineNum = () => {
        SQLite.selectData('SELECT * FROM messageHeadLineModel WHERE tel = ? order by createTime desc', [this.custPhone],
            (data) => {
                if (data.result.rows.length > 0) {
                    let dbLastTime = data.result.rows.item(0).createTime;
                    let dbCount = 0;
                    for (let i = 0; i < data.result.rows.item.length; i++) {
                        if (!data.result.rows.item(i).isRead) {
                            dbCount ++;
                        }
                    }
                    StorageUtil.mGetItem(StorageKeyNames.ADVERTISEMENT_LAST_MESSAGE_TIME, (timeData) => {
                        if (timeData.code == 1 && timeData.result != null) {
                            if (timeData.result > data.createTime) {
                                dbLastTime = timeData.result;
                            }
                        }
                        // http
                        let maps = {
                            type: 'advertisement',
                            timestamp: new Date(dbLastTime.replace(/-/g, '/')).valueOf(),
                            token: '5afa531b-4295-4c64-8d6c-ac436c619078'
                        };
                        let url = AppUrls.SELECT_UNREAD_MESSAGE_COUNT;
                        requestNoToken(url, 'post', maps).then((response) => {
                            this.headLineNum = response.mjson.data + dbCount;
                            //console.log('this.sysMessageNum======', this.sysMessageNum);
                            this.loadListData();
                        }, (error) => {
                            this.loadListData();
                        });
                    });
                } else {
                    StorageUtil.mGetItem(StorageKeyNames.INTO_TIME, (data) => {
                        if (data.code == 1 && data.result != null) {
                            let dbLastTime = data.result;
                            let maps = {
                                type: 'advertisement',
                                timestamp: new Date(dbLastTime.replace(/-/g, '/')).valueOf(),
                                token: '5afa531b-4295-4c64-8d6c-ac436c619078'
                            };
                            let url = AppUrls.SELECT_UNREAD_MESSAGE_COUNT;
                            requestNoToken(url, 'post', maps).then((response) => {
                                this.headLineNum = response.mjson.data;
                                //console.log('this.sysMessageNum======', this.sysMessageNum);
                                this.loadListData();
                            }, (error) => {
                                this.loadListData();
                            });
                        } else {
                            //this.props.showToast('确认验收失败');
                        }
                    });
                }
            });
    };

    /**
     *   加载listview数据
     **/
    loadListData = () =>{
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['0', '1', '3', '4']),
            renderPlaceholderOnly: 'success'
        });
    };

    /**
     *  render
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            // 加载中....
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='消息通知' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='消息通知' backIconClick={this.backPage}/>
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
     *  listView间隔线
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(1)}}/>
        )
    }

    /**
     *   listView item 数据
     **/
    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData == '0') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'BacklogListScene',
                            component: BacklogListScene,
                            params: {}
                        });
                    }}>
                    <View style={styles.listItem}>
                        <View style={{marginLeft: Pixel.getPixel(15)}}>
                            <Image source={require('../../images/mainImage/jiekuan.png')}/>
                            {this.backlogNum > 0 && <View style={{
                                position: 'absolute',
                                right: 0,
                                width: Pixel.getPixel(18),
                                height: Pixel.getPixel(18),
                                backgroundColor: fontAndColor.COLORB2,
                                borderRadius: 18,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: Pixel.getFontPixel(10),
                                        color: fontAndColor.COLORA3
                                    }}>{this.backlogNum}</Text>
                            </View>}
                        </View>
                        <Text
                            style={{marginLeft: Pixel.getPixel(15)}}
                            allowFontScaling={false}>待办事项</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '1') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'DailyReminderScene',
                            component: DailyReminderScene,
                            params: {}
                        });
                    }}>
                    <View style={styles.listItem}>
                        <View style={{marginLeft: Pixel.getPixel(15)}}>
                            <Image source={require('../../images/mainImage/jiekuan.png')}/>
                            {/*<View style={{
                             position: 'absolute',
                             right: 0,
                             width: Pixel.getPixel(18),
                             height: Pixel.getPixel(18),
                             backgroundColor: fontAndColor.COLORB2,
                             borderRadius: 18,
                             justifyContent: 'center',
                             alignItems: 'center'
                             }}>
                             <Text
                             allowFontScaling={false}
                             style={{
                             textAlign: 'center',
                             fontSize: Pixel.getFontPixel(10),
                             color: fontAndColor.COLORA3
                             }}>99</Text>
                             </View>*/}
                        </View>
                        <Text
                            style={{marginLeft: Pixel.getPixel(15)}}
                            allowFontScaling={false}>每日提醒</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '2') {
            return (
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={styles.listItem}>
                        <View style={{marginLeft: Pixel.getPixel(15)}}>
                            <Image source={require('../../images/mainImage/jiekuan.png')}/>
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                width: Pixel.getPixel(18),
                                height: Pixel.getPixel(18),
                                backgroundColor: fontAndColor.COLORB2,
                                borderRadius: 18,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: Pixel.getFontPixel(10),
                                        color: fontAndColor.COLORA3
                                    }}>99</Text>
                            </View>
                        </View>
                        <Text
                            style={{marginLeft: Pixel.getPixel(15)}}
                            allowFontScaling={false}>互动消息</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '3') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'SysMessageListScene',
                            component: SysMessageListScene,
                            params: {}
                        });
                    }}>
                    <View style={styles.listItem}>
                        <View style={{marginLeft: Pixel.getPixel(15)}}>
                            <Image source={require('../../images/mainImage/jiekuan.png')}/>
                            {this.sysMessageNum > 0 && <View style={{
                                position: 'absolute',
                                right: 0,
                                width: Pixel.getPixel(18),
                                height: Pixel.getPixel(18),
                                backgroundColor: fontAndColor.COLORB2,
                                borderRadius: 18,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: Pixel.getFontPixel(10),
                                        color: fontAndColor.COLORA3
                                    }}>{this.sysMessageNum}</Text>
                            </View>}
                        </View>
                        <Text
                            style={{marginLeft: Pixel.getPixel(15)}}
                            allowFontScaling={false}>系统消息</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '4') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'HeadLineListScene',
                            component: HeadLineListScene,
                            params: {}
                        });
                    }}>
                    <View style={styles.listItem}>
                        <View style={{marginLeft: Pixel.getPixel(15)}}>
                            <Image source={require('../../images/mainImage/jiekuan.png')}/>
                            {this.headLineNum > 0 && <View style={{
                                position: 'absolute',
                                right: 0,
                                width: Pixel.getPixel(18),
                                height: Pixel.getPixel(18),
                                backgroundColor: fontAndColor.COLORB2,
                                borderRadius: 18,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: Pixel.getFontPixel(10),
                                        color: fontAndColor.COLORA3
                                    }}>{this.headLineNum}</Text>
                            </View>}
                        </View>
                        <Text
                            style={{marginLeft: Pixel.getPixel(15)}}
                            allowFontScaling={false}>车市头条</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    listItem: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(75),
        backgroundColor: '#ffffff',
    }
});