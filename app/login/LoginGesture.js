import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from "react-native";
import PwdGesture from "../gesture/PwdGesture";
import BaseComponent from "../component/BaseComponent";
import PixelUtil from "../utils/PixelUtil";
import * as FontAndColor from "../constant/fontAndColor";
import NavigationBar from '../component/NavigationBar';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";

var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

var Password = '';
export default class GesturePassword extends BaseComponent {
    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            message: '请绘制手势密码',
            status: 'normal'
        }
    }

    initFinish = () => {
        StorageUtil.mGetItem(StorageKeyNames.GESTURE, (data) => {
            if (data.code === 1) {
                Password = data.result;
            }
        })
    }

    render() {
        return (
            <PwdGesture
                ref='pg'
                NavigationBar={
                    <View style={styles.topStyle}>
                        <NavigationBar
                            leftImageShow={true}
                            leftTextShow={false}
                            centerText={"解锁手势密码"}
                            rightText={""}
                            leftImage={require('./../../images/login/left_cancel.png')}
                            leftImageCallBack={this.backPage}/>

                        <Image style={styles.avatarStyle} source={require("./../../images/login/clear.png")}/>

                        <Text style={ styles.topMessageStyle }>
                            用户名：1234567890
                        </Text>

                        <Text style={this.state.status !== "wrong" ? styles.topMessageStyle : styles.topMessageWStyle}>
                            {this.state.message}
                        </Text>
                    </View>
                }
                Bottom={
                    <View style={{marginTop: Height / 2 * 0.95, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {
                            this.toNextPage({
                                name: 'LoginFailSmsYes',
                                component: null,
                                params: {},
                            })
                        }}>
                            <Text style={styles.bottomLeftSytle}>忘记手势密码？</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={() => {
                            this.toNextPage({
                                name: 'LoginFailSmsYes',
                                component: null,
                                params: {},
                            })
                        }}>
                            <Text style={styles.bottomRightSytle}>切换登录</Text>
                        </TouchableOpacity>
                    </View>
                }
                status={this.state.status}
                message={this.state.message}
                style={styles.gestureStyle}
                interval={500}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}/>
        );
    }

    onEnd(pwd) {
        if (pwd === Password) {
            this.setState({
                status: 'right',
                message: '验证成功',
            });

        } else {
            this.setState({
                status: 'wrong',
                message: '密码输入错误'
            });
        }
    }

    onStart() {
        this.setState({
            status: 'normal',
            message: '请绘制手势密码',
        });
    }
}

const styles = StyleSheet.create({
    gestureStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    topStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Width,
        paddingBottom: Pixel.getPixel(60),
    },
    topMessageStyle: {
        fontSize: Pixel.getFontPixel(17),
        color: FontAndColor.COLORA0,
    },
    topMessageWStyle: {
        fontSize: Pixel.getFontPixel(17),
        color: FontAndColor.COLORB2,
    },
    avatarStyle: {
        width: Pixel.getPixel(65),
        height: Pixel.getPixel(65),
        marginTop: Pixel.getPixel(20),
        marginBottom: Pixel.getPixel(37),
    },
    bottomLeftSytle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA2,
        marginLeft: Pixel.getPixel(15),
    },
    bottomRightSytle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA2,
        marginRight: Pixel.getPixel(15),
    },
});