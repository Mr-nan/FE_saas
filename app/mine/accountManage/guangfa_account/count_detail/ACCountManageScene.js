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
const width = Dimensions.get('window').width;
import NavigationView from "../../../../component/AllNavigationView";
import SubmitComponent from "../component/SubmitComponent";

export default class ACCountManageScene extends BaseComponent{
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
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='账户管理'
                                 wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <View style={{width:width,alignItems:'center',marginTop:Pixel.getPixel(131),justifyContent: 'flex-end'}}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tongguo.png')}/>
                    <Text allowFontScaling={false}  style={{fontSize:Pixel.getFontPixel(14),color:fontAndColor.COLORD2,marginTop:Pixel.getPixel(17),lineHeight:Pixel.getPixel(20)}}>您已通过审核，</Text>
                    <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:fontAndColor.COLORD2,lineHeight:Pixel.getPixel(20)}}>请进行小额鉴权完成开户</Text>
                </View>
                <SubmitComponent title="去小额鉴权" btnType={3} iconWrap = {{marginTop:Pixel.getPixel(39)}}/>
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