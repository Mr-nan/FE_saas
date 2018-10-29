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


export default class NoAccountScene extends BaseComponent{
    constructor(props) {
        super(props);

    }

    initFinish(){
        this.data(this.props.status);

    }

    data = (state) =>{
        switch (state){
            case 0:
                this.tu = require('../../../../../images/mine/guangfa_account/dengdai.png');
                this.content = '等待银行确认';
                this.text = '您的业务申请已提交请等待银行审核\n'+'预计3分钟内返回结果';
                break;
            case 1:
                this.tu = require('../../../../../images/mine/guangfa_account/tongg.png');
                this.content = '审核成功';
                this.text = '您申请的授信占位啦业务操作成功';
                break;
            default:
                this.tu = require('../../../../../images/mine/guangfa_account/shibai.png');
                this.content = '操作失败';
                this.text = '您申请的授信占位啦业务操作失败';
                break;
        }
    }


    render(){

        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={()=>{this.backToTop()}} title={this.props.title}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <Image style={{marginTop: Pixel.getPixel(116)}} source={this.tu}/>
                <View style={{marginTop:Pixel.getPixel(8),alignItems:'center',height:Pixel.getPixel(80)}}>
                    {/*<Text style={{color:'#151515',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(37)}}>暂无可开户银行</Text>*/}
                    {/*<Text style={{color:'#151515',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(20)}}>请联系客户经理开通账户白名单</Text>*/}
                    <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(20)}}>{this.content}</Text>
                    <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(14),marginTop:Pixel.getPixel(25),height:Pixel.getPixel(100),lineHeight:Pixel.getPixel(20),textAlign:'center'}}>{this.text}</Text>
                </View>
                {this.props.status != 0 ?  <SubmitComponent btn = {()=>{this.next()}} title='确定' warpStyle={{width:Pixel.getPixel(320),height:Pixel.getPixel(44),marginLeft: 0,marginTop:Pixel.getPixel(7)}}/> :null }
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