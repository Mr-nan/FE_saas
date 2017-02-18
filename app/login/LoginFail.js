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
import LoginFailSmsYes from './LoginFailSmsYes';
import LoginFailSmsNo from './LoginFailSmsNo';
export default class LoginFail extends BaseComponent {
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
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.fontStyle}>
                        您的手机号
                    </Text>
                    <Text style={styles.fontStyle}>
                        目前能不能接收短信？
                    </Text>
                </View>
                <View style={styles.bottomStyle}>
                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'不能'}
                              parentStyle={styles.leftButtonStyle}
                              childStyle={styles.leftButtonTextStyle}
                              mOnPress={this.noCallBack}/>
                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'能'}
                              parentStyle={styles.rightButtonStyle}
                              childStyle={styles.rightButtonTextStyle}
                              mOnPress={this.yesCallBack}/>
                </View>
            </View>
        );
    }

    yesCallBack = () => {
        this.toNextPage({
            name: 'LoginFailSmsYes',
            component: LoginFailSmsYes,
            params: {},
        })
    }
    noCallBack = () => {
        this.toNextPage({
            name: 'LoginFailSmsNo',
            component: LoginFailSmsNo,
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
        fontSize: Pixel.getFontPixel(17),
    },
    bottomStyle: {
        width: width,
        height: Pixel.getPixel(44),
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Pixel.getPixel(20),
    },
    leftButtonStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        backgroundColor: FontAndColor.COLORA3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(25),
        borderWidth: 1,
        borderColor: FontAndColor.COLORB0,
    },
    rightButtonStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        backgroundColor: FontAndColor.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(25),
    },
    leftButtonTextStyle: {
        color: FontAndColor.COLORB0,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    rightButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});