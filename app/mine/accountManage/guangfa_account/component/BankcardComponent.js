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


export default class BankcardComponent extends BaseComponent{
    constructor(props) {
        super(props);
        this.getBankImage(this.props.data.sub_bank_name)

    }
    render(){
        let  {data} = this.props;
        this.cardNO = data.bank_card_no && data.bank_card_no != 0 ? data.bank_card_no.replace(/^(....).*(....)$/,'$1****$2'):'**** **** ****';
        return(
            <TouchableOpacity style={{marginTop:Pixel.getPixel(10)}} onPress={()=>{this.props.bankClick && this.props.bankClick(data)}} activeOpacity={1}>
            <Image source={this.bg} style={{
                width:width-Pixel.getPixel(30),
                height:(width-Pixel.getPixel(30)) * 0.24,
                marginLeft:Pixel.getPixel(15)
            }}>
                <View style={{flexDirection:'row',width:width-Pixel.getPixel(30),height:(width-Pixel.getPixel(30)) * 0.24}}>
                    <Image source={this.icon} style={{marginLeft: Pixel.getPixel(19),marginTop:Pixel.getPixel(26),width:Pixel.getPixel(28),height:Pixel.getPixel(28)}}/>
                    <View style={{flexDirection:'row',marginLeft:Pixel.getPixel(18),width:width-Pixel.getPixel(95),justifyContent:'space-between',paddingRight: Pixel.getPixel(12),alignItems:'center'}}>
                        <View style={{flexDirection:'column',justifyContent: 'center'}}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(15),lineHeight:Pixel.getPixel(21)}}>{data.sub_bank_name}</Text>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(18),lineHeight:Pixel.getPixel(23),marginTop:Pixel.getPixel(5)}}>{this.cardNO}</Text>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            {
                                data.status != 3 && <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),lineHeight:Pixel.getPixel(17)}}>{this.statusType(data.status)}</Text>
                            }
                            {
                                data.status == 3 && (
                                    <TouchableOpacity style={{
                                        width:Pixel.getPixel(43),height:Pixel.getPixel(21),
                                        borderRadius:Pixel.getPixel(25),
                                        backgroundColor:'rgba(0,0,0,0.1)',
                                        alignItems:'center',
                                        justifyContent:'center'}} onPress={()=>{
                                            this.props.relieveClick && this.props.relieveClick(data)
                                    }}>
                                        <Text style={{fontSize:Pixel.getFontPixel(12),color:'#ffffff',backgroundColor:'transparent'}}>解绑</Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                    </View>
                </View>
            </Image>
            </TouchableOpacity>
        )
    }

    getBankImage=(name)=>{
        if(name.indexOf('工商银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/gs.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }else if(name.indexOf('中国银行')>-1){
            this.icon =require('../../../../../images/mine/guangfa_account/zh.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }else if(name.indexOf('建设银行')>-1){
            this.icon =require('../../../../../images/mine/guangfa_account/js.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lan.png');
        }else if(name.indexOf('农业银行')>-1){
            this.icon =require('../../../../../images/mine/guangfa_account/ny.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lv.png');
        }else if(name.indexOf('交通银行')>-1){
            this.icon= require('../../../../../images/mine/guangfa_account/jt.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lan.png');
        }else if(name.indexOf('邮储银行')>-1){
            this.icon =require('../../../../../images/mine/guangfa_account/yz.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lv.png');
        }else if(name.indexOf('招商银行')>-1){
            this.icon =require('../../../../../images/mine/guangfa_account/zs.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }else if(name.indexOf('平安银行')>-1){
            this.icon =require('../../../../../images/mine/guangfa_account/pa.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-jing.png');
        }else if(name.indexOf('民生银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/ms.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lv.png');
        }else if(name.indexOf('光大银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/gd_new.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-zi.png');
        }else if(name.indexOf('华夏银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/hx.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }else if(name.indexOf('中信银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/zx.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }else if(name.indexOf('浦发银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/pf.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lan.png');
        }else if(name.indexOf('广发银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/gf.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }else if(name.indexOf('兴业银行')>-1){
            this.icon = require('../../../../../images/mine/guangfa_account/zx.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-lan.png');
        }else {
            this.icon = require('../../../../../images/mine/guangfa_account/moren-bank.png');
            this.bg = require('../../../../../images/mine/guangfa_account/ka-hong.png');
        }
    }

    statusType=(status)=>{

        switch (status){
            case 1:
                return '绑卡处理中'
                break;
            case 2:
                return '待小额鉴权'
                break;
                case 4:
                return '解绑处理中'
                break;
            default:
                return ''
                break;
        }
    }
}