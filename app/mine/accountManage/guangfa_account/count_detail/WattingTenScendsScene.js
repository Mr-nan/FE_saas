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
                console.log(this.state.time);
                if(this.state.time == 7 || this.state.time == 4 ||this.state.time == 1){
                    StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT,(data)=>{
                        if(data.code == 1){
                            let userData = JSON.parse(data.result);
                            this.toSend(userData);

                        }
                    })
                }
            }else{
                this.stopTime();
            }
        },1000);

    }

    stopTime = () =>{
       clearInterval(this.myTime);
    }
    toSend = (userData) => {
        let maps = {
            bank_id:'gfyh',
            enter_base_id:userData.company_base_id,
            serial_no:'UA0021201810251638553260000051051'
        }
        request(Urls.ZS_FETCH_STATUS,'Post',maps)
            .then((response)=>{
                let da = response.mjson;
                console.log(da);
                if(da.data.transfer_status == 0 && this.state.time != 1){
                    this.countTime();
                }
                this.toNextPage({
                    name:'NoAccountScene',
                    component:NoAccountScene,
                    params:{callback:()=>{this.props.callback()},status:da.data.transfer_status,title:'账户首页'}
                })
                this.stopTime();

            })

    }
    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    _renderPlaceholderView = () => {
        return(
            <View style={{width:width,height:height,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle='light-content'/>
                <NavigationView backIconClick={this.backPage} title='账户首页'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                {this.loadView()}
            </View>
            )

    }

    render(){
        if(this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
            return(
            <Image source={require('../../../../../images/mine/guangfa_account/dengdai-bg.png')} style={{flex:1,alignItems:'center'}}>
                <StatusBar barStyle='light-content'/>
                <NavigationView backIconClick={this.backPage} title='账户首页'
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