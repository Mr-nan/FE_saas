/*
* created by marongting on 2018/10/18
*
* */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    Image,
    TouchableOpacity

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();

export default class AuthenticateCardComponent extends BaseComponent{
    constructor(props) {
        super(props);
        console.log(this.props.data);

    }
    render(){
        return(
            <Image style={{marginTop: Pixel.getPixel(82),height:Pixel.getPixel(123)}} source={require('../../../../../images/mine/guangfa_account/lv.png')}>
                <View style={{marginTop: Pixel.getPixel(12),width:Pixel.getPixel(348),height:Pixel.getPixel(91),marginLeft: Pixel.getPixel(15),flexDirection:'row',alignItems:'center',overflow: 'hidden'}}>
                    <View style={{flexDirection: 'column',justifyContent:'center',height:Pixel.getPixel(60),marginLeft:Pixel.getPixel(20)}}>
                        <Text allowFontScaling={false} style={{lineHeight:Pixel.getPixel(20),backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(12),}}>工商银行卡号</Text>
                        <Text allowFontScaling={false} style={{lineHeight:Pixel.getPixel(30),backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(24),fontWeight:'bold'}}>6212 **** 3456</Text>
                    </View>
                    <View style={{backgroundColor:'rgba(0,0,0,0.2)',borderRadius: Pixel.getPixel(25),justifyContent:'center',height:Pixel.getPixel(29),width:Pixel.getPixel(89),marginLeft:Pixel.getPixel(88.6)}}>
                        <Text allowFontScaling={false}  style={{color:'#ffffff',fontSize:Pixel.getPixel(15),lineHeight:Pixel.getPixel(21),marginLeft:Pixel.getPixel(16)}}>待确定</Text>
                    </View>
                </View>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
    card:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:Pixel.getPixel(5),
    }
})