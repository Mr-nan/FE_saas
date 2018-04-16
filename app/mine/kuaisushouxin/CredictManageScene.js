/**
 * Created by yujinzhong on 2018/3/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
let {height, width} = Dimensions.get('window');
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import *as fontAndColor from '../../constant/fontAndColor';
import *as appUrls from '../../constant/appUrls';
import *as RequestUtil from '../../utils/RequestUtil';
import PixelUtil from '../../utils/PixelUtil';
import MineCreditApplyScene from "./MineCreditApplyScene";
import StorageUtil from "../../utils/StorageUtil";
import * as storageKeyNames from "../../constant/storageKeyNames";
const Pixel = new PixelUtil();
let carConfigurationData = [];
const data = [
    {
        title: '2016-06-20|5532公里',
        type: '正常维修',
        content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    }, {
        title: '2016-06-20|5532公里',
        type: '正常维修',
        content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    }, {
        title: '2016-06-20|5532公里',
        type: '正常维修',
        content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    }, {
        title: '2016-06-20|5532公里',
        type: '正常维修',
        content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },

];

export  default class CredictManageScene extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {

            dataSource: ds,
            renderPlaceholderOnly: 'blank',
        }
    }

    /**
     * from @yujinzhong
     *
     * 初始化页面数据
     **/
    initFinish = () => {
        this._loadShiJiKongZhiRenCreditStatus();
    }
    /**
     * from @yujinzhong
     *
     * 获取实际控制人授信状态和额度
     **/
    _loadShiJiKongZhiRenCreditStatus = () => {

        StorageUtil.mGetItem(storageKeyNames.USER_INFO, (childdata) => {
            if (childdata.code == 1) {
                let childdatas = JSON.parse(childdata.result);
                this.boss_id = childdatas.boss_id;
                this.boss_name = childdatas.boss_name;
                RequestUtil.request(appUrls.GETCREDITBYREAL, 'post', {'controller_base_id': this.boss_id,'merge_id':global.MERGE_ID,'company_base_id':global.companyBaseID})
                    .then((response) => {

                        if (response) {
                            let dataSource = [];
                            dataSource.push(response.mjson.data)
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(dataSource),
                                renderPlaceholderOnly: 'success',

                            });

                        } else {
                            this.setState({
                                renderPlaceholderOnly: 'null',
                            });
                        }

                    }, (error) => {
                        this.setState({
                            renderPlaceholderOnly: 'null',
                        });
                    });
            } else {
                this.setState({renderPlaceholderOnly: 'error'});
            }
        });


    }

    render() {

        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {this.loadView()}
                    <NavigationView title="授信管理" backIconClick={() => {
                        this.backPage();
                    }}/>
                </View>);
        }
        return (
            <View style={styles.rootContainer}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource}
                    renderHeader={() =>
                        <View style={styles.headView}>
                            <Text allowFontScaling={false} style={styles.headViewText}>授信信息
                            </Text>
                        </View>
                    }
                    renderRow={this.renderRow}/>
                <NavigationView title="授信管理" backIconClick={() => {
                    this.backPage();
                }}/>
                <View style={{
                    height: Pixel.getPixel(54),
                    width: width,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <TouchableOpacity
                        style={[styles.selectBtn, {backgroundColor: fontAndColor.COLORB0}]}
                        activeOpacity={0.6}
                        onPress={() => {
                            this._applyCredit();
                        }}>
                        <Text allowFontScaling={false}
                              style={{fontSize: Pixel.getFontPixel(14), color: 'white'}}>申请授信</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    /**
     *
     *  申请授信按钮点击事件
     **/
    _applyCredit = (rowData) => {
        this.toNextPage(
            {
                name: 'MineCreditApplyScene',
                component: MineCreditApplyScene,
                params: {}
            })
    }

    /**
     * from @zhaojian
     *
     * 每条item布局
     **/
    renderRow = (rowData) => {
        return (
            <View style={styles.cellView}>
                <View style={styles.cellTitleView}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../kuaisushouxin/kuaisushouxin_images/xiaotouxiang.png')}
                               style={{
                                   width: Pixel.getPixel(18),
                                   height: Pixel.getPixel(18),
                                   marginRight: Pixel.getPixel(10)
                               }}/>
                        <Text allowFontScaling={false}
                              style={[styles.cellTitleViewTitle, {
                                  fontSize: Pixel.getFontPixel(15),
                                  color: 'black'
                              }]}>{this.boss_name}

                        </Text >
                        <Text allowFontScaling={false}
                              style={[styles.cellTitleViewValue, {marginLeft: Pixel.getPixel(10)}]}>实际控制人
                        </Text>
                    </View>

                    <Text allowFontScaling={false}
                          style={[styles.cellTitleViewValue, {fontSize: Pixel.getFontPixel(15)}]}>
                        {this._isCredit(rowData.credit_request_type)}
                    </Text>
                </View>

                <View style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: fontAndColor.COLORA4,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text allowFontScaling={false}
                          style={[styles.cellContent, {color: fontAndColor.COLORA1}]}>{this._creditTypeString(rowData.credit_request_type)}</Text>
                    <Text allowFontScaling={false}
                          style={[styles.cellContent, {color: fontAndColor.COLORA1}]}>{this._getCreditNum_Time(rowData.credit_request_type,rowData.zh_mny/10000 +'万',rowData.credit_begindate,rowData.credit_enddate)}</Text>
                </View>

            </View>
        )
    }
    _creditTypeString = (type) => {
        if (type == 0) {
            return '没有有效的授信';
        } else if (type == 1) {
            return '综合授信';
        } else if (type == 2) {
            return '小额授信';
        }
    }
    _isCredit = (type) => {
        if (type !== 0) {
            return '已授信';
        } else {
            return '';
        }

    }
    _getCreditNum_Time =(type,num,start,end) =>{
        if(type !== 0){
            return num + '|'+ start + '—' + end;
        }else {
            return '';
        }
    }
    /**
     * from @zhaojian
     *
     * 获取维修保养数据
     **/
    loadData = () => {

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            renderPlaceholderOnly: 'success',

        });
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingTop: Pixel.getTitlePixel(64),
        paddingBottom: Pixel.getTitlePixel(54),
        backgroundColor: fontAndColor.COLORA3,
    },
    headView: {
        paddingHorizontal: Pixel.getPixel(15),
        paddingVertical: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3,
    },
    headViewText: {
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    cellView: {
        paddingHorizontal: Pixel.getPixel(15),
        borderBottomColor: fontAndColor.COLORA4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: Pixel.getPixel(10),
        backgroundColor: 'white',
        flexWrap: 'wrap',

    },
    cellTitleView: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Pixel.getPixel(10),

    },
    cellTitleViewTitle: {
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellTitleViewValue: {
        color: fontAndColor.COLORB0,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellContent: {
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        backgroundColor: 'white'
    },
    selectBtn: {
        height: Pixel.getPixel(36),
        width: Pixel.getPixel(342),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getFontPixel(2),
        marginRight: Pixel.getPixel(25),
        marginLeft: Pixel.getPixel(25),
        borderColor: fontAndColor.COLORB0,
        borderWidth: 1,

    },
});