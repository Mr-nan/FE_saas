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
    Dimensions,
    Animated,
    Easing

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import {request} from "../../../../utils/RequestUtil";
import NoAccountScene from './NoAccountScene';
import * as Urls from "../../../../constant/appUrls";

export default class WattingTenScendsScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            time:10,
            bounceValue:new Animated.Value(1),
            rotateValue:new Animated.Value(0),
        }
        this.isStart= true;
    }
    componentWillMount(){
        this.countTime();

    }
    countTime = () => {
        this.rotateAnimation();
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
                this.toNextPage({
                    name:'NoAccountScene',
                    component:NoAccountScene,
                    params:{
                        status:0,
                        title:'账户首页',
                        toNextPageData:this.props.toNextPageData,
                    }
                })
            }
        },1000);

    }

    stopTime = () =>{
        this.isStart = false;
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

                 if(da.transfer_status==1){
                     this.toNextPage({
                         name:'NoAccountScene',
                         component:NoAccountScene,
                         params:{
                             status:da.transfer_status,
                             title:'账户首页',
                             toNextPageData:this.props.toNextPageData,
                         }
                     })
                     this.stopTime();
                 }

            },(error)=>{
                if(this.state.time == 1){
                        this.toNextPage({
                            name:'NoAccountScene',
                            component:NoAccountScene,
                            params:{callback:()=>{this.props.callback()},status:0,title:'账户首页'}
                        })

                }
            })

    }
    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    handleBack=()=>{

    }

    rotateAnimation(){
        this.state.bounceValue.setValue(1);
        this.state.rotateValue.setValue(0);
        Animated.parallel(
            [
                Animated.spring(this.state.bounceValue,{
                    toValue:1,
                    friction:30,
                }),
                Animated.timing(this.state.rotateValue, {
                    toValue: 1,  //角度从0变1
                    duration: 1000,  //从0到1的时间
                    easing: Easing.out(Easing.linear),//线性变化，匀速旋转
                }),
            ]
        ).start(()=>{this.isStart && this.rotateAnimation()});
    }


    render(){
            return(
            <Image source={require('../../../../../images/mine/guangfa_account/dengdai-bg.png')} style={{alignItems:'center',width:width,height:height}}>
                <StatusBar barStyle='light-content'/>
                <NavigationView title='账户首页'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                    <View style={{width:Pixel.getPixel(221),height:Pixel.getPixel(242),marginTop:Pixel.getPixel(113),alignItems:'center',justifyContent:'center'}}>
                        <Animated.Image source={require('../../../../../images/mine/guangfa_account/dongxiao1.png')} style={{alignItems:'center',justifyContent:'center', transform:[
                            {scale:this.state.bounceValue},
                            {rotateZ:this.state.rotateValue.interpolate({inputRange:[0,1],outputRange:['360deg','0deg']})}]}}>
                        </Animated.Image>
                        <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center',top:0,left:0,
                            right:0,bottom:0,position:'absolute',
                        }}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(72),fontWeight: 'bold'}}>{this.state.time}</Text>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(36),marginTop:Pixel.getPixel(25)}}>S</Text>
                        </View>
                    </View>
                <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getPixel(20),fontWeight: 'bold',marginTop: Pixel.getPixel(14)}}>等待银行确认</Text>
            </Image>
        )
    }
}