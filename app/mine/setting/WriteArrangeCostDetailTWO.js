/**
 * Created by yujinzhong on 2017/7/28.
 */
import React, {Component} from "react";
import {
	AppRegistry,
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	PixelRatio,
	TouchableOpacity,
	InteractionManager,
	TouchableWithoutFeedback,
	NativeModules,
	ScrollView
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import PixelUtil from "../../utils/PixelUtil";
import * as FontAndColor from "../../constant/fontAndColor";
import NavigationBar from "../../component/NavigationBar";
import EvaluateCarInfoTWO from "./EvaluateCarInfoTWO";

import YJZButton from '../../mine/setting/YJZButton';

var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
var onePT = 1 / PixelRatio.get(); //一个像素
var Platform = require('Platform');
let buttonArray = [];
let AllButtonArray = [];

export class buttonItemInfo {
	constructor(numberTitle, partTitle, unableClick, leftDistance, topDistance, select) {

		this.numberTitle = numberTitle;
		this.partTitle = partTitle;
		this.unableClick = unableClick;
		this.leftDistance = leftDistance;
		this.topDistance = topDistance;
		this.select = select;
		this.key = partTitle;

	}

};
export default class EvaluateCarInfo extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {

			SELECT: true,
		}
		let buttonArray1 = [
			new buttonItemInfo('1', '右前大灯', true, 170, 80, true),
			new buttonItemInfo('2', '左前大灯', true, 100, 80, true),
			new buttonItemInfo('13', '左外后车镜', true, 70, 40, true),
			new buttonItemInfo('11', '右外后车镜', true, 190, 40, true),
			new buttonItemInfo('12', '前格栅', true, 144, 20, true),
			new buttonItemInfo('3','左前轮',true,7,122,false),
			new buttonItemInfo('6','左后轮',true,6,285,false),
			new buttonItemInfo('7','右前轮',true,290,120,false),
			new buttonItemInfo('10','右后轮',true,288,282,false),
			new buttonItemInfo('4','左前车窗',true,53,182,false),
			new buttonItemInfo('5','左后车窗',true,53,225,false),
			new buttonItemInfo('8','右前车窗',true,225,183,false),
			new buttonItemInfo('9','右后车窗',true,225,226,false),
			new buttonItemInfo('14','前挡风玻璃',true,135,156,false),
			new buttonItemInfo('15','天窗玻璃及饰条',true,125,210,false),
			new buttonItemInfo('16','后挡风玻璃',true,135,276,false),
			new buttonItemInfo('17','右后尾灯',true,198,376,false),
			new buttonItemInfo('18','四轮轮罩',true,142,376,false),
			new buttonItemInfo('19','左后尾灯',true,85,376,false),
		];
		let buttonArray2 = [
			new buttonItemInfo('8', '副仪表盘', true, 90, 85, false),
			new buttonItemInfo('10', '安全气囊', true, 190, 95, false),
			new buttonItemInfo('14', '副座椅', true, 185, 175, false),
			new buttonItemInfo('1', '前排风出口', true, 245, 30, false),
			new buttonItemInfo('9', '中控台', true, 150, 85, false),
			new buttonItemInfo('7', '左前门内饰', true, 27, 117, true),
			new buttonItemInfo('5', '安全带外观检查', true, 6, 327, false),
			new buttonItemInfo('2', '右前门内饰', true, 245, 115, false),
			new buttonItemInfo('4', '后排风出口', true, 245, 300, false),
			new buttonItemInfo('12', '主座椅', true, 115, 175, true),
			new buttonItemInfo('6', '左后门内饰', true, 28, 210, false),
			new buttonItemInfo('3', '右后门内饰', true, 245, 210, true),
			new buttonItemInfo('17', '右后座椅', true, 185, 260, false),
			new buttonItemInfo('13', '扶手箱', true, 150, 145, true),
			new buttonItemInfo('15', '顶衬', true, 155, 225, false),
			new buttonItemInfo('18', '随车工具', true, 145, 327, false),
			new buttonItemInfo('19', '备胎', true, 198, 390, false),
			new buttonItemInfo('16', '左后座椅', true, 112, 260, true),
			new buttonItemInfo('20', '后备箱盖板', true, 85, 410, false),
		];
		let buttonArray3 = buttonArray1;
		AllButtonArray = [buttonArray1,buttonArray2,buttonArray3];
	}

	initFinish = () => {
		InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: false});
			// this.Verifycode();
		});
	}
	_ONclick = (title) => {
		alert(title);
	}

	render() {
		let items1 = [];
		let items2 = [];
		let items3 = [];
		for(let i = 0;i< AllButtonArray.length;i++){
			buttonArray = AllButtonArray[i];
			buttonArray.map((dataSource) => {
				let tabItem;
				tabItem =
					<YJZButton
						key = {dataSource.key} select = {dataSource.select}
						UnableClick={dataSource.unableClick} PartTitle={dataSource.partTitle}
						NumTitle={dataSource.numberTitle} MYLEFT={dataSource.leftDistance} MYTOP={dataSource.topDistance}
						callBack={(partTitle)=>{
					this._ONclick(partTitle);
				}

				}>
					</YJZButton>
				if (i == 0){
					items1.push(tabItem);

				}
				if (i == 1){
					items2.push(tabItem);

				}
				if (i == 2){
					items3.push(tabItem);

				}
			})


		}

		return (
			<View style={styles.container}>
				<NavigationBar
					leftImageShow={true}
					leftTextShow={false}
					centerText={"填写整备费明细"}
					rightText={"完成"}
					leftImageCallBack={this.backPage}
					rightTextCallBack={this.backPage}/>
				<ScrollView contentContainerStyle={{alignItems: 'center',width:Width}}>
					<View style={{width:Width}}>
						<Text allowFontScaling={false} style={styles.firstTextStyle}>外观受损图</Text>
					</View>
					<Image
						source={require('../../../images/mainImage/moxingyi.png')}
						style={styles.imageStyle}
					>
						{items1}

					</Image>
					<View style={{width:Width}}>
						<Text allowFontScaling={false} style={styles.firstTextStyle}>内饰受损图</Text>
					</View>
					<Image
						source={require('../../../images/mainImage/moxinger.png')}
						style={styles.imageTwoStyle}
					>
						{items2}

					</Image>
					<View style={{width:Width}}>
						<Text allowFontScaling={false} style={styles.firstTextStyle}>漆面受损图</Text>
					</View>
					<Image
						source={require('../../../images/mainImage/moxingyi.png')}
						style={styles.imageStyle}
					>
						{items3}

					</Image>
				</ScrollView>


			</View>
		);
	}

	loginOut = () => {
		this.toNextPage({
			name: 'EvaluateCarInfoTWO',
			component: EvaluateCarInfoTWO,
			params: {},
		})
	}


}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	itemStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		width: Width,
		height: Pixel.getPixel(160),
		backgroundColor: '#ffffff'
	},
	imageTwoStyle:{
		marginTop: Pixel.getPixel(20),
		width: Pixel.getPixel(327),
		height: Pixel.getPixel(455),
	},
	firstTextStyle: {
		color: FontAndColor.COLORA0,
		fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30),
		marginTop: Pixel.getPixel(10),
		marginLeft: Pixel.getPixel(20),
	},
	secondTextStyle: {
		color: FontAndColor.COLORA0,
		fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
		marginTop: Pixel.getPixel(10),
	},
	forthTextStyle: {
		flex: 1,
		color: FontAndColor.COLORA0,
		fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
		marginTop: Pixel.getPixel(19),
	},

	loginBtnStyle: {
		height: Pixel.getPixel(44),
		width: Width - Pixel.getPixel(30),
		backgroundColor: FontAndColor.COLORB0,
		marginTop: Pixel.getPixel(30),
		marginBottom: Pixel.getPixel(10),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Pixel.getPixel(4),
	},
	loginButtonTextStyle: {
		color: FontAndColor.COLORA3,
		fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
	},
	imageStyle: {
		marginTop: Pixel.getPixel(20),
		width: Pixel.getPixel(327),
		height: Pixel.getPixel(415),
	},
	progressImageStyle: {
		marginTop: Pixel.getPixel(15),
		width: Pixel.getPixel(291),
		height: Pixel.getPixel(30),
	}

});