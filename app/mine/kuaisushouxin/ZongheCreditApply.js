import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	ListView,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
let {height, width} = Dimensions.get('window');
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import *as fontAndColor from '../../constant/fontAndColor';
import *as appUrls from '../../constant/appUrls';
import *as RequestUtil from '../../utils/RequestUtil';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
let carConfigurationData = [];
const data = [
	{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	}, {
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	}, {
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	}, {
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	}, {
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},{
		title: '2016-06-20|5532公里',
		type: '正常维修',
		content: '更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
	},
];

export  default class ZongheCreditApply extends BaseComponent {

	// 构造
	constructor(props) {
		super(props);
		// 初始状态

		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {

			dataSource: ds,
			renderPlaceholderOnly: 'blank',
		}
	}

	/**
	 * from @zhaojian
	 *
	 * 初始化页面数据
	 **/
	initFinish = () => {
		carConfigurationData = [];
		this.loadData();
	}

	render() {

		if (this.state.renderPlaceholderOnly !== 'success') {
			return (
				<View style={{flex:1,backgroundColor:'white'}}>
					{this.loadView()}
					<NavigationView title="综合授信申请" backIconClick={()=>{this.backPage();}}/>
				</View>);
		}
		return (
			<View style={styles.rootContainer}>
				<ListView
					removeClippedSubviews={false}
					dataSource={this.state.dataSource}
					renderHeader={()=>
                        <View style={styles.headView}>
                            <Text allowFontScaling={false}  style={styles.headViewText}>借款人
                            </Text>
                    </View>
                    }
					renderRow={this.renderRow}/>
				<NavigationView title="综合授信申请" backIconClick={()=>{this.backPage();}}/>
				<View style={{height:Pixel.getPixel(54),width:width,position: 'absolute',bottom:0,backgroundColor:'transparent',
				flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
					<TouchableOpacity
						onPress={() =>{this.backPage();}}
						style={styles.selectBtn}
						activeOpacity={0.6}>
						<Text allowFontScaling={false}
						      style={{fontSize: Pixel.getFontPixel(14),color: fontAndColor.COLORB0,}}>取消</Text>
					</TouchableOpacity>
					<View style={{flex:1}}/>
					<TouchableOpacity
						style={[styles.selectBtn,{backgroundColor:fontAndColor.COLORB0}]}
						activeOpacity={0.6}
						onPress={()=>{this.backPage();}}>
						<Text allowFontScaling={false}
						      style={{fontSize: Pixel.getFontPixel(14),color:'white'}}>提交</Text>
					</TouchableOpacity>

				</View>
			</View>
		)
	}

	/**
	 * from @zhaojian
	 *
	 * 每条item布局
	 **/
	renderRow = (rowData) => {
		return (
			<View style={styles.cellView}>
				<View style={styles.cellTitleView}>
					<View style= {{flexDirection:'row',alignItems:'center'}}>
						<Text allowFontScaling={false}
						      style={[styles.cellTitleViewTitle,{fontSize:Pixel.getFontPixel(15),color:'black'}]}>张宝山

						</Text >
						<Text allowFontScaling={false}
						      style={[styles.cellTitleViewValue,{marginLeft:Pixel.getPixel(10)}]}>
							实际控制人
						</Text>
					</View>

					<Text allowFontScaling={false} style={[styles.cellTitleViewValue,{fontSize:Pixel.getFontPixel(15)}]}>已验证</Text>
				</View>
				<Text allowFontScaling={false} style={[styles.cellContent,{color: fontAndColor.COLORA1}]}>第一车贷商务有限公司</Text>
			</View>
		)
	}

	/**
	 * from @zhaojian
	 *
	 * 获取维修保养数据
	 **/
	loadData = () => {

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data),
			renderPlaceholderOnly: 'success',

		});

