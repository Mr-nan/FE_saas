import React, {Component} from "react";
import {AppRegistry, View, Text, TouchableOpacity, ListView, StyleSheet, Image, PixelRatio} from "react-native";
import BaseComponent from "../component/BaseComponent";
//import SGListView from 'react-native-sglistview';
import LoginInputText from "./LoginInputText";
import LoginAutoSearchInputText from "./LoginAutoSearchInputText";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var onePT = 1 / PixelRatio.get(); //一个像素
var itemWidth = width * 0.88;
var loginTitleImage = height * 0.35;


export default class LoginScene extends BaseComponent {

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            show: false,
            value: ""
        }

        //初始化参数
        userName: '';
        passWord: '';
        verifyCode: '';
        smsCode: '';
    }

    static defaultProps = {
        saveData: ["aaaaaa", "bbbbbbb", "cccccccccc"],
    };

    initFinish = () => {

    }

    onPress = () => {
    }

    render() {
        let views = [];
        for (let x in this.props.saveData) {
            views.push(
                <Text
                    key={x}
                    style={styles.item}
                    onPress={this.hide.bind(this, this.state.value ? this.state.value : this.props.saveData[x])}
                    numberOfLines={1}
                >
                    {this.state.value ? this.state.value : this.props.saveData[x]}
                </Text>
            );
        }
        return (
            <View style={styles.container}>
                <Image source={require('./../../images/test.jpg')} style={styles.iconStyle}/>
                <View style={styles.width}>
                    <LoginAutoSearchInputText
                        ref="loginUsername"
                        searchBtShow={true}
                        inputPlaceholder={"请输入用户名"}
                        itemStyel={[styles.itemStyel, styles.width]}
                        callBackSearchResult={(isShow) => {
                            if (isShow) {
                                this.setState({
                                    show: true
                                });
                            } else {
                                this.setState({
                                    show: false
                                });
                            }
                        }}/>

                    <LoginInputText
                        ref="loginPassword"
                        textPlaceholder={'请输入密码'}
                        rightIcon={false}
                        viewStytle={styles.itemStyel}
                        keyBoard={'phone-pad'}/>

                    <LoginInputText
                        ref="loginVerifycode"
                        textPlaceholder={'请输入验证码'}
                        viewStytle={styles.itemStyel}
                        rightIconUri={require('./../../images/test.jpg')}
                        rightIconClick={this.Verifycode}/>

                    <LoginInputText
                        ref="loginSmscode"
                        textPlaceholder={'请输入短信验证码'}
                        viewStytle={styles.itemStyel}
                        rightIconUri={require('./../../images/test.jpg')}
                        rightIconClick={this.Smscode}/>

                    <TouchableOpacity style={styles.loginBtnStyle} onPress={() => {
                        alert(this.refs.loginPassword.getInputTextValue());
                    }}>
                        <Text style={{color: 'white', fontSize: 18}}>登录</Text>
                    </TouchableOpacity>

                    <View style={styles.settingStyle}>

                        <TouchableOpacity onPress={() => {
                            alert('登录遇到问题');
                        }}>
                            <Text style={styles.bottomTestSytle}>登录遇到问题></Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            alert('修改地址');
                        }}>
                            <Text style={styles.bottomTestSytle}>修改地址></Text>
                        </TouchableOpacity>

                    </View>

                    {
                        //结果列表
                        this.state.show ?
                            <View style={[styles.result]}>
                                {views}
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        );

    }

    //隐藏
    hide(val) {
        this.refs.loginUsername.setValue(val);
        this.setState({
            show: false,
            value: val
        });
    }

    Smscode = () => {
        alert("Smscode")
    }

    Verifycode = () => {
        this.refs.loginVerifycode.lodingStatus(true);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FEFDFB'
    },
    iconStyle: {
        height: loginTitleImage,
        resizeMode: 'cover'
    },
    loginBtnStyle: {
        height: 38,
        width: itemWidth,
        backgroundColor: '#C39849',
        marginTop: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    settingStyle: {
        flexDirection: 'column',
        width: itemWidth,
        alignItems: 'center'
    },
    itemStyel: {
        marginTop: 2,
        marginBottom: 2,
        paddingBottom: 1,

    },
    bottomTestSytle: {
        fontSize: 12,
        color: '#B6CAD5'
    },
    result: {
        borderColor: '#ccc',
        borderTopWidth: onePT,
        position: 'absolute',
        backgroundColor: "#000000",
        width: itemWidth - 32,
        top: 45,
        left: 31,

    },
    item: {
        fontSize: 16,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: onePT,
        borderColor: '#ddd',
        borderTopWidth: 0,
        backgroundColor: "#ffffff",
    },
    width: {
        width: itemWidth,
    }
});