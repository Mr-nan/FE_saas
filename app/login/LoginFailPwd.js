import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
import MyButton from '../component/MyButton';
import LoginInputText from './component/LoginInputText';
import SetPwd from './SetPwd';
export default class LoginFailPwd extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"设置登录密码"}
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
                    ref="password"
                    textPlaceholder={'请设置BMS登录密码'}
                    rightIcon={false}
                    leftIcon={true}
                    leftIconUri={require('./../../images/login/password.png')}
                    viewStytle={styles.itemStyel}/>
                <LoginInputText
                    ref="passwordAgain"
                    textPlaceholder={'请再次输入密码'}
                    rightIcon={false}
                    leftIcon={true}
                    leftIconUri={require('./../../images/login/password.png')}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}/>
                <View style={{width: width, height: Pixel.getPixel(44)} }/>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确认'}
                          parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle}
                          mOnPress={this.rightTextCallBack}/>
            </View>
        );
    }

    rightTextCallBack = () => {
        this.toNextPage({
            name: 'SetPwd',
            component: SetPwd,
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