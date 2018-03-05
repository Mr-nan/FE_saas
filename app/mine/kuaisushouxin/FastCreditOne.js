/**
 * Created by yujinzhong on 2018/1/2.
 */
import React from 'react';
import {
	View,
	Image,
	Text,
	TextInput,
	StyleSheet,
	Platform,
	NativeModules,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions,
	TouchableWithoutFeedback,
}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";

import {request} from '../../utils/RequestUtil';
import SelectDJRScene from "../../finance/lend/SelectDJRScene";


const Pixel = new PixelUtil();
const selectImg = require('../../../images/financeImages/celljiantou.png');
const IS_ANDROID = Platform.OS === 'android';


export default class FastCreditOne extends BaseComponent {
	constructor(props) {
		super(props);
		this.enterpriseData = {
			qiyemingcheng: '',//企业名称
			xinyongdaima: '',//统一社会信用代码
			daikuanyue: '',//房屋贷款余额


		};

		this.state = {
			selectNO: 'own',//'rent'
			business_home: '请选择',//经营地址
			fangwujiazhi: '请选择',//房屋价值
			keyboardOffset: -Pixel.getPixel(64),
			renderPlaceholderOnly: 'success'
		};
	}

	initFinish = () => {
	};

	componentDidMount() {

	}

	//提示信息
	_showHint = (hint) => {
		this.props.showToast(hint);
	};
	_qiyemingchengChange = (text) => {
		this.enterpriseData.qiyemingcheng = text;
	};
	_xinyongdaimaChange = (text) => {
		this.enterpriseData.xinyongdaima = text;
	};
	_daikuanyueChange = (text) => {
		this.enterpriseData.daikuanyue = text;
	};
	_fangwujiazhiChange = (text) => {
		this.enterpriseData.fangwujiazhi = text;
	};
	/*
	 * 商户所在地点击
	 * */
	_onCityPress = () => {
		alert('citypress')
		// let navigatorParams = {
		// 	name: "ProvinceListScene",
		// 	component: ProvinceListScene,
		// 	params: {
		// 		checkedCityClick: this._checkedCityClick,
		// 		isSelectProvince: false,//如果为true，可以选择省,false,只能选择市
		// 	}
		// }
		// this.toNextPage(navigatorParams);
	};

	/*
	 * 导航栏左侧按钮点击
	 * */
	_onBack = () => {
		this.backPage();
	};
	/*
	 * 完成点击
	 * */
	// _onCompletePress = () => {
	//
	// 	if (this.isEmpty(this.enterpriseData.zhuceren_name) === true) {
	// 		this._showHint('请填写注册人姓名');
	// 		return;
	// 	}
	// 	if (this.isEmpty(this.enterpriseData.zhuceren_IDNo) === true) {
	// 		this._showHint('请填写注册人身份证号');
	// 		return;
	// 	}
	// 	if (this.enterpriseData.zhuceren_IDNo.length != 18 && this.enterpriseData.zhuceren_IDNo.length != 15) {
	// 		this._showHint('请填写有效的注册人身份证号');
	// 		return;
	// 	}
	// 	if (this.isEmpty(this.enterpriseData.qiyemingcheng) === true) {
	// 		this._showHint('请填写企业名称');
	// 		return;
	// 	}
	// 	if (this.isEmpty(this.enterpriseData.enterprise_name) === true) {
	// 		this._showHint('请填写企业负责人姓名');
	// 		return;
	// 	}
	// 	if (this.enterpriseData.enterprise_name.length < 2 || this.enterpriseData.enterprise_name.length > 5) {
	// 		this._showHint('请填写有效的企业负责人姓名');
	// 		return;
	// 	}
	// 	if (this.isEmpty(this.enterpriseData.enterprise_tel) === true) {
	// 		this._showHint('请填写企业负责人手机号');
	// 		return;
	// 	}
	// 	if (this.enterpriseData.enterprise_tel.length != 11) {
	// 		this._showHint('请填写有效的企业负责人手机号');
	// 		return;
	// 	}
	// 	if (this.isEmpty(this.enterpriseData.enterprise_IDNo) === true) {
	// 		this._showHint('请填写企业负责人身份证号');
	// 		return;
	// 	}
	// 	if (this.enterpriseData.enterprise_IDNo.length != 18 && this.enterpriseData.enterprise_IDNo.length != 15) {
	// 		this._showHint('请填写有效的企业负责人身份证号');
	// 		return;
	// 	}
	// 	if (this.isEmpty(this.enterpriseData.businessLicense_IDNo) === true) {
	// 		this._showHint('请填写营业执照号/注册号');
	// 		return;
	// 	}
	// 	if (this.state.business_home === '请选择') {
	// 		this._showHint('请选择商户经营所在地');
	// 		return;
	// 	}
	// 	if (this.isEmpty(idHandle) === true) {
	// 		this._showHint('请上传企业负责人手持身份证');
	// 		return;
	// 	}
	// 	if (this.isEmpty(idcardfront) === true) {
	// 		this._showHint('请上传企业负责人身份证正面');
	// 		return;
	// 	}
	// 	if (this.isEmpty(idcardback) === true) {
	// 		this._showHint('请上传企业负责人身份证反面');
	// 		return;
	// 	}
	//
	// 	if (this.isEmpty(businessid) === true) {
	// 		this._showHint('请上传营业执照');
	// 		return;
	// 	}
	//
	//
	// 	let maps = {
	//
	// 		license_id: businessid,
	// 		license_no: this.enterpriseData.businessLicense_IDNo,
	// 		company_name: this.enterpriseData.qiyemingcheng,//未确定
	//
	// 		city_id: city_ID,
	// 		prov_id: prov_ID,
	//
	// 		idcard_back_id: idcardback,
	// 		idcard_fort_id: idcardfront,
	// 		idcard_touch_id: idHandle,
	//
	// 		company_blame: this.enterpriseData.enterprise_name,
	// 		company_blame_phone: this.enterpriseData.enterprise_tel,
	// 		idcard_blame_no: this.enterpriseData.enterprise_IDNo,
	//
	// 		company_id: this.props.qiye_id,
	// 		idcard_no: this.enterpriseData.zhuceren_IDNo,
	// 		real_name: this.enterpriseData.zhuceren_name,
	//
	// 	};
	// 	this.props.showModal(true);
	//
	// 	request(AppUrls.ENTERPRISECERTIFICATE, 'Post', maps)
	// 		.then((response) => {
	// 			if (response.mycode == "1") {
	// 				this.props.showToast("信息提交成功");
	// 				if (this.props.callBack) {
	// 					this.props.callBack();
	// 				}
	// 				this.timer = setTimeout(
	// 					() => {
	// 						this.backPage();
	// 					},
	// 					200
	// 				);
	// 			} else {
	// 				this.props.showToast(response.mjson.msg + "");
	// 			}
	// 		}, (error) => {
	// 			if (error.mycode == -300 || error.mycode == -500) {
	// 				this.props.showToast('系统异常');
	// 			} else {
	// 				this.props.showToast(error.mjson.msg);
	// 			}
	//
	// 		});
	//
	//
	// };

