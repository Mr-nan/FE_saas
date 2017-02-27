import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import MyButton from "../component/MyButton";
import LoginInputText from "./component/LoginInputText";
import SetPwd from "./SetPwd";
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
export default class LoginFailPwd extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
        }
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            // this.Verifycode();
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={""}
                    centerText={"设置登录密码"}
                    rightText={""}
                />
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"设置登录密码"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}
                />
                <View style={{width: width, height: Pixel.getPixel(15)} }/>
                <LoginInputText
                    ref="phone"
                    textPlaceholder={'请输入手机号码'}
                    rightIcon={false}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                    keyboardType={'phone-pad'}
                    leftIconUri={require('./../../images/login/phone.png')}/>
                <View style={{width: width, height: Pixel.getPixel(10)} }/>
                <LoginInputText
                    ref="password"
                    textPlaceholder={'请设置BMS登录密码'}
                    rightIcon={false}
                    leftIcon={true}
                    leftIconUri={require('./../../images/login/password.png')}
                    viewStytle={styles.itemStyel}/>
                <LoginInputText
                    ref="passwordAgain"
                    textPlaceholder={'请再次输入密码'}
                    rightIcon={false}
                    leftIcon={true}
                    leftIconUri={require('./../../images/login/password.png')}
                    viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}/>
                <View style={{width: width, height: Pixel.getPixel(44)} }/>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确认'}
                          parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle}
                          mOnPress={this.setPwd}/>
            </View>
        );
    }

    rightTextCallBack = () => {
        this.toNextPage({
            name: 'SetPwd',
            component: SetPwd,
            params: {},
        })
    }

    //修改密码
    setPwd = () => {
        let phone = this.refs.phone.getInputTextValue();
        let newPassword = this.refs.password.getInputTextValue();
        let newPasswordAgain = this.refs.passwordAgain.getInputTextValue();
        if (typeof(phone) == "undefined" || phone == "") {
            this.props.showToast("手机号不能为空");
        } else if (typeof(newPassword) == "undefined" || newPassword == "") {
            this.props.showToast("新密码不能为空");
        } else if (typeof(newPasswordAgain) == "undefined" || newPasswordAgain == "") {
            this.props.showToast("再次确认密码不能为空");
        } else if (newPassword !== newPasswordAgain) {
            this.props.showToast("两次密码输入不一致");
        } else {
            let maps = {
                confirm_pwd: newPasswordAgain,
                pwd: newPassword,
            };
            request(AppUrls.SETPWD, 'Post', maps)
                .then((response) => {
                    if (response.mjson.code == "1") {
                        this.props.showToast("设置成功");
                    } else {
                        this.props.showToast(response.mjson.msg + "");
                    }
                }, (error) => {
                    this.props.showToast("设置失败");
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
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
});