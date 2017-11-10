import  React, {Component, PropTypes} from  'react'
import  {
	View,
	Text,
	ListView,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity,
	NativeModules,
	BackAndroid,
	InteractionManager,
	RefreshControl,
	Linking
} from  'react-native'

import * as fontAndClolr from '../constant/fontAndColor';
import MycarScene from '../carSource/CarMySourceScene';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();

import ContractManageScene from '../mine/contractManage/ContractManageScene';

import AccountManageScene from '../mine/accountManage/AccountTypeSelectScene'
import WaitActivationAccountScene from '../mine/accountManage/WaitActivationAccountScene'
import AccountScene from '../mine/accountManage/AccountScene'
import BindCardScene from '../mine/accountManage/BindCardScene'

import AdjustManageScene from '../mine/adjustManage/AdjustManageScene'
import EmployeeManageScene from '../mine/employeeManage/EmployeeManageScene'
import EvaluateCarInfo from '../mine/setting/EvaluateCarInfo'
import Setting from './../mine/setting/Setting'
import  CarCollectSourceScene from '../carSource/CarCollectSourceScene';
import  BrowsingHistoryScene from '../carSource/BrowsingHistoryScene';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import EditEmployeeScene  from '../mine/employeeManage/EditEmployeeScene'
import ImageSource from '../publish/component/ImageSource';
import {request} from '../utils/RequestUtil';
import * as Urls from '../constant/appUrls';
import AccountModal from '../component/AccountModal';
import AuthenticationModal from '../component/AuthenticationModal';
import OrderTypeSelectScene from  '../mine/myOrder/OrderTypeSelectScene';
import CustomerAddScene from "../crm/StoresReception/ClientAddScene";
import StoreReceptionManageScene from "../crm/StoresReception/StoreReceptionManageScene";
import StoreReceptionManageNewScene from "../crm/StoresReception/StoreReceptionManageNewScene";
import EnterpriseCertificate from "../mine/certificateManage/EnterpriseCertificate";
import PersonCertificate from "../mine/certificateManage/PersonCertificate";

let Platform = require('Platform');
import ImagePicker from "react-native-image-picker";
let firstType = '-1';
let lastType = '-1';
let haveOrder = 0;
import GetPermissionUtil from '../utils/GetPermissionUtil';
const GetPermission = new GetPermissionUtil();
let componyname = '';
const cellJianTou = require('../../images/mainImage/celljiantou.png');
let Car = [];
let BASE_ID = [];
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
const options = {
	//弹出框选项
	title: '请选择',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '选择相册',
	allowsEditing: true,
	noData: false,
	quality: 1.0,
	maxWidth: 480,
	maxHeight: 800,
	storageOptions: {
		skipBackup: true,
		path: 'images',
	}
}
import BaseComponent from '../component/BaseComponent';