		// RequestUtil.request(appUrls.CAR_GET_ERPORT, 'post', {'vin': 'LVGBE40K47G166071'}).then((response) => {
		//
		// 	if (response.mjson.data.result.length > 0) {
		//
		// 		this.setState({
		// 			dataSource: this.state.dataSource.cloneWithRows(response.mjson.data.result),
		// 			renderPlaceholderOnly: 'success',
		//
		// 		});
		//
		// 	} else {
		// 		this.setState({
		// 			renderPlaceholderOnly: 'null',
		// 		});
		// 	}
		//
		// }, (error) => {
		// 	this.setState({
		// 		renderPlaceholderOnly: 'null',
		// 	});
		// });
	}

	/**
	 * from @zhaojian
	 *
	 * 数据为空时展示的UI
	 **/
	// nullDataView = () => {
	// 	return (
	// 		<View style={{flex: 1, alignItems: 'center',justifyContent:'center',
     //        backgroundColor: fontAndColor.COLORA3}}>
	// 			<Image
	// 				style={{
     //                                 width: Pixel.getPixel(141),
     //                                 height: Pixel.getPixel(183),
     //                                 resizeMode:'stretch'
     //                             }}
	// 				source={require('../../images/noData.png')}/>
	// 			<Text allowFontScaling={false}
	// 			      style={{
     //                         color: fontAndColor.COLORA0, fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
     //                         marginTop: Pixel.getPixel(27),
     //                         width:Pixel.getPixel(241),
     //                         textAlign: 'center'
     //                     }}>
	// 				该车辆暂无维修保养记录，您可以查看车辆其他相关信息。
	// 			</Text>
	//
	// 			<View style={{width:width,height: Pixel.getPixel(40),paddingLeft:Pixel.getPixel(30),
     //                     paddingRight:Pixel.getPixel(30),flexDirection:'row',marginTop:Pixel.getPixel(40),justifyContent:'center'}}>
	// 				<TouchableOpacity onPress={()=>{
     //                       {/*this.pushCarConfigScene();*/}
     //                 }} activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center',
     //                             backgroundColor: fontAndColor.COLORB0,marginRight:Pixel.getPixel(20)}}>
	// 					<Text allowFontScaling={false} style={{color: '#fff',fontSize:
     //                                      Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>查看配置信息</Text>
	// 				</TouchableOpacity>
	// 				{ this.props.carData.dealer_price > 0 && (
	//
	// 					(this.props.carData.city_id != '0' && this.props.carData.model_id != '0' && this.props.carData.city_id != '' && this.props.carData.model_id != '') &&
	// 					<TouchableOpacity onPress={()=>{
     //                        console.log('123123');
     //                        {/*this.pushCarReferencePriceScene();*/}
     //                 }} activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center',
     //                     borderColor:fontAndColor.COLORB0,borderWidth: 1,marginLeft:Pixel.getPixel(20)}}>
	// 						<Text allowFontScaling={false} style={{color: fontAndColor.COLORB0,fontSize:
     //                                      Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>查看参考价</Text>
	// 					</TouchableOpacity>
	// 				)}
	// 			</View>
	// 		</View>
	// 	)
	// }

	/**
	 * from @zhaojian
	 *
	 * 跳转车辆配置信息页面
	 **/
	// pushCarConfigScene = () => {
	// 	let navigationParams = {
	// 		name: "AutoConfig",
	// 		component: AutoConfig,
	// 		params: {
	// 			modelID: this.props.carData.model_id,
	// 			carConfiguraInfo: this.props.carData.modification_instructions,
	// 			carConfigurationData: carConfigurationData,
	// 			renderCarConfigurationDataAction: this.renderCarConfigDataAction,
	// 			from: 'CarUpkeepScene'
	// 		}
	// 	}
	// 	this.toNextPage(navigationParams);
	// };

	/**
	 * from @zhaojian
	 *
	 * 跳转车辆参考价页面
	 **/
	// pushCarReferencePriceScene = () => {
	// 	console.log('321321312');
	// 	let navigationParams = {
	// 		name: "CarReferencePriceScene",
	// 		component: CarReferencePriceScene,
	// 		params: {
	// 			city_id: this.props.carData.city_id,
	// 			mileage: this.props.carData.mileage,
	// 			model_id: this.props.carData.model_id,
	// 			init_reg: this.dateReversal(this.props.carData.init_reg + '000'),
	// 			from: 'CarUpkeepScene'
	// 		}
	// 	}
	// 	this.toNextPage(navigationParams);
	//
	// };


	/**
	 * from @zhaojian
	 *
	 * 存储车辆配置信息数据
	 **/
	renderCarConfigDataAction = (data) => {
		carConfigurationData = data;
		console.log(data);
	}

	/**
	 * from @zhaojian
	 *
	 * 时间戳转换
	 **/
	dateReversal = (time) => {

		const date = new Date();
		date.setTime(time);
		return (date.getFullYear() + "-" + (this.PrefixInteger(date.getMonth() + 1, 2)));

	};

	/**
	 * from @zhaojian
	 *
	 * 时间戳转换
	 **/
	PrefixInteger = (num, length) => {

		return (Array(length).join('0') + num).slice(-length);

	}
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		paddingTop: Pixel.getTitlePixel(64),
		paddingBottom: Pixel.getTitlePixel(54),
		backgroundColor: fontAndColor.COLORA3,
	},
	headView: {
		paddingHorizontal: Pixel.getPixel(15),
		paddingVertical: Pixel.getPixel(10),
		backgroundColor: fontAndColor.COLORA3,
	},
	headViewText: {
		color: fontAndColor.COLORA2,
		fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
	},
	cellView: {
		paddingHorizontal: Pixel.getPixel(15),
		borderBottomColor: fontAndColor.COLORA4,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: Pixel.getPixel(10),
		backgroundColor: 'white',
		flexWrap: 'wrap',

	},
	cellTitleView: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: fontAndColor.COLORA4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: Pixel.getPixel(10),

	},
	cellTitleViewTitle: {
		color: fontAndColor.COLORA1,
		fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
	},
	cellTitleViewValue: {
		color: fontAndColor.COLORB0,
		fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
	},
	cellContent: {
		marginTop: Pixel.getPixel(10),
		marginBottom: Pixel.getPixel(10),
		color: fontAndColor.COLORA0,
		fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
		backgroundColor: 'white'
	},
	selectBtn: {
		height: Pixel.getPixel(36),
		width: Pixel.getPixel(142),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Pixel.getFontPixel(2),
		marginRight: Pixel.getPixel(25),
		marginLeft: Pixel.getPixel(25),
		borderColor: fontAndColor.COLORB0,
		borderWidth: 1,

	},
});