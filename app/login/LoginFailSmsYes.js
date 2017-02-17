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
import LoginFailSmsVerify from './LoginFailSmsVerify';
export default class LoginFailSmsYes extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"登录遇到问题"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.fontStyle}>
                        您可以通过
                        <Text style={[styles.fontStyle, {color: FontAndColor.COLORB0}]}>
                            手机号+短信验证码
                        </Text>
                    </Text>
                    <Text style={styles.fontStyle}>
                        登录BMS借款系统
                    </Text>
                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'用短信验证码登录'}
                          parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle}
                          mOnPress={this.rightTextCallBack}/>
            </View>
        );
    }

    rightTextCallBack = () => {
        this.toNextPage({
            name: 'LoginFailSmsVerify',
            component: LoginFailSmsVerify,
            params: {},
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
        justifyContent: 'center'
    },
    fontStyle: {
        color: FontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(FontAndColor.NAVIGATORFONT34),
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
    }
});