export default class MineScene extends BaseComponent {


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

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		//    拿到所有的json数据
		this.state = {
			renderPlaceholderOnly: 'blank',
			isRefreshing: false
		};
	}

	//联系客服
	callAciton = () => {
		request(Urls.GET_CUSTOM_SERVICE, 'Post', {})
			.then((response) => {
					if (response.mjson.code == 1) {
						if (Platform.OS === 'android') {
							NativeModules.VinScan.callPhone(response.mjson.data.phone);
						} else {
							Linking.openURL('tel:' + response.mjson.data.phone);
						}
					} else {
						this.props.showToast(response.mjson.msg);
					}
				},
				(error) => {
					this.props.showToast(error.msg);
				});
	};


	initFinish = () => {
		GetPermission.getCertificateVisiable((back)=>{
			firstType = '-1';
			lastType = '-1';
			haveOrder = 0;
			componyname = '';

			this.renzhengData = {
				RenZhengVisiable: back,//是否显示认证条目 true 显示
				enterpriseRenZheng: 0,//企业是否认证 	0-> 未审核 1->审核中 2->通过  3->未通过
				personRenZheng: 0,//个人是否认证  0-> 未审核 1->审核中 2->通过  3->未通过

			};

			this.authenOptions = {
				'1': [true, '请先完成认证后再进行操作', '取消', '', '个人认证', () => {
				}],
				'2': [true, '请先完成认证后再进行操作', '取消', '', '企业认证', () => {
				}],
				'3': [true, '认证未通过请重新认证，您可以重新认证或联系客服', '取消', '联系客服', '个人认证', () => {
				}, this.callAciton],
				'4': [true, '认证未通过请重新认证，您可以重新认证或联系客服', '取消', '联系客服', '企业认证', () => {
				}, this.callAciton],
				'5': [true, '您的认证申请正在审核中，您可查看所提交信息。我们会在一个工作日内向您反馈结果，请稍候。', '取消', '', '个人认证已提交', () => {
				}],
				'6': [true, '您的认证申请正在审核中，您可查看所提交信息。我们会在一个工作日内向您反馈结果，请稍候。', '取消', '', '企业认证已提交', () => {
				}],
				'7': [true, '需创建此账号的主账号通过个人认证后进行操作', '取消', '', '', () => {
				}],
				'8': [true, '需创建此账号的主账号通过个人认证后进行操作', '取消', '', '', () => {
				}],
			};

			this.mColor = {
				//0-> 未审核 1->审核中 2->通过  3->未通过
				0: 'gray',
				1: 'black',
				2: 'black',
				3: 'red'
			}
			this.getData();
		});

	}

	changeData = () => {
		StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
			if (data.code == 1) {
				let user_list = [];
				let datas = JSON.parse(data.result);
				user_list.push(...Car);
				GetPermission.getMineList((minList) => {
					for (let i = 0; i < minList.length; i++) {
						this.initData(minList[i].id, minList[i].name);
					}
					let jsonData = user_list;

					//    定义变量
					let dataBlob = {},
						sectionIDs = [],
						rowIDs = [];
					for (let i = 0; i < jsonData.length; i++) {
						//    1.拿到所有的sectionId
						sectionIDs.push(i);

						//    2.把组中的内容放入dataBlob内容中
						dataBlob[i] = jsonData[i].title;

						//    3.设置改组中每条数据的结构
						rowIDs[i] = [];

						//    4.取出改组中所有的数据
						let cars = jsonData[i].cars;

						//    5.便利cars,设置每组的列表数据
						for (let j = 0; j < cars.length; j++) {
							//    改组中的每条对应的rowId
							rowIDs[i].push(j);

							// 把每一行中的内容放入dataBlob对象中
							dataBlob[i + ':' + j] = cars[j];
						}
					}
					let getSectionData = (dataBlob, sectionID) => {
						return dataBlob[sectionID];
					};

					let getRowData = (dataBlob, sectionID, rowID) => {
						return dataBlob[sectionID + ":" + rowID];
					};
					let ds = new ListView.DataSource({
							getSectionData: getSectionData,
							getRowData: getRowData,
							rowHasChanged: (r1, r2) => r1 !== r2,
							sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
						}
					);
					this.setState({
						source: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
						name: datas.real_name,
						phone: datas.phone,
						headUrl: datas.head_portrait_url,
						renderPlaceholderOnly: 'success',
						isRefreshing: false
					});
				});

			} else {
				this.setState({
					renderPlaceholderOnly: 'error',
					isRefreshing: false
				});
			}
		});
	}

	initData = (id, name) => {



		if (id == 15) {
			Car[0].cars.push({
				"icon": require('../../images/mainImage/zhanghuguanli.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 16) {
			Car[0].cars.push({
				"icon": require('../../images/mainImage/yuangongguanli.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 17) {
			Car[0].cars.push({
				"icon": require('../../images/mainImage/switchcompony.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 20) {
			Car[2].cars.push({
				"icon": require('../../images/mainImage/my_order.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 18) {
			Car[1].cars.push({
				"icon": require('../../images/mainImage/youhuiquanguanli.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 19) {
			Car[1].cars.push({
				"icon": require('../../images/mainImage/hetongguanli.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 21) {
			Car[2].cars.push({
				"icon": require('../../images/mainImage/shoucangjilu.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 22) {
			Car[2].cars.push({
				"icon": require('../../images/mainImage/liulanlishi.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 24) {
			Car[3].cars.push({
				"icon": require('../../images/mainImage/shezhi.png'),
				"name": name
				, "id": id
			},);
		} else if (id == 47) {
			Car[2].cars.push({
				"icon": require('../../images/mainImage/myCarSource.png'),
				"name": name
				, "id": id
			},);
		}
	}

	getData = () => {
		Car = [
			{
				"cars": [
					// {
					//     "icon": require('../../images/mainImage/zhanghuguanli.png'),
					//     "name": "账户管理"
					// },
					// {
					//     "icon": require('../../images/mainImage/yuangongguanli.png'),
					//     "name": "员工管理"
					// },
					// {
					//     "icon": require('../../images/mainImage/switchcompony.png'),
					//     "name": "切换公司"
					// },
				],
				"title": "section0"
			},
			{
				"cars": [
					// {
					//     "icon": require('../../images/mainImage/youhuiquanguanli.png'),
					//     "name": "优惠券管理"
					// },
					// {
					//     "icon": require('../../images/mainImage/hetongguanli.png'),
					//     "name": "合同管理"
					// },
				],
				"title": "section1"
			},
			{
				"cars": [
					// {
					//     "icon": require('../../images/mainImage/myCarSource.png'),
					//     "name": "我的车源"
					// },
					// {
					//     "icon": require('../../images/mainImage/my_order.png'),
					//     "name": "我的订单"
					// },
					// {
					//     "icon": require('../../images/mainImage/shoucangjilu.png'),
					//     "name": "收藏记录"
					// },
					// {
					//     "icon": require('../../images/mainImage/liulanlishi.png'),
					//     "name": "浏览历史"
					// },

				],
				"title": "section2"
			},
			{
				"cars": [
					// {
					//     "icon": require('../../images/mainImage/shezhi.png'),
					//     "name": "设置"
					// },
				],
				"title": "section3"
			},
			{
				"cars": [
					{
						"icon": require('../../images/mainImage/shezhi.png'),
						"name": "blank"
					},
				],
				"title": "section3"
			},
		]


		StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
			if (data.code == 1 && data.result != null) {
				let datas = JSON.parse(data.result);
				BASE_ID.push(datas.company_base_id);

				StorageUtil.mGetItem(StorageKeyNames.BASE_USER_ID, (data2) => {

					if (data2.code == 1 && data2.result != null) {
						BASE_ID.push(data2.result)
						let maps = {
							base_id: BASE_ID,
						};
						request(Urls.GETCHECKSTATUS, 'post', maps).then((response) => {


							if (response.mycode == "1") {
								let dataResult = response.mjson.data;

								this.renzhengData.enterpriseRenZheng = dataResult[BASE_ID[0]];
								this.renzhengData.personRenZheng = dataResult[BASE_ID[1]];

								this.toCompany();

							} else {

							}
						}, (error) => {
							this.props.showToast(error.msg);
						});

					} else {
						this.props.showToast('获取个人信息失败');
					}
				});
			} else {
				this.props.showToast('获取企业信息失败');
			}
		});

		// StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
		//     if (data.code == 1) {
		//         let datas = JSON.parse(data.result);
		//         if(datas.user_level=='0'){
		//             this.noCompany();
		//         }else{
		// this.toCompany();


		//         }
		//     }
		// });

	}

	noCompany = () => {
		lastType = 'error';
		this.changeData();
	}

	toCompany = () => {
		StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
			if (data.code == 1) {
				let datas = JSON.parse(data.result);
				componyname = '';
				if (datas.companyname == null || datas.companyname == '') {
					componyname = datas.name;
				} else {
					componyname = datas.name + '(' + datas.companyname + ')';
				}
				let maps = {
					enter_base_ids: datas.company_base_id,
					child_type: '1'
				};
				request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
					.then((response) => {
							haveOrder = response.mjson.data.order.tradeing_count;
							if (response.mjson.data.account == null || response.mjson.data.account.length <= 0) {
								lastType = 'error';
							} else {
								lastType = response.mjson.data.account.status;
							}
							// lastType = '3';、
							this.changeData();
						},
						(error) => {
							this.changeData();
						});
			}
		});
	}
	allRefresh = () => {
		firstType = '-1';
		lastType = '-1';
		this.setState({
			renderPlaceholderOnly: 'loading',
		});
		this.getData();
	}

	refreshingData = () => {
		this.setState({isRefreshing: true});
		this.getData();
	};

	render() {
		if (this.state.renderPlaceholderOnly !== 'success') {
			return (

				<View style={styles.container}>

					{this.loadView()}

				</View>
			)
		}
		return (

			<View style={styles.container}>
				<ImageSource galleryClick={this._galleryClick}
				             cameraClick={this._cameraClick}
				             ref={(modal) => {
                                 this.imageSource = modal
                             }}/>
				<ListView
					removeClippedSubviews={false}
					contentContainerStyle={styles.listStyle}
					dataSource={this.state.source}
					renderRow={this._renderRow}
					renderSectionHeader={this._renderSectionHeader}
					renderHeader={this._renderHeader}
					refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshingData}
                            tintColor={[fontAndClolr.COLORB0]}
                            colors={[fontAndClolr.COLORB0]}
                        />
                    }
				/>
				<AccountModal ref="accountmodal"/>
				<AuthenticationModal ref="authenmodal"/>
			</View>
		)
	}

	navigatorParams = {

		name: 'AccountManageScene',
		component: AccountManageScene,
		params: {}
	}

	toPage = () => {
		this.props.showModal(true);
		StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
			if (data.code == 1) {
				let datas = JSON.parse(data.result);
				let maps = {
					enter_base_ids: datas.company_base_id,
					child_type: '1'
				};
				request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
					.then((response) => {
							this.props.showModal(false);
							haveOrder = response.mjson.data.order.tradeing_count;
							lastType = response.mjson.data.account.status;
							if (lastType == '0') {
								this.navigatorParams.name = 'AccountManageScene'
								this.navigatorParams.component = AccountManageScene
								this.navigatorParams.params = {
									callBack: () => {
										this.allRefresh();
									}
								}
							} else if (lastType == '1') {
								this.navigatorParams.name = 'BindCardScene'
								this.navigatorParams.component = BindCardScene
								this.navigatorParams.params = {
									callBack: () => {
										this.allRefresh();
									}
								}
							} else if (lastType == '2') {
								this.navigatorParams.name = 'WaitActivationAccountScene'
								this.navigatorParams.component = WaitActivationAccountScene
							} else {
								this.navigatorParams.name = 'AccountScene'
								this.navigatorParams.component = AccountScene
								this.navigatorParams.params = {
									callBack: () => {
										this.allRefresh();
									}
								}
							}
							this.refs.accountmodal.changeShowType(false);
							firstType = lastType;
							this.props.callBack(this.navigatorParams);

						},
						(error) => {
							this.props.showToast('用户信息查询失败');
						});
			} else {
				this.props.showToast('用户信息查询失败');
			}
		});
	}

	_navigator(rowData) {
		//先判断认证状态
		StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
			if (data.code == 1 && data.result != null) {
				let datas = JSON.parse(data.result);
				let maps = {
					enterprise_id: datas.company_base_id,
					function_id: rowData.id,
					type: 'app'
				};
				request(Urls.USER_IDENTITY_GET_INFO, 'post', maps).then((response) => {
					if (response.mjson.data.auth == 0) {
						this._navigatorPage(rowData);
					} else {
						this.refs.authenmodal.changeShowType(...this.authenOptions[response.mjson.data.auth + '']);
					}
				}, (error) => {
					this.props.showToast(error.msg);
				});
			} else {
				this.props.showToast('获取企业信息失败');
			}
		});
	}

	_navigatorPage = (rowData) => {
		switch (rowData.id) {
			case 15:
				this.toPage();
				return
				break;
			case 17:
				this.props.toSelect();
				return;
				break;
			case 18:
				this.navigatorParams.name = 'AdjustManageScene'
				this.navigatorParams.component = AdjustManageScene
				break;
			case '积分管理':
				break;
			case 19:
				this.navigatorParams.name = 'ContractManageScene'
				this.navigatorParams.component = ContractManageScene
				this.navigatorParams.params = {
					from: 'xs'
				}
				break;
			case 16:
				this.navigatorParams.name = 'EmployeeManageScene'
				this.navigatorParams.component = EmployeeManageScene
				break;
			case 47:
				this.navigatorParams.name = 'MycarScene'
				this.navigatorParams.component = MycarScene
				break;
			case 20:
				this.navigatorParams.name = 'OrderTypeSelectScene'
				this.navigatorParams.component = OrderTypeSelectScene
				break;
			case 21:
				this.navigatorParams.name = 'CarCollectSourceScene'
				this.navigatorParams.component = CarCollectSourceScene
				break;
			case 22:
				this.navigatorParams.name = 'BrowsingHistoryScene'
				this.navigatorParams.component = BrowsingHistoryScene
				break;
			case 24:
				this.navigatorParams.name = 'Setting'
				this.navigatorParams.component = Setting
				break;
		}

		this.props.callBack(this.navigatorParams);
	};

	// 每一行中的数据
	_renderRow = (rowData) => {
		let showName = '';
		if (lastType == '0') {
			showName = '未开户';
		} else if (lastType == '1') {
			showName = '未绑卡';
		} else if (lastType == '2') {
			showName = '未激活';
		}
		if (rowData.name == 'blank') {
			return (
				<View style={{width: width, height: Pixel.getPixel(2), backgroundColor: fontAndClolr.COLORA3}}></View>
			);
		} else {
			return (
				<TouchableOpacity style={styles.rowView} onPress={() => {
                    this._navigator(rowData)
                }}>

					<Image source={rowData.icon} style={styles.rowLeftImage}/>

					<Text allowFontScaling={false} style={styles.rowTitle}>{rowData.name}</Text>
					{rowData.id == 15 ? <Text allowFontScaling={false} style={{ marginRight: Pixel.getPixel(15),
                        backgroundColor: '#00000000',color:fontAndClolr.COLORB2,fontSize:
                            Pixel.getFontPixel(fontAndClolr.LITTLEFONT28)}}>{showName}</Text> :
						<View/>}
					{rowData.name == '我的订单' && haveOrder != 0 ?
						<View style={{
                            marginRight: Pixel.getPixel(15),
                            width: Pixel.getPixel(10),
                            height: Pixel.getPixel(10),
                            backgroundColor: fontAndClolr.COLORB2,
                            borderRadius: 10
                        }}
						/> : <View/>}


					<Image source={cellJianTou} style={styles.rowjiantouImage}/>


				</TouchableOpacity>
			);
		}

	}

	componentDidUpdate() {
		if (this.state.renderPlaceholderOnly == 'success') {
			if (firstType != lastType) {
				if (lastType != '3') {
					StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
						if (data.code == 1) {
							let datas = JSON.parse(data.result);
							GetPermission.getMineList((mineList) => {
								for (let i = 0; i < mineList.length; i++) {
									if (mineList[i].id == 15) {
										StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (datac) => {
											if (datac.code == 1) {
												let datasc = JSON.parse(datac.result);
												let maps = {
													enter_base_ids: datasc.company_base_id,
													child_type: '1'
												};
												request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
													.then((response) => {
															haveOrder = response.mjson.data.order.tradeing_count;
															lastType = response.mjson.data.account.status;
															if (lastType == '0') {
																this.refs.accountmodal.changeShowType(true,
																	'您还未开通资金账户，为方便您使用金融产品及购物车，' +
																	'请尽快开通！', '去开户', '看看再说', () => {
																		this.toPage();
																	});
															} else if (lastType == '1') {
																this.refs.accountmodal.changeShowType(true,
																	'您的资金账户还未绑定银行卡，为方便您使用金融产品及购物车，请尽快绑定。'
																	, '去绑卡', '看看再说', () => {
																		this.toPage();
																	});
															} else if (lastType == '2') {
																this.refs.accountmodal.changeShowType(true,
																	'您的账户还未激活，为方便您使用金融产品及购物车，请尽快激活。'
																	, '去激活', '看看再说', () => {
																		this.toPage();
																	});
															}
															firstType = lastType;
														},
														(error) => {

														});
											}
										});
									}
								}
							});

						}
					});
				}
			}
		}
	}


	// 每一组对应的数据
	_renderSectionHeader(sectionData, sectionId) {
		return (
			<View style={styles.sectionView}>
			</View>
		);
	}

	_renderHeader = () => {
		return (
			<View style={{width:width}}>
				<View style={styles.headerViewStyle}>
					<TouchableOpacity style={[styles.headerImageStyle]}>
						<Image
							source={this.state.headUrl == '' ? require('../../images/mainImage/whiteHead.png') : this.state.headUrl}
							style={{
                            width: Pixel.getPixel(65),
                            height: Pixel.getPixel(65), resizeMode: 'stretch'
                        }}
						/>
					</TouchableOpacity>
					<Text allowFontScaling={false} style={styles.headerNameStyle}>
						{this.state.name}
					</Text>
					<Text allowFontScaling={false} style={styles.headerPhoneStyle}>
						{componyname}
					</Text>

				</View>
				{this.renzhengData.RenZhengVisiable != true ? null : <View
						style={{width:width,height :Pixel.getPixel(40),backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>

						<TouchableOpacity onPress={() => {
							if(this.renzhengData.enterpriseRenZheng == 2  || this.renzhengData.enterpriseRenZheng == 1){
							//0-> 未审核 1->审核中 2->通过  3->未通过


							}else {
								this._qiyerenzheng();
							}
                            }} activeOpacity={0.8}
						                  style={{width:Pixel.getPixel(375/2.0-1),height :Pixel.getPixel(40),backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
							<Image
								source={this.renzhengData.enterpriseRenZheng == 2  ? require('../../images/login/qiyeyirenzheng.png') : require('../../images/login/qiyeweirenzheng.png')}
								style={{
                            width: Pixel.getPixel(27),
                            height: Pixel.getPixel(20),
                            resizeMode: 'stretch',
                            marginLeft:Pixel.getPixel(37)
                        }}
							/>
							<Text allowFontScaling={false} style={{marginLeft:Pixel.getPixel(7)}}>企业

								<Text allowFontScaling={false}

								      style={{color:this.mColor[this.renzhengData.enterpriseRenZheng]}}

								>
									{this._getRenZhengResult(this.renzhengData.enterpriseRenZheng)}

								</Text>
							</Text>

						</TouchableOpacity>

						<Image source={require('../../images/login/xuxian.png')}
						       style={{width:Pixel.getPixel(1),height :Pixel.getPixel(22),}}/>

						<TouchableOpacity onPress={() => {
							if(this.renzhengData.personRenZheng == 2 || this.renzhengData.personRenZheng == 1){
								//0-> 未审核 1->审核中 2->通过  3->未通过

							}else {
                                this._gerenrenzheng();
							}
                            }} activeOpacity={0.8}
						                  style={{width:Pixel.getPixel(375/2.0-1),height :Pixel.getPixel(40),backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
							<Image
								source={this.renzhengData.personRenZheng == 2  ? require('../../images/login/gerenyirenzheng.png') : require('../../images/login/gerenweirenzheng.png')}
								style={{
                            width: Pixel.getPixel(27),
                            height: Pixel.getPixel(20),
                            resizeMode: 'stretch',
                            marginLeft:Pixel.getPixel(37)
                        }}
							/>
							<Text allowFontScaling={false} style={{marginLeft:Pixel.getPixel(7)}}>个人

								<Text allowFontScaling={false}
								      style={{color:this.mColor[this.renzhengData.personRenZheng]}}

								>
									{this._getRenZhengResult(this.renzhengData.personRenZheng)}

								</Text>
							</Text>
						</TouchableOpacity>

					</View>}


			</View>
		)
	}

	selectPhotoTapped = () => {
		if (Platform.OS == 'android') {
			this._rePhoto();
		} else {
			ImagePicker.showImagePicker(options, (response) => {
				if (response.didCancel) {
				} else if (response.error) {
				} else if (response.customButton) {
				} else {
					let source = {uri: response.uri};
					this.setState({
						headUrl: source,
					});
				}
			});
		}
	}
	_qiyerenzheng = () => {
		this.navigatorParams.name = 'EnterpriseCertificate'
		this.navigatorParams.component = EnterpriseCertificate
		this.navigatorParams.params.callBack = this.allRefresh
		this.navigatorParams.params.qiye_id = BASE_ID[0]
		console.log('1111111111111111111');

		console.log(this.navigatorParams.params.qiye_id);
		console.log('1111111111111111111');
		this.props.callBack(this.navigatorParams);
	};
	_getRenZhengResult = (result) => {
		let renzheng = '(未认证)';
		if (result == 1) {
			renzheng = '(审核中)';
		}
		if (result == 2) {
			renzheng = '(已认证)';
		}
		if (result == 3) {
			renzheng = '(未通过)';
		}
		return renzheng;

	};
	_gerenrenzheng = () => {
		this.navigatorParams.name = 'PersonCertificate'
		this.navigatorParams.component = PersonCertificate
		this.navigatorParams.params.callBack = this.allRefresh

		this.props.callBack(this.navigatorParams);
	};

	_labelPress = () => {
		this.imageSource.openModal();
	};

	_rePhoto = () => {
		this.imageSource.openModal();
	};

	_cameraClick = () => {
		ImagePicker.launchCamera(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				let source = {uri: response.uri};
				this.setState({
					headUrl: source,
				});
			}
		});
	}

	_galleryClick = () => {
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				let source = {uri: response.uri};
				this.setState({
					headUrl: source,
				});
			}
		});
	}

}


const styles = StyleSheet.create({


	headerViewStyle: {

		height: Pixel.getPixel(190),
		width: width,
		backgroundColor: fontAndClolr.COLORB0,
		alignItems: 'center',

	},
	headerImageStyle: {

		width: Pixel.getPixel(65),
		height: Pixel.getPixel(65),
		marginTop: Pixel.getPixel(45),
		justifyContent: 'center',
		alignItems: 'center',

	},
	headerNameStyle: {

		color: 'white',
		fontSize: Pixel.getFontPixel(15),
		marginTop: Pixel.getPixel(10),
		marginBottom: Pixel.getPixel(10),
		fontWeight: 'bold'
	},
	headerPhoneStyle: {
		color: 'white',
		fontSize: Pixel.getFontPixel(12),
	},
	container: {

		flex: 1,
		marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
		backgroundColor: fontAndClolr.COLORA3,
	},
	listStyle: {},
	sectionView: {
		height: Pixel.getPixel(10),
		backgroundColor: fontAndClolr.COLORA3,
		justifyContent: "center"
	},
	sectionTitle: {
		marginLeft: 16,
	},
	rowView: {
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderBottomColor: fontAndClolr.COLORA4,
		borderBottomWidth: 1
	},
	rowLeftImage: {
		width: Pixel.getPixel(26),
		height: Pixel.getPixel(26),
		marginLeft: Pixel.getPixel(15),
	},
	rowjiantouImage: {
		width: Pixel.getPixel(15),
		height: Pixel.getPixel(15),
		marginRight: Pixel.getPixel(15),

	},
	rowTitle: {
		flex: 1,
		fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
		marginLeft: Pixel.getPixel(20),
		color: '#000',

	}

});