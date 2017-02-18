import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
import MyButton from '../component/MyButton';
import LoginInputText from './component/LoginInputText';
import LoginFailPwd from './LoginFailPwd';
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import ShowToast from '../component/toast/ShowToast';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class LoginFailSmsVerify extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            verifyCodeUrl: null,
        }
    }

    initFinish = () => {
        this.Verifycode();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"短信验证"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}
                />
                <View style={{width: width, height: Pixel.getPixel(15)} }/>
                <LoginInputText
                    ref="phone"
                    textPlaceholder={'请输入手机号码'}
                    rightIcon={false}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                    keyboardType={'phone-pad'}
                    leftIconUri={require('./../../images/login/phone.png')}/>
                <View style={{width: width, height: Pixel.getPixel(10)} }/>
                <LoginInputText
                    ref="verifycode"
                    textPlaceholder={'请输入验证码'}
                    viewStytle={styles.itemStyel}
                    leftIconUri={require('./../../images/login/virty.png')}
                    rightIconSource={this.state.verifyCodeUrl ? this.state.verifyCodeUrl : null}
                    rightIconClick={this.Verifycode}
                    rightIconStyle={{width: Pixel.getPixel(100), height: Pixel.getPixel(32)}}/>

                <LoginInputText
                    ref="smscode"
                    textPlaceholder={'请输入短信验证码'}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                    leftIconUri={require('./../../images/login/sms.png')}
                    rightIcon={false}
                    rightButton={true}
                    callBackSms={this.Smscode}/>
                <View style={{width: width, height: Pixel.getPixel(44)} }/>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'提交'}
                          parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle}
                          mOnPress={this.rightTextCallBack}/>
            </View>
        );
    }

    Verifycode = () => {
        this.refs.verifycode.lodingStatus(true);
        let maps = {
            device_code: "dycd_dms_manage_android",
        };
        request(AppUrls.IDENTIFYING + "&" + "device_code=dycd_dms_manage_android", 'Post', maps)
            .then((response) => {
                this.refs.verifycode.lodingStatus(false);
                this.setState({
                    verifyCodeUrl: {uri: response.mjson.data.img_src},
                });
            }, (error) => {
                this.refs.verifycode.lodingStatus(false);
                this.refs.toast.changeType(ShowToast.TOAST, "获取失败");
            });
    }

    Smscode = () => {
        alert("Smscode")
    }

    rightTextCallBack = () => {
        this.toNextPage({
            name: 'LoginFailPwd',
            component: LoginFailPwd,
            params: {},
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    buttonStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    buttonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    itemStyel: {
        backgroundColor: "#ffffff",
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
});