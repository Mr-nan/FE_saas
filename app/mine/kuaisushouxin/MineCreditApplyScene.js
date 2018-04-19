import React from 'react';
import {
	AppRegistry,
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Text,
	Platform,
	Linking,
	NativeModules,
	BackAndroid,
	InteractionManager,
	ScrollView,
	Image,
	KeyboardAvoidingView,
	StatusBar
} from 'react-native';


const IS_ANDROID = Platform.OS === 'android';
// import OpenCreditScene from '../main/OpenCreditScene'
import BaseComponent from '../../component/BaseComponent';
var {height, width} = Dimensions.get('window');
import * as fontAndColor  from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
let Pixel = new PixelUtil();
import AllNavigationView from '../../component/AllNavigationView';

import ZongheCreditApply from '../../mine/kuaisushouxin/ZongheCreditApply';//综合授信
import Authentication from '../../mine/kuaisushouxin/Authentication';
import StorageUtil from "../../utils/StorageUtil";
import * as storageKeyNames from "../../constant/storageKeyNames";
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import NewCarCreditEnterpriseInfoCheck from "./NewCarCreditEnterpriseInfoCheck";
import FastCreditOne from "./FastCreditOne";


//验四页面


export default class MineCreditApplyScene extends BaseComponent {

	constructor(props) {
		super(props);
		this.personData = {
			borrower_base_id: '', //借款人服务平台base_id
			borrower_cardid: '', //借款人身份证号
			borrower_name: '',    //借款人姓名
			borrower_tel: '',     //借款人手机号
		}
		this.state = {
			renderPlaceholderOnly: 'loading',
			successCredit: 0,
			xiaoeCreditStatus: 1, //0是未申请,1是审核中,2是审核通过,3是审核未通过
			APPEAR: false,
			xincheCreditStatus: 1,
			zongheCreditStatus: 0,
			ZongheResult: '',
			XiaoeResult: '',
			DancheResult: '',

		};

	}

