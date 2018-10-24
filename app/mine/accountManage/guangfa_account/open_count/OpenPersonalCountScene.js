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
    TouchableOpacity

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

import BaseComponent from "../../../../component/BaseComponent";
import NavigationView from '../../../../component/AllNavigationView';
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from '../component/SubmitComponent';

export default class OpenPersonalCountScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank'
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        });
    }
    _renderPlaceholderView = () => {
        this.loadView();
    }
    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
           return this._renderPlaceholderView()
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title='开通个人账户'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>
                <View style={styles.inputTextsStyleView}>
                    <LoginInputText
                        textPlaceholder={'请输入姓名'}
                        leftText = '姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入身份证号'}
                        leftText = '身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入手机号码'}
                        leftText = '手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(42),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入银行卡号'}
                        leftText = '银行卡号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>
                    <View style={{flexDirection: 'row',flex:1,alignItems:'center',width:Pixel.getPixel(345)}}>
                        <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),justifyContent: 'flex-start'}}>银行</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight: Pixel.getPixel(15),width:Pixel.getPixel(316)}}>
                            <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:'#AEAEAE',marginRight:Pixel.getPixel(20)}}>请选择银行</Text>
                            <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop: Pixel.getPixel(21),alignItems:'flex-end' }}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                    <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>请确认信息的准确性，开户时间为7*24小时 </Text>
                </View>
                <SubmitComponent title="确认提交" warpStyle={{marginTop:Pixel.getPixel(30)}}/>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    inputTextsStyleView: {
        width:width,
        height:Pixel.getPixel(224),
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getTitlePixel(79)
    },

})