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
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import NoAccountScene from './NoAccountScene';
import * as Urls from "../../../../constant/appUrls";
import SmallAmountBankStatusScene from "./SmallAmountBankStatusScene";

export default class WattingTenScendsScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            time:10,
        }
    }
    componentWillMount(){
        this.countTime();

    }
    countTime = () => {
       this.myTime = setInterval(()=>{
            if(this.state.time > 1){
                this.setState({
                    time:this.state.time - 1
                })
                if(this.state.time % 3 == 1){

                    this.toSend();

                }
            }else{
                this.stopTime();
            }
        },1000);

    }

    stopTime = () =>{
       clearInterval(this.myTime);
    }

    toSend = () => {
        let maps = {
            bank_id:'gfyh',
            enter_base_id:global.companyBaseID,
            serial_no:this.props.serial_no
        }
        request(Urls.ZS_FETCH_STATUS,'Post',maps)
            .then((response)=>{
                let da = response.mjson.data;
                    this.toNextPage({
                        name:'NoAccountScene',
                        component:NoAccountScene,
                        params:{
                            callback:()=>{this.props.callback()},
                            status:da.transfer_status,
                            title:'账户首页',
                            toNextPageData:this.props.toNextPageData,
                        }
                    })
                this.stopTime();

            },(error)=>{
                if(this.state.time == 1){
                        this.toNextPage({
                            name:'NoAccountScene',
                            component:NoAccountScene,
                            params:{callback:()=>{this.props.callback()},status:da.transfer_status,title:'账户首页'}
                        })

                }
            })

    }
    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }


    render(){
            return(
            <Image source={require('../../../../../images/mine/guangfa_account/dengdai-bg.png')} style={{flex:1,alignItems:'center'}}>
                <StatusBar barStyle='light-content'/>
                <NavigationView title='账户首页'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                    <View style={{width:Pixel.getPixel(221),height:Pixel.getPixel(242),marginTop:Pixel.getPixel(113),alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('../../../../../images/mine/guangfa_account/dongxiao1.png')} style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center'}}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(72),fontWeight: 'bold'}}>{this.state.time}</Text>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(36),marginTop:Pixel.getPixel(25)}}>S</Text>
                        </View>
                        </Image>
                    </View>
                <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(20),fontWeight: 'bold',marginTop: Pixel.getPixel(14)}}>等待银行确认</Text>
            </Image>
        )
    }
}