/**
 * Created by hanmeng on 2017/8/2.
 * 消息列表
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
import {request} from "../utils/RequestUtil";
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import DailyReminderScene from "./dailyReminder/DailyReminderScene";
import {BacklogListScene} from "./backlog/BacklogListScene";
import {HeadLineListScene} from "./headLine/HeadLineListScene";
import {SysMessageListScene} from "./sysMessage/SysMessageListScene";
var Pixel = new PixelUtil();


export default class MessageListScene extends BaseComponent {

    /**
     *  初始化
     **/
    constructor(props) {
        super(props);
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
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['0', '1', '3', '4']),
            renderPlaceholderOnly: 'success'
        });
        this.loadData();
    };

    /**
     *   数据请求
     **/
    loadData = () => {
        let url = AppUrls.HANDLE_COUNT;
        request(url, 'post', {
            accountMobile: '18000000002'
        }).then((response) => {

        }, (error) => {

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