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
export  default class MyOrderPayItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#fff', flexDirection:'row',
                position:'absolute',left:0,bottom:0}}>
                <View style={{flex:2, flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:Pixel.getPixel(14),color:'#9B9B9B',marginLeft:Pixel.getPixel(14)}}>应收订金合计：</Text>
                    <Text style={{fontSize:Pixel.getPixel(19),color:'#FA5741',marginLeft:Pixel.getPixel(11)}}>25.80<Text
                        style={{fontSize:Pixel.getPixel(12),color:'#FA5741'}}>万元</Text></Text>
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