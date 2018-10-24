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

export default class WithDrawDepositTipComponent extends BaseComponent{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                <Image source={require('../../../../../images/mine/guangfa_account/tanchuang.png')} style={{marginTop: Pixel.getPixel(149)}}>
                    <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(317),alignItems:'center'}}>
                        <Text allowFontScaling={true} style={{color:'#ffffff',fontWeight: 'bold',fontSize:Pixel.getFontPixel(24),marginTop:Pixel.getPixel(30),letterSpacing: Pixel.getFontPixel(4.9)}}>提示</Text>
                        <Text style={{marginTop:Pixel.getPixel(49),color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>确认提现后您的资金将会被冻结，</Text>
                        <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>并跳转到交易密码页面进行验证。</Text>
                        <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}> 若验证未完成，</Text>
                        <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>冻结资金将会在10分钟后</Text>
                        <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}> 解冻并退回到您的账户中。</Text>
                        <View style={{flexDirection: 'row',marginTop:Pixel.getPixel(33),width:Pixel.getPixel(260),paddingRight: Pixel.getPixel(17),paddingLeft: Pixel.getPixel(23),justifyContent: 'space-between'}}>
                            <TouchableOpacity style={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:Pixel.getPixel(2),borderWidth: Pixel.getPixel(1),borderColor:'#0DC1C8'}}>
                                <Text style={{color:'#05C5C2',fontSize:Pixel.getFontPixel(15)}} >取消</Text>
                            </TouchableOpacity>
                           <SubmitComponent title="确认" warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),marginLeft: Pixel.getPixel(20),marginTop:0}}/>
                        </View>

                    </View>
                </Image>
            </View>

        )
    }
}