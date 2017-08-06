/**
 * Created by hanmeng on 2017/8/6.
 */
import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
import ClientInfoSelected from "../ClientInfoSelected";
import CustomerInfoInput from "../ClientInfoInput";
import SelectScene from "../../SelectScene";
const Pixel = new PixelUtil();
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class FollowTaskInfoItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.childItems = [];
        this.childItems.push({name: '客户状态', value: ''});
        this.childItems.push({name: '消息提醒日期', value: ''});
        this.childItems.push({name: '客户是否到店', value: ''});
        this.childItems.push({name: '跟踪内容', value: ''});
        this.state = {
            isDateTimePickerVisible: false
        }
    }

    /**
     *
     **/
    initFinish = () => {
        /*this.setState({
         renderPlaceholderOnly: 'success'
         });*/
    }

    /**
     *
     **/
    getItemData = () => {
        return this.childItems;
    };

    /**
     *
     **/
    render() {
        let items = [];
        if (this.props.editState != 'look') {
            for (let i = 0; i < this.childItems.length; i++) {
                if (this.childItems[i].name == '客户状态') {
                    items.push(<ClientInfoSelected ref='selectsex' key={i + 'bo'} items={this.childItems[i]}
                                                   toSelect={() => {
                                                       this.toNextPage({
                                                           name: 'SelectScene',
                                                           component: SelectScene,
                                                           params: {
                                                               regShowData: ['初次到店', '3日电话邀约-到店', '3日电话邀约-未到店', '7日电话邀约-到店', '7日电话邀约-未到店', '首次购买', '首次置换购买', '置换', '复购'],
                                                               title: '客户状态',
                                                               callBack: (name, index) => {
                                                                   this.childItems[i].value = name + ',' + index;
                                                                   this.refs.selectsex.setValue(name);
                                                               }
                                                           }
                                                       })
                                                   }}/>);
                } else if (this.childItems[i].name == '消息提醒日期') {
                    items.push(<ClientInfoSelected ref="company" key={i + 'bo'} items={this.childItems[i]}
                                                   toSelect={() => {
                                                       this._showDateTimePicker();
                                                   }}/>);
                } else if (this.childItems[i].name == '客户是否到店') {
                    items.push(<ClientInfoSelected ref='juese' key={i + 'bo'} items={this.childItems[i]}
                                                   toSelect={() => {
                                                       this.toNextPage({
                                                           name: 'SelectScene',
                                                           component: SelectScene,
                                                           params: {
                                                               regShowData: ['已到店', '未到店'],
                                                               title: '地域',
                                                               callBack: (name, index) => {
                                                                   this.childItems[i].value = name + ',' + index;
                                                                   this.refs.juese.setValue(name);
                                                               }
                                                           }
                                                       })
                                                   }}/>);
                } else if (this.childItems[i].name == '跟踪内容') {
                    items.push(<CustomerInfoInput key={i + 'bo'} items={this.childItems[i]}/>);
                }

            }
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <View style={{height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        marginLeft: Pixel.getPixel(15),
                        backgroundColor: fontAndColor.COLORB0,
                        height: Pixel.getPixel(11),
                        width: Pixel.getPixel(3)
                    }}/>
                    <Text
                        style={{marginLeft: Pixel.getPixel(5), fontWeight: 'bold'}}
                        allowFontScaling={false}>本次任务跟踪</Text>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: fontAndColor.COLORA3
                }}/>
                {items}
                <DateTimePicker
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}/>
            </View>
        )
    }

    /**
     *
     * @private
     **/
    _showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true})
    };

    /**
     *
     * @private
     **/
    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    /**
     *
     * @private
     **/
    _handleDatePicked = (date) => {
        //console.log('A date has been picked: ', date);
        let d = this.dateFormat(date, 'yyyy-MM-dd');
        this.refs.company.setValue(d);
        this.setState({
            isDateTimePickerVisible: false
        });
        //this.props.updateStartDate(d);

        //this._hideDateTimePicker();
    };

    /**
     *
     * @private
     **/
    dateFormat = (date, fmt) => {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
});