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
export  default class MyOrderInfoBottomItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width,height:Pixel.getPixel(66),backgroundColor:'#fff',justifyContent:'center',marginTop:Pixel.getPixel(10)}}>
                <Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b',marginLeft:Pixel.getPixel(20)}}>
                    订单编号：2423435467732434
                </Text>
                <Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b',marginLeft:Pixel.getPixel(20),marginTop:Pixel.getPixel(10)}}>
                    创建日期：2018/01/29 12:01:00
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