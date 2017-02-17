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
export default class LoginFailSmsNo extends BaseComponent {
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
                    leftImageCallBack={this.backPage}/>
                <View style={styles.messageVeiwStyle}>
                    <Text style={styles.messageStyle}>
                        *请填写您的企业信息，工作人员会主动与您联系
                    </Text>
                </View>
                <LoginInputText
                    ref="userName"
                    textPlaceholder={"请填写借款人姓名"}
                    rightIcon={false}
                    leftIcon={false}
                    leftText={"借款人姓名"}
                    viewStytle={styles.itemStyel}/>
                <LoginInputText
                    ref="businessName"
                    textPlaceholder={'请填写借款人所在企业名称'}
                    rightIcon={false}
                    leftIcon={false}
                    leftText={"企业名称"}
                    viewStytle={styles.itemStyel}/>
                <LoginInputText
                    ref="phone"
                    textPlaceholder={'请填写有些手机号'}
                    rightIcon={false}
                    leftIcon={false}
                    leftText={"联系手机"}
                    viewStytle={styles.itemStyel}
                    keyboardType={'phone-pad'}/>
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
        // this.toNextPage({
        //     name: 'Register',
        //     component: LoginFail,
        //     params: {},
        // })
        alert("设置成功")
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
    messageStyle: {
        fontSize: Pixel.getFontPixel(FontAndColor.CONTENTFONT24),
        color: FontAndColor.COLORB3,

    },
    messageVeiwStyle: {
        width: width,
        height: Pixel.getPixel(28),
        justifyContent: 'center',
        backgroundColor: "#FFF8EA",
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    itemStyel: {
        backgroundColor: "#ffffff",
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
});