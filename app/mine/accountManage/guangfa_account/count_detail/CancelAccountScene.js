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

export default class CancelAccountScene extends BaseComponent{
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
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='账户管理'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <TouchableOpacity style={{paddingLeft: Pixel.getPixel(18),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(44),width:width,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop: Pixel.getPixel(79)}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={require('../../../../../images/mine/guangfa_account/zhuxiao.png')}/>
                        <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>账户注销</Text>
                    </View>
                    <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
    renderPlaceholderView = () => {
        this.loadView();
    }
    backPage = () => {
        this.loadView();
    }
}