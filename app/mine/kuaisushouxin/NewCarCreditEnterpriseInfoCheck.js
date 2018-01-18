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
	Image,
	TextInput

} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import * as FontAndColor from "../../constant/fontAndColor";
import LoginInputTextYU  from "../../login/component/LoginInputTextYU"
import MyButton from "../../component/MyButton";
import CarUpImageCell from '../../../app/carSource/znComponent/CarUpImageCell';

import ImagePicker from "react-native-image-picker";

import NavigationBar from "../../component/NavigationBar";
import PixelUtil from "../../utils/PixelUtil";
import ImageSource from "../../publish/component/ImageSource";
import * as ImageUpload from "../../utils/ImageUpload";
import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";
import md5 from "react-native-md5";
import WebScene from "../../main/WebScene";
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();

let uid: '';

const dismissKeyboard = require('dismissKeyboard');
const agree_icon = require('../kuaisushouxin/kuaisushouxin_images/agree_icon.png');
const disagree = require('../kuaisushouxin/kuaisushouxin_images/disagree.png');

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
var Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';

export default class NewCarCreditEnterpriseInfoCheck extends BaseComponent {
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
			selectNO: 'GeRen',//GeRen 个人授信类型  QiYe 企业授信类型
			businessLicense: null,
			enterpriseFront: null,
			enterpriseBack: null,
			openAccountLicense: null,
			isAgree: false,
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
		this.enterpriseData = {

			qiyemingcheng: '',//企业名称


		};

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
					centerText={'企业信息校验'}
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
				{/*拍照选择modal  view*/}
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

				{/*===============================提示语header===========================*/}
				<View style={{backgroundColor: '#FFF8EA',height: Pixel.getPixel(58),width: width,flexDirection:'row'}}>
					<Image
						style={{height:Pixel.getPixel(13),width:Pixel.getPixel(13),marginTop:Pixel.getPixel(13),marginLeft:Pixel.getPixel(13)}}
						source={require('./kuaisushouxin_images/tishixiaolaba.png')}/>
					<View style={{marginTop:Pixel.getPixel(12),flex:1}}>
						<Text
							style={{color: '#FA5741',fontSize: Pixel.getPixel(12),marginLeft: Pixel.getPixel(5),lineHeight:Pixel.getPixel(17)}}>
							授信类型一旦选择不可修改，选择个人借款\企业借款，则授信主体和借款主体均为个人\企业
						</Text>
					</View>

				</View>
				{/*===============================授信类型 View===========================*/}
				<View style={[styles.itemBackground,{height:Pixel.getPixel(60)}]}>
					<Text allowFontScaling={false} style={styles.leftFont}>授信类型</Text>
					<View style={styles.fillSpace}/>
					<TouchableOpacity
						style={[styles.selectBtn,{borderColor:this.state.selectNO == 'GeRen' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}
						activeOpacity={0.6}
						onPress={() =>{this._changdiTypePress('GeRen')}}>
						<Text allowFontScaling={false}
						      style={[styles.selectBtnFont,{color:this.state.selectNO == 'GeRen' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}>个人借款</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.selectBtn,{marginRight: Pixel.getPixel(0)},{borderColor:this.state.selectNO == 'QiYe' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}
						activeOpacity={0.6}
						onPress={()=>{this._changdiTypePress('QiYe')}}>
						<Text allowFontScaling={false}
						      style={[styles.selectBtnFont,{color:this.state.selectNO == 'QiYe' ? FontAndColor.COLORB0:FontAndColor.COLORA2}]}>企业借款</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.inputTextLine}/>
				{/*===============================企业名称 View===========================*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>企业名称</Text>
					<TextInput
						ref={(input) => {
                                this.qiyemingchengInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._qiyemingchengChange}
						placeholder='请输入'
						defaultValue={this.enterpriseData.qiyemingcheng}
						placeholderTextColor={FontAndColor.COLORA1}
						onFocus={()=>{
                                       this.setState({
                                           keyboardOffset:-Pixel.getPixel(300)
                                       });
                                   }}
						onBlur={()=>{
                                       this.setState({
                                           keyboardOffset:Pixel.getPixel(64)
                                       });
                                   }}
					/>
				</View>
				<View style={styles.inputTextLine}/>

				{/*===============================上传借款人身份证 View===========================*/}
				<TouchableWithoutFeedback>
					<View style={{width: width,height: Pixel.getPixel(88),flexDirection: 'row',alignItems: 'center',
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                                }}>
							上传借款人身份证
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

				{/*===============================营业执照 View===========================*/}
				<TouchableWithoutFeedback>
					<View style={{width: width,height: Pixel.getPixel(88),flexDirection: 'row',alignItems: 'center',
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                                }}>
							营业执照
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
				{/*===============================上传开户许可 View===========================*/}

				<TouchableWithoutFeedback>
					<View style={{width: width,height: Pixel.getPixel(88),flexDirection: 'row',alignItems: 'center',
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                                }}>
							上传开户许可
						</Text>
						<View>
							<MyButton buttonType={MyButton.IMAGEBUTTON}
							          content={this.state.openAccountLicense === null ?
                                                  require('../../../images/login/add.png') : this.state.openAccountLicense
                                              }
							          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
							          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
							          mOnPress={()=>{this.selectPhotoTapped('openAccountLicense')}}/>
							{this.state.openAccountLicense ?
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={require('../../../images/login/clear.png')}
								          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
								          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
								          mOnPress={() => {
								          	openAccountLicenseID = '';
								          	this.setState({
								          		openAccountLicense: null
								          	});
                                                  }}/>
								: null}

						</View>
					</View>
				</TouchableWithoutFeedback>


				{/*===============================物流协议===========================*/}
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
							<Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getPixel(12)}}>我已授权三方征信查询</Text>
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


				{/*===============================提交按钮===========================*/}


				<View style={styles.imagebuttonok}>

					<TouchableOpacity onPress={this._onCompletePress} activeOpacity={this.state.isAgree? 0.7 : 1}  style={{
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
	_qiyemingchengChange = (text) => {
		this.enterpriseData.qiyemingcheng = text;
	};
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
					} else if (id === 'openAccountLicense') {
						openAccountLicenseID = response.mjson.data.file_id;
						if (openAccountLicenseID != "") {
							this.setState({
								openAccountLicense: source
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
	_onCompletePress = () => {
		if(!this.state.isAgree){
			return;
		}
		if (this.isEmpty(this.enterpriseData.qiyemingcheng) === true) {
			this._showHint('请填写企业名称');
			return;
		}

		if (this.isEmpty(idcardfront) === true) {
			this._showHint('请上传借款人身份证正面');
			return;
		}
		if (this.isEmpty(idcardback) === true) {
			this._showHint('请上传借款人身份证反面');
			return;
		}
		if (this.isEmpty(businessid) === true) {
			this._showHint('请上传营业执照');
			return;
		}
		if (this.isEmpty(openAccountLicenseID) === true) {
			this._showHint('请上传开户许可');
			return;
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
	inputHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black',
		textAlign: 'right'
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
		width: Pixel.getPixel(78),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Pixel.getFontPixel(2),
		marginRight: Pixel.getPixel(15),
		borderColor: FontAndColor.COLORB0,
		borderWidth: 1,

	},
	selectBtnFont: {
		fontSize: Pixel.getFontPixel(14),
		color: FontAndColor.COLORB0,
	}
});