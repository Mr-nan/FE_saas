/**
 * Created by yujinzhong on 2018/1/2.
 */
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
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import * as FontAndColor from "../../constant/fontAndColor";
import LoginInputTextYU  from "../../login/component/LoginInputTextYU"
import MyButton from "../../component/MyButton";
import CarUpImageCellYU from '../../../app/carSource/znComponent/CarUpImageCellYU';
import ImagePicker from "react-native-image-picker";
import ImageSource from "../../publish/component/ImageSource";
import {request} from "../../utils/RequestUtil";
import * as ImageUpload from "../../utils/ImageUpload";


import NavigationBar from "../../component/NavigationBar";
import PixelUtil from "../../utils/PixelUtil";

import * as AppUrls from "../../constant/appUrls";
import md5 from "react-native-md5";
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();

let uid: '';

const dismissKeyboard = require('dismissKeyboard');

var Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';

let openAccountLicenseID;
let idcardfront;
let idcardback;
let businessid;
let city_ID;
let prov_ID;

//===============================相机参数设置================================
const options = {
	//弹出框选项
	title: '请选择',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '选择相册',
	allowsEditing: false,
	noData: false,
	quality: 1.0,
	maxWidth: 480,
	maxHeight: 800,
	storageOptions: {
		skipBackup: true,
		path: 'images',
	}
};
export default class FastCreditTwo extends BaseComponent {
	/*
	 * 为了延迟调用
	 * */
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	constructor(props) {
		super(props);
		this.results = [];
		this.data = '';
		this.state = {
			selectNO: 'yes',//yes 代表同步  no 不同步
			businessLicense: null,
			enterpriseFront: null,
			enterpriseBack: null,
			renderPlaceholderOnly: true,
			keyboardOffset: -Pixel.getPixel(0),

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
						centerText={'快速授信申请'}
					/>
				</View>
			</TouchableWithoutFeedback>);
		}
		return (

			<View style={styles.container}>

				<NavigationBar
					leftImageCallBack={this.backPage}
					rightText={""}
					centerText={'快速授信申请'}
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
				<ImageSource

					galleryClick={this._photoClick}
					cameraClick={this._cameraClick}
					ref={(modal) => {
                                     this.imageSource = modal
                                 }}/>
			</View>
		);
	}

	/*
	 * 主界面
	 * */
	loadScrollView = () => {
		return (
			<ScrollView keyboardShouldPersistTaps={'handled'} style={{height:height- Pixel.getPixel(64)}}>

				{/*实际控制人Header*/}
				<View style={styles.inputHeader}>
					<Text style={styles.inputHeaderText}>
						实际控制人信息
					</Text>
				</View>
				{/*实际控制人View*/}
				<View style={styles.inputTextsStyle}>
					{/*实际控制人姓名*/}
					<LoginInputTextYU
						ref="controllerName"
						leftText={'实际控制人姓名'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={true}
						import={false}
						defaultValue={'zhangqilong'}
						rightIcon={false}/>
					<LoginInputTextYU
						ref="controllerID"
						leftText={'实际控制人身份证'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={true}
						import={false}
						defaultValue={'zhangqilong'}
						maxLength={18}//身份证限制18位或者15位
						rightIcon={false}/>
					<LoginInputTextYU
						ref="controllerPhone"
						leftText={'实际控制人联系方式'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0,}]}
						inputTextStyle={styles.inputTextStyle}
						secureTextEntry={false}
						clearValue={true}
						leftIcon={false}
						import={false}
						defaultValue={'zhangqilong'}
						maxLength={11}
						rightIcon={false}/>

				</View>
				{/*法人Header*/}
				<View style={styles.inputHeader}>
					<Text style={styles.inputHeaderText}>
						法人信息
					</Text>
				</View>
				{/*法人信息同实际控制人view*/}
				<View style={[styles.itemBackground,{height:Pixel.getPixel(60)}]}>
					<Text allowFontScaling={false} style={styles.leftFont}>法人信息同实际控制人</Text>
					<View style={styles.fillSpace}/>
					<TouchableOpacity
						style={[styles.selectBtn,{borderColor:this.state.selectNO == 'yes' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}
						activeOpacity={0.6}
						onPress={() =>{this._changdiTypePress('yes')}}>
						<Text allowFontScaling={false}
						      style={[styles.selectBtnFont,{color:this.state.selectNO == 'yes' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}>同步</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.selectBtn,{marginRight: Pixel.getPixel(0)},{borderColor:this.state.selectNO == 'no' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}
						activeOpacity={0.6}
						onPress={()=>{this._changdiTypePress('no')}}>
						<Text allowFontScaling={false}
						      style={[styles.selectBtnFont,{color:this.state.selectNO == 'no' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}>不同步</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.inputTextLine}/>

				<View style={styles.inputTextsStyle}>
					{/*法人姓名*/}
					<LoginInputTextYU
						ref="legalPersonName"
						leftText={'法人姓名'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={true}
						import={false}
						defaultValue={'zhangqilong'}
						rightIcon={false}/>
					<LoginInputTextYU
						ref="legalPersonID"
						leftText={'法人身份证'}
						textPlaceholder={'请输入'}
						viewStytle={styles.itemStyel}
						inputTextStyle={styles.inputTextStyle}
						leftIcon={false}
						clearValue={true}
						import={false}
						defaultValue={'zhangqilong'}
						maxLength={18}//身份证限制18位或者15位
						rightIcon={false}/>
					<LoginInputTextYU
						ref="legalPersonPhone"
						leftText={'法人联系方式'}
						textPlaceholder={'请输入'}
						viewStytle={[styles.itemStyel, {borderBottomWidth: 0,}]}
						inputTextStyle={styles.inputTextStyle}
						secureTextEntry={false}
						clearValue={true}
						leftIcon={false}
						import={false}
						defaultValue={'zhangqilong'}
						maxLength={11}
						rightIcon={false}/>
				</View>
				{/*上传附件Header*/}
				<View style={styles.inputHeader}>
					<Text style={styles.inputHeaderText}>
						上传附件
					</Text>
				</View>
				{/*法人身份证view*/}
				<TouchableWithoutFeedback onPress={() => dismissKeyboard() }>
					<View style={{width: width,height: Pixel.getPixel(88),flexDirection: 'row',alignItems: 'center',
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                                }}>
							上传法人身份证
						</Text>
						<View>
							<MyButton buttonType={MyButton.IMAGEBUTTON}
							          content={this.state.enterpriseFront === null ?
                                                  require('../../../images/login/idcard.png') : this.state.enterpriseFront
                                              }
							          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
							          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
							          mOnPress={()=>{this.selectPhotoTapped('enterpriseFront')}}/>
							{this.state.enterpriseFront ?
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={require('../../../images/login/clear.png')}
								          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
								          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
								          mOnPress={() => {
								          	businessid = '';
								          	this.setState({
								          		enterpriseFront: null
								          	});
                                                  }}/>
								: null}

						</View>
						<View>
							<MyButton buttonType={MyButton.IMAGEBUTTON}
							          content={this.state.enterpriseBack === null ?
                                                  require('../../../images/login/idcard_back.png') : this.state.enterpriseBack
                                              }
							          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
							          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
							          mOnPress={()=>{this.selectPhotoTapped('enterpriseBack')}}/>
							{this.state.enterpriseBack ?
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={require('../../../images/login/clear.png')}
								          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
								          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
								          mOnPress={() => {
								          	businessid = '';
								          	this.setState({
								          		enterpriseBack: null
								          	});
                                                  }}/>
								: null}

						</View>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.inputTextLine}/>

				{/*营业执照view*/}
				<TouchableWithoutFeedback onPress={() => dismissKeyboard() }>
					<View style={{width: width,height: Pixel.getPixel(88),flexDirection: 'row',alignItems: 'center',
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                                }}>
							上传营业执照
						</Text>
						<View>
							<MyButton buttonType={MyButton.IMAGEBUTTON}
							          content={this.state.businessLicense === null ?
                                                  require('../../../images/login/add.png') : this.state.businessLicense
                                              }
							          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
							          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
							          mOnPress={()=>{this.selectPhotoTapped('businessLicense')}}/>
							{this.state.businessLicense ?
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={require('../../../images/login/clear.png')}
								          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
								          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
								          mOnPress={() => {
								          	businessid = '';
								          	this.setState({
								          		businessLicense: null
								          	});
                                                  }}/>
								: null}

						</View>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.inputTextLine}/>

				{/*===============================多张照片===========================*/}
				<CarUpImageCellYU
					results={this.results}
					retureSaveAction={()=>{
						console.log('1111111111111111' , this.results)
                    {/*this.carData['pictures']=JSON.stringify(this.results);*/}

                    {/*if(this.carData.show_shop_id && !this.carData.id){*/}
                        {/*StorageUtil.mSetItem(String(this.carData.show_shop_id),JSON.stringify(this.carData));*/}
                    {/*}*/}
                }}
					showModal={(value)=>{this.props.showModal(value)}}
					showToast={(value)=>{this.props.showToast(value)}}
					items={{
						"name": "ownership_sale",
						"isShowTag": true,
						"title": "权属声明/买卖协议",
						"subTitle": "至多8张",
						 "number": 12,
						 "explain":0,}}
					childList={[]}
				/>
				{/*===============================提交按钮===========================*/}

				{/*提交按钮*/}
				<View style={styles.imagebuttonok}>

					<TouchableOpacity onPress={() => {
                                this.register();
                            }} activeOpacity={0.8} style={{
                                marginTop: Pixel.getPixel(7),
                                width: width - Pixel.getPixel(30),
                                height: Pixel.getPixel(44),
                                backgroundColor: FontAndColor.COLORB0,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
						<Text allowFontScaling={false} style={{
                                    color: '#fff',
                                    fontSize: Pixel.getPixel(FontAndColor.LITTLEFONT28)
                                }}>提交</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
	_changdiTypePress = (type) => {
		this.setState({
			selectNO: type
		})
	}
	isEmpty = (str) => {
		if (typeof(str) != 'undefined' && str !== '' && str !== null) {
			return false;
		} else {
			return true;
		}
	};
	//提示信息
	_showHint = (hint) => {
		this.props.showToast(hint);
	};
	/*
	 * 弹出蒙版
	 * */
	selectPhotoTapped = (id) => {
		this.id = id;
		this._rePhoto(id);
	}
	_rePhoto = (ID) => {
		this.imageSource.openModal(ID);
	};

	/*
	 * 相机点击
	 * */
	_cameraClick = (ID) => {
		this.timer = setTimeout(
			() => {
				ImagePicker.launchCamera(options, (response) => {
					if (response.didCancel) {
					} else if (response.error) {
					} else if (response.customButton) {
					} else {
						this.uploadImage(response, this.id);
					}
				});
			},
			200
		);


	}

	/*
	 * 相册点击
	 * */
	_photoClick = (ID) => {
		this.timer = setTimeout(
			() => {
				ImagePicker.launchImageLibrary(options, (response) => {
					if (response.didCancel) {
					} else if (response.error) {
					} else if (response.customButton) {
					} else {
						this.uploadImage(response, this.id);
					}
				});
			},
			200
		);

	}
	/*
	 * 图片上传
	 * */
	uploadImage = (response, id) => {

		let params = {
			file: 'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g, '%2B')
		};
		this.props.showModal(true);

		ImageUpload.request(AppUrls.INDEX_UPLOAD, 'Post', params)
			.then((response) => {
				this.props.showModal(false);

				if (response.mycode == 1) {
					this.props.showToast('上传成功')
					let source = {uri: response.mjson.data.url};
					if (id === 'enterpriseFront') {
						idcardfront = response.mjson.data.file_id;
						if (idcardfront != "") {
							this.setState({
								enterpriseFront: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					} else if (id === 'enterpriseBack') {
						idcardback = response.mjson.data.file_id;
						if (idcardback != "") {
							this.setState({
								enterpriseBack: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					} else if (id === 'businessLicense') {
						businessid = response.mjson.data.file_id;
						if (businessid != "") {
							this.setState({
								businessLicense: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					}
				} else {
					this.props.showToast(response.mjson.msg + "!");
				}
			}, (error) => {
				console.log(error);
				this.props.showToast("图片上传失败");
			});
	}
	register = () => {

		let userName = this.refs.userName.getInputTextValue();
		let smsCode = this.refs.smsCode.getInputTextValue();
		let password = this.refs.password.getInputTextValue();
		let passwoedAgain = this.refs.passwoedAgain.getInputTextValue();
		let name = this.refs.name.getInputTextValue();
		let businessName = this.refs.businessName.getInputTextValue();
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

}

const styles = StyleSheet.create({
	container: {
		height: height,
		backgroundColor: FontAndColor.COLORA3,
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
	inputHeader: {
		backgroundColor: FontAndColor.COLORA3,
		height: Pixel.getPixel(30),
		width: width,
		justifyContent: 'center'
	},
	inputHeaderText: {
		color: FontAndColor.COLORA1,
		fontSize: Pixel.getPixel(12),
		marginLeft: Pixel.getPixel(15)
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
	},
	itemBackground: {
		flexDirection: 'row',
		height: Pixel.getPixel(44),
		backgroundColor: 'white',
		paddingHorizontal: Pixel.getPixel(15),
		alignItems: 'center'
	},
	leftFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black'
	},
	fillSpace: {
		flex: 1
	},
	selectBtn: {
		height: Pixel.getPixel(30),
		width: Pixel.getPixel(68),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Pixel.getFontPixel(2),
		marginRight: Pixel.getPixel(15),
		borderColor: FontAndColor.COLORB0,
		borderWidth: 1,

	},
	selectBtnFont: {
		fontSize: Pixel.getFontPixel(15),
		color: FontAndColor.COLORB0,
	}
});