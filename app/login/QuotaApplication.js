import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    InteractionManager,
    ScrollView,
    Image
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import LoginInputText from './component/LoginInputText';
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import MyButton from "../component/MyButton";
import RecognizedGains from './RecognizedGains';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var Platform = require('Platform');

var imgSrc: '';
var imgSid: '';

var itemWidth = width;

export default class QuotaApplication extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
        };
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.Verifycode();
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={"微众额度申请"}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.containerStyle}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"微众额度申请"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}
                />
                <ScrollView>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="user_name"
                            textPlaceholder={'请输入借款人'}
                            leftText={'借款人'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="id_card"
                            textPlaceholder={'请输入身份证号'}
                            leftText={'身份证号'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="phone"
                            textPlaceholder={'请输入联系电话'}
                            leftText={'联系电话'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="bank_id"
                            textPlaceholder={'请输入银行卡号'}
                            leftText={'银行卡号'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="bank_phone"
                            textPlaceholder={'请输入银行预留手机号'}
                            leftText={'银行预留手机号'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                    </View>
                    <Text style={{
                        color: FontAndColor.COLORA0,
                        paddingLeft: Pixel.getPixel(15),
                        paddingRight: Pixel.getPixel(15),
                        fontSize: Pixel.getPixel(FontAndColor.CONTENTFONT24),
                        paddingTop: Pixel.getPixel(10),
                        paddingBottom: Pixel.getPixel(10),
                    }}>注意：<Text style={{color: FontAndColor.COLORA1}}>请确保银行预留手机号码准确,短信验证码将发送给您银行银行预留手机号码。</Text></Text>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="verifycode"
                            textPlaceholder={'请输入验证码'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            keyboardType={'phone-pad'}
                            rightIconClick={this.Verifycode}
                            rightIconStyle={{width: Pixel.getPixel(100)}}
                            rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}/>
                        <LoginInputText
                            ref="smsCode"
                            textPlaceholder={'请输入短信验证码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            rightButton={true}
                            rightIcon={false}
                            callBackSms={this.sendSms}
                            keyboardType={'phone-pad'}
                            leftIcon={false}/>
                    </View>

                    <TouchableWithoutFeedback >
                        <View style={{
                            width: width,
                            paddingTop: Pixel.getPixel(15),
                            paddingBottom: Pixel.getPixel(15),
                            paddingLeft: Pixel.getPixel(15),
                            paddingRight: Pixel.getPixel(15),
                        }}>
                            <Text style={{fontSize: Pixel.getFontPixel(12), color: FontAndColor.COLORA2}}>
                                <Image style={{
                                    width: Pixel.getPixel(45),
                                    height: Pixel.getPixel(45),
                                }}
                                       source={require('./../../images/login/amou_choose.png')}/>
                                我已详细阅读并同意《信息使用授权书》 《微众银行个人电子账户服务协议》 《征信授权书》
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'确认申请'}
                              parentStyle={styles.loginBtnStyle}
                              childStyle={styles.loginButtonTextStyle}
                              mOnPress={() => {
                                  this.toNextPage({
                                      name: 'RecognizedGains',
                                      component: RecognizedGains,
                                      params: {},
                                  })
                              }}/>
                </ScrollView>
            </View>
        );
    }


    //获取图形验证码
    Verifycode = () => {
        this.refs.verifycode.lodingStatus(true);
        let device_code = '';
        if (Platform.OS === 'android') {
            device_code = 'dycd_platform_android';
        } else {
            device_code = 'dycd_platform_ios';
        }
        let maps = {
            device_code: device_code,
        };
        request(AppUrls.IDENTIFYING, 'Post', maps)
            .then((response) => {
                this.refs.verifycode.lodingStatus(false);
                imgSrc = response.mjson.data.img_src;
                imgSid = response.mjson.data.img_sid;

                this.setState({
                    verifyCode: {uri: imgSrc},
                });
            }, (error) => {
                this.refs.verifycode.lodingStatus(false);
                this.setState({
                    verifyCode: null,
                });
                if (error.mycode == -300 || error.mycode == -500) {
                    this.props.showToast("获取失败");
                } else {
                    this.props.showToast(error.mjson.msg + "");
                }
            });
    }

    //获取短信验证码
    sendSms = () => {
        let userName = this.refs.bank_phone.getInputTextValue();
        let verifyCode = this.refs.verifycode.getInputTextValue();
        if (typeof(verifyCode) == "undefined" || verifyCode == "") {
            this.props.showToast("验证码不能为空");
        } else if (typeof(userName) == "undefined" || userName == "") {
            this.props.showToast("请输入手机号");
        } else {
            let device_code = '';
            if (Platform.OS === 'android') {
                device_code = 'dycd_platform_android';
            } else {
                device_code = 'dycd_platform_ios';
            }
            let maps = {
                device_code: device_code,
                img_code: verifyCode,
                img_sid: imgSid,
                phone: userName,
                type: "1",
            };
            // this.props.showModal(true);
            this.setState({
                loading: true,
            });
            request(AppUrls.SEND_SMS, 'Post', maps)
                .then((response) => {
                    // this.props.showModal(false);
                    this.setState({
                        loading: false,
                    });
                    if (response.mjson.code == "1") {
                        this.refs.smsCode.StartCountDown();
                        // this.refs.smsCode.setInputTextValue(response.mjson.data.code + "");
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    // this.props.showModal(false);
                    this.setState({
                        loading: false,
                    });
                    this.Verifycode();
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("短信验证码获取失败");
                    } else if (error.mycode == 7040012) {
                        this.Verifycode();
                        this.props.showToast(error.mjson.msg + "");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                });
        }
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3
    },
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: FontAndColor.COLORA4,
    },
    itemStyel: {},
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
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
        alignSelf: 'center'
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});