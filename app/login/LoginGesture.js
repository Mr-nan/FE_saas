import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, Image} from "react-native";

import PasswordGesture from '../gesture/PwdGesture';
import BaseComponent from '../component/BaseComponent';
import PixelUtil from "../utils/PixelUtil";
import * as FontAndColor from "../constant/fontAndColor";

var Pixel = new PixelUtil();

var Password = '';
export default class LoginGesture extends BaseComponent {
    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            message: 'Please input your password.',
            status: 'normal'
        }
    }

    initFinish = () => {
    }

    render() {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                interval={1000}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
            />
        );
    }

    onEnd(pwd) {
        if (Password === '') {
            // The first password
            Password = pwd;
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            // The second password
            if (pwd === Password) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + pwd
                });
                Password = '';
                // your codes to close this view
                // this.toNextPage({
                //     name: 'Register',
                //     component: Register,
                //     params: {},
                // })
            } else {
                this.setState({
                    status: 'wrong',
                    message: 'Not the same, try again.'
                });
            }
        }
    }

    onStart() {
        if (Password === '') {
            this.setState({
                message: 'Please input your password.'
            });
        } else {
            this.setState({
                message: 'Please input your password secondly.'
            });
        }
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