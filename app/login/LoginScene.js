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
// import LoginFail from "./LoginFail";
import * as FontAndColor from "../constant/fontAndColor";
import Register from "./Register";
import NavigationBar from "../component/NavigationBar";
import PixelUtil from "../utils/PixelUtil";
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import ShowToast from "../component/toast/ShowToast";
import MyButton from "../component/MyButton";
import LoginFailSmsYes from './LoginFailSmsYes';
var Pixel = new PixelUtil();

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var onePT = 1 / PixelRatio.get(); //一个像素
var itemWidth = width;
var imgSrc: '';
var imgSid: '';
var smsCode: '';
var userNames = [];
export default class LoginScene extends BaseComponent {

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            show: false,
            value: "",
            verifyCode: null,
        }
    }

    initFinish = () => {
        StorageUtil.mGetItem(StorageKeyNames.USERNAME, (data) => {
            if (data.code === 1 && data.result != null) {
                userNames = data.result.split(",");
            }
        })
        this.Verifycode();
    }

    static defaultProps = {
        saveData: ["13001286215", "13001286216", "13001260002"],
    };

    render() {
        let views = [];
        if (userNames != null && userNames.length > 0) {
            for (let x in userNames) {
                views.push(
                    <Text
                        key={x}
                        style={styles.item}
                        onPress={this.hide.bind(this, userNames[x])}
                        numberOfLines={1}>
                        {userNames[x]}
                    </Text>
                );
                if (x > 3) {
                    break;
                }
            }
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
                            leftIconUri={ require('./../../images/login/virty.png')}
                            rightIconClick={this.Verifycode}
                            rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}
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
                                name: 'LoginFailSmsYes',
                                component: LoginFailSmsYes,
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

    //获取短信验证码
    Smscode = () => {
        let userName = this.refs.loginUsername.getInputTextValue();
        let verifyCode = this.refs.loginVerifycode.getInputTextValue();
        if (userName == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "请输入正确的用户名");
        } else if (typeof(verifyCode) == "undefined" || verifyCode == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "验证码不能为空");
        } else {
            let maps = {
                device_code: "dycd_dms_manage_android",
                img_code: verifyCode,
                img_sid: imgSid,
                phone: userName,
                type: "2",
            };
            request(AppUrls.SEND_SMS, 'Post', maps)
                .then((response) => {
                    if (response.mjson.code == "1") {
                        this.refs.loginSmscode.StartCountDown();
                        this.refs.toast.changeType(ShowToast.TOAST, response.mjson.data.code + "");
                    } else {
                        this.refs.toast.changeType(ShowToast.TOAST, response.mjson.msg + "");
                    }
                }, (error) => {
                    this.refs.toast.changeType(ShowToast.TOAST, "获取验证码失败");
                });
        }
    }

    //获取图形验证码
    Verifycode = () => {
        this.refs.loginVerifycode.lodingStatus(true);
        let maps = {
            device_code: "dycd_dms_manage_android",
        };
        request(AppUrls.IDENTIFYING, 'Post', maps)
            .then((response) => {
                this.refs.loginVerifycode.lodingStatus(false);
                imgSrc = response.mjson.data.img_src;
                imgSid = response.mjson.data.img_sid;

                this.setState({
                    verifyCode: {uri: imgSrc},
                });
            }, (error) => {
                this.refs.loginVerifycode.lodingStatus(false);
                this.refs.toast.changeType(ShowToast.TOAST, "获取失败");
            });
    }

    // 登录
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
                code: smsCode,
                device_code: "dycd_dms_manage_android",
                login_type: "2",
                phone: userName,
                pwd: passWord,
            };
            request(AppUrls.LOGIN, 'Post', maps)
                .then((response) => {
                    if (response.mjson.code == "1") {
                        this.refs.toast.changeType(ShowToast.TOAST, "登录成功");
                        // 保存用户登录状态
                        StorageUtil.mSetItem(StorageKeyNames.ISLOGIN, 'true');

                        StorageUtil.mGetItem(StorageKeyNames.USERNAME, (data) => {
                            if (data.code === 1) {
                                if (data.result != null && data.result.indexOf(userName) < 0) {
                                    StorageUtil.mSetItem(StorageKeyNames.USERNAME, userName + "," + data.result);
                                } else {
                                    StorageUtil.mSetItem(StorageKeyNames.USERNAME, userName);
                                }
                            }
                        })

                        StorageUtil.mSetItem(StorageKeyNames.USER_INFO, JSON.stringify(response.mjson.data));
                        // 保存用户信息
                        StorageUtil.mSetItem(StorageKeyNames.base_user_id, response.mjson.data.base_user_id + "");
                        StorageUtil.mSetItem(StorageKeyNames.enterprise_list, JSON.stringify(response.mjson.data.enterprise_list));
                        StorageUtil.mSetItem(StorageKeyNames.head_portrait_url, response.mjson.data.head_portrait_url + "");
                        StorageUtil.mSetItem(StorageKeyNames.idcard_number, response.mjson.data.idcard_number + "");
                        StorageUtil.mSetItem(StorageKeyNames.phone, response.mjson.data.phone + "");
                        StorageUtil.mSetItem(StorageKeyNames.real_name, response.mjson.data.real_name + "");
                        StorageUtil.mSetItem(StorageKeyNames.token, response.mjson.data.token + "");
                        StorageUtil.mSetItem(StorageKeyNames.user_level, response.mjson.data.user_level + "");
                    } else {
                        this.refs.toast.changeType(ShowToast.TOAST, response.mjson.msg + "");
                    }
                }, (error) => {
                    this.refs.toast.changeType(ShowToast.TOAST, "登录失败");
                    // 保存用户登录状态
                    StorageUtil.mSetItem(StorageKeyNames.ISLOGIN, 'false');
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
        borderWidth: onePT,
        borderColor: FontAndColor.COLORA4,
        position: 'absolute',
        width: itemWidth - Pixel.getPixel(30),
        top: Pixel.getPixel(44),
        left: Pixel.getPixel(15),
        backgroundColor: '#ffffff'
    },
    item: {
        fontSize: Pixel.getFontPixel(16),
        padding: Pixel.getPixel(5),
        paddingTop: Pixel.getPixel(10),
        paddingBottom: Pixel.getPixel(10),
        borderWidth: 0,
        borderColor: FontAndColor.COLORA4,
        borderBottomWidth: onePT,
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