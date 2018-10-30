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


export default class NoOpenBankScene extends BaseComponent{
    constructor(props) {
        super(props);

    }

    render(){

        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={()=>{this.backToTop()}} title='我的账户'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <Image style={{marginTop: Pixel.getPixel(130)}} source={require('../../../../../images/mine/guangfa_account/wukaihu.png')}/>
                <View style={{marginTop:Pixel.getPixel(35),alignItems:'center',height:Pixel.getPixel(80)}}>
                    <Text style={{color:'#151515',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(37)}}>暂无可开户银行</Text>
                    <Text style={{color:'#151515',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(20)}}>请联系客户经理开通账户白名单</Text>
                </View>

            </View>
        )
    }



    next =()=>{

        if(this.props.toNextPageData){
            this.toNextPage(this.props.toNextPageData);
        }else {
            this.backToTop();
        }

    }

    handleBack=()=>{
        this.backToTop();
    }



}