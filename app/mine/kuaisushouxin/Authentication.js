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
import {BASEURL}  from '../../constant/appUrls';
import NavigationBar from "../../component/NavigationBar";
import PixelUtil from "../../utils/PixelUtil";

import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";
import FastCreditOne from "./FastCreditOne";
import NewCarCreditEnterpriseInfoCheck from "./NewCarCreditEnterpriseInfoCheck";
import WebScene from "../../main/WebSceneYU";
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

	}

	initFinish = () => {

		InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: false});

			if (this.isNull(this.props.DATA.borrower_cardid))//没有获取到身份证号码
			{
				console.log('00000000000000000000');

				if (Platform.OS === 'android') {
					device_code = 'dycd_platform_android';
				} else {
					device_code = 'dycd_platform_ios';
				}
				let maps = {
					device_code: device_code,
				};
				request(AppUrls.USER_GETINFO, 'Post', maps)
					.then((response) => {
						this.idcard_number = response.mjson.data.idcard_number;

						this.refs.BorrowerID.setInputTextValue(this.idcard_number);
						//获取图形验证码
						this.Verifycode();
					}, (error) => {
						this.props.showToast(error.mjson.msg + "");
					});

			} else {

				this.idcard_number = this.props.DATA.borrower_cardid;
				this.refs.BorrowerID.setInputTextValue(this.idcard_number);

				//获取图形验证码
				this.Verifycode();
			}


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
						leftText={'借款人姓名'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={false}
						import={false}
						defaultValue={this.props.DATA.borrower_name}
						rightIcon={false}/>
					<LoginInputTextYU
						editable={false}
						ref="BorrowerID"
						leftText={'借款人身份证号'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0,}]}
						inputTextStyle={styles.inputTextStyle}
						secureTextEntry={false}
						clearValue={false}
						leftIcon={false}
						import={false}
						defaultValue={this.idcard_number}
						rightIcon={false}/>

				</View>
				<View style={styles.inputTextLine}/>


				<View style={styles.inputTextsStyle}>
					<LoginInputTextYU
						ref="BorrowerBankNO"
						leftText={'借款人银行卡号'}
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
						leftText={'银行预留手机号'}
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
						leftText={'图形验证码'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						import={false}
						keyboardType={'phone-pad'}
						rightIconClick={this.Verifycode}
						rightIconStyle={{width: Pixel.getPixel(100)}}
						rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}/>
					{/*<LoginInputTextYU*/}
					{/*ref="smsCode"*/}
					{/*leftText = {'手机验证码'}*/}
					{/*textPlaceholder={'请输入'}*/}
					{/*viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}*/}
					{/*inputTextStyle={styles.inputTextStyle}*/}
					{/*rightButton={true}*/}
					{/*rightIcon={false}*/}
					{/*import={false}*/}
					{/*callBackSms={this.sendSms}*/}
					{/*keyboardType={'phone-pad'}*/}
					{/*leftIcon={false}/>*/}
				</View>
				<View style={styles.inputTextLine}/>

				<View style={styles.inputTextsStyle}>
					<LoginInputTextYU
						ref="BorrowerPhone"
						leftText={'借款人手机号'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						import={false}
						defaultValue={this.props.DATA.borrower_tel}
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
						let url = BASEURL== 'https://gatewayapi.dycd.com/'?
						'http://dms.dycd.com/Uploads/agreement/kuaisushouxin_xieyi.html'
						:'http://test.dms.dycd.com/Uploads/agreement/kuaisushouxin_xieyi.html';

                        this.toNextPage({
                                         name: 'WebScene',
                                         component: WebScene,
                                         params: {webUrl: url}
                            })
                    }}>
						<Text style={{color: FontAndColor.COLORB4, fontSize: Pixel.getPixel(12),}}>《三方征信授权书》</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.imagebuttonok}>

					<TouchableOpacity onPress={() => { this.register()}} activeOpacity={this.state.isAgree? 0.7 : 1}
					                  style={{
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
		if (!this.state.isAgree) {
			return;
		}

		let BorrowerBankNO = this.refs.BorrowerBankNO.getInputTextValue();//借款人银行卡号
		let BankPhone = this.refs.BankPhone.getInputTextValue();          //银行预留手机号
		let BorrowerPhone = this.refs.BorrowerPhone.getInputTextValue();  //借款人手机号

		let verifycode = this.refs.verifycode.getInputTextValue();        //图形验证码
		// let smsCode = this.refs.smsCode.getInputTextValue();              //手机验证码
		/**
		 *
		 borrower_bank    借款人银行卡号        【必填】
		 borrower_bank_phone    银行预留手机号        【必填】
		 borrower_base_id    借款人服务平台base_id        【必填】
		 borrower_cardid    借款人身份证号        【必填】
		 borrower_name    借款人姓名        【必填】
		 borrower_phone    借款人手机号        【必填】
		 *
		 **/


		if (typeof(BorrowerBankNO) == "undefined" || BorrowerBankNO == "") {
			this.props.showToast("请输入借款人银行卡号");
		}
		else if (typeof(BankPhone) == "undefined" || BankPhone == "") {
			this.props.showToast("银行预留手机号不能为空");
		}
		else if (BankPhone.length != 11) {
			this.props.showToast("请输入正确的银行预留手机号");
		}
		else if (typeof(verifycode) == "undefined" || verifycode == "") {
			this.props.showToast("图形验证码不能为空");
		}
		else if (typeof(BorrowerPhone) == "undefined" || BorrowerPhone == "") {
			this.props.showToast("借款人手机号不能为空");
		}
		else if (BorrowerPhone.length != 11) {
			this.props.showToast("请输入正确的银行预留手机号");
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
				borrower_bank: BorrowerBankNO,
				borrower_bank_phone: BankPhone,
				borrower_base_id: global.companyBaseID,
				borrower_cardid: this.idcard_number,
				borrower_phone: BorrowerPhone,
				borrower_name: this.props.DATA.borrower_name,


			};
			this.setState({
				loading: true,
			});
			request(AppUrls.CHECKCAPTCHA, 'Post', {img_code: verifycode, img_sid: imgSid})
				.then((response11) => {
						if (response11.mjson.data.check_result == 1) {//验证验证码成功
							request(AppUrls.APPLYCHECKFOUR, 'Post', maps)//申请验四
								.then((response) => {

									this.setState({
										loading: false,
									});
									if (response.mjson.data.fourElementCheckFlags == "T") {//申请验四通过
										if (this.props.FromScene == 'kuaisuANDfinance') {
											this.toNextPage({
												name: 'FastCreditOne',
												component: FastCreditOne,
												params: {
													FromScene: 'kuaisuANDfinance',
													callBackRefresh: this.props.callBackRefresh,

												},
											})
										} else if (this.props.FromScene == 'xinchedingdanANDfinance') {
											this.toNextPage({
												name: 'NewCarCreditEnterpriseInfoCheck',
												component: NewCarCreditEnterpriseInfoCheck,
												params: {
													FromScene: 'xinchedingdanANDfinance',
													callBackRefresh: this.props.callBackRefresh,

												},
											})
										} else if (this.props.FromScene == 'xinchedingdanANDmine') {
											this.toNextPage({
												name: 'NewCarCreditEnterpriseInfoCheck',
												component: NewCarCreditEnterpriseInfoCheck,
												params: {
													FromScene: 'xinchedingdanANDmine',
													// callBackRefresh:this.props.callBackRefresh,

												},
											})
										} else if (this.props.FromScene == 'kuaisuANDmine') {
											this.toNextPage({
												name: 'FastCreditOne',
												component: FastCreditOne,
												params: {
													FromScene: 'kuaisuANDmine',
													// callBackRefresh:this.props.callBackRefresh,

												},
											})
										}

									} else {//申请验四不通过原因
										this.props.showToast(response.mjson.data.fourElementCheckRemark + "");

									}
								}, (error) => {//申请验四接口报错
									this.setState({
										loading: false,
									});

								});


						}
						else {//验证验证码失败
							this.props.showToast(response11.mjson.data.msg + "");
							this.setState({
								loading: false,
							}, () => {
								this.Verifycode();
							});
						}
					},
					(error) => {//验证验证码接口报错
						this.setState({
							loading: false,
						}, () => {
							this.Verifycode();
						});
						this.props.showToast(error.mjson.msg + "");

					});
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
		request(AppUrls.GET_CAPTCHA, 'Post', maps)
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
			});
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