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
export  default class MyOrderPayDingJinItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#fff', flexDirection:'row',
                position:'absolute',left:0,bottom:0}}>
                <View style={{flex:2, flexDirection:'row',alignItems:'center'}}>
                    <Image style={{width:Pixel.getPixel(14),height:Pixel.getPixel(14),marginLeft:Pixel.getPixel(15)}}
                           source={require('../../../../images/neworder/tishi.png')}/>
                    <Text style={{fontSize:Pixel.getPixel(12),color:'#9B9B9B',marginLeft:Pixel.getPixel(9)}}>请先选择收车方式，再支付</Text>
                </View>
                <TouchableOpacity style={{flex:1,backgroundColor:'#05C5C2',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:Pixel.getPixel(15),color:'#fff'}}>支付</Text>
                </TouchableOpacity>
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