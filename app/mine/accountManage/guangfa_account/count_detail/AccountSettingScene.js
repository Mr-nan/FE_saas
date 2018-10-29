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
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from "../component/SubmitComponent";


export default class AccountSettingScene extends BaseComponent{
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
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this.renderPlaceholderView();
        }
        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='light-content'/>
                <Image source={require('../../../../../images/mine/guangfa_account/tou-bg.png')} style={{alignItems:'center'}}>
                    <NavigationView backIconClick={this.backPage} title='账户设置'
                                    wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                    <View style={{width:Pixel.getPixel(92),height:Pixel.getPixel(20),backgroundColor:'rgba(0,0,0,0.1)',borderRadius:Pixel.getPixel(13),alignItems:'center',justifyContent: 'center',marginTop: Pixel.getPixel(74)}}>
                        <Text style={{color:'#ffffff',fontSize:Pixel.getFontPixel(14),backgroundColor:'transparent'}}>资金账户ID号</Text>
                    </View>
                    <Text style={{color:'#ffffff',fontSize:Pixel.getFontPixel(26),backgroundColor:'transparent',marginTop:Pixel.getPixel(8),fontWeight: 'bold'}}>6212 ***** 3456</Text>
                </Image>
                <View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(191),backgroundColor:'#ffffff',borderRadius:Pixel.getPixel(5),marginTop:Pixel.getPixel(-30),
                shadowColor: '#9DA1B3',shadowOffset: {width:0,height:8},shadowOpacity:0.1,paddingLeft:Pixel.getPixel(15),paddingTop: Pixel.getPixel(26),paddingRight: Pixel.getPixel(16),alignItems:'center'}}>
                    <LoginInputText
                        textPlaceholder={'雪大大占位公司'}
                        leftText = '姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(45),paddingLeft:0}}/>
                    <SubmitComponent title='确认修改' warpStyle={{marginTop:Pixel.getPixel(21),marginLeft:0,width:Pixel.getPixel(309)}}/>
                </View>
                <Text style={{color:'#AEAEAE',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),marginTop:Pixel.getPixel(18)}}>仅用于后台查询使用不可用于转账</Text>
            </View>
        )
    }
    renderPlaceholderView = () => {
        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='账户管理'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                {this.loadView()}
            </View>
            )
    }
}