import React, {Component} from "react";
import {AppRegistry, View, Text, TouchableOpacity, ListView, StyleSheet, Image, PixelRatio} from "react-native";
import BaseComponent from "../component/BaseComponent";
//import SGListView from 'react-native-sglistview';
import LoginInputText from "./component/LoginInputText";
import LoginAutoSearchInputText from "./component/LoginAutoSearchInputText";
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import LoginFail from "./LoginFail";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var onePT = 1 / PixelRatio.get(); //一个像素
var itemWidth = width * 1;
var loginTitleImage = height * 0.35;
import * as FontAndColor from "../constant/fontAndColor";

export default class LoginScene extends BaseComponent {

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            show: false,
            value: ""
        }
    }

    initFinish = () => {
    }

    static defaultProps = {
        saveData: ["aaaaaa", "bbbbbbb", "cccccccccc"],
    };

    render() {
        let views = [];
        for (let x in this.props.saveData) {
            views.push(
                <Text
                    key={x}
                    style={styles.item}
                    onPress={this.hide.bind(this, this.props.saveData[x])}
                    numberOfLines={1}>
                    { this.props.saveData[x]}
                </Text>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                    <Text style={styles.titleTextStyle}>取消</Text>
                    <Text style={styles.titleTextStyle}>登录</Text>
                    <Text style={styles.titleTextStyle}>注册</Text>
                </View>
                <View style={styles.inputTextSytle}>
                    <LoginAutoSearchInputText
                        ref="loginUsername"
                        searchBtShow={true}
                        inputPlaceholder={"请输入用户名"}
                        itemStyel={[styles.itemStyel]}
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
                        keyBoard={'phone-pad'}
                        leftIconUri={require('./../../images/login/password.png')}/>

                    <LoginInputText
                        ref="loginVerifycode"
                        textPlaceholder={'请输入验证码'}
                        viewStytle={styles.itemStyel}
                        leftIconUri={require('./../../images/login/virty.png')}
                        rightIconClick={this.Verifycode}
                        rightIconStyle={{width: 100, height: 32}}/>

                    <LoginInputText
                        ref="loginSmscode"
                        textPlaceholder={'请输入短信验证码'}
                        viewStytle={styles.itemStyel}
                        leftIconUri={require('./../../images/login/sms.png')}
                        rightIconClick={this.Smscode}
                        rightIconStyle={{width: 100, height: 32}}/>
                    {
                        //结果列表
                        this.state.show ?
                            <View style={[styles.result]}>
                                {views}
                            </View>
                            : null
                    }
                </View>
                <TouchableOpacity style={styles.loginBtnStyle} onPress={this.login}>
                    <Text style={{color: 'white', fontSize: 18}}>登录</Text>
                </TouchableOpacity>

                <View style={styles.settingStyle}>

                    <TouchableOpacity onPress={() => {
                        this.toNextPage({
                            name: 'LoginFail',
                            component: LoginFail,
                            params: {},
                        })
                    }}>
                        <Text style={styles.bottomTestSytle}>登录遇到问题></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

    //隐藏 用户名输入框的搜索结果
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

    login = () => {
        let maps = {
            useName: /*this.userName  */      this.refs.loginUsername.getInputTextValue(),
            passWord: /* this.passWord*/       this.refs.loginPassword.getInputTextValue(),
        };
        request(AppUrls.LOGIN, 'Post', maps)
            .then((response) => {
                    alert(response.mjson.retmsg);
                },
                (error) => {
                    alert(error);
                });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F0EFF5'
    },
    iconStyle: {
        height: loginTitleImage,
        resizeMode: 'cover'
    },
    loginBtnStyle: {
        height: 44,
        width: itemWidth - 20,
        backgroundColor: FontAndColor.COLORB0,
        marginTop: 30,
        marginBottom: 15,
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
        width: itemWidth - 20,
        top: 45,
        left: 10,

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
    inputTextSytle: {
        width: itemWidth,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
    titleStyle: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#05C5C2',
        paddingTop: 30
    },
    titleTextStyle: {
        flex: 1,
        textAlign: 'center',
    }
});