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
import  GetImage from '../../../utils/GetOrderImageUtil'
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class MyOrderDaiZhiFuLeftItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={{marginTop:Pixel.getPixel(108),marginLeft:Pixel.getPixel(167)}}>
                <Text style={{color:'#fff',fontSize:Pixel.getPixel(18), fontWeight:'bold',backgroundColor: '#00000000'}}>待买方支付订金</Text>
               <View style={{marginTop:Pixel.getPixel(23),flexDirection:'row'}}>
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{

                   }} style={{width:Pixel.getPixel(71),height:Pixel.getPixel(25),borderColor:'#fff',borderWidth:1,borderRadius:3,
                   justifyContent:'center',alignItems:'center'}}>
                       <Text style={{color:'#fff',fontSize:Pixel.getPixel(13),backgroundColor: '#00000000'}}>买家电话</Text>
                   </TouchableOpacity>
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{

                   }} style={{width:Pixel.getPixel(71),height:Pixel.getPixel(25),borderColor:'#fff',borderWidth:1,borderRadius:3,
                       justifyContent:'center',alignItems:'center',marginLeft:Pixel.getPixel(13)}}>
                       <Text style={{color:'#fff',fontSize:Pixel.getPixel(13),backgroundColor: '#00000000'}}>平台客服</Text>
                   </TouchableOpacity>
               </View>
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