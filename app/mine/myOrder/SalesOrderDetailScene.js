/**
 * Created by hanmeng on 2017/5/11.
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    ListView,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions,
    NativeModules,
    BackAndroid,
    InteractionManager,
    TextInput,
    RefreshControl
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import InputAmountScene from "./InputAmountScene";
import InputVinInfo from "./InputVinInfo";
import StepView from "./component/StepView";
import ExplainModal from "./component/ExplainModal";
import MakePhoneModal from "./component/MakePhoneModal";
import ChooseModal from "./component/ChooseModal";
import TransactionPrice from "./component/TransactionPrice";
import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";
import ContactLayout from "./component/ContactLayout";
import GetCarCountDown from "./component/GetCarCountDown";
import DepositCountDown from "./component/DepositCountDown";
import CheckStand from "../../finance/CheckStand";
import * as Net from '../../utils/RequestUtil';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import AccountScene from "../accountManage/RechargeScene";
import VinInfo from '../../publish/component/VinInfo';
const Pixel = new PixelUtil();

const IS_ANDROID = Platform.OS === 'android';

export default class SalesOrderDetailScene extends BaseComponent {

    constructor(props) {
        super(props);

        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.items = [];
        this.mList = [];
        this.listViewStyle = Pixel.getPixel(0);
        this.orderDetail = '';
        this.orderState = -1;
        this.topState = -1;
        this.bottomState = -1;
        this.contactData = {};
        this.carAmount = 0;
        this.carVin = '';
        this.leftTime = 0;
        this.closeOrder = 0;
        this.financeInfo = {};

        this.modelData = [];
        this.modelInfo = {};
        this.carData = {'v_type': 1};

        this.modelData = [];
        this.scanType = [{model_name: '扫描前风挡'}, {model_name: '扫描行驶证'}];

        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        /*        this.setState({
         dataSource: this.state.dataSource.cloneWithRows(['','','']),
         renderPlaceholderOnly: 'success'
         });*/
        this.loadData();
    };

    updateCarAmount = (newAmount) => {
        this.props.showModal(true);
        this.carAmount = newAmount;
    };

    isShowFinance = (financeInfo) => {
        if (this.orderDetail.orders_item_data[0].car_finance_data.pledge_type === 2 &&
            this.orderDetail.orders_item_data[0].car_finance_data.pledge_status === 1) {
            if (financeInfo.is_show_finance === 1) {
                this.financeInfo = financeInfo;
                this.mList = [];
                if (this.orderDetail.orders_item_data[0].car_vin.length === 17) {
                    this.mList = ['0', '1', '2', '3', '4', '5', '7', '9'];
                } else {
                    this.mList = ['0', '1', '2', '3', '4', '5', '6', '7', '9'];
                }
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(this.mList),
                    //dataSource: this.state.dataSource.cloneWithRows(this.mList),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success'
                });
            } else {
                this.mList = [];
                if (this.orderDetail.orders_item_data[0].car_vin.length === 17) {
                    this.mList = ['0', '1', '2', '4', '5', '7', '9'];
                } else {
                    this.mList = ['0', '1', '2', '4', '5', '6', '7', '9'];
                }
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(this.mList),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success'
                });
            }
        }
        this.props.showModal(false);
    };

    savePrice = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                //console.log('this.vinInput.value======',this.carVin);
                let maps = {
                    company_id: datas.company_base_id,
                    car_id: this.orderDetail.orders_item_data[0].car_id,
                    order_id: this.orderDetail.id,
                    pricing_amount: this.carAmount,
                    car_vin: this.carVin.length !== 17 ? this.orderDetail.orders_item_data[0].car_vin : this.carVin
                };
                let url = AppUrls.ORDER_SAVE_PRICE;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('成交价提交失败');
            }
        });
    };

    getLeftTime = (cancelTime) => {
        let currentTime = new Date().getTime();
        let oldTime = new Date(cancelTime).getTime();
        //console.log('时间啊是啊=====' + (currentTime - oldTime));
        return currentTime - oldTime;
    };

    loadData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.props.orderId,
                    type: 2,
                    sort: 2
                };
                let url = AppUrls.ORDER_DETAIL;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.props.showModal(false);
                        this.orderDetail = response.mjson.data;
                        let status = response.mjson.data.status;
                        let cancelStatus = response.mjson.data.cancel_status;
                        this.leftTime = this.getLeftTime(this.orderDetail.cancel_time);
                        this.closeOrder = this.getLeftTime(this.orderDetail.pricing_time);
                        this.carAmount = 0;
                        //this.carVin = this.orderDetail.orders_item_data[0].car_vin;
                        this.stateMapping(status, cancelStatus);
                        this.initListData(this.orderState);
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(this.mList),
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success'
                        });
                    } else {
                        this.props.showToast(response.mjson.msg);
                        this.setState({
                            isRefreshing: false,
                            renderPlaceholderOnly: 'null'
                        });
                    }
                }, (error) => {
                    //this.props.showToast('获取订单详情失败');
                    this.props.showToast(error.mjson.msg);
                    this.setState({
                        isRefreshing: false,
                        renderPlaceholderOnly: 'error'
                    });
                });
            } else {
                this.props.showToast('获取订单详情失败');
            }
        });
    };

    /**
     *  根据订单详情接口的 status 和 cancel_status 字段组合判断页面渲染
     */
    stateMapping = (status, cancelStatus) => {
        switch (status) {
            case 0:  // 已拍下，价格未定
            case 1:
                if (cancelStatus === 0) {
                    this.orderState = 0;
                    this.topState = -1;
                    this.bottomState = 0;
                } else if (cancelStatus === 1) {
                    this.orderState = 0;
                    this.topState = 0;
                    this.bottomState = 5;
                } else if (cancelStatus === 2) {
                    this.orderState = 0;
                    this.topState = -1;
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 0;
                    this.topState = -1;
                    this.bottomState = 3;
                }
                break;
            case 2:  // 已拍下，价格已定
            case 3:
            case 4:
                if (cancelStatus === 0) {
                    this.orderState = 1;
                    if (this.orderDetail.orders_item_data[0].car_finance_data.pledge_type === 2 &&
                        this.orderDetail.orders_item_data[0].car_finance_data.pledge_status === 1) {
                        this.topState = 1;
                    } else {
                        this.topState = -1;
                    }
                    this.bottomState = 1;
                } else if (cancelStatus === 1) {
                    this.orderState = 1;
                    this.topState = 0;
                    this.bottomState = 5;
                } else if (cancelStatus === 2) {
                    this.orderState = 1;
                    this.topState = -1;
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 1;
                    this.topState = -1;
                    this.bottomState = 3;
                }
                break;
            case 5:  // 订金到账
            case 6:
            case 7:
                if (cancelStatus === 0) {
                    this.orderState = 2;
                    if (this.orderDetail.orders_item_data[0].car_finance_data.pledge_type === 2 &&
                        this.orderDetail.orders_item_data[0].car_finance_data.pledge_status === 1) {
                        this.topState = 1;
                    } else {
                        this.topState = -1;
                    }
                    this.bottomState = 1;
                } else if (cancelStatus === 1) {
                    this.orderState = 2;
                    this.topState = 0;
                    this.bottomState = 5;
                } else if (cancelStatus === 2) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 3;
                }
                break;
            case 8: // 结清尾款
            case 9:
            case 10:
                if (cancelStatus === 0) {
                    this.orderState = 3;
                    if (this.orderDetail.orders_item_data[0].car_finance_data.pledge_type === 2 &&
                        this.orderDetail.orders_item_data[0].car_finance_data.pledge_status === 1) {
                        this.topState = 1;
                    } else {
                        this.topState = -1;
                    }
                    this.bottomState = -1;
                } else if (cancelStatus === 1) {
                    this.orderState = 3;
                    this.topState = 0;
                    this.bottomState = 5;
                } else if (cancelStatus === 2) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 3;
                }
                break;
            case 11:  // 订单完成
                if (cancelStatus === 0) {
                    this.orderState = 4;
                    this.topState = -1;
                    this.bottomState = -1;
                } else if (cancelStatus === 1) {
                    this.orderState = 4;
                    this.topState = 0;
                    this.bottomState = 5;
                } else if (cancelStatus === 2) {
                    this.orderState = 4;
                    this.topState = -1;
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 4;
                    this.topState = -1;
                    this.bottomState = 3;
                }
                break;
        }
    };

    initDetailPageTop = (topState) => {
        //  根据订单状态初始化详情页悬浮头、悬浮底
        switch (topState) {
            case 0:
                this.listViewStyle = Pixel.getPixel(0);
                return (
                    <View style={{marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.tradingCountdown}>
                            <Text>
                                <Text style={{
                                    marginLeft: Pixel.getPixel(15),
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    color: fontAndColor.COLORB7
                                }}>处理申请剩余时间</Text>
                                <DepositCountDown leftTime={this.leftTime}/>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    color: fontAndColor.COLORB7
                                }}>超时未处理默认为不同意，订单自动取消</Text>
                            </Text>
                        </View>
                        <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>
                    </View>
                )
                break;
            case 1:
                this.listViewStyle = Pixel.getPixel(0);
                return (
                    <View style={{marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.tradingCountdown}>
                            <Text>
                                <Text style={{
                                    marginLeft: Pixel.getPixel(15),
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    color: fontAndColor.COLORB7
                                }}>完成交易剩余时间</Text>
                                <GetCarCountDown leftTime={this.closeOrder}/>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    color: fontAndColor.COLORB7
                                }}>超时订单将关闭。</Text>
                            </Text>
                        </View>
                        <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>
                    </View>
                )
                break;
            default:
                this.listViewStyle = Pixel.getTitlePixel(65);
                return null;
                break;
        }
    };


    initDetailPageBottom = (orderState) => {
        switch (orderState) {
            case 0:
                let negativeText = '';
                let positiveText = '';
                let content = '';
                let positiveOperation = '';
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                negativeText = '取消';
                                positiveText = '确定';
                                content = '确定后取消订单。如买家有已支付款项将退款，如您有补差价款可提现。';
                                positiveOperation = this.cancelOrder;
                                this.refs.chooseModal.changeShowType(true, negativeText, positiveText, content, positiveOperation);
                            }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                //console.log('韩梦测试测试测试====',this.carVin);
                                negativeText = '再想想';
                                positiveText = '没问题';
                                content = '此车是库存融资质押车辆，请在买家支付订金后操作车辆出库。';
                                positiveOperation = this.savePrice;
                                if (this.carAmount === 0) {
                                    this.props.showToast('请您先定价');
                                } else {
                                    if (this.orderDetail.orders_item_data[0].car_finance_data.pledge_type === 1 &&
                                        this.orderDetail.orders_item_data[0].car_finance_data.pledge_status === 1) {
                                        this.refs.chooseModal.changeShowType(true, negativeText, positiveText, content, positiveOperation);
                                    } else {
                                        this.props.showModal(true);
                                        this.savePrice();
                                    }
                                }
                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>确认</Text>
                            </View>
                        </TouchableOpacity>
                        <ChooseModal ref='chooseModal' title='提示'
                                     negativeButtonStyle={styles.negativeButtonStyle}
                                     negativeTextStyle={styles.negativeTextStyle} negativeText={negativeText}
                                     positiveButtonStyle={styles.positiveButtonStyle}
                                     positiveTextStyle={styles.positiveTextStyle} positiveText={positiveText}
                                     buttonsMargin={Pixel.getPixel(20)}
                                     positiveOperation={positiveOperation}
                                     content={content}/>
                        {/*<ChooseModal ref='chooseModal1' title='提示'
                         negativeButtonStyle={styles.negativeButtonStyle}
                         negativeTextStyle={styles.negativeTextStyle} negativeText='再想想'
                         positiveButtonStyle={styles.positiveButtonStyle}
                         positiveTextStyle={styles.positiveTextStyle} positiveText='没问题'
                         buttonsMargin={Pixel.getPixel(20)}
                         positiveOperation={this.savePrice(this.carAmount)}
                         content='此车是库存融资质押车辆，请在买家支付订金后操作车辆出库。'/>*/}
                    </View>
                )
                break;
            case 1:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.chooseModal.changeShowState(true);
                            }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                            </View>
                        </TouchableOpacity>
                        <ChooseModal ref='chooseModal' title='提示'
                                     negativeButtonStyle={styles.negativeButtonStyle}
                                     negativeTextStyle={styles.negativeTextStyle} negativeText='取消'
                                     positiveButtonStyle={styles.positiveButtonStyle}
                                     positiveTextStyle={styles.positiveTextStyle} positiveText='确定'
                                     buttonsMargin={Pixel.getPixel(20)}
                                     positiveOperation={this.cancelOrder}
                                     content='确定后取消订单。如买家有已支付款项将退款，如您有补差价款可提现。'/>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={[styles.bottomBar, {justifyContent: 'center'}]}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORB0
                        }}>
                            交易关闭
                        </Text>
                    </View>
                );
                break;
            case 3:
                return (
                    <View style={[styles.bottomBar, {justifyContent: 'center'}]}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORB0
                        }}>
                            交易关闭(同意退款)
                        </Text>
                    </View>
                );
                break;
            case 4:
                return (
                    <View style={[styles.bottomBar, {justifyContent: 'center'}]}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORB0
                        }}>
                            交易关闭(不同意退款)
                        </Text>
                    </View>
                );
                break;
            case 5:
                return (
                    <View style={{backgroundColor: '#ffffff'}}>
                        <View style={{alignItems: 'center', height: Pixel.getPixel(30), justifyContent: 'center'}}>
                            <Text style={{color: fontAndColor.COLORB2}}>
                                买家申请取消订单，如买家已支付款项选择同意后将退回
                            </Text>
                        </View>
                        <View style={styles.bottomBar}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.showModal(true);
                                    this.denyCancel();
                                }}>
                                <View style={styles.buttonCancel}>
                                    <Text style={{color: fontAndColor.COLORA2}}>不同意</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.showModal(true);
                                    this.allowCancel();
                                }}>
                                <View style={styles.buttonConfirm}>
                                    <Text style={{color: '#ffffff'}}>同意</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                break;
            default:
                return null;
                break;
        }
    };

    initListData = (orderState, merchantNum, customerServiceNum) => {
        switch (orderState) {
            case 0:  //未定价
                this.mList = [];
                this.items = [];
                this.contactData = {};
                if (this.orderDetail.orders_item_data[0].car_vin.length === 17) {
                    this.mList = ['0', '1', '2', '4', '5', '7', '9'];
                } else {
                    this.mList = ['0', '1', '2', '4', '5', '6', '7', '9'];
                }
                this.contactData = {
                    layoutTitle: '确认成交价',
                    layoutContent: '确认成交价，待买家付定金，确认后价格不可修改。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '订金到账', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 1:  //已定价
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '5', '7', '9'];
                this.contactData = {
                    layoutTitle: '查看到账',
                    layoutContent: '您可以查看买家已支付的款项，但暂不可提现，买家确认收车后即可提现。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '订金到账', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 2:  //订金到账
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '5', '7', '9'];
                this.contactData = {
                    layoutTitle: '查看到账',
                    layoutContent: '您可以查看买家已支付的款项，但暂不可提现，买家确认收车后即可提现。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '订金到账', nodeState: 1, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 3:  // 结清尾款
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '5', '7', '9'];
                this.contactData = {
                    layoutTitle: '查看到账',
                    layoutContent: '您可以查看买家已支付的款项，但暂不可提现，买家确认收车后即可提现。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '订金到账', nodeState: 0, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 1, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 4: // 完成交易
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '5', '7', '9'];
                this.contactData = {
                    layoutTitle: '已完成',
                    layoutContent: '车款可提现。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '订金到账', nodeState: 0, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 0, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 1, isLast: true, isFirst: false});
                break;
            default:
                break;
        }
    };

    orderCancelHandler = (result) => {
        let url = AppUrls.ORDER_CANCEL_HANDLER;
        request(url, 'post', {
            order_id: this.orderDetail.id,
            result: result
        }).then((response) => {
            //this.props.showModal(false);
            this.loadData();
        }, (error) => {
            //this.props.showModal(false);
            //console.log("成交价提交失败");
            this.props.showToast('处理取消订单申请失败');
        });
    };

    allowCancel = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id
                };
                let url = AppUrls.ORDER_ALLOW_CANCEL;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('处理取消订单申请失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('处理取消订单申请失败');
            }
        });
    };

    denyCancel = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id
                };
                let url = AppUrls.ORDER_DENY_CANCEL;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('处理取消订单申请失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('处理取消订单申请失败');
            }
        });
    };

    //扫描
    _onScanPress = () => {
        this.vinModal.refresh(this.scanType);
        this.vinModal.openModal(1);
    };

    _vinPress = (mType, index) => {
        if (mType === 0) {
            this.modelInfo['brand_id'] = this.modelData[index].brand_id;
            this.modelInfo['model_id'] = this.modelData[index].model_id;
            this.modelInfo['series_id'] = this.modelData[index].series_id;
            this.modelInfo['model_year'] = this.modelData[index].model_year;
            this.modelInfo['model_name'] = this.modelData[index].model_name;
            //this._insertVinAndModel(this.vin, JSON.stringify(this.modelInfo), this.modelInfo['model_name']);
        } else if (mType === 1) {
            if (IS_ANDROID === true) {
                NativeModules.VinScan.scan(parseInt(index)).then((vl) => {
                    this.vinInput.setNativeProps({
                        text: vl
                    });
                    this._onVinChange(vl);
                }, (error) => {
                });
            } else {
                this.timer = setTimeout(
                    () => {
                        NativeModules.VinScan.scan(parseInt(index)).then((vl) => {
                            this.vinInput.setNativeProps({
                                text: vl
                            });
                            this._onVinChange(vl);
                        }, (error) => {
                        });
                    },
                    500
                );
            }
        }
    };

    _onVinChange = (text) => {
        if (text.length === 17) {
            this.props.showModal(true);
            this.carVin = text;
            this.vinInput.blur();
            Net.request(AppUrls.VININFO, 'post', {vin: text}).then(
                (response) => {
                    this.props.showModal(false);
                    if (response.mycode === 1) {
                        let rd = response.mjson.data;
                        if (rd.length === 0) {
                            this.props.showToast('车架号校验失败');
                        }
                    } else {
                        this.props.showToast('车架号校验失败');
                    }
                },
                (error) => {
                    //this.props.showModal(false);
                    this.props.showToast('车架号校验失败');
                }
            );
        }
    };

    /**
     * 取消订单请求
     */
    cancelOrder = () => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id,
                    type: 2
                };
                let url = AppUrls.ORDER_CANCEL;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('取消订单失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('取消订单失败');
            }
        });
    };

    dateReversal = (time) => {
        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "-" + (this.PrefixInteger(date.getMonth() + 1, 2)) + "-" +
        (this.PrefixInteger(date.getDate() + 1, 2)));
    };

    PrefixInteger = (num, length) => {
        return (Array(length).join('0') + num).slice(-length);
    };

    // 下拉刷新数据
    refreshingData = () => {
        //this.orderListData = [];
        this.carAmount = 0;
        this.setState({isRefreshing: true});
        this.loadData();
    };

    refundJudgment = (amount) => {
        if (amount > 0) {
            return amount + '元(补偿)';
        } else if (amount < 0) {
            return amount + '元(退还)';
        } else {
            return amount;
        }
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='订单详情' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (
                <View style={styles.container}>
                    <VinInfo viewData={this.scanType} vinPress={this._vinPress} ref={(modal) => {
                        this.vinModal = modal
                    }}/>
                    <NavigatorView title='订单详情' backIconClick={this.backPage}/>
                    {this.initDetailPageTop(this.topState)}
                    <ListView
                        removeClippedSubviews={false}
                        style={{marginTop: this.listViewStyle}}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeperator}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshingData}
                                tintColor={[fontAndColor.COLORB0]}
                                colors={[fontAndColor.COLORB0]}
                            />
                        }/>
                    <ExplainModal ref='expModal' title='补差额说明' buttonStyle={styles.expButton} textStyle={styles.expText}
                                  text='知道了' content='为了确保交易金额可支付贷款本息，请您
                                  补足成交价与贷款本息，为了确保交易金额可支付贷款本息，请您
                        补足成交价与贷款本息，为了确保交易金额可支付贷款本息，请您
                        补足成交价与贷款本息，为了确保交易金额可支付贷款本息，请您
                        补足成交价与贷款本息，'/>
                    <View style={{flex: 1}}/>
                    {this.initDetailPageBottom(this.bottomState)}
                </View>
            )
        }
    }

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    _renderRow = (rowData, selectionID, rowID) => {
        //item 布局
        if (rowData === '0') {
            return (
                <View style={styles.itemType0}>
                    <StepView items={this.items}/>
                </View>
            )
        } else if (rowData === '1') {
            return (
                <ContactLayout
                    layoutTitle={this.contactData.layoutTitle ? this.contactData.layoutTitle : ''}
                    layoutContent={this.contactData.layoutContent ? this.contactData.layoutContent : ''}
                    setPrompt={this.contactData.setPrompt ? this.contactData.setPrompt : false}
                    promptTitle={this.contactData.promptTitle ? this.contactData.promptTitle : ''}
                    promptContent={this.contactData.promptContent ? this.contactData.promptContent : ''}
                    showShopId={this.orderDetail.orders_item_data[0].car_data.show_shop_id}/>
            )
        } else if (rowData === '2') {
            //this.carAmount = this.orderDetail.orders_item_data[0].transaction_price;
            //console.log('this.carAmount', this.carAmount);
            return (
                <TransactionPrice amount={this.carAmount} navigator={this.props.navigator}
                                  updateCarAmount={this.updateCarAmount}
                                  isShowFinance={this.isShowFinance}
                                  carId={this.orderDetail.orders_item_data[0].car_id}
                                  orderId={this.orderDetail.id}/>

            )
        } else if (rowData === '3') {
            return (
                <View style={styles.itemType7}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>车辆已融资,交易需补差额</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORB2
                        }}>{this.financeInfo ? this.financeInfo.seller_add_amount : 0}元</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            onPress={() => {
                                this.refs.expModal.changeShowType(true);
                            }}
                            style={{marginRight: Pixel.getPixel(15), color: fontAndColor.COLORB4}}>补差额说明</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>贷款本金</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            style={styles.infoContentRed}>{this.financeInfo ? this.financeInfo.seller_finance_amount : 0}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>贷款利息</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            style={styles.infoContentRed}>{this.financeInfo ? this.financeInfo.interest_amount : 0}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>30日利息</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            style={styles.infoContentRed}>{this.financeInfo ? this.financeInfo.days_interest_amount : 0}元</Text>
                    </View>
                    <View style={{
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15),
                        marginLeft: Pixel.getPixel(15),
                        height: 1,
                        backgroundColor: fontAndColor.COLORA4
                    }}/>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.toNextPage({
                                    name: 'AccountScene',
                                    component: AccountScene,
                                    params: {}
                                });
                            }}>
                            <View style={{
                                marginLeft: Pixel.getPixel(15),
                                height: Pixel.getPixel(27),
                                width: Pixel.getPixel(70),
                                borderRadius: Pixel.getPixel(2),
                                borderWidth: Pixel.getPixel(1),
                                borderColor: fontAndColor.COLORB0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: Pixel.getPixel(15)
                            }}>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                    color: fontAndColor.COLORB0
                                }}>充值</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else if (rowData === '4') {
            return (
                <View style={styles.itemType2}>
                    <Image
                        style={{marginLeft: Pixel.getPixel(15)}}
                        source={require('../../../images/mainImage/agreed_sign.png')}/>
                    <Text style={{color: fontAndColor.COLORA1, marginLeft: Pixel.getPixel(5)}}>我已同意签署</Text>
                    <Text
                        onPress={() => {

                        }}
                        style={{color: fontAndColor.COLORA2}}>《买卖协议》</Text>
                    <Text style={{color: fontAndColor.COLORA1}}>和</Text>
                    <Text
                        onPress={() => {

                        }}
                        style={{color: fontAndColor.COLORA2}}>《授权声明》</Text>
                </View>
            )
        } else if (rowData === '5') {
            //let initRegDate = this.dateReversal(this.orderDetail.orders_item_data[0].car_data.init_reg + '000');
            //let imageUrl = this.orderDetail.orders_item_data[0].car_data.imgs;
            let initReg = this.orderDetail.orders_item_data[0].car_data.init_reg;
            let mileage = this.orderDetail.orders_item_data[0].car_data.mileage;
            let initRegDate = initReg === 0 ? '暂无' : this.dateReversal(initReg + '000');
            let imageUrl = this.orderDetail.orders_item_data[0].car_data.imgs;
            return (
                <View style={styles.itemType3}>
                    <View style={{
                        height: Pixel.getPixel(40),
                        marginLeft: Pixel.getPixel(15),
                        justifyContent: 'center'
                    }}>
                        <Text style={styles.orderInfo}>订单号:{this.orderDetail.order_no}</Text>
                        <Text style={styles.orderInfo}>订单日期:{this.orderDetail.created_time}</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{flexDirection: 'row', height: Pixel.getPixel(105), alignItems: 'center'}}>
                        <Image style={styles.image}
                               source={imageUrl.length ? {uri: imageUrl[0].icon_url} : require('../../../images/carSourceImages/car_null_img.png')}/>
                        <View style={{marginLeft: Pixel.getPixel(10)}}>
                            <Text style={{width: width - Pixel.getPixel(15 + 120 + 10 + 15)}}
                                  numberOfLines={1}>{this.orderDetail.orders_item_data[0].model_name}</Text>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(10), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>里程：</Text>
                                <Text style={styles.carDescribe}>{mileage}万</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>上牌：</Text>
                                <Text style={styles.carDescribe}>{initRegDate}</Text>
                            </View>
                            {this.orderState !== 0 ? <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>成交价：</Text>
                                <Text style={styles.carDescribe}>{this.orderDetail.transaction_amount}元</Text>
                            </View> : null}
                        </View>
                    </View>
                </View>
            )
        } else if (rowData === '6') {
            return (
                <View style={styles.itemType6}>
                    <Text style={{
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(3),
                        color: fontAndColor.COLORB2
                    }}>*</Text>
                    <Text>车架号</Text>
                    <TextInput style={{
                        marginLeft: Pixel.getPixel(10),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        padding: 0,
                        width: Pixel.getPixel(180)
                    }}
                               placeholder='输入车架号'
                               underlineColorAndroid='transparent'
                               maxLength={17}
                               onChangeText={this._onVinChange}
                               keyboardType={'ascii-capable'}
                               placeholderTextColor={fontAndColor.COLORA4}
                               ref={(input) => {
                                   this.vinInput = input
                               }}
                               placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}/>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={this._onScanPress}>
                        <View style={{flexDirection: 'row'}}>
                            {/*<Text style={{color: fontAndColor.COLORA2}}>扫描</Text>*/}
                            <Image
                                style={{marginRight: Pixel.getPixel(15)}}
                                source={require('../../../images/mainImage/scanning.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else if (rowData === '7') {
            let done_deposit_amount = 0;
            let done_balance_amount = 0;
            let done_total_amount = this.orderDetail.done_deposit_amount + this.orderDetail.done_balance_amount + '元';
            if (this.refundJudgment(this.orderDetail.done_back_deposit_amount) === 0) {
                done_deposit_amount = this.orderDetail.done_deposit_amount + '元';
            } else {
                done_deposit_amount = this.orderDetail.done_back_deposit_amount;
            }
            if (this.refundJudgment(this.orderDetail.done_back_balance_amount) === 0) {
                done_balance_amount = this.orderDetail.done_balance_amount + '元';
            } else {
                done_balance_amount = this.orderDetail.done_back_balance_amount;
            }
            return (
                <View style={styles.itemType4}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>销售信息</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>到账订金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.done_deposit_amount}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>到账尾款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.done_balance_amount}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>到账总计</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            style={styles.infoContent}>{this.orderDetail.done_total_amount}元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '8') {
            return (
                <View style={styles.itemType5}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>单车融资还款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORA2}}>还款单号:</Text>
                        <Text style={{color: fontAndColor.COLORA2}}>232222333</Text>
                        <Image
                            style={styles.backIcon}
                            source={require('../../../images/mainImage/celljiantou.png')}/>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>本金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>利息</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>居间费</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>还款总计</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>剩余总计</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '9') {
            return (
                <View style={styles.itemType9}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>买家信息</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>姓名</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.buyer_name}</Text>
                    </View>
                    {/*<View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>联系方式</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.buyer_phone}</Text>
                    </View>*/}
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>企业名称</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.buyer_company_name}</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    backIcon: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(12),
        height: Pixel.getPixel(15),
        width: Pixel.getPixel(15)
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    carDescribeTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    carDescribe: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA0
    },
    image: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        resizeMode: 'stretch'
    },
    itemType0: {
        height: Pixel.getPixel(80),
        backgroundColor: '#ffffff',
        //flexDirection: 'row',
        //alignItems: 'center'
        justifyContent: 'center'
    },
    itemType1: {
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    itemType1Ttile: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.TITLEFONT40),
        color: fontAndColor.COLORB2,
        marginTop: Pixel.getPixel(21)
    },
    itemType1Content: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginTop: Pixel.getPixel(7),
        marginBottom: Pixel.getPixel(21)
    },
    itemType2: {
        alignItems: 'center',
        height: Pixel.getPixel(19),
        flexDirection: 'row'
    },
    itemType3: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(146)
    },
    orderInfo: {
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    itemType4: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(151)
    },
    itemType9: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(121)
    },
    itemType7: {
        backgroundColor: '#ffffff'
        //height: Pixel.getPixel(200)
    },
    infoContent: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    infoContentRed: {
        color: fontAndColor.COLORB2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    infoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
        marginRight: Pixel.getPixel(15)
    },
    itemType5: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(200)
    },
    inputBorder: {
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
        height: Pixel.getPixel(40),
        marginTop: Pixel.getPixel(13),
        flexDirection: 'row',
        borderColor: fontAndColor.COLORB0,
        borderWidth: Pixel.getPixel(1),
        borderRadius: Pixel.getPixel(2)
    },
    inputStyle: {
        flex: 1,
        marginLeft: Pixel.getPixel(10),
        textAlign: 'left',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2,
    },
    itemType6: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    expButton: {
        marginBottom: Pixel.getPixel(20),
        width: width - width / 4 - Pixel.getPixel(40),
        height: Pixel.getPixel(35),
        marginTop: Pixel.getPixel(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    expText: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    },
    negativeButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    negativeTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    },
    positiveButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    positiveTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
    },
    bottomBar: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(50),
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: fontAndColor.COLORA4
    },
    tradingCountdown: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(10),
        paddingBottom: Pixel.getPixel(10),
        //height: Pixel.getPixel(40),
        backgroundColor: fontAndColor.COLORB6
    },
    buttonCancel: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Pixel.getPixel(15),
        height: Pixel.getPixel(32),
        width: Pixel.getPixel(100),
        borderRadius: Pixel.getPixel(2),
        borderWidth: Pixel.getPixel(1),
        borderColor: fontAndColor.COLORA2
    },
    buttonConfirm: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        height: Pixel.getPixel(32),
        width: Pixel.getPixel(100),
        borderRadius: Pixel.getPixel(2),
        borderWidth: Pixel.getPixel(1),
        borderColor: fontAndColor.COLORB0
    }
});