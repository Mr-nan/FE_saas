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

    }
    render(){
        let  {data} = this.props;
        return(
            <Image source={require('../../../../../images/mine/guangfa_account/ka-hong.png')} style={{marginTop:Pixel.getPixel(10)}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../../../../images/mine/guangfa_account/gs.png')} style={{marginLeft: Pixel.getPixel(19),marginTop:Pixel.getPixel(26),width:Pixel.getPixel(28),height:Pixel.getPixel(28)}}/>
                    <View style={{flexDirection:'row',width:Pixel.getPixel(298),paddingLeft: Pixel.getPixel(16),paddingRight: Pixel.getPixel(10),justifyContent:'space-between',marginTop:Pixel.getPixel(17)}}>
                        <View style={{flexDirection:'column',justifyContent: 'center'}}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(15),lineHeight:Pixel.getPixel(21)}}>{data.sub_bank_name}</Text>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(18),lineHeight:Pixel.getPixel(23),marginTop:Pixel.getPixel(5)}}>{data.bank_card_no}</Text>
                        </View>
                        <View style={{flexDirection:'column',alignItems:'flex-end'}}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),lineHeight:Pixel.getPixel(17)}}>{this.statusType(data.statusat)}</Text>
                            {
                                data.statusat!=4 && (
                                    <TouchableOpacity style={{
                                        width:Pixel.getPixel(43),height:Pixel.getPixel(21),
                                        borderRadius:Pixel.getPixel(25),
                                        backgroundColor:'rgba(0,0,0,0.1)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:Pixel.getPixel(14)}} onPress={()=>{
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
        )
    }

    statusType=(status)=>{

        switch (status){
            case 1:
                return '银行处理中'
                break;
            case 2:
                return '银行处理中'
                break;

            default:
                return ''
                break;
        }
    }
}