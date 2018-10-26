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


export default class SmallAmountofPawerScene extends BaseComponent{
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
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='账户管理'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <Image style={{marginTop: Pixel.getPixel(116)}} source={require('../../../../../images/mine/guangfa_account/tongguo.png')}/>
                <View style={{marginTop:Pixel.getPixel(8),alignItems:'center',height:Pixel.getPixel(80)}}>
                    {/*<Text style={{color:'#151515',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(37)}}>暂无可开户银行</Text>*/}
                    {/*<Text style={{color:'#151515',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(20)}}>请联系客户经理开通账户白名单</Text>*/}
                    <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),width:Pixel.getPixel(160),height:Pixel.getPixel(50),lineHeight:Pixel.getPixel(20)}}>您已通过审核，
                        请进行小额鉴权完成开户</Text>
                </View>
                <SubmitComponent title='去小额鉴权' warpStyle={{width:Pixel.getPixel(320),height:Pixel.getPixel(44),marginLeft: 0,marginTop:Pixel.getPixel(7)}}/>
            </View>
        )
    }

    renderPlaceholderView = () => {
        return(
            this.loadView()
        )

    }
}