/**
 * Created by hanmeng on 2017/5/9.
 * 采购、销售订单筛选
 */
import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text,
    TouchableOpacity
} from "react-native";

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import MyButton from "../../component/MyButton";
const Pixel = new PixelUtil();
const arrow = require('../../../images/publish/date-select.png');
import LabelParent from '../../component/LabelParent';
import SelectDate from './component/SelectDate';

let order_state = [];
let pay_type = [];
/*let parameters = {
    orderState: 0,
    payType: 0,
    startDate: '',
    endDate: ''
};*/

export default class OrderScreeningScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.type = '';
        order_state = [];
        pay_type = [];
        //orderState: 0 --> 全部
        this.orderState = this.props.orderState;
        this.startDate = this.props.startDate;
        this.endDate = this.props.endDate;
        let mList = [];
        if (this.props.business === 0) {
            if (this.props.orderStage === 'trading') {
                mList = ['1', '3'];
/*                order_state.push({title: '全部', isSelected: order_state.length === parameters.orderState, value: 0, ref: 'child0'});
                order_state.push({title: '已拍下', isSelected: false, value: 1, ref: 'child1'});
                order_state.push({title: '待付订金', isSelected: false, value: 2, ref: 'child2'});
                order_state.push({title: '待付尾款', isSelected: false, value: 3, ref: 'child3'});
                order_state.push({title: '待申请发车', isSelected: false, value: 4, ref: 'child4'});
                order_state.push({title: '待确认收货', isSelected: false, value: 5, ref: 'child5'});
                order_state.push({title: '申请取消订单中', isSelected: false, value: 6, ref: 'child6'});
                order_state.push({title: '订单融资处理中', isSelected: false, value: 7, ref: 'child7'});*/
                order_state.push({title: '全部', isSelected: order_state.length === this.orderState, value: 0, ref: 'child0'});
                order_state.push({title: '已拍下', isSelected: order_state.length === this.orderState, value: 1, ref: 'child1'});
                order_state.push({title: '待付订金', isSelected: order_state.length === this.orderState, value: 2, ref: 'child2'});
                order_state.push({title: '待付尾款', isSelected: order_state.length === this.orderState, value: 3, ref: 'child3'});
                order_state.push({title: '待申请发车', isSelected: order_state.length === this.orderState, value: 4, ref: 'child4'});
                order_state.push({title: '待确认收货', isSelected: order_state.length === this.orderState, value: 5, ref: 'child5'});
                order_state.push({title: '申请取消订单中', isSelected: order_state.length === this.orderState, value: 6, ref: 'child6'});
                order_state.push({title: '订单融资处理中', isSelected: order_state.length === this.orderState, value: 7, ref: 'child7'});
            } else {
                mList = ['3'];
            }
        } else {
            mList = ['1', '3'];
            order_state.push({title: '待确定成交价', isSelected: false, value: 0});
            order_state.push({title: '查看到账', isSelected: false, value: 1});
            order_state.push({title: '已完成', isSelected: false, value: 2});
            order_state.push({title: '申请取消订单中', isSelected: false, value: 3});
            order_state.push({title: '处理取消订单中', isSelected: false, value: 4});
            order_state.push({title: '交易关闭', isSelected: false, value: 5});
        }
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        pay_type.push({title: '全部', isSelected: false, value: 0});
        pay_type.push({title: '订单融资', isSelected: false, value: 1});
        pay_type.push({title: '全款', isSelected: false, value: 2});
        this.state = {
            source: ds.cloneWithRows(mList),
/*            startDate: '选择开始时间',
            endDate: '选择结束时间',*/
            //parameters: parameters,
            isDateTimePickerVisible: false
            //arr1: order_state
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorView title='筛选' backIconClick={this.backPage}/>

                <ListView
                    style={{marginTop: Pixel.getPixel(73)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeperator}
                    showsVerticalScrollIndicator={false}/>

                <View style={{flex: 1}}/>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this.confirmClick}/>

            </View>
        )
    }

    confirmClick = () => {
        //todo 判断开始时间是否小于结束时间
        //console.log('daatee startDate===' + this.state.startDate);
        //console.log('daatee endDate===' + this.state.endDate);
        this.props.returnConditions(this.orderState, this.startDate, this.endDate);
        this.backPage();
    }

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (movie == 1) {
            return (
                <View style={styles.containerChild}>
                    <Text style={styles.carType}>订单状态</Text>
                    <LabelParent items={order_state} orderState={this.orderState} updateState={this.setOrderState}/>
                </View>
            )
        } else if (movie == 2) {
            return (
                <View style={{
                    backgroundColor: '#ffffff'
                }}>
                    <Text style={styles.carType}>付款方式</Text>
                    <LabelParent style={{}} items={pay_type} orderState={this.orderState}/>
                </View>
            )
        } else if (movie == 3) {
            return (
                <SelectDate startDate={this.startDate} endDate={this.endDate} updateStartDate={this.setStartDate} updateEndDate={this.setEndDate}/>
            )
        } else {
            return (
                <View/>
            )
        }

    }

    setOrderState = (newOrderState) => {
        this.orderState = newOrderState;
        //console.log('setOrderState = ',this.orderState);
    }

    setStartDate = (newStartDate) => {
        this.startDate = newStartDate;
    }

    setEndDate = (newEndDate) => {
        this.endDate = newEndDate;
    }

    _showDateTimePicker = (type) => {
        this.type = type;
        this.setState({isDateTimePickerVisible: true})
    };



}

const styles = StyleSheet.create({
    labelSelect: {
        marginTop: Pixel.getPixel(10),
    },
    text: {
        fontSize: Pixel.getPixel(16),
        color: 'rgb(13, 131, 144)'
    },
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    carType: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
        marginTop: Pixel.getPixel(17)
    },
    containerChild: {
        //height: Pixel.getPixel(178),
        backgroundColor: '#ffffff',
        //paddingLeft: Pixel.getPixel(12),
        //marginBottom: Pixel.getPixel(10)
    },
    dateBox: {
        marginLeft: Pixel.getPixel(16),
        marginRight: Pixel.getPixel(16),
        justifyContent: 'center',
        //width: Pixel.getPixel(140),
        flex: 1,
        height: Pixel.getPixel(32),
        backgroundColor: fontAndColor.COLORA3
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: fontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: fontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT)
    }
});