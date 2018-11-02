/*
*
* created on marongting by 2018/10/19
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    DeviceEventEmitter,

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";


export default class BankWatting extends BaseComponent{
    constructor(props) {
        super(props);
        this.text = '您的业务申请已提交请等待银行审核\n'+'预计3分钟内返回结果';

    }
    render(){

        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>

                <Image style={{marginTop: Pixel.getPixel(116)}} source={require('../../../../../images/mine/guangfa_account/dengdai.png')}/>
                <View style={{marginTop:Pixel.getPixel(8),alignItems:'center',height:Pixel.getPixel(80)}}>
                    <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(20)}}>等待银行确认</Text>
                    <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(14),marginTop:Pixel.getPixel(25),height:Pixel.getPixel(100),lineHeight:Pixel.getPixel(20),textAlign:'center'}}>{this.text}</Text>
                </View>
                <NavigationView backIconClick={this.backPage}
                                title='账户首页'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>
        )
    }
}