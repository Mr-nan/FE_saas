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
export default class SetPwd extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"修改登录密码"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}/>
                <View style={{width: width, height: Pixel.getPixel(15)} }/>
                <LoginInputText
                    ref="oldPassword"
                    rightIcon={false}
                    leftIcon={false}
                    textPlaceholder={"请输入原登录密码"}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}/>
                <View style={{width: width, height: Pixel.getPixel(10)} }/>
                <LoginInputText
                    ref="newPassword"
                    rightIcon={false}
                    leftIcon={false}
                    textPlaceholder={"请设置新密码"}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}/>
                <View style={{width: width, height: Pixel.getPixel(10)} }/>
                <LoginInputText
                    ref="newPasswordAgain"
                    rightIcon={false}
                    leftIcon={false}
                    textPlaceholder={"请再次填写新密码"}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}/>
                <View style={{width: width, height: Pixel.getPixel(44)} }/>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
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
    itemStyel: {
        backgroundColor: "#ffffff",
    },
});