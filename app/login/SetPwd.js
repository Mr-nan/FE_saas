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
export default class LoginFail extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={"取消"}
                    centerText={"登录遇到问题"}
                    rightText={"  "}
                    leftTextCallBack={this.backPage}
                />
                <Text style={styles.fontStyle}>
                    LoginFail
                </Text>

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
            name: 'Register',
            component: LoginFail,
            params: {},
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    fontStyle: {
        color: '#cc092f',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 50,
        flex: 1,
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