	render() {

		if (this.state.renderPlaceholderOnly !== 'success') {
			return this.loadView();
		}
		return (
			<View style={styles.container}>
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
				{/*导航栏view*/}
				<AllNavigationView
					backIconClick={this._onBack}
					title='小额授信申请'
				/>

			</View>
		)
	}

	/*
	 * 主界面
	 * */
	loadScrollView = () => {
		return (
			<ScrollView keyboardDismissMode={IS_ANDROID?'none':'on-drag'}>

				<View style={{width:width,height:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3}}/>
				{/*企业名称view*/}
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
						defaultValue={this.enterpriseData.zhuceren_name}
						placeholderTextColor={fontAndColor.COLORA1}
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
				<View style={styles.splitItem}/>

				{/*统一社会信用代码view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>统一社会信用代码</Text>
					<TextInput
						ref={(input) => {
                                this.xinyongdaimaInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._xinyongdaimaChange}
						placeholder='请输入'
						defaultValue={this.enterpriseData.xinyongdaima}
						maxLength={18}
						placeholderTextColor={fontAndColor.COLORA1}
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
				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>
				{/*经营地址view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>经营地址</Text>
					<View style={styles.fillSpace}/>
					<TouchableOpacity onPress={this._onCityPress}>
						<View style={styles.rightContainer}>
							<Text allowFontScaling={false}
							      ref='business_home'
							      style={styles.selectHintFont}>{this.state.business_home}</Text>


							<Image style={styles.selectImage} source={selectImg}/>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>


				{/*经营场地view*/}
				<View style={[styles.itemBackground,{height:Pixel.getPixel(60)}]}>
					<Text allowFontScaling={false} style={styles.leftFont}>经营场地</Text>
					<View style={styles.fillSpace}/>
					<TouchableOpacity
						style={[styles.selectBtn,{borderColor:this.state.selectNO == 'own' ? fontAndColor.COLORB0:fontAndColor.COLORA2}]}
						activeOpacity={0.6}
						onPress={() =>{this._changdiTypePress('own')}}>
						<Text allowFontScaling={false}
						      style={[styles.selectBtnFont,{color:this.state.selectNO == 'own' ? fontAndColor.COLORB0:fontAndColor.COLORA2}]}>自有</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.selectBtn,{marginRight: Pixel.getPixel(0)},{borderColor:this.state.selectNO == 'rent' ? fontAndColor.COLORB0:fontAndColor.COLORA2}]}
						activeOpacity={0.6}
						onPress={()=>{this._changdiTypePress('rent')}}>
						<Text allowFontScaling={false}
						      style={[styles.selectBtnFont,{color:this.state.selectNO == 'rent' ? fontAndColor.COLORB0:fontAndColor.COLORA2}]}>租赁</Text>
					</TouchableOpacity>
				</View>


