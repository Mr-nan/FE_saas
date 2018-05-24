/**
 * Created by yujinzhong on 2018/1/4.
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
	NativeAppEventEmitter

}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";

import {request} from '../../utils/RequestUtil';
import SelectDJRScene from "../../finance/lend/SelectDJRScene";
import ProvinceListScene from "../../carSource/ProvinceListScene";


const Pixel = new PixelUtil();
const selectImg = require('../../../images/financeImages/celljiantou.png');
const IS_ANDROID = Platform.OS === 'android';


export default class BusinessAddress extends BaseComponent {
	constructor(props) {
		super(props);
		console.log('11111111111111111111111111');
		this.enterpriseData = {
			xiangxidizhi: '',//详细地址
			provinceName: '',//省
			cityName: '',//市
			business_home:'',
		};
        this.locateDate = {
            address: '',
            city_id: '',
            city_name: '',
            street_name: '',
            province_name: '',
            area_name: '',
        };

		this.state = {
			selectNO: 'own',//'rent'
			business_home: '请选择',//经营地址
			fangwujiazhi: '请选择',//房屋价值
			keyboardOffset: -Pixel.getPixel(64),
			renderPlaceholderOnly: 'success',
            xiangxidizhi:'',
		};
	}

	initFinish = () => {

    };
//拿到当前位置的定位
    getCurrentLocation = () => {
        this.setState({
            loading: true,
        });
        if (Platform.OS === 'android') {
            NativeModules.QrScan.lbsStart();
            NativeAppEventEmitter
                .addListener('onReceiveBDLocation', (loc) => {
                    this.setState({
                        loading: false,
                    });
                    console.log(loc);
                    this.locateDate.address = loc.addr;
                    this.locateDate.city_id = loc.city_code;
                    this.locateDate.city_name = loc.city;
                    this.locateDate.street_name = loc.street;
                    this.locateDate.province_name = loc.province;
                    this.locateDate.area_name = loc.district;
                    this.setState({
                        xiangxidizhi:loc.addr,
                    });
                    this.enterpriseData.xiangxidizhi = loc.addr;
                });
        } else {
            NativeModules.Location.Location().then((vl) => {
                this.setState({
                    loading: false,
                });
                console.log(vl.address);
                this.locateDate.address = vl.address;
                this.locateDate.city_id = vl.city_id;
                this.locateDate.city_name = vl.city_name;
                this.locateDate.street_name = vl.street_name;
                this.locateDate.province_name = vl.province_name;
                this.locateDate.area_name = vl.area_name;
                this.setState({
					xiangxidizhi:vl.address,
				});
                this.enterpriseData.xiangxidizhi = vl.address;

            }, (error) => {
            	this.props.showToast("没有获取到定位")

            });
        }
    }
	componentDidMount() {

	}

	componentWillUnmount(){
        if (Platform.OS === 'android') {
            NativeModules.QrScan.lbsStop();
        }
	}

	//提示信息
	_showHint = (hint) => {
		this.props.showToast(hint);
	};
	_xiangxidizhiChange = (text) => {
		this.enterpriseData.xiangxidizhi = text;
	};

	/*
	 * 商户所在地点击
	 * */
	_onCityPress = () => {
		let navigatorParams = {
			name: "ProvinceListScene",
			component: ProvinceListScene,
			params: {
				checkedCityClick: this._checkedCityClick,
				isSelectProvince: false,//如果为true，可以选择省,false,只能选择市
			}
		}
		this.toNextPage(navigatorParams);
	};
	_checkedCityClick = (cityType) => {
		city_ID = cityType.city_id;
		prov_ID = cityType.provice_id;
		this.enterpriseData.business_home = cityType.provice_name + ' ' + cityType.city_name;
		this.setState(
			{
				business_home: cityType.provice_name +''+ cityType.city_name
			}
		);
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

	_dingweiPress = () => {
        this.getCurrentLocation();
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
	renderRightView = () => {

		return (
			<TouchableOpacity onPress={ () => this._onCompletePress() }>
				<View style={{marginLeft:Pixel.getPixel(20),width:Pixel.getPixel(50),height:Pixel.getPixel(40),justifyContent:'center',
                    alignItems:'center'}}>
					<Text allowFontScaling={false}
					      style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>完成</Text>
				</View>
			</TouchableOpacity>
		)


	}
	/*
	 * 完成点击
	 * */
	_onCompletePress = () => {
        if (this.props.callBackRefresh) {
	        this.props.callBackRefresh(this.enterpriseData);
        }
		this._onBack();
		// this.toNextPage({
		// 		name: 'CarInitialTaskScene',
		// 		component: CarInitialTaskScene,
		// 		params: {}
		// 	}
		// );

	};

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
					title='经营地址'
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

				{/*所在地区view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>所在地区</Text>
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


				{/*点击定位view*/}

				<TouchableOpacity
					style={[styles.btnOk,{backgroundColor:'white',flexDirection:'row',marginHorizontal: Pixel.getPixel(0),marginBottom: Pixel.getPixel(0),}]}
					activeOpacity={0.6}
					onPress={this._dingweiPress}>
					<Image source={require('./kuaisushouxin_images/location.png')}
					       style={{width:Pixel.getPixel(25),height:Pixel.getPixel(25)}}/>

					<Text allowFontScaling={false}
					      style={[styles.btnFont,{color:'black',marginLeft:Pixel.getPixel(10)}]}>点击定位到当前地址</Text>
				</TouchableOpacity>


				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>


				<TextInput
					ref={(input) => {
                                this.xiangxidizhi = input
                            }}
					style={{width:width,height:Pixel.getPixel(135),backgroundColor:'white',
					padding:Pixel.getPixel(15),fontSize: Pixel.getFontPixel(14),color: 'black',textAlign: 'left'}}
					underlineColorAndroid='transparent'
					onChangeText={this._xiangxidizhiChange}
					placeholder='请输入详细地址(100字以内)'
					defaultValue={this.state.xiangxidizhi}
					placeholderTextColor={fontAndColor.COLORA1}
					maxLength = {100}
					multiline = {true}
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


			</ScrollView>
		)
	}

}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: fontAndColor.COLORA3,
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
		textAlign: 'left'
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