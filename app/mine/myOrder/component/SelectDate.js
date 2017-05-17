/**
 * Created by hanmeng on 2017/5/13.
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
import BaseComponent from "../../../component/BaseComponent";
import NavigatorView from '../../../component/AllNavigationView';
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class SelectDate extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            isDateTimePickerVisible:false
        }
    }

    render() {
        return (
            <View style={{height: Pixel.getPixel(95), backgroundColor: '#ffffff'}}>
                <Text style={styles.carType}>创建订单日期</Text>
                <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(15), alignItems: 'center'}}>
                    <TouchableOpacity style={styles.dateBox} onPress={() => {
                        this._showDateTimePicker('start')
                    }}>
                        <Text style={{textAlign: 'center'}}>{this.state.startDate}</Text>
                    </TouchableOpacity>
                    <Text>至</Text>
                    <TouchableOpacity style={styles.dateBox} onPress={() => {
                        this._showDateTimePicker('end')
                    }}>
                        <Text style={{textAlign: 'center'}}>{this.state.endDate}</Text>
                    </TouchableOpacity>
                </View>
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

    _showDateTimePicker = (type) => {
        this.type = type;
        this.setState({isDateTimePickerVisible: true})
    };

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        let d = this.dateFormat(date, 'yyyy-MM-dd');
        if (this.type === 'start') {
            this.setState({
                startDate: d,
                isDateTimePickerVisible: false
            });
            this.props.updateStartDate(d);
        } else {
            this.setState({
                endDate: d,
                isDateTimePickerVisible: false
            });
            this.props.updateEndDate(d);
        }

        //this._hideDateTimePicker();
    };

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