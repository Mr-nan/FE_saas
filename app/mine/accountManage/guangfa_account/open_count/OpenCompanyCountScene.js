/*
* created by marongting on 2018/10/18
*
* */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    Image,
    ScrollView

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
import NavigationView from "../../../../component/AllNavigationView";
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from "../component/SubmitComponent";
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class OpenCompanyCountScene extends BaseComponent{

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

    renderPlaceholderView = () => {
        this.loadView();
    }

    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
            this.renderPlaceholderView();
        }
        return (
            <View style={{flex: 1,backgroundColor:'#F4F6F8'}}>
                <NavigationView backIconClick={true} title='开通企业账户'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>
                <ScrollView style={{backgroundColor:'#F4F6F8',marginTop:Pixel.getPixel(64)}}>
                <View style={{marginTop:Pixel.getPixel(15),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入企业名称'}
                        leftText = '企业名称'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                    <LoginInputText
                        textPlaceholder={'请输入企业固定电话'}
                        leftText = '企业固定电话'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                    <LoginInputText
                        textPlaceholder={'请输入社会信用代码'}
                        leftText = '统一社会信用代码'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入法人姓名'}
                        leftText = '法人代表姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                    <LoginInputText
                        textPlaceholder={'请输入法人身份证号'}
                        leftText = '法人代表身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入联系人姓名'}
                        leftText = '企业联系人姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                    <LoginInputText
                        textPlaceholder={'请输入联系人身份证号'}
                        leftText = '联系人身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                    <LoginInputText
                        textPlaceholder={'请输入联系人手机号'}
                        leftText = '联系人手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入银行账号'}
                        leftText = '银行账'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}/>
                    <View style={{flexDirection: 'row',flex:1,alignItems:'center',width:Pixel.getPixel(345),height:Pixel.getPixel(45)}}>
                        <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),justifyContent: 'flex-start'}}>银行</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight: Pixel.getPixel(15),width:Pixel.getPixel(316)}}>
                            <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:'#AEAEAE',marginRight:Pixel.getPixel(20)}}>请选择银行</Text>
                            <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </View>
                </View>
                </ScrollView>
                <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop: Pixel.getPixel(19),alignItems:'flex-end' }}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                    <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>请确认信息的准确性，开户时间为7*24小时 </Text>
                </View>
                <SubmitComponent title="确认提交" warpStyle={{marginTop:Pixel.getPixel(17)}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({


})