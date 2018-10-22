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
    Dimensions

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import SubmitComponent from '../component/SubmitComponent';

export default class WattingTenScendsScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank'
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    render(){
        return(
            <Image source={require('../../../../../images/mine/guangfa_account/dengdai-bg.png')} style={{flex:1,alignItems:'center'}}>
                <NavigationView backIconClick={this.backPage} title='账户首页'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                <View style={{width:Pixel.getPixel(221),height:Pixel.getPixel(242),marginTop:Pixel.getPixel(113)}}>
                    <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center'}}>
                        <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(72),fontWeight: 'bold',marginTop: Pixel.getPixel(80)}}>10</Text>
                        <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(36),marginTop: Pixel.getPixel(110)}}>S</Text>
                    </View>
                </View>
                <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(20),fontWeight: 'bold',marginTop: Pixel.getPixel(14)}}>等待银行确认</Text>
            </Image>
        )
    }
}