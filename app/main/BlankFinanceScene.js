import React from 'react';
import {
	AppRegistry,
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Image,
	BackAndroid,
	InteractionManager,
	Text,
	AppState,
} from 'react-native';
import * as fontAndColor from '../constant/fontAndColor';

import BaseComponent from '../component/BaseComponent';
import MyButton from '../component/MyButton';
let {height, width} = Dimensions.get('window');
import MainPage from './MainPage';
import StorageUtil from '../utils/StorageUtil';
import * as KeyNames from '../constant/storageKeyNames';
import {request} from '../utils/RequestUtil';
import * as Urls from '../constant/appUrls';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
import FinanceScene from './FinanceScene'
import NonCreditScene from './NonCreditScene'
import FinanceCreditApplyScene from './FinanceCreditApplyScene'
import SQLiteUtil from "../utils/SQLiteUtil";
import FastCreditTwo from "../mine/kuaisushouxin/FastCreditTwo";
const SQLite = new SQLiteUtil();
const versionCode = 33.0;
let Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';

export default class BlankFinanceScene extends BaseComponent {

	constructor(props) {
		super(props);
		this.state = {
			renderPlaceholderOnly: 'blank',
			showType: 1,
			creditStatusAndType:{},
		}

	}

	componentDidMount() {

		try {
			BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
		} catch (e) {

		} finally {
			//InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: 'loading'});
			this.initFinish();
			//});
		}


	}

	/**
	 *   初始化
	 **/
	initFinish = () => {
		if (this.props.BASE_USER_ID == this.props.MAPS.controller_base_id) {//实际控制人登录


			request(Urls.GETCREDITSTATUSBYMERGE, 'Post', this.props.MAPS)
				.then((response) => {
						let DATA = response.mjson.data.credit;
						let ZongheStatus = DATA.comprehensive.credit_application_status;
						let XiaoeheStatus = DATA.halfpenny.credit_application_status;
						let DancheStatus = DATA.newcar.credit_application_status;

                        if (ZongheStatus == 3 ||XiaoeheStatus == 3 || DancheStatus == 3 ){
                            //任意一种未通过
							this.Appear = true;
                        }else {
                            this.Appear = false;
                        }

						if (ZongheStatus == 2 ||XiaoeheStatus == 2 || DancheStatus == 2 ){
							//任意一种通过，就跳到授信额度页面
							this.setState({showType: 2, renderPlaceholderOnly: 'success'});
						}
						else {

							this.setState({showType: 3, renderPlaceholderOnly: 'success',creditStatusAndType:DATA});
						}

					},
					(error) => {
						this.setState({renderPlaceholderOnly: 'error'});
					});

		}
		else {//非实际控制人登录
			if (this.props.IS_DONE_CREDIT == 0) {
				this.setState({showType: 1, renderPlaceholderOnly: 'success'});
			} else {
				this.setState({showType: 2, renderPlaceholderOnly: 'success'});

			}
		}

	}


	render() {
		if (this.state.renderPlaceholderOnly !== 'success') {
			return this._renderPlaceholderView();
		}
		if (this.state.showType == 2) {
			return (<View style={{flex:1}}>
				<FinanceScene  showModal={(value)=>{this.props.showModal(value);}}
				               showToast={(content)=>{this.props.showToast(content)}}
				               toNextPage={(params) => {this.props.toNextPage(params);
                }}/>
			</View>)

		} else if (this.state.showType == 3) {
			return (<View style={{flex:1}}>
				<FinanceCreditApplyScene  callBackRefresh={()=>{
					//刷新
					this.setState({
                        renderPlaceholderOnly: 'loading',
					},() => {
						this.initFinish();
					})
				}}  showModal={(value)=>{this.props.showModal(value);}}
				                          showToast={(content)=>{this.props.showToast(content);}}
				                          toNextPage={(params) => {this.props.toNextPage(params);}}
				                          data = {this.state.creditStatusAndType}
										  maps = {this.props.MAPS}
										  appear = {this.Appear}
				/>
			</View>)

		} else {
			return (<View style={{flex:1}}>
				<NonCreditScene showModal={(value)=>{this.props.showModal(value);}}
				                showToast={(content)=>{this.props.showToast(content)}}
				                toNextPage={(params) => {this.props.toNextPage(params);
                }}/>
			</View>)

		}


	}

	_renderPlaceholderView = () => {
		return (
			<View style={{flex: 1, backgroundColor: fontAndColor.COLORA3, alignItems: 'center'}}>
				{this.loadView()}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	parentStyle: {
		flex: 1
	},
	childStyle: {
		width: width,
		height: height
	},
});


