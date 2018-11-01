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
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');

export default class AuthenticateCardComponent extends BaseComponent{
    constructor(props) {
        super(props);
        console.log(this.props.data);

    }
    initFinish(){
        switch (this.props.data.status) {
            case 1:
                this.tu = require('../../../../../images/mine/guangfa_account/lan.png');
                this.text='等待银行审核';
                this.bankNo = this.props.data.bank_card_no && this.props.data.bank_card_no != 0 ? this.props.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                    '***** ***** *****';
                break;
            case 2:
                this.tu = require('../../../../../images/mine/guangfa_account/hong.png');
                this.text='待确定';
                this.bankNo = this.props.data.bank_card_no && this.props.data.bank_card_no != 0 ? this.props.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                    '***** ***** *****';
                break;
            case 3:
                this.tu = require('../../../../../images/mine/guangfa_account/lv.png');
                this.text='已确认';
                this.bankNo = this.props.data.bank_card_no && this.props.data.bank_card_no != 0 ? this.props.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                    '***** ***** *****';
        }
    }
    render(){
        return(
            <Image style={{
                marginTop:Pixel.getPixel(15),
                width:width,
                height:width*0.3,
                justifyContent:'center',
            }} source={this.tu} resizeMode="stretch">
                <TouchableOpacity onPress={this.props.btn} style={{
                    width:width-Pixel.getPixel(30),
                    height:Pixel.getPixel(60),
                    overflow:'hidden',
                    marginLeft:Pixel.getPixel(20),
                    paddingLeft:Pixel.getPixel(20),
                    flexDirection:'row',
                    alignItems:'center',
                    marginBottom:Pixel.getPixel(10),
                   }}>
                    <View style={{flexDirection:'column',height:Pixel.getPixel(60),justifyContent:'flex-start'}}>
                        <Text allowFontScaling={false} style={{lineHeight:Pixel.getPixel(20),backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(12),}}>{this.props.data.sub_bank_name}卡号</Text>
                        <Text allowFontScaling={false} style={{lineHeight:Pixel.getPixel(30),backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(24),fontWeight:'bold'}}>{this.bankNo}</Text>
                    </View>
                    <View  style={{
                        position:'absolute',
                        top:(Pixel.getPixel(65)-Pixel.getPixel(30))/2,
                        right:Pixel.getPixel(-15),
                        backgroundColor:'rgba(0,0,0,0.2)',
                        borderRadius: Pixel.getPixel(15),
                        height:Pixel.getPixel(30),
                        justifyContent:'center',
                        paddingRight:Pixel.getPixel(25),
                        paddingLeft:Pixel.getPixel(10)
                        }}>
                        <Text allowFontScaling={false}  style={{color:'#ffffff',fontSize:Pixel.getPixel(15)}}>{this.text}</Text>
                    </View>
                </TouchableOpacity>

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