				<View
					style={{width:width,height : this.state.selectNO == 'own'? Pixel.getPixel(10):Pixel.getPixel(0),backgroundColor:fontAndColor.COLORA3}}/>

				{/*房屋价值view*/}
				{
					this.state.selectNO == 'own'?
						<View
							style={[styles.itemBackground,{height : this.state.selectNO == 'own'? Pixel.getPixel(44):Pixel.getPixel(44)}]}>
							<Text allowFontScaling={false} style={styles.leftFont}>房屋价值</Text>
							<View style={styles.fillSpace}/>
							<TouchableOpacity onPress={this._onJiaZhiPress}>
								<View style={styles.rightContainer}>
									<Text allowFontScaling={false}
									      ref='business_home'
									      style={styles.selectHintFont}>{this.state.fangwujiazhi}</Text>


									<Image style={styles.selectImage} source={selectImg}/>
								</View>
							</TouchableOpacity>
						</View>:null
				}

				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>
				{/*房屋贷款余额view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>房屋贷款余额</Text>
					<TextInput
						ref={(input) => {
                                this.daikuanyueInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._daikuanyueChange}
						placeholder='请输入'
						defaultValue={this.enterpriseData.daikuanyue}
						placeholderTextColor={fontAndColor.COLORA1}
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


				<View style={{width:width,height:Pixel.getPixel(100),backgroundColor:fontAndColor.COLORA3}}/>

				{/*下一步view*/}
				<View style={styles.fillSpace}>
					<TouchableOpacity style={styles.btnOk} activeOpacity={0.6} onPress={this._onCompletePress}>
						<Text allowFontScaling={false} style={styles.btnFont}>下一步</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
	/*
	 * 判断非空函数
	 * */
	isEmpty = (str) => {
		if (typeof(str) != 'undefined' && str !== '' && str !== null) {
			return false;
		} else {
			return true;
		}
	};
	_onCompletePress = () => {

	}
	_onJiaZhiPress = () => {
		this.toNextPage(
			{
				name: 'SelectDJRScene',
				component: SelectDJRScene,
				params: {
					regShowData: ['50万以下','50万 ~ 100万','100万 ~ 150万','150万 ~ 200万','200万 ~ 300万','300万 ~ 400万','400万 ~ 500万','500万以上'],
					title: '选择房屋价值',
					callBack: (name, index) => {
						this.setState({
							fangwujiazhi: name
						})

					}
				}
			})
	}
	_changdiTypePress = (type) => {
		this.setState({
			selectNO: type
		})
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: Pixel.getPixel(64),
	},
	alignTop: {
		marginTop: Pixel.getPixel(59)
	},
	alignItem: {
		marginTop: Pixel.getPixel(10)
	},
	itemBackground: {
		flexDirection: 'row',
		height: Pixel.getPixel(44),
		backgroundColor: 'white',
		paddingHorizontal: Pixel.getPixel(15),
		alignItems: 'center'
	},
	splitItem: {
		height: Pixel.getPixel(1),
		backgroundColor: fontAndColor.COLORA4,
		marginLeft: Pixel.getPixel(15),
		marginRight: Pixel.getPixel(15),
	},
	leftFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black'
	},
	fillSpace: {
		flex: 1
	},
	selectHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: fontAndColor.COLORA2,
		textAlign: 'right'
	},
	inputHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black',
		textAlign: 'right'
	},
	selectImage: {
		height: Pixel.getPixel(16),
		width: Pixel.getPixel(9),
		marginLeft: Pixel.getPixel(13)
	},
	scanImage: {
		height: Pixel.getPixel(18),
		width: Pixel.getPixel(18),
		marginLeft: Pixel.getPixel(8)
	},
	rightContainer: {
		height: Pixel.getPixel(44),
		flexDirection: 'row',
		alignItems: 'center'
	},
	rightHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black',
		marginLeft: Pixel.getPixel(8)
	},
	btnOk: {
		height: Pixel.getPixel(44),
		marginHorizontal: Pixel.getPixel(15),
		backgroundColor: fontAndColor.COLORB0,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Pixel.getPixel(15),
		borderRadius: Pixel.getFontPixel(2),
	},
	btnFont: {
		fontSize: Pixel.getFontPixel(15),
		color: 'white'
	},
	selectBtn: {
		height: Pixel.getPixel(32),
		width: Pixel.getPixel(88),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Pixel.getFontPixel(2),
		marginRight: Pixel.getPixel(15),
		borderColor: fontAndColor.COLORB0,
		borderWidth: 1,

	},
	selectBtnFont: {
		fontSize: Pixel.getFontPixel(15),
		color: fontAndColor.COLORB0,
	}

});