	handleBack = () => {
		NativeModules.VinScan.goBack();
		return true;
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

	initFinish = () => {
		this._getCreditInfo();

	}
	_getCreditInfo = () => {
		StorageUtil.mGetItem(storageKeyNames.USER_INFO, (childdata) => {
			if (childdata.code == 1) {
				let childdatas = JSON.parse(childdata.result);


				if (this.isNull(childdatas.boss_idcard))//没有获取到身份证号码
				{
					if (Platform.OS === 'android') {
						device_code = 'dycd_platform_android';
					} else {
						device_code = 'dycd_platform_ios';
					}
					let maps = {
						device_code: device_code,
					};
					this.setState({
						loading: true,
					});
					request(Urls.USER_GETINFO, 'Post', maps)
						.then((response111) => {
							this.idcard_number = response111.mjson.data.idcard_number;
							this.personData.borrower_cardid = childdatas.boss_idcard;    //借款人身份证号
							this.boss_id = childdatas.boss_id;
							this.personData.borrower_base_id = global.companyBaseID;	//借款人服务平台base_id
							this.personData.borrower_name = childdatas.boss_name;	    //借款人姓名
							this.personData.borrower_tel = childdatas.boss_tel;	    //借款人电话

							let maps = {
								base_id: global.companyBaseID,	//借款人服务平台base_id
								controller_base_id: childdatas.boss_id,    //借款人身份证号
								merge_id: global.MERGE_ID,
							}

							request(Urls.GETCREDITSTATUSBYMERGE, 'Post', maps)
								.then((response) => {
										let DATA = response.mjson.data.credit;
										let ZongheStatus = DATA.comprehensive.credit_application_status;
										let XiaoeheStatus = DATA.halfpenny.credit_application_status;
										let DancheStatus = DATA.newcar.credit_application_status;


										this.ZongheResult = DATA.comprehensive.remark;
										this.XiaoeResult = DATA.halfpenny.remark;
										this.DancheResult = DATA.newcar.remark;

										if (ZongheStatus == 3 || XiaoeheStatus == 3 || DancheStatus == 3) {
											//任意一种未通过
											this.Appear = true;

										} else {
											this.Appear = false;
										}
										if(this.isNull(this.ZongheResult) && this.isNull(this.XiaoeResult) && this.isNull(this.DancheResult))
										{
											this.Appear = false;
										}
										else {
											this.Appear = true;
										}


										let maps2 = {
											borrower_base_id: global.companyBaseID,	//借款人服务平台base_id
											borrower_cardid: this.boss_idcard,    //借款人身份证号
											borrower_name: childdatas.boss_name,	    //借款人姓名
										}
										request(Urls.CHECKFOUR, 'Post', maps2)
											.then((response22) => {

													let YANSI_Result = response22.mjson.data.fourElementCheckFlags;
													this.setState(
														{
															renderPlaceholderOnly: 'success',
															YANSI_Result: this._getYanSiResult(YANSI_Result),
															xiaoeCreditStatus: XiaoeheStatus,
															xincheCreditStatus: DancheStatus,
															zongheCreditStatus: ZongheStatus,
															renderPlaceholderOnly: 'success',
															APPEAR:this.Appear,

														});
												},
												(error) => {
													this.setState({renderPlaceholderOnly: 'error'});
												});

									},
									(error) => {
										this.setState({renderPlaceholderOnly: 'error'});
									});

						}, (error) => {
							this.props.showToast(error.mjson.msg + "");
							this.setState({
								renderPlaceholderOnly: 'error',
							});
						});


				}
				else
				{
					this.idcard_number = childdatas.boss_idcard;
					this.personData.borrower_cardid = childdatas.boss_idcard;    //借款人身份证号
					this.boss_id = childdatas.boss_id;
					this.personData.borrower_base_id = global.companyBaseID;	//借款人服务平台base_id
					this.personData.borrower_name = childdatas.boss_name;	    //借款人姓名
					this.personData.borrower_tel = childdatas.boss_tel;	    //借款人电话

					let maps = {
						base_id: global.companyBaseID,	//借款人服务平台base_id
						controller_base_id: childdatas.boss_id,    //借款人身份证号
						merge_id: global.MERGE_ID,
					}

					request(Urls.GETCREDITSTATUSBYMERGE, 'Post', maps)
						.then((response) => {
								let DATA = response.mjson.data.credit;
								let ZongheStatus = DATA.comprehensive.credit_application_status;
								let XiaoeheStatus = DATA.halfpenny.credit_application_status;
								let DancheStatus = DATA.newcar.credit_application_status;


								this.ZongheResult = DATA.comprehensive.remark;
								this.XiaoeResult = DATA.halfpenny.remark;
								this.DancheResult = DATA.newcar.remark;

								if (ZongheStatus == 3 || XiaoeheStatus == 3 || DancheStatus == 3) {
									//任意一种未通过
									this.Appear = true;

								} else {
									this.Appear = false;
								}


								let maps2 = {
									borrower_base_id: global.companyBaseID,	//借款人服务平台base_id
									borrower_cardid: childdatas.boss_idcard,    //借款人身份证号
									borrower_name: childdatas.boss_name,	    //借款人姓名
								}
								request(Urls.CHECKFOUR, 'Post', maps2)
									.then((response22) => {

											let YANSI_Result = response22.mjson.data.fourElementCheckFlags;
											this.setState(
												{
													renderPlaceholderOnly: 'success',
													YANSI_Result: this._getYanSiResult(YANSI_Result),
													xiaoeCreditStatus: XiaoeheStatus,
													xincheCreditStatus: DancheStatus,
													zongheCreditStatus: ZongheStatus,
													renderPlaceholderOnly: 'success',
													APPEAR:this.Appear,
												});
										},
										(error) => {
											this.setState({renderPlaceholderOnly: 'error'});
										});

							},
							(error) => {
								this.setState({renderPlaceholderOnly: 'error'});
							});

				}




			}






			else {
				this.setState({renderPlaceholderOnly: 'error'});
			}
		});


	}
	_disappear = () => {
		this.setState({
			APPEAR: false
		});
	}
	_creditStatusForButton = (status) => {
		// if (status == 0) {
		// 	return '立即申请';
		// }
		if (status == 1) {
			return '审核中'
		} else {
			return '立即申请'
		}


	}
	_getYanSiResult = (YANSI_Result) => {
		if (YANSI_Result == 'F') {
			return false;
		} else {
			return true;
		}

	}

	render() {
		if (this.state.renderPlaceholderOnly !== 'success') {
			return this.loadView();
		}
		return (
			<View style={{flex: 1,backgroundColor: 'white',paddingTop: Pixel.getPixel(64),}}>
				{
					this.loadScrollView()
				}
				{/*导航栏view*/}
				<AllNavigationView
					title='申请授信'
					backIconClick={()=>{this.backPage();}}
				/>
			</View>





		);
	}

	/*
	 * 主界面1
	 * */
	loadScrollView = () => {
		return (
			<ScrollView style={{backgroundColor:'white'}}>

				{IS_ANDROID ? null : <StatusBar barStyle={'default'}/>}

				{/*//----------------------------------------------第 1 块view 新车订单授信----------------------------------------------*/}

				<View
					style={{width:width,alignItems:'center',backgroundColor:'white',marginTop:Pixel.getPixel(0),
					}}>
					{this.state.APPEAR ?
						<TouchableOpacity onPress={()=>{this._disappear()}}
						                  style={{backgroundColor:'rgba(255,255,208,1.00)',borderColor:'rgba(255,255,255,0.30)',
					                   width:Pixel.getPixel(336),padding:Pixel.getPixel(10),marginTop:Pixel.getPixel(10)}}>


							<Text allowFontScaling={false}
							      style={{color:'rgba(237,120,92,1.00)',fontSize: Pixel.getFontPixel(14),marginTop:Pixel.getPixel(0)}}>
								{this.DancheResult}
							</Text>
							<Text allowFontScaling={false}
							      style={{color:'rgba(237,120,92,1.00)',fontSize: Pixel.getFontPixel(14),marginTop:Pixel.getPixel(10)}}>
								{this.XiaoeResult}
							</Text>
							<Text allowFontScaling={false}
							      style={{color:'rgba(237,120,92,1.00)',fontSize: Pixel.getFontPixel(14),marginTop:Pixel.getPixel(10)}}>
								{this.ZongheResult}</Text>


						</TouchableOpacity>
						: null}

					{this.state.xincheCreditStatus == 2 ?
						null :
						<Image source={require('../kuaisushouxin/kuaisushouxin_images/jinrongbeijinglanqian.png')}
						       style={{width:Pixel.getPixel(350),height:Pixel.getPixel(170),marginTop:Pixel.getPixel(20)}}>
							<View style={{marginTop:Pixel.getPixel(9),flexDirection:'row',alignItems:'flex-end',}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(14),marginLeft:Pixel.getPixel(15)}}>
									新车订单授信

								</Text>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(5)}}>
									在线
								</Text>
							</View>


							<View style={{marginTop:Pixel.getPixel(20),alignItems:'center',}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
									新车平台订单融资
								</Text>

								<View style={{flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
									<View style={{borderColor:'rgba(255,255,255,0.42)',borderWidth:1,borderRadius:Pixel.getPixel(8),
                                        width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center'}}>
										<Text allowFontScaling={false}
										      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(10)}}>最长期限  长期</Text>
									</View>
									<View style={{borderColor:'rgba(255,255,255,0.42)',borderWidth:1,borderRadius:Pixel.getPixel(8),
                                        width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center',marginLeft:Pixel.getPixel(10)}}>
										<Text allowFontScaling={false}
										      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(10)}}>最高额度  200万</Text>
									</View>

								</View>


								<TouchableOpacity
									onPress={()=>{this._applyCredit('xinchedingdan',this.state.xincheCreditStatus)}}
									style={{marginTop:Pixel.getPixel(20),backgroundColor:'rgba(255,255,255,0.30)',borderColor:'rgba(255,255,255,0.30)',borderWidth:1,borderRadius:Pixel.getPixel(13),
                                                       width:Pixel.getPixel(85),height:Pixel.getPixel(27),alignItems:'center',justifyContent:'center'}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(15)}}>{this._creditStatusForButton(this.state.xincheCreditStatus)}</Text>
								</TouchableOpacity>

							</View>
						</Image>
					}


				</View>

				{/*//----------------------------------------------第 2 块view 小额授信----------------------------------------------*/}
				{this.state.xiaoeCreditStatus !== 2 ?
					<View
						style={{width:width,backgroundColor:'white',borderTopColor:'#F0EFF5',borderTopWidth:Pixel.getPixel(11)}}>
						<View style={{marginTop:Pixel.getPixel(9),flexDirection:'row',alignItems:'flex-end',}}>
							<Image source={require('../kuaisushouxin/kuaisushouxin_images/kuaisu.png')}
							       style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(21)}}/>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(14),marginLeft:Pixel.getPixel(5)}}>
								小额授信
							</Text>
						</View>


						<View style={{marginTop:Pixel.getPixel(20),alignItems:'center',}}>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:fontAndColor.COLORB0,fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
								单车、采购贷、
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
									二手车订单融资
								</Text>
							</Text>

							<View style={{flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
								<View style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
                                    width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center'}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}}>最长期限  12个月</Text>
								</View>
								<View style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
                                    width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center',marginLeft:Pixel.getPixel(10)}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}}>最高额度  50万</Text>
								</View>

							</View>
							{/*灰色的线*/}
							<View style={{backgroundColor:fontAndColor.COLORA4,width:Pixel.getPixel(width-30),
                                height:Pixel.getPixel(1),marginTop:Pixel.getPixel(28)}}/>

							<TouchableOpacity onPress={()=>{this._applyCredit('kuaisu',this.state.xiaoeCreditStatus)}}
							                  style={{marginTop:Pixel.getPixel(0),backgroundColor:'white',
                                                   width:width,height:Pixel.getPixel(39),alignItems:'center',justifyContent:'center'}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(15)}}>{this._creditStatusForButton(this.state.xiaoeCreditStatus)}</Text>
							</TouchableOpacity>

						</View>
					</View>
					: null
				}


				{/*//----------------------------------------------第 3 块view 综合授信----------------------------------------------*/}
				{this.state.zongheCreditStatus !== 2 ?
					<View
						style={{width:width,backgroundColor:'white',borderTopColor:'#F0EFF5',borderTopWidth:Pixel.getPixel(11)}}>
						<View style={{marginTop:Pixel.getPixel(9),flexDirection:'row',alignItems:'flex-end',}}>
							<Image source={require('../kuaisushouxin/kuaisushouxin_images/zonghe.png')}
							       style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(21)}}/>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(14),marginLeft:Pixel.getPixel(5)}}>
								综合授信
							</Text>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA4,fontSize: Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(5)}}>
								在线
							</Text>
						</View>


						<View style={{marginTop:Pixel.getPixel(20),alignItems:'center',}}>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:fontAndColor.COLORB0,fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
								库容、单车融资
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
									等平台内全业务
								</Text>
							</Text>

							<View style={{flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
								<View style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
                                    width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center'}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}}>最长期限  12个月</Text>
								</View>
								<View style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
                                    width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center',marginLeft:Pixel.getPixel(10)}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}}>最高额度  5000万</Text>
								</View>

							</View>
							{/*灰色的线*/}
							<View style={{backgroundColor:fontAndColor.COLORA4,width:Pixel.getPixel(width-30),
                                height:Pixel.getPixel(1),marginTop:Pixel.getPixel(28)}}/>

							<TouchableOpacity onPress={()=>{this._applyCredit('zonghe',this.state.zongheCreditStatus)}}
							                  style={{marginTop:Pixel.getPixel(0),backgroundColor:'white',
                                                   width:width,height:Pixel.getPixel(39),alignItems:'center',justifyContent:'center'}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(15)}}>{this._creditStatusForButton(this.state.zongheCreditStatus)}</Text>
							</TouchableOpacity>


						</View>


					</View>
					: null
				}

				{/*灰色的线*/}
				<View style={{backgroundColor:'#F0EFF5',width:Pixel.getPixel(width),
						height:Pixel.getPixel(10),marginTop:Pixel.getPixel(0)}}/>
			</ScrollView>
		)
	}

	_applyCredit = (type, status) => {


		if (status == 1) {
			this.props.showToast('您提交的申请正在审核中，请稍后')
			return;
		}
		if (type == 'zonghe') {
			this.toNextPage({
				name: 'ZongheCreditApply',
				component: ZongheCreditApply,
				params: {
					FromScene: 'mineZongApply',

				},
			})
		}

		if (this.state.YANSI_Result) {//验四通过，申请跳到填写资料界面
			if (type == 'xinchedingdan') {
				this.toNextPage({
					name: 'NewCarCreditEnterpriseInfoCheck',
					component: NewCarCreditEnterpriseInfoCheck,
					params: {
						FromScene: 'xinchedingdanANDmine',
						// callBackRefresh:this.props.callBackRefresh,

					},
				})
			}
			if (type == 'kuaisu') {
				if(this.state.zongheCreditStatus == 2 ){
					this.props.showToast('您的综合授信在有效期内，暂时无法申请小额授信')
					return;

				}else {
					this.toNextPage({
						name: 'FastCreditOne',
						component: FastCreditOne,
						params: {
							FromScene: 'kuaisuANDmine',
							// callBackRefresh:this.props.callBackRefresh,
						},
					})
				}



			}
		}
		else {//验四没有通过，申请跳转到验四界面

			if (type == 'xinchedingdan') {
				this.toNextPage({
					name: 'Authentication',
					component: Authentication,
					params: {
						FromScene: 'xinchedingdan',
						DATA: this.personData,
						// callBackRefresh:this.props.callBackRefresh,
					},
				})
			}
			if (type == 'kuaisu') {
				if(this.state.zongheCreditStatus == 2 ){
					this.props.showToast('您的综合授信在有效期内，暂时无法申请小额授信')
					return;

				}else {
					this.toNextPage({
						name: 'Authentication',
						component: Authentication,
						params: {
							FromScene: 'kuaisu',
							DATA: this.personData,
							// callBackRefresh:this.props.callBackRefresh,
						},
					})
				}
			}
		}
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
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: Pixel.getPixel(0),
	},
	fillSpace: {
		flex: 1,
		marginTop: Pixel.getPixel(30)
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
});

