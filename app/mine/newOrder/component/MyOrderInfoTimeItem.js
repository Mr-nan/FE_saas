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
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import DepositCountDown from "./DepositCountDown";
export  default class MyOrderInfoTimeItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let date = this.props.data.created_order_time;
        date = date.substring(0,19);
        date = date.replace(/-/g,'/');
        let timestamp = new Date(date).getTime();
        return (
            <View style={{width:width,height:Pixel.getPixel(41),backgroundColor:'#FFF8EA',alignItems:'center',
                flexDirection:'row'}}>
                <Text style={{fontSize:Pixel.getPixel(13),color:'#846545',marginLeft:Pixel.getPixel(15)}}>
                    等待支付中，剩
                </Text>
                <DepositCountDown leftTime={timestamp}/>
                <Text style={{fontSize:Pixel.getPixel(13),color:'#846545'}}>
                    ，自动关闭订单
                </Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})