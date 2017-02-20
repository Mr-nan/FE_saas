import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, ScrollView} from "react-native";
import BaseComponent from "../component/BaseComponent";
import MyButton from "../component/MyButton";
import * as FontAndColor from "../constant/fontAndColor";
import LoginInputText from "./component/LoginInputText";
import NavigationBar from "../component/NavigationBar";
import PixelUtil from "../utils/PixelUtil";
import ImagePicker from "react-native-image-picker";
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import ShowToast from "../component/toast/ShowToast";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

var imgSrc: '';
var imgSid: '';
var smsCode: '';
export default class Register extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            idcard: null,
            idcardBack: null,
            businessLicense: null,
            verifyCode: null,
        }
    }

    initFinish = () => {
        this.Verifycode();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageCallBack={this.backPage}
                    rightTextCallBack={this.register}
                />
                <ScrollView>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="verifycode"
                            textPlaceholder={'请输入验证码'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIconClick={this.Verifycode}
                            rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}/>
                        <LoginInputText
                            ref="userName"
                            textPlaceholder={'输入手机号'}
                            viewStytle={[styles.itemStyel, {marginBottom: 1}]}
                            inputTextStyle={styles.inputTextStyle}
                            rightButton={true}
                            rightIcon={false}
                            callBackSms={this.sendSms}
                            keyboardType={'phone-pad'}
                            leftIcon={false}/>
                        <LoginInputText
                            ref="smsCode"
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
                            secureTextEntry={true}
                            leftIcon={false}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="passwoedAgain"
                            textPlaceholder={'请再次输入密码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            secureTextEntry={true}
                            leftIcon={false}
                            rightIcon={false}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="name"
                            textPlaceholder={'请输入姓名'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="businessName"
                            textPlaceholder={'请输入商家名称'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            rightIcon={false}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.imageButtonsStyle}>
                        <Text
                            style={{
                                flex: 1,
                                color: FontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                            }}>添加身份证照片</Text>
                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={this.state.idcard === null ?
                                      require('../../images/login/idcard.png') : this.state.idcard
                                  }
                                  parentStyle={[styles.buttonStyle, {marginRight: Pixel.getPixel(10)}]}
                                  childStyle={styles.imageButtonStyle}
                                  mOnPress={this.selectPhotoTapped.bind(this, 'idcard')}/>

                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={this.state.idcardBack === null ?
                                      require('../../images/login/idcard_back.png') : this.state.idcardBack
                                  }
                                  parentStyle={styles.buttonStyle}
                                  childStyle={styles.imageButtonStyle}
                                  mOnPress={this.selectPhotoTapped.bind(this, 'idcardBack')}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.imageButtonsStyle}>
                        <Text style={{
                            flex: 1,
                            color: FontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                        }}>添加营业执照</Text>
                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={this.state.businessLicense === null ?
                                      require('../../images/login/idcard.png') : this.state.businessLicense
                                  }
                                  parentStyle={styles.buttonStyle}
                                  childStyle={styles.imageButtonStyle}
                                  mOnPress={this.selectPhotoTapped.bind(this, 'businessLicense')}/>
                    </View>
                    <ShowToast ref='toast' msg={this.props.msg}></ShowToast>
                </ScrollView>
            </View>
        );
    }

    register = () => {

        let userName = this.refs.userName.getInputTextValue();
        let smsCode = this.refs.smsCode.getInputTextValue();
        let password = this.refs.password.getInputTextValue();
        let passwoedAgain = this.refs.passwoedAgain.getInputTextValue();
        let name = this.refs.name.getInputTextValue();
        let businessName = this.refs.businessName.getInputTextValue();

        if (typeof(userName) == "undefined" || userName == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "手机号码不能为空");
        } else if (typeof(smsCode) == "undefined" || smsCode == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "验证码不能为空");
        } else if (typeof(password) == "undefined" || password == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "密码不能为空");
        } else if (typeof(passwoedAgain) == "undefined" || passwoedAgain == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "确认密码不能为空");
        } else if (typeof(name) == "undefined" || name == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "用户名不能为空");
        } else if (typeof(businessName) == "undefined" || businessName == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "商家名称不能为空");
        } else if (password !== passwoedAgain) {
            this.refs.toast.changeType(ShowToast.TOAST, "两次密码输入不一致");
        } else {
            let maps = {
                user_name: name,
                phone: userName,
                pwd: password,
                confirm_pwd: passwoedAgain,
                merchant_name: businessName,
                code: smsCode,
                device_code: "dycd_dms_manage_android",
                idcard_img: "2345678987654345678876",
                license_img: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
            };
            request(AppUrls.REGISTER, 'Post', maps)
                .then((response) => {
                    smsCode = response.mjson.msg;
                    this.refs.toast.changeType(ShowToast.TOAST, smsCode);
                }, (error) => {
                    this.refs.toast.changeType(ShowToast.TOAST, "注册失败");
                });
        }
    }

    //获取图形验证码
    Verifycode = () => {
        this.refs.verifycode.lodingStatus(true);
        let maps = {
            device_code: "dycd_dms_manage_android",
        };
        request(AppUrls.IDENTIFYING + "?" + "device_code=dycd_dms_manage_android", 'Post', maps)
            .then((response) => {
                this.refs.verifycode.lodingStatus(false);
                imgSrc = response.mjson.data.img_src;
                imgSid = response.mjson.data.img_sid;

                this.setState({
                    verifyCode: {uri: imgSrc},
                });
            }, (error) => {
                this.refs.verifycode.lodingStatus(false);
                this.refs.toast.changeType(ShowToast.TOAST, "获取失败");
            });
    }

    //获取短信验证码
    sendSms = () => {
        let userName = this.refs.userName.getInputTextValue();
        let verifyCode = this.refs.verifycode.getInputTextValue();
        if (typeof(verifyCode) == "undefined" || verifyCode == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "验证码不能为空");
        } else if (typeof(userName) == "undefined" || userName == "") {
            this.refs.toast.changeType(ShowToast.TOAST, "请输入手机号");
        } else {
            this.refs.userName.StartCountDown();
            let maps = {
                device_code: "dycd_dms_manage_android",
                img_code: verifyCode,
                img_sid: imgSid,
                phone: userName,
                type: "1",
            };
            request(AppUrls.SEND_SMS, 'Post', maps)
                .then((response) => {
                    smsCode = response.mjson.data.code;
                    alert("获取短信验证码成功" + smsCode)
                }, (error) => {
                    alert("获取短信验证码失败")
                });
        }
    }

    selectPhotoTapped(id) {
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: true,
            noData: true,
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                if (id === 'idcard') {
                    this.setState({
                        idcard: source
                    });
                } else if (id === 'idcardBack') {
                    this.setState({
                        idcardBack: source
                    });
                } else if (id === 'businessLicense') {
                    this.setState({
                        businessLicense: source
                    });
                }
                this.imageUploadUtil(response);
            }
        });
    }

    imageUploadUtil(name) {
        let maps = {
            device_code: "dycd_dms_manage_android",
            name: name,
            user_id: "13001286215",
        };
        request(AppUrls.UPLOAD_FILE, 'Post', maps)
            .then((response) => {
                // smsCode = response.mjson.data.code;
                alert("图片上传成那个" + response.mjson.toString())
            }, (error) => {
                alert("图片上传失败")
            });
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
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
    },
    inputTextLine: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    imageButtonsStyle: {
        width: width,
        height: Pixel.getPixel(88),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),

    },
    imageButtonStyle: {
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(60),
    }
});