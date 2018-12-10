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

export default class AuthenticateCardComponent extends Component{
    constructor(props) {
        super(props);
        console.log(this.props.data);
        switch (this.props.data.status) {
            case 1:
                this.yinying = require('../../../../../images/mine/guangfa_account/lan.png');
                this.tu = require('../../../../../images/mine/guangfa_account/lan-wy.png');
                this.text='等待银行审核';
                 this.bankNo = this.props.data.bank_card_no && this.props.data.bank_card_no != 0 ? this.props.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                    '***** ***** *****';
                break;
            case 2:
                this.yinying = require('../../../../../images/mine/guangfa_account/hong.png');
                this.tu = require('../../../../../images/mine/guangfa_account/hong-wy.png');
                this.text='待确认';
                 this.bankNo = this.props.data.bank_card_no && this.props.data.bank_card_no != 0 ? this.props.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                    '***** ***** *****';
                break;
            case 3:
                this.yinying = require('../../../../../images/mine/guangfa_account/lv.png');
                this.tu = require('../../../../../images/mine/guangfa_account/lv-wy.png');
                this.text='已确认';
                this.bankNo = this.props.data.bank_card_no && this.props.data.bank_card_no != 0 ? this.props.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                    '***** ***** *****';
        }

    }

    render(){
        return(
            <TouchableOpacity style={{
                marginTop:Pixel.getPixel(15),
                marginBottom:Pixel.getPixel(-10)

            }}  onPress={()=>{this.props.btn()}} activeOpacity={1}>
                <Image style={{
                    justifyContent:'center',
                    width:width,
                    height:width*0.3,
                    alignItems: 'center',
                }} source={this.yinying} resizeMode="stretch">
                    <Image style={{
                        width:width-Pixel.getPixel(26),
                        height:(width-Pixel.getPixel(30))*0.26,
                        justifyContent:'center',
                        paddingLeft:Pixel.getPixel(20),
                        marginTop:Pixel.getPixel(-4),
                        overflow:'hidden',
                        backgroundColor:'transparent'
                    }} source={this.tu} resizeMode="stretch">
                                <Text allowFontScaling={false} style={{backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(12),}}>{this.props.data.sub_bank_name}卡号</Text>
                                <Text allowFontScaling={false} style={{backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(24),fontWeight:'bold',marginTop:Pixel.getPixel(5)}}>{this.bankNo}</Text>
                            <View  style={{
                                position:'absolute',
                                top:(((width-Pixel.getPixel(30))*0.26)-Pixel.getPixel(30))/2,
                                right:Pixel.getPixel(-15),
                                backgroundColor:'rgba(0,0,0,0.2)',
                                borderRadius: Pixel.getPixel(15),
                                height:Pixel.getPixel(30),
                                justifyContent:'center',
                                paddingRight:Pixel.getPixel(25),
                                paddingLeft:Pixel.getPixel(10),
                            }}>
                                <Text allowFontScaling={false}  style={{color:'#ffffff',fontSize:Pixel.getPixel(15)}}>{this.text}</Text>
                            </View>
                    </Image>
                </Image>
            </TouchableOpacity>

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