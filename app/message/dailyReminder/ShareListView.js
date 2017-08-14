/**
 * Created by hanmeng on 2017/7/31.
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
import * as AppUrls from "../../constant/appUrls";
import {request, requestNoToken} from "../../utils/RequestUtil";
import DailyReminderScene from "../dailyReminder/DailyReminderScene";
import ShareRankingScene from "./ShareRankingScene";
const Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');

export class ShareListView extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.shareListData = [];
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
         dataSource: ds.cloneWithRows(['0', '0', '0']),
         renderPlaceholderOnly: 'success'
         });*/
        this.loadData(1);
    };

    /**
     *  按筛选条件刷新数据
     **/
    refreshData = (type) => {
        this.props.showModal(true);
        this.shareListData = [];
        this.loadData(type);
    };

    /**
     *
     **/
    loadData = (type) => {
        let url = AppUrls.DAILY_REMINDER_RANK_LEVEL;
        requestNoToken(url, 'post', {
            type: type,
            token: '5afa531b-4295-4c64-8d6c-ac436c619078'
        }).then((response) => {
            this.props.showModal(false);
            this.shareListData = response.mjson.data;
            if (this.shareListData && this.shareListData.length > 0) {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(this.shareListData),
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
            this.props.showModal(false);
            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error'
            });
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
            </View>);
        } else {
            return (<View style={styles.container}>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getPixel(15)}}
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
            <TouchableOpacity
                onPress={() => {
                    this.toNextPage({
                        name: 'ShareRankingScene',
                        component: ShareRankingScene,
                        params: {}
                    });
                }}>
                <View style={styles.listItem}>
                    <View style={{flexDirection: 'row'}}>
                        <Text allowFontScaling={false} style={styles.title}>{rowID == 0 ? '今日分享' : '每日分享'}</Text>
                        <View style={{flex: 1}}/>
                        <Text allowFontScaling={false} style={styles.date}>{rowData.days}</Text>
                    </View>
                    <Text allowFontScaling={false} style={styles.describe}>今日无人分享</Text>
                    <View style={styles.separatedLine}/>
                    <View style={styles.subItem}>
                        <Text allowFontScaling={false} style={styles.subTitle}>查看详情</Text>
                        <View style={{flex: 1}}/>
                        <Image source={cellJianTou} style={styles.image}/>
                    </View>
                </View>
            </TouchableOpacity>
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
    date: {
        marginRight: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(20),
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
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