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
let {width,height} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";

import {request} from '../../utils/RequestUtil';
import CarInitialTaskScene from "../../carSource/carBuy/CarInitialTaskScene";


const Pixel = new PixelUtil();
const selectImg = require('../../../images/financeImages/celljiantou.png');
const IS_ANDROID = Platform.OS === 'android';


export default class NewCarCreditVerification extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			verificationState:'fail',//audit审核中 pass通过 fail未通过
			renderPlaceholderOnly: 'success',
			keyboardOffset: -Pixel.getPixel(64),

		};
	}

	initFinish = () => {
	};

	componentDidMount() {

	}


	/*
	 * 导航栏左侧按钮点击
	 * */
	_onBack = () => {
		this.backPage();
	};

	/**
	 * 导航右侧按钮
	 */
	renderRightView=()=>{
		if(this.state.verificationState == "success"){
			return(
				<TouchableOpacity onPress={
				()=>{
					this.toNextPage({
                        name: 'CarInitialTaskScene',
                        component: CarInitialTaskScene,
                        params: {}
                    }
                );}
			}>
					<View style={{marginLeft:Pixel.getPixel(20),width:Pixel.getPixel(50),height:Pixel.getPixel(40),justifyContent:'center',
                    alignItems:'center'}}>
						<Text allowFontScaling={false}  style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>完成</Text>
					</View>
				</TouchableOpacity>
			)
		}else {
			return(
				null
			)

		}


	}

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
					renderRihtFootView={this.renderRightView}
					title='信息验证'
				/>

			</View>
		)
	}

	/*
	 * 主界面
	 * */
	loadScrollView = () => {
		if(this.state.verificationState == 'audit'){
			return (
				<ScrollView keyboardDismissMode={IS_ANDROID?'none':'on-drag'} contentContainerStyle={{alignItems:'center',height:Pixel.getPixel(height-64)}} >
					<Image style={{width:Pixel.getPixel(186),height:Pixel.getPixel(126),marginTop:Pixel.getPixel(50)}} source={require('./kuaisushouxin_images/uploadVerification.png')}/>

					<Text style={{height:Pixel.getPixel(30),marginTop:Pixel.getPixel(20),color:fontAndColor.COLORA0,fontSize:Pixel.getPixel(20)}}>
						人工审核中
					</Text>

					<Text style={{height:Pixel.getPixel(22),marginTop:Pixel.getPixel(7),color:fontAndColor.COLORA2,fontSize:Pixel.getPixel(14)}}>
						企业信息校验已转至人工处理
					</Text>
					<View style={{flex:1,backgroundColor:'red'}} />

					<View style={{marginBottom:Pixel.getPixel(30),alignItems:'center',flexDirection:'row'}}>
						<Image style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20)}} source={require('./kuaisushouxin_images/telphone.png')}/>
						<Text style={{height:Pixel.getPixel(20),color:fontAndColor.COLORA2,fontSize:Pixel.getPixel(15),marginLeft:Pixel.getPixel(14)}}>
							400-800-8888
						</Text>
					</View>
				</ScrollView>

			)

		}
		else if(this.state.verificationState == 'fail'){
			return (
				<ScrollView keyboardDismissMode={IS_ANDROID?'none':'on-drag'} contentContainerStyle={{alignItems:'center',height:Pixel.getPixel(height-64)}} >
					<Image style={{width:Pixel.getPixel(186),height:Pixel.getPixel(126),marginTop:Pixel.getPixel(50)}} source={require('./kuaisushouxin_images/uploadFail.png')}/>

					<Text style={{height:Pixel.getPixel(30),marginTop:Pixel.getPixel(20),color:fontAndColor.COLORA0,fontSize:Pixel.getPixel(20)}}>
						审核未通过
					</Text>

					<Text style={{height:Pixel.getPixel(22),marginTop:Pixel.getPixel(7),color:fontAndColor.COLORA2,fontSize:Pixel.getPixel(14)}}>
						请您核实信息后重新提报，谢谢
					</Text>
					<View style={{flex:1,backgroundColor:'red'}} />

					<View style={{marginBottom:Pixel.getPixel(30),alignItems:'center',flexDirection:'row'}}>
						<Image style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20)}} source={require('./kuaisushouxin_images/telphone.png')}/>
						<Text style={{height:Pixel.getPixel(20),color:fontAndColor.COLORA2,fontSize:Pixel.getPixel(15),marginLeft:Pixel.getPixel(14)}}>
							400-800-8888
						</Text>
					</View>
				</ScrollView>
			)
		}
		else {
			return (
				<ScrollView keyboardDismissMode={IS_ANDROID?'none':'on-drag'} contentContainerStyle={{alignItems:'center',height:Pixel.getPixel(height-64)}} >
					<Image style={{width:Pixel.getPixel(186),height:Pixel.getPixel(126),marginTop:Pixel.getPixel(50)}} source={require('./kuaisushouxin_images/uploadSuccess.png')}/>

					<Text style={{height:Pixel.getPixel(30),marginTop:Pixel.getPixel(20),color:fontAndColor.COLORA0,fontSize:Pixel.getPixel(20)}}>
						信息验证通过
					</Text>

					<Text style={{height:Pixel.getPixel(22),marginTop:Pixel.getPixel(7),color:fontAndColor.COLORA2,fontSize:Pixel.getPixel(14)}}>
						您已获得新车订单贷额度200万元
					</Text>
					<View style={{height:Pixel.getBottomPixel(0.5),width:Pixel.getPixel(width-30),backgroundColor:fontAndColor.COLORA3,marginTop:Pixel.getPixel(36)}}/>

					<View style={{marginTop:Pixel.getPixel(28),width:Pixel.getPixel(width-30)}}>
						<TouchableOpacity style={styles.btnOk} activeOpacity={0.6} onPress={this._onContinuePress}>
							<Text allowFontScaling={false} style={styles.btnFont}>继续申请小额授信</Text>
						</TouchableOpacity>
					</View>
					<Text style={{height:Pixel.getPixel(17),marginTop:Pixel.getPixel(17),color:fontAndColor.COLORA2,fontSize:Pixel.getPixel(12)}}>
						您还可以在线完善信息，通过"小额授信"获取更多金融服务
					</Text>

				</ScrollView>
			)
		}

	}

	_onCompletePress = () => {

	}

}
const styles = StyleSheet.create({
	container: {
		flex:1,
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
		marginHorizontal: Pixel.getPixel(0),
		backgroundColor: fontAndColor.COLORB0,
		justifyContent: 'center',
		alignItems: 'center',
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