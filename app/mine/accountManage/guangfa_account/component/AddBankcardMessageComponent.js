/*
* created by marongting on 2018/10/20
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
import SubmitComponent from './SubmitComponent';
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');


export default class AddBankcardMessageComponent extends BaseComponent{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(204),backgroundColor:'#ffffff',marginTop: Pixel.getPixel(149),borderRadius:Pixel.getPixel(4),alignItems:'center'}}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tongguo.png')} style={{marginTop:Pixel.getPixel(30)}}/>
                    <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(15)}} allowFontScaling={false}>添加银行卡成功</Text>
                    <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',lineHeight:Pixel.getPixel(20)}} allowFontScaling={false}>等待银行审核</Text>
                    <SubmitComponent title="确认" warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),marginTop:Pixel.getPixel(25),marginLeft: 0}}/>

                </View>
            </View>
        )
    }
}