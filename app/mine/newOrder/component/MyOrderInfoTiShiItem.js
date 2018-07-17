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
export  default class MyOrderInfoTiShiItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(40),alignItems:'center',flexDirection:'row'}}>
                <Text style={{fontSize:Pixel.getPixel(11),color:'#9B9B9B',marginLeft:Pixel.getPixel(12)}}>“单车成交价”及“单车订金”提交后不可修改</Text>
                <Image style={{width:Pixel.getPixel(14),height:Pixel.getPixel(14),marginLeft:Pixel.getPixel(3)}} source={require('../../../../images/neworder/hongtishi.png')}/>
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