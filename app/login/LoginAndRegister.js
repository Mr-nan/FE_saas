import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, Image} from "react-native";
import BaseComponent from "../component/BaseComponent";
import MyButton from "../component/MyButton";
import * as FontAndColor from "../constant/fontAndColor";
import LoginScene from "./LoginScene";
import Register from './Register';
import PixelUtil from "../utils/PixelUtil";
import LoginFailPwd from './LoginFailPwd';
import SetPwd from './SetPwd';
import LoginGesturePassword from './LoginGesture';

var Pixel = new PixelUtil();

export default class LoginAndRegister extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../../images/test.png')} style={styles.iconStyle}/>
                <MyButton buttonType={MyButton.TEXTBUTTON} content="登录" parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle} mOnPress={() => {
                    this.toNextPage({
                        name: 'LoginScene',
                        component: LoginScene,
                        params: {},
                    })
                }}/>
                <MyButton buttonType={MyButton.TEXTBUTTON} content="注册" parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle} mOnPress={() => {
                    this.toNextPage({
                        name: 'Register',
                        component: Register,
                        params: {},
                    })
                }}/>
                <MyButton buttonType={MyButton.TEXTBUTTON} content="修改密码" parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle} mOnPress={() => {
                    this.toNextPage({
                        name: 'SetPwd',
                        component: SetPwd,
                        params: {},
                    })
                }}/>
                <MyButton buttonType={MyButton.TEXTBUTTON} content="首次设置登录密码" parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle} mOnPress={() => {
                    this.toNextPage({
                        name: 'LoginFailPwd',
                        component: LoginFailPwd,
                        params: {},
                    })
                }}/>
                <MyButton buttonType={MyButton.TEXTBUTTON} content="手势密码" parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle} mOnPress={() => {
                    this.toNextPage({
                        name: 'LoginGesturePassword',
                        component: LoginGesturePassword,
                        params: {},
                    })
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F0F0F2'
    },
    fontStyle: {
        color: '#cc092f',
        alignSelf: 'center',
        fontSize: Pixel.getFontPixel(30),
        marginTop: Pixel.getPixel(50),
    },
    iconStyle: {
        height: Pixel.getPixel(100),
        width: Pixel.getPixel(100),
        resizeMode: 'cover',
        marginTop: Pixel.getPixel(150),
        marginBottom: Pixel.getPixel(30),

    },
    buttonStyle: {
        borderColor: FontAndColor.COLORA1,
        borderWidth: 1,
        width: Pixel.getPixel(200),
        height: Pixel.getPixel(35),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
    },
    buttonTextStyle: {
        fontSize: Pixel.getFontPixel(18),
    }
});