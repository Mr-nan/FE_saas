/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
let currentdate;
import * as fontAndColor from '../../../constant/fontAndColor';
import DateTimePicker from 'react-native-modal-datetime-picker'
export  default class RepaymentInfoDateItem extends PureComponent {

    constructor(props) {
        super(props);
        let date = new Date();
        let seperator1 = "-";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
         currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        this.state = {
            show: 'row',
            isDateTimePickerVisible:false,
            selectTime:this.props.time,
        };
    }

    componentWillMount(){
        console.log('---------------',currentdate,this.state.selectTime)
        if(currentdate != this.state.selectTime){
            this.setState({
                isDateTimePickerVisible:true
            })
        }
    }
    render() {
        return (
            <View style={{flexDirection:'column'}}>
                <View style={styles.itemStyle}>
                    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle]}>提前还款日期</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        if(this.props.status=='0'){
                            this.setState({
                                isDateTimePickerVisible:true
                            });
                        }

                    }} activeOpacity={0.8}
                                      style={{flex:1,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle,{color:fontAndColor.COLORA2,marginRight:Pixel.getPixel(14)}]}>{this.state.selectTime}</Text>
                        {/*  <Image style={[{width:Pixel.getPixel(22),height:Pixel.getPixel(22)}]}
                           source={require('../../../../images/financeImages/dateIcon.png')}/>*/}
                    </TouchableOpacity>
                    {/*    <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    minimumDate={new Date()}
                    onCancel={this._hideDateTimePicker}
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                />*/}
                </View>
                {this.state.isDateTimePickerVisible ? <View style={{width:width,height:Pixel.getPixel(64),backgroundColor:fontAndColor.COLORA4,paddingLeft:Pixel.getPixel(10),paddingTop:Pixel.getPixel(10)}}>
                    <Text style={{fontSize:Pixel.getFontPixel(13),color:fontAndColor.COLORA2}}>提示：当日14：00之后，提前还款日期将为您自动顺延至下一个工作日。</Text>
                </View> :null
                    }

            </View>

        );
    }

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
    //datePiker的回调
    _handleDatePicked = (date) => {
        let tempdate=dateFormat(date,'yyyy-MM-dd');
        this.setState({
            selectTime:tempdate
        });
        this.props.callBack(Date.parse(new Date(date)));
        // let tempdate=dateFormat(Date.parse(new Date()),'yyyy-MM-dd')
        // let select = Date.parse(new Date(date));
        // let mm = Date.parse(new Date());
       // let aa = Math.ceil((select-mm)/1000/60/60/24);
        this._hideDateTimePicker();
    }
}
const dateFormat = (date,fmt) => {
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
const styles = StyleSheet.create({
    itemStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        backgroundColor: '#ffffff'
    },
    loanCodeStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1
    }
})