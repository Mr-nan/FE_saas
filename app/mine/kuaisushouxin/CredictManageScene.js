/**
 * Created by yujinzhong on 2018/3/19.
 */
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
import MineCreditApplyScene from "./MineCreditApplyScene";
const Pixel = new PixelUtil();
let carConfigurationData = [];
const data = [
	{
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

export  default class CredictManageScene extends BaseComponent {

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
					<NavigationView title="授信管理" backIconClick={()=>{this.backPage();}}/>
				</View>);
		}
		return (
			<View style={styles.rootContainer}>
				<ListView
					removeClippedSubviews={false}
					dataSource={this.state.dataSource}
					renderHeader={()=>
                        <View style={styles.headView}>
                            <Text allowFontScaling={false}  style={styles.headViewText}>授信信息
                            </Text>
                    </View>
                    }
					renderRow={this.renderRow}/>
				<NavigationView title="授信管理" backIconClick={()=>{this.backPage();}}/>
				<View style={{height:Pixel.getPixel(54),width:width,position: 'absolute',bottom:0,backgroundColor:'transparent',
				flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

					<TouchableOpacity
						style={[styles.selectBtn,{backgroundColor:fontAndColor.COLORB0}]}
						activeOpacity={0.6}
						onPress={()=>{this._applyCredit();}}>
						<Text allowFontScaling={false}
						      style={{fontSize: Pixel.getFontPixel(14),color:'white'}}>申请授信</Text>
					</TouchableOpacity>

				</View>
			</View>
		)
	}
	/**
	 *
	 *  申请授信按钮点击事件
	 **/
	_applyCredit = (rowData) => {
		this.toNextPage(
			{
				name: 'MineCreditApplyScene',
				component: MineCreditApplyScene,
				params: {}
			})
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
						<Image source={require('../kuaisushouxin/kuaisushouxin_images/xiaotouxiang.png')}
						       style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginRight:Pixel.getPixel(10)}}/>
						<Text allowFontScaling={false}
						      style={[styles.cellTitleViewTitle,{fontSize:Pixel.getFontPixel(15),color:'black'}]}>张宝山

						</Text >
						<Text allowFontScaling={false}
						      style={[styles.cellTitleViewValue,{marginLeft:Pixel.getPixel(10)}]}>实际控制人
						</Text>
					</View>

					<Text allowFontScaling={false} style={[styles.cellTitleViewValue,{fontSize:Pixel.getFontPixel(15)}]}>已验证</Text>
				</View>

				<View style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: fontAndColor.COLORA4,flexDirection:'row',
				alignItems:'center',justifyContent:'space-between'}}>
					<Text allowFontScaling={false} style={[styles.cellContent,{color: fontAndColor.COLORA1}]}>新车订单贷授信</Text>
					<Text allowFontScaling={false} style={[styles.cellContent,{color: fontAndColor.COLORA1}]}>500万|有效</Text>
				</View>
				<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

					<Text allowFontScaling={false} style={[styles.cellContent,{color: fontAndColor.COLORA1}]}>综合授信</Text>
					<Text allowFontScaling={false} style={[styles.cellContent,{color: fontAndColor.COLORA1}]}>200万|2017.12.2—2019.12.2</Text>

				</View>
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
		width: Pixel.getPixel(342),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Pixel.getFontPixel(2),
		marginRight: Pixel.getPixel(25),
		marginLeft: Pixel.getPixel(25),
		borderColor: fontAndColor.COLORB0,
		borderWidth: 1,

	},
});