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
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import AuthenticatePublicScene from "./AuthenticatePublicScene";


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
        this.text = '您已通过审核，\n' + '请进行小额鉴权完成开户'
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this.renderPlaceholderView();
        }
        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='账户管理'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <Image style={{marginTop: Pixel.getPixel(116)}} source={require('../../../../../images/mine/guangfa_account/tongguo.png')}/>
                <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),height:Pixel.getPixel(50),lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(17),textAlign:'center'}}>{this.text}</Text>
                <SubmitComponent btn={()=>{this.next()}} title='去小额鉴权' warpStyle={{width:Pixel.getPixel(320),height:Pixel.getPixel(44),marginLeft: 0,marginTop:Pixel.getPixel(39)}}/>
            </View>
        )
    }

    next = () =>{
        this.toNextPage({
            name:'AuthenticatePublicScene',
            component:AuthenticatePublicScene,
            params:{
                callback:()=>{this.props.callback()}
            }
        })

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