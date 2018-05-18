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
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';

export  default class LogisCarInfoTopItem extends PureComponent {

    constructor(props) {
        super(props);
    }
    /*

         {
        "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
        "car_price": "130000.00",
        "tms_vin": "",
        "total_amount": "1976.00",
        "tax_amount": "0.00",
        "insure_amount": "0.00",
        "check_amount": "0.00",
        "freight_amount": "1587.00",
        "service_amount": "150.00",
        "tostore_amount": "239.00",
        "Logistics_info": [{
            "nodeDesc": "下单",
            "nodeTime": "2018-05-13 11:26:00",
            "nodeMsg": "备注信息"
        }, {
            "nodeDesc": "到达：辽宁省沈阳市",
            "nodeTime": "2018-05-13 11:26:00",
            "nodeMsg": "备注信息"
        }]
    }

    */

    render() {
        return (
            <View style={{width:width,backgroundColor:'#fff',height:Pixel.getPixel(107),
            flexDirection:'row',paddingHorizontal:Pixel.getPixel(15),paddingVertical: Pixel.getPixel(13)}}>
                <Image source={require('../../../../images/share_icon_wechat.png')}
                       style={{width:Pixel.getPixel(120),height:Pixel.getPixel(80),resizeMode:'cover'}}></Image>
                <View style={{width:Pixel.getPixel(213),height:Pixel.getPixel(80),
                marginLeft:Pixel.getPixel(12)}}>
                    <Text style={{fontSize: Pixel.getPixel(14),backgroundColor:'#00000000',
                    color: '#000'}} numberOfLines={2}>{this.props.data.car_name}</Text>
                    <Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#9b9b9b',marginTop:Pixel.getPixel(15)}} >
                        单车指导价：<Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#000'}}>{this.props.data.car_price}</Text></Text>
                    <Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#9b9b9b',marginTop:Pixel.getPixel(5)}} >
                        车架号：<Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#000'}}>{this.props.data.tms_vin}</Text></Text>
                </View>
            </View>
        );
    }


}
