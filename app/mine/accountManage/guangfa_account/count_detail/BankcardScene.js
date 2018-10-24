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
import BankcardComponent from "../component/BankcardComponent";

export default class BankCardScene extends BaseComponent{
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
        if(this.state.renderPlaceholderOnly != 'success'){
            this.renderPlaceholderView;
        }
        return(
            <View style={{flex:1,backgroundColor:'rgba(76,76,89,1)',alignItems:'center'}}>
                <StatusBar barStyle='light-content'/>
                <NavigationView backIconClick={this.backPage} title='银行卡'
                                    wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                <BankcardComponent/>
                <TouchableOpacity style={{width:Pixel.getPixel(345),height:Pixel.getPixel(55),borderRadius:Pixel.getPixel(5),borderWidth: Pixel.getPixel(1),borderColor:'#979797',
                flexDirection: 'row',justifyContent: 'center',alignItems:'center',marginTop: Pixel.getPixel(15)}}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tianjia.png')}/>
                    <Text style={{backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getFontPixel(15),marginLeft: Pixel.getPixel(10)}}>添加银行卡</Text>
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

