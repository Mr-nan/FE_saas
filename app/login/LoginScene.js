import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    ListView,
    StyleSheet,
    Image,
    PixelRatio,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import LoginInputText from "./component/LoginInputText";
import LoginAutoSearchInputText from "./component/LoginAutoSearchInputText";
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import LoginFail from "./LoginFail";
import * as FontAndColor from "../constant/fontAndColor";
import Register from "./Register";
import NavigationBar from "../component/NavigationBar";
import PixelUtil from "../utils/PixelUtil";
import StorageUtil from "../utils/StorageUtil";
import * as ISLOGIN from "../constant/storageKeyNames";
import * as USER_INFO from "../constant/storageKeyNames";
import SAToast from '../component/toast/Toast';
import ShowToast from '../component/toast/ShowToast';
import MyButton from '../component/MyButton';
var Pixel = new PixelUtil();

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var onePT = 1 / PixelRatio.get(); //一个像素
var itemWidth = width;

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

            <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={styles.container}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={"取消"}
                        centerText={"登录"}
                        rightText={"注册"}
                        leftTextCallBack={this.backPage}
                        rightTextCallBack={() => {
                            this.toNextPage({
                                name: 'Register',
                                component: Register,
                                params: {},
                            })
                        }}
                    />


                    <View style={styles.inputTextSytle}>
                        <LoginAutoSearchInputText
                            ref="loginUsername"
                            searchBtShow={true}
                            inputPlaceholder={"请输入用户名"}
                            itemStyel={[styles.itemStyel]}
                            keyboardType={'phone-pad'}
                            clearValue={true}
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
                            secureTextEntry={true}
                            clearValue={true}
                            leftIconUri={require('./../../images/login/password.png')}/>

                        <LoginInputText
                            ref="loginVerifycode"
                            textPlaceholder={'请输入验证码'}
                            viewStytle={styles.itemStyel}
                            leftIconUri={require('./../../images/login/virty.png')}
                            rightIconClick={this.Verifycode}
                            rightIconStyle={{width: Pixel.getPixel(100), height: Pixel.getPixel(32)}}/>

                        <LoginInputText
                            ref="loginSmscode"
                            textPlaceholder={'请输入短信验证码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            leftIconUri={require('./../../images/login/sms.png')}
                            rightIcon={false}
                            rightButton={true}
                            callBackSms={this.Smscode}/>
                        {
                            //结果列表
                            this.state.show ?
                                <View style={[styles.result]}>
                                    {views}
                                </View>
                                : null
                        }
                    </View>
                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'登录'}
                              parentStyle={styles.loginBtnStyle}
                              childStyle={styles.loginButtonTextStyle}
                              mOnPress={this.login}/>

                    <View style={styles.settingStyle}>
                        <View style={{flex: 1}}></View>
                        <TouchableOpacity onPress={() => {
                            this.toNextPage({
                                name: 'LoginFail',
                                component: LoginFail,
                                params: {},
                            })
                        }}>
                            <Text style={styles.bottomTestSytle}>登录遇到问题 ></Text>
                        </TouchableOpacity>
                    </View>
                    <ShowToast ref='toast' msg={this.props.msg}></ShowToast>
                </View>
            </TouchableWithoutFeedback>
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
        let userName = this.refs.loginUsername.getInputTextValue();
        let passWord = this.refs.loginPassword.getInputTextValue();
        let verifyCode = this.refs.loginVerifycode.getInputTextValue();
        let smsCode = this.refs.loginSmscode.getInputTextValue();
        if (userName == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "请输入正确的用户名");
        } else if (typeof(passWord) == "undefined" || passWord == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "密码不能为空");
        } else if (typeof(verifyCode) == "undefined" || verifyCode == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "验证码不能为空");
        } else if (typeof(smsCode) == "undefined" || smsCode == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "短信验证码不能为空");
        } else {
            let maps = {
                useName: userName,
                passWord: passWord,
            };
            request(AppUrls.LOGIN, 'Post', maps)
                .then((response) => {
                    // console.log(response);
                    this.refs.toast.changeType(ShowToast.TOAST, "登录成功");
                    StorageUtil.mSetItem(ISLOGIN, 'true');
                    // StorageUtil.mSetItem(USER_INFO, response);
                }, (error) => {
                    // console.log(error);
                    this.refs.toast.changeType(ShowToast.TOAST, "登录失败");
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
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: itemWidth - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    settingStyle: {
        flexDirection: 'row',
        width: itemWidth,
    },
    itemStyel: {},
    bottomTestSytle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA2,
        marginRight: Pixel.getPixel(15),
    },
    result: {
        borderColor: '#ccc',
        borderTopWidth: onePT,
        position: 'absolute',
        backgroundColor: "#000000",
        width: itemWidth - Pixel.getPixel(30),
        top: Pixel.getPixel(44),
        left: Pixel.getPixel(15),

    },
    item: {
        fontSize: Pixel.getFontPixel(16),
        padding: Pixel.getPixel(5),
        paddingTop: Pixel.getPixel(10),
        paddingBottom: Pixel.getPixel(10),
        borderWidth: onePT,
        borderColor: '#ddd',
        borderTopWidth: 0,
        backgroundColor: "#ffffff",
    },
    inputTextSytle: {
        width: itemWidth,
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(15),
        paddingBottom: 0,
    },
});