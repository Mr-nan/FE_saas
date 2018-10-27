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
        const {wrapStyle}  = this.props;

        return(
            <View>
                {this.props.data.status != 0 && this.props.data.status != 4 && this.props.data.status != 5?   <Image style={[{marginTop: Pixel.getPixel(15),height:Pixel.getPixel(123)},wrapStyle]} source={this.tu}>
                    <TouchableOpacity onPress={this.props.btn} style={{marginTop: Pixel.getPixel(12),width:Pixel.getPixel(348),height:Pixel.getPixel(91),marginLeft: Pixel.getPixel(15),flexDirection:'row',alignItems:'center',overflow: 'hidden'}}>
                        <View style={{flexDirection: 'column',justifyContent:'center',height:Pixel.getPixel(60),marginLeft:Pixel.getPixel(20)}}>
                            <Text allowFontScaling={false} style={{lineHeight:Pixel.getPixel(20),backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(12),}}>{this.props.data.sub_bank_name}卡号</Text>
                            <Text allowFontScaling={false} style={{lineHeight:Pixel.getPixel(30),backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getPixel(24),fontWeight:'bold'}}>{this.bankNo}</Text>
                        </View>
                        <View style={{backgroundColor:'rgba(0,0,0,0.2)',borderRadius: Pixel.getPixel(25),justifyContent:'center',height:Pixel.getPixel(29),width:Pixel.getPixel(89),marginLeft:Pixel.getPixel(88.6)}}>
                            <Text allowFontScaling={false}  style={{color:'#ffffff',fontSize:Pixel.getPixel(15),lineHeight:Pixel.getPixel(21),marginLeft:Pixel.getPixel(16)}}>{this.text}</Text>
                        </View>
                    </TouchableOpacity>
                </Image> : null}
            </View>


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