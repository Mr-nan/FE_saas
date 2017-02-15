import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, ScrollView} from "react-native";
import BaseComponent from "../component/BaseComponent";
import MyButton from "../component/MyButton";
import * as FontAndColor from "../constant/fontAndColor";
import LoginInputText from "./component/LoginInputText";
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
import NavigationBar from '../component/NavigationBar';

export default class Register extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageCallBack={this.backPage}
                    rightTextCallBack={() => {
                        alert("提交")
                    }}
                />
                <ScrollView>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="phone"
                            textPlaceholder={'输入手机号'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            rightButton={true}
                            rightIcon={false}
                            callBackSms={this.sendSms}
                            leftIcon={false}/>
                        <LoginInputText
                            ref="verifycode"
                            textPlaceholder={'输入短信验证码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="password"
                            textPlaceholder={'请输入密码'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}
                        />
                        <LoginInputText
                            ref="passwoedtwo"
                            textPlaceholder={'请再次输入密码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}
                        />
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="name"
                            textPlaceholder={'请输入姓名'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}
                        />
                        <LoginInputText
                            ref="businessName"
                            textPlaceholder={'请输入商家名称'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}
                        />
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.imageButtonsStyle}>
                        <Text style={{flex: 1, color: FontAndColor.COLORA1, fontSize: 14}}>添加身份证照片</Text>
                        <MyButton buttonType={MyButton.IMAGEBUTTON} content={require('../../images/login/idcard.png')}
                                  parentStyle={[styles.buttonStyle, {marginRight: 10}]}
                                  childStyle={styles.imageButtonStyle} mOnPress={() => {
                            alert("请上传身份证照片")
                        }}/>
                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={require('../../images/login/idcard_back.png')}
                                  parentStyle={styles.buttonStyle}
                                  childStyle={styles.imageButtonStyle} mOnPress={() => {
                            alert("请上传身份证照片")
                        }}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.imageButtonsStyle}>
                        <Text style={{flex: 1, color: FontAndColor.COLORA1, fontSize: 14}}>添加营业执照</Text>
                        <MyButton buttonType={MyButton.IMAGEBUTTON} content={require('../../images/login/idcard.png')}
                                  parentStyle={styles.buttonStyle}
                                  childStyle={styles.imageButtonStyle} mOnPress={() => {
                            alert("请上传营业执照")
                        }}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    sendSms = () => {
        alert("发送短信验证码");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3
    },
    buttonStyle: {},
    itemStyel: {},
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 1,
        paddingRight: 1,
    },
    inputTextLine: {
        backgroundColor: FontAndColor.COLORA3,
        height: 10,
        width: width,
    },
    imageButtonsStyle: {
        width: width,
        height: 88,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,

    },
    imageButtonStyle: {
        width: 80,
        height: 60,
    }
});