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
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import ShowToast from "../component/toast/ShowToast";

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
                          mOnPress={this.setPwd}/>
                <ShowToast ref='toast' msg={this.props.msg}></ShowToast>
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

    //修改密码
    setPwd = () => {
        let oldPassword = this.refs.oldPassword.getInputTextValue();
        let newPassword = this.refs.newPassword.getInputTextValue();
        let newPasswordAgain = this.refs.newPasswordAgain.getInputTextValue();
        if (typeof(oldPassword) == "undefined" || oldPassword == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "原密码不能为空");
        } else if (typeof(newPassword) == "undefined" || newPassword == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "新密码不能为空");
        } else if (typeof(newPasswordAgain) == "undefined" || newPasswordAgain == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "再次确认密码不能为空");
        } else if (newPassword !== newPasswordAgain) {
            this.refs.toast.changeType(ShowToast.TOAST, "两次密码输入不一致");
        } else {
            let maps = {
                confirm_pwd: oldPassword,
                pwd: newPassword,
            };
            request(AppUrls.IDENTIFYING, 'Post', maps)
                .then((response) => {
                    if (response.mjson.code == "1") {
                        this.refs.toast.changeType(ShowToast.TOAST, "设置成功");
                    } else {
                        this.refs.toast.changeType(ShowToast.TOAST, response.mjson.data.msg);
                    }
                }, (error) => {
                    this.refs.toast.changeType(ShowToast.TOAST, "设置失败");
                });
        }
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