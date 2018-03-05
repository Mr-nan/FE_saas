import React, {Component} from "react";
import {
	AppRegistry,
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	InteractionManager,
	KeyboardAvoidingView,
	TouchableOpacity,
	NativeModules,
	NativeAppEventEmitter,
	Image,
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import * as FontAndColor from "../../constant/fontAndColor";
import LoginInputTextYU  from "../../login/component/LoginInputTextYU"


import NavigationBar from "../../component/NavigationBar";
import PixelUtil from "../../utils/PixelUtil";

import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";
import md5 from "react-native-md5";
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();

let imgSrc: '';
let imgSid: '';
let uid: '';

const dismissKeyboard = require('dismissKeyboard');
const agree_icon = require('../kuaisushouxin/kuaisushouxin_images/agree_icon.png');
const disagree = require('../kuaisushouxin/kuaisushouxin_images/disagree.png');

var Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';

export default class Authentication extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {

			businessLicense: null,
			verifyCode: null,
			renderPlaceholderOnly: true,
			keyboardOffset: -Pixel.getPixel(100),
			isAgree: false,

		}
		this.id;
		this.timer = null;
		this.locateDate = {
			address: '',
			city_id: '',
			city_name: '',
			street_name: '',
			province_name: '',
			area_name: '',
		}

	}

	initFinish = () => {
		InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: false});
			//获取图形验证码
			this.Verifycode();
			//拿到当前位置的定位
			this.getCurrentLocation();
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
						rightText={""}
					    centerText={'身份验证'}
					/>
				</View>
			</TouchableWithoutFeedback>);
		}
		return (
			<TouchableWithoutFeedback onPress={() => {
                dismissKeyboard();
            }}>
				<View style={styles.container}>

					<NavigationBar
						leftImageCallBack={this.backPage}
						rightText={""}
						centerText={'身份验证'}
					/>
					{
						IS_ANDROID ? (this.loadScrollView()) : (
								<KeyboardAvoidingView behavior={'position'}
								                      keyboardVerticalOffset={this.state.keyboardOffset}>
									{
										this.loadScrollView()
									}
								</KeyboardAvoidingView>
							)
					}

					{this.loadingView()}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	/*
	 * 主界面
	 * */
	loadScrollView = () => {
		return (
			<ScrollView keyboardShouldPersistTaps={'handled'}>

				<View style={styles.inputTextLine}/>
				<View style={styles.inputTextsStyle}>
					<LoginInputTextYU
						editable={false}
						ref="BorrowerName"
						leftText = {'借款人姓名'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={false}
						import={false}
						defaultValue={'zhangqilong'}
						rightIcon={false}/>
					<LoginInputTextYU
						editable={false}
						ref="BorrowerID"
						leftText = {'借款人身份证号'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0,}]}
						inputTextStyle={styles.inputTextStyle}
						secureTextEntry={false}
						clearValue={false}
						leftIcon={false}
						import={false}
						defaultValue={'zhangqilong'}
						maxLength={18}//身份证限制18位或者15位
						rightIcon={false}/>

				</View>
				<View style={styles.inputTextLine}/>


				<View style={styles.inputTextsStyle}>
					<LoginInputTextYU
						ref="BorrowerBankNO"
						leftText = {'借款人银行卡号'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={true}
						import={false}
						keyboardType={'phone-pad'}
						rightIcon={false}/>
					<LoginInputTextYU
						ref="BankPhone"
						leftText = {'银行预留手机号'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						keyboardType={'phone-pad'}
						maxLength={11}
						leftIcon={false}
						clearValue={true}
						import={false}
						rightIcon={false}
					/>
					<LoginInputTextYU
						ref="verifycode"
						leftText = {'图形验证码'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						import={false}
						keyboardType={'phone-pad'}
						rightIconClick={this.Verifycode}
						rightIconStyle={{width: Pixel.getPixel(100)}}
						rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}/>
					<LoginInputTextYU
						ref="smsCode"
						leftText = {'手机验证码'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
						inputTextStyle={styles.inputTextStyle}
						rightButton={true}
						rightIcon={false}
						import={false}
						callBackSms={this.sendSms}
						keyboardType={'phone-pad'}
						leftIcon={false}/>
				</View>
				<View style={styles.inputTextLine}/>

				<View style={styles.inputTextsStyle}>
					<LoginInputTextYU
						ref="BorrowerPhone"
						leftText = {'借款人手机号'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						import={false}
						defaultValue={'zhangqilong'}
						clearValue={true}
						keyboardType={'phone-pad'}
						maxLength={11}//手机号限制11位
						rightIcon={false}/>
				</View>
				<View style={styles.inputTextLine}/>

				{/*===============================授信协议===========================*/}

				<View style={{alignItems: 'center', flexDirection: 'row',marginTop: Pixel.getPixel(10),}}>
					<TouchableOpacity activeOpacity={1} onPress={() => {
                        this.setState({
                            isAgree: !this.state.isAgree
                        });
                    }}>
						<View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: Pixel.getPixel(15)
                        }}>
							<Image source={this.state.isAgree ? agree_icon : disagree}
							       style={{marginRight: Pixel.getPixel(3)}}>

							</Image>
							<Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getPixel(12)}}>我已阅读并同意授权</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.8} onPress={() => {
                        this.toNextPage({
                                         name: 'WebScene',
                                         component: WebScene,
                                         params: {webUrl: 'http://www.dycd.com'}
                            })
                    }}>
						<Text style={{color: FontAndColor.COLORB4, fontSize: Pixel.getPixel(12),}}>《三方征信授权书》</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.imagebuttonok}>

					<TouchableOpacity onPress={() => { this.register()}} activeOpacity= {this.state.isAgree? 0.7 : 1} style={{
                                marginTop: Pixel.getPixel(7),
                                width: width - Pixel.getPixel(30),
                                height: Pixel.getPixel(44),
                                backgroundColor: this.state.isAgree? FontAndColor.COLORB0 : FontAndColor.COLORA4,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
						<Text allowFontScaling={false} style={{
                                    color: '#fff',
                                    fontSize: Pixel.getPixel(FontAndColor.LITTLEFONT28)
                                }}>下一步</Text>
					</TouchableOpacity>

				</View>
			</ScrollView>
		)
	}
	register = () => {
		if(!this.state.isAgree){
			return;
		}

		let BorrowerBankNO = this.refs.BorrowerBankNO.getInputTextValue();//借款人银行卡号
		let BankPhone = this.refs.BankPhone.getInputTextValue();          //银行预留手机号
		let verifycode = this.refs.verifycode.getInputTextValue();        //图形验证码
		let smsCode = this.refs.smsCode.getInputTextValue();              //手机验证码
		let BorrowerPhone = this.refs.BorrowerPhone.getInputTextValue();  //借款人手机号
		if (typeof(userName) == "undefined" || userName == "") {
			this.props.showToast("手机号码不能为空");
		} else if (userName.length != 11) {
			this.props.showToast("请输入正确的手机号");
		} else if (typeof(smsCode) == "undefined" || smsCode == "") {
			this.props.showToast("验证码不能为空");
		} else if (typeof(password) == "undefined" || password == "") {
			this.props.showToast("密码不能为空");
		} else if (typeof(password) == "undefined" || password == "") {
			this.props.showToast("密码不能为空");
		} else if (passwoedAgain.length < 6) {
			this.props.showToast("密码必须为6~16位");
		} else if (typeof(name) == "undefined" || name == "") {
			this.props.showToast("用户名不能为空");
		} else if (typeof(businessName) == "undefined" || businessName == "") {
			this.props.showToast("商家名称不能为空");
		} else if (password !== passwoedAgain) {
			this.props.showToast("两次密码输入不一致");
		}

		else {
			let device_code = '';
			if (Platform.OS === 'android') {
				device_code = 'dycd_platform_android';
			} else {
				device_code = 'dycd_platform_ios';
			}


			let maps = {
				device_code: device_code,
				user_name: name,
				phone: userName,
				pwd: md5.hex_md5(password),
				confirm_pwd: md5.hex_md5(passwoedAgain),
				merchant_name: businessName,
				code: smsCode,

				address: this.locateDate.address,
				city_id: this.locateDate.city_id,
				city_name: this.locateDate.city_name,
				street_name: this.locateDate.street_name,
				province_name: this.locateDate.province_name,
				area_name: this.locateDate.area_name,
			};
			this.setState({
				loading: true,
			});
			request(AppUrls.ZHUCE, 'Post', maps)
				.then((response) => {
					this.setState({
						loading: false,
					});
					if (response.mycode == "1") {
						uid = response.mjson.data.uid;
						this.props.showToast("注册成功");
						// this.exitPage({name: 'LoginAndRegister', component: LoginAndRegister});
					} else {
						this.props.showToast(response.mjson.msg + "");
					}
				}, (error) => {
					this.setState({
						loading: false,
					});
					if (error.mycode == -300 || error.mycode == -500) {
						this.props.showToast("注册失败");
					} else if (error.mycode == 7040004) {
						this.Verifycode();
						this.props.showToast(error.mjson.msg + "");
					} else {
						this.props.showToast(error.mjson.msg + "");
					}
				});
		}
	}


	exitPage = (mProps) => {
		const navigator = this.props.navigator;
		if (navigator) {
			navigator.immediatelyResetRouteStack([{
				...mProps
			}])
		}
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


	//拿到当前位置的定位
	getCurrentLocation = () => {
		if (Platform.OS === 'android') {
			NativeModules.QrScan.lbsStart();
			NativeAppEventEmitter
				.addListener('onReceiveBDLocation', (loc) => {
					console.log(loc);
					this.locateDate.address = loc.addr;
					this.locateDate.city_id = loc.city_code;
					this.locateDate.city_name = loc.city;
					this.locateDate.street_name = loc.street;
					this.locateDate.province_name = loc.province;
					this.locateDate.area_name = loc.district;
				});
		} else {
			NativeModules.Location.Location().then((vl) => {
				console.log(vl.address);
				this.locateDate.address = vl.address;
				this.locateDate.city_id = vl.city_id;
				this.locateDate.city_name = vl.city_name;
				this.locateDate.street_name = vl.street_name;
				this.locateDate.province_name = vl.province_name;
				this.locateDate.area_name = vl.area_name;


			}, (error) => {
				console.log("没有获取到定位");

			});
		}
	}

	componentWillUnmount = () => {

	}

	//获取短信验证码
	sendSms = () => {
		let userName = this.refs.userName.getInputTextValue();
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
					} else {
						this.props.showToast(response.mjson.msg);
					}
				}, (error) => {
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
	container: {
		flex: 1,
		backgroundColor: FontAndColor.COLORA3
	},
	buttonStyle: {
		marginTop: Pixel.getPixel(10),
		marginBottom: Pixel.getPixel(10),
		marginLeft: Pixel.getPixel(10),
	},
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
		margin: 0,
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
		resizeMode: 'contain'
	},
	imageClearButtonStyle: {
		width: Pixel.getPixel(17),
		height: Pixel.getPixel(17),
	},
	imagebuttonok: {
		width: width,
		backgroundColor: FontAndColor.COLORA3,
		height: Pixel.getPixel(130),
		paddingLeft: Pixel.getPixel(15),
		paddingRight: Pixel.getPixel(15),
		paddingTop: Pixel.getPixel(25)
	}
});