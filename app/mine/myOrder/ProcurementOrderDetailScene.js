/**
 * Created by hanmeng on 2017/5/11.
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    BackAndroid,
    InteractionManager,
    RefreshControl
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import CheckStand from "../../finance/CheckStand";
import DepositCountDown from "./component/DepositCountDown";
import GetCarCountDown from "./component/GetCarCountDown";
import StepView from "./component/StepView";
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";
import ExplainModal from "./component/ExplainModal";
import ContactLayout from "./component/ContactLayout";
import ChooseModal from "./component/ChooseModal";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import AccountWebScene from "../accountManage/AccountWebScene";
import WebScene from "../../main/WebScene";
import ContractWebScene from "./ContractWebScene";
import ContractScene from "./ContractScene";
import LoanInfo from "./component/LoanInfo";
const Pixel = new PixelUtil();

export default class ProcurementOrderDetailScene extends BaseComponent {

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
        this.leftTime = 0;
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
         dataSource: this.state.dataSource.cloneWithRows(['', '', '']),
         renderPlaceholderOnly: 'success'
         });*/
        this.loadData();
    };

    dateReversal = (time) => {
        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "-" + (this.PrefixInteger(date.getMonth() + 1, 2)) + "-" +
        (this.PrefixInteger(date.getDate(), 2)));
    };

    PrefixInteger = (num, length) => {
        return (Array(length).join('0') + num).slice(-length);
    };

    /**
     * 获取订单剩余时间
     * @param serverTime
     * @param createdTime  订单创建时间
     */
    getLeftTime = (serverTime, createdTime) => {
        let currentTime = new Date(serverTime.replace(/-/g, '/')).valueOf();
        let oldTime = new Date(createdTime.replace(/-/g, '/')).valueOf();
        return parseFloat(currentTime) - parseFloat(oldTime);
    };

    /**
     * 判断订单详情页显示内容
     * @param orderState   订单状态
     * @param merchantNum   商家电话
     * @param customerServiceNum   客服电话
     */
    initListData = (orderState, merchantNum, customerServiceNum) => {
        switch (orderState) {
            case 0: //创建订单
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '已拍下',
                    layoutContent: '请先与卖家联系商议成交价，待卖家确认后支付订金。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 1: // 待付订金
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '2', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '付订金',
                    layoutContent: '请尽快支付订金' + this.orderDetail.deposit_amount + '元，支付后卖家可查看到账金额，但不可提现。',
                    setPrompt: true,
                    promptTitle: '订金说明',
                    promptContent: '交付订金后卖家会为您保留车源，且卖家不可提现，如果交易最终未完成，您可以和卖家协商退回订金。',
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 2: // 已付订金(待付尾款)
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '付尾款',
                    layoutContent: '支付后卖家可查看到账金额，但不可提现。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 1, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 3: // 全款付清
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '2', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '全款已付清',
                    layoutContent: '确认验收车辆后卖家可提款，手续齐全。',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 0, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 1, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 4: // 已完成
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '已完成',
                    layoutContent: '恭喜您交易已完成',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 0, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 0, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 1, isLast: true, isFirst: false});
                break;
            case 5: // 订单融资处理中
                this.mList = [];
                this.mList = ['3', '7'];
                break;
            case 6: // 待付首付款
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '2', '3', '4', '5', '6'];
                this.contactData = {
                    layoutTitle: '付首付款',
                    layoutContent: '请支付首付款，之后等待放款。',
                    setPrompt: true,
                    promptTitle: '首付款说明',
                    promptContent: '车贷房贷前您需先支付首付款，卖家可查看到账金额，但不可提现。如交易最终未完成，首付款可退回。'
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 1, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 7: // 融资单确认验收车辆
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '2', '3', '4', '7', '6'];
                this.contactData = {
                    layoutTitle: '确认验收车辆',
                    layoutContent: '确认验收后，请等待贷款放款。',
                    setPrompt: false
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 1, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 8: // 融资单完成交易
                this.mList = [];
                this.items = [];
                this.contactData = {};
                this.mList = ['0', '1', '3', '4', '7', '6'];
                this.contactData = {
                    layoutTitle: '已完成',
                    layoutContent: '恭喜您交易已完成',
                    setPrompt: false
                };
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 0, isLast: false, isFirst: false});
                this.items.push({title: '结清尾款', nodeState: 0, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 1, isLast: true, isFirst: false});
                break;
            default:
                break;
        }
    };

    /**
     * 根据订单状态初始化详情页悬浮头
     * @param topState 页面悬浮头状态
     * @returns 返回顶部布局
     */
    initDetailPageTop = (topState) => {
        switch (topState) {
            case 0:
                this.listViewStyle = Pixel.getPixel(0);
                return (
                    <View style={{marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.tradingCountdown}>
                            <Text>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    color: fontAndColor.COLORB7
                                }}>订金支付剩余时间</Text>
                                <DepositCountDown leftTime={this.leftTime}/>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                    color: fontAndColor.COLORB7
                                }}>超时未付订单自动取消</Text>
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
                            <Text style={{
                                marginLeft: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB7
                            }}>订金支付剩余时间：</Text>
                            <GetCarCountDown />
                        </View>
                        <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>
                    </View>
                )
                break;
            case 2:
                this.listViewStyle = Pixel.getPixel(0);
                return (
                    <View style={{marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.tradingCountdown}>
                            <Text style={{
                                marginLeft: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB7
                            }}>您申请的贷款已准备放款，申请发车后付款到卖家账户，卖家可提现全部车款。</Text>
                        </View>
                        <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>
                    </View>
                )
                break;
            case 3:
                this.listViewStyle = Pixel.getPixel(0);
                return (
                    <View style={{marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.tradingCountdown}>
                            <Text style={{
                                marginLeft: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB7
                            }}>正在准备放款请稍后。</Text>
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
                    type: 1
                };
                let url = AppUrls.ORDER_CANCEL;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('取消订单申请失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('取消订单申请失败');
            }
        });
    };


    /**
     * 确认收车请求
     */
    confirmCar = () => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id
                };
                let url = AppUrls.ORDER_CONFIRM_CAR;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('确认验收失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('确认验收失败');
            }
        });
    };

    /**
     * 撤销取消订单请求
     */
    revertOrder = () => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id
                };
                let url = AppUrls.ORDER_REVERT;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.loadData();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('恢复订单失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('恢复订单失败');
            }
        });
    };

    getTypeContractInfo = (type) => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id,
                    type: type
                };
                let url = AppUrls.ORDER_GET_CONTRACT;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        //console.log(response.mjson.data);
                        this.props.showModal(false);
                        this.toNextPage({
                            name: 'ContractScene',
                            component: ContractScene,
                            params: {
                                contractList: response.mjson.data.contract_image_path
                            }
                        });
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('查看合同失败');
            }
        });
    };

    payCallBack = () => {
        this.props.showModal(true);
        this.loadData();
    };

    /**
     * 根据订单状态初始化详情页悬浮底
     * @param orderState 页面悬浮底状态
     * @returns {*}
     */
    initDetailPageBottom = (orderState) => {
        switch (orderState) {
            case 0:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.chooseModal.changeShowType(true, '取消', '确定', '卖家将在您发起取消申请24小时内回复，如已支付订金将与卖家协商退款。',
                                    this.cancelOrder);
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
                                     content=''/>
                    </View>
                )
                break;
            case 1:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.chooseModal.changeShowType(true, '取消', '确定', '卖家将在您发起取消申请24小时内回复，如已支付订金将与卖家协商退款。',
                                    this.cancelOrder);
                            }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.toNextPage({
                                    name: 'CheckStand',
                                    component: CheckStand,
                                    params: {
                                        payAmount: this.orderState === 1 ? this.orderDetail.deposit_amount : this.orderDetail.balance_amount,
                                        orderId: this.props.orderId,
                                        orderNo: this.orderDetail.order_no,
                                        payType: this.orderState,
                                        pledgeType: this.orderDetail.orders_item_data[0].car_finance_data.pledge_type,
                                        pledgeStatus: this.orderDetail.orders_item_data[0].car_finance_data.pledge_status,
                                        callBack: this.payCallBack
                                    }
                                });
                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>支付</Text>
                            </View>
                        </TouchableOpacity>
                        <ChooseModal ref='chooseModal' title='提示'
                                     negativeButtonStyle={styles.negativeButtonStyle}
                                     negativeTextStyle={styles.negativeTextStyle} negativeText='取消'
                                     positiveButtonStyle={styles.positiveButtonStyle}
                                     positiveTextStyle={styles.positiveTextStyle} positiveText='确定'
                                     buttonsMargin={Pixel.getPixel(20)}
                                     positiveOperation={this.cancelOrder}
                                     content=''/>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.expModal.changeShowType(true, '提示', '订单尾款已结清联系客服取消订单', '确定');
                            }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.chooseModal.changeShowType(true, '取消', '确定', '确定后卖家可提现全款。',
                                    this.confirmCar);
                                //this.props.showModal(true);
                                //this.confirmCar();
                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>确认验收</Text>
                            </View>
                        </TouchableOpacity>
                        <ChooseModal ref='chooseModal' title='注意'
                                     negativeButtonStyle={styles.negativeButtonStyle}
                                     negativeTextStyle={styles.negativeTextStyle} negativeText='取消'
                                     positiveButtonStyle={styles.positiveButtonStyle}
                                     positiveTextStyle={styles.positiveTextStyle} positiveText='确定'
                                     buttonsMargin={Pixel.getPixel(20)}
                                     positiveOperation={this.confirmCar}
                                     content=''/>
                        <ExplainModal ref='expModal' title='提示' buttonStyle={styles.expButton}
                                      textStyle={styles.expText}
                                      text='确定' content='订单尾款已结清联系客服取消订单'/>
                    </View>
                )
                break;
            case 3:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.showModal(true);
                                this.revertOrder();
                            }}>
                            <View style={[styles.buttonCancel, {width: Pixel.getPixel(137)}]}>
                                <Text style={{color: fontAndColor.COLORA2}}>撤回取消订单申请</Text>
                            </View>
                        </TouchableOpacity>
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
                            交易关闭
                        </Text>
                    </View>
                );
                break;
            case 5:
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
            case 6:
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
            case 7:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{color: fontAndColor.COLORA2}}>款项支付中</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 8:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.showModal(true);
                                this.revertOrder();
                            }}>
                            <View style={[styles.buttonCancel, {width: Pixel.getPixel(137)}]}>
                                <Text style={{color: fontAndColor.COLORA2}}>正在处理中请稍后</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;
            case 9:
                return (
                    <View style={[styles.bottomBar, {justifyContent: 'center'}]}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORB0
                        }}>
                            交易关闭(后台取消订单)
                        </Text>
                    </View>
                );
                break;
            default:
                return null;
                break;
        }
    };

    /**
     *  根据订单详情接口的 status 和 cancel_status 字段组合判断页面渲染
     */
    stateMapping = (status, cancelStatus) => {
        switch (status) {
            case 0:  // 已拍下，价格未定  0=>'创建订单'
            case 1:  //  1=>'订单定价中'
                if (cancelStatus === 0) {
                    this.orderState = 0;
                    this.topState = 0;
                    this.bottomState = 0;
                } else if (cancelStatus === 1) {
                    this.orderState = 0;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 0;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else {
                        this.bottomState = 4;
                    }
                } else if (cancelStatus === 3) {
                    this.orderState = 0;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else {
                        this.bottomState = 4;
                    }
                }
                break;
            case 2: // 待付订金  2=>'订单定价完成'
            case 3: // 3=>'订金支付中'
            case 4:  // 4=>'订金支付失败'
                if (cancelStatus === 0) {
                    this.orderState = 1;
                    this.topState = 0;
                    if (status === 3) {
                        this.bottomState = 1;
                    } else {
                        this.bottomState = 1;
                    }
                } else if (cancelStatus === 1) {
                    this.orderState = 1;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 1;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else {
                        this.bottomState = 4;
                    }
                } else if (cancelStatus === 3) {
                    this.orderState = 1;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else {
                        this.bottomState = 4;
                    }
                }

                break;
            case 5:  // 待付尾款  5=>'订金支付完成'
            case 6:  // 6=>'尾款支付中'
            case 7:  // 7=>'尾款支付失败'
                if (cancelStatus === 0) {
                    this.orderState = 2;
                    this.topState = -1;
                    if (status === 6) {
                        this.bottomState = 1;
                    } else {
                        this.bottomState = 1;
                    }
                } else if (cancelStatus === 1) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 2;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else if (this.orderDetail.cancel_side == 2) {
                        this.bottomState = 5;
                    } else {
                        if (this.orderDetail.cancel_is_agree == 2) {
                            this.bottomState = 6;
                        } else {
                            this.bottomState = 5;
                        }
                    }
                } else if (cancelStatus === 3) {
                    this.orderState = 2;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else if (this.orderDetail.cancel_side == 2) {
                        this.bottomState = 5;
                    } else {
                        if (this.orderDetail.cancel_is_agree == 2) {
                            this.bottomState = 6;
                        } else {
                            this.bottomState = 5;
                        }
                    }
                }
                break;
            case 8: // 全款付清  8=>'尾款支付完成'
            case 9: // 9=>'确认验收中'
            case 10: // 10=>'确认验收失败'
                if (cancelStatus === 0) {
                    this.orderState = 3;
                    this.topState = -1;
                    if (status === 9) {
                        this.bottomState = 8;
                    } else {
                        this.bottomState = 2;
                    }
                } else if (cancelStatus === 1) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 3;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else if (this.orderDetail.cancel_side == 2) {
                        this.bottomState = 5;
                    } else {
                        if (this.orderDetail.cancel_is_agree == 2) {
                            this.bottomState = 6;
                        } else {
                            this.bottomState = 5;
                        }
                    }
                } else if (cancelStatus === 3) {
                    this.orderState = 3;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else if (this.orderDetail.cancel_side == 2) {
                        this.bottomState = 5;
                    } else {
                        if (this.orderDetail.cancel_is_agree == 2) {
                            this.bottomState = 6;
                        } else {
                            this.bottomState = 5;
                        }
                    }
                }
                break;
            case 11:  // 订单完成 11=>'确认验收完成'
                if (cancelStatus === 0) {
                    this.orderState = 4;
                    this.topState = -1;
                    this.bottomState = -1;
                } else if (cancelStatus === 1) {
                    this.orderState = 4;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 4;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else if (this.orderDetail.cancel_side == 2) {
                        this.bottomState = 5;
                    } else {
                        if (this.orderDetail.cancel_is_agree == 2) {
                            this.bottomState = 6;
                        } else {
                            this.bottomState = 5;
                        }
                    }
                } else if (cancelStatus === 3) {
                    this.orderState = 4;
                    this.topState = -1;
                    if (this.orderDetail.cancel_side == 3) {
                        this.bottomState = 9;
                    } else if (this.orderDetail.cancel_side == 2) {
                        this.bottomState = 5;
                    } else {
                        if (this.orderDetail.cancel_is_agree == 2) {
                            this.bottomState = 6;
                        } else {
                            this.bottomState = 5;
                        }
                    }
                }
                break;
            case 12:

                break;
        }
    };

    loadData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.props.orderId,
                    type: 2,
                    sort: 1
                };
                let url = AppUrls.ORDER_DETAIL;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.props.showModal(false);
                        this.orderDetail = response.mjson.data;
                        let status = response.mjson.data.status;
                        let cancelStatus = response.mjson.data.cancel_status;
                        this.leftTime = this.getLeftTime(this.orderDetail.server_time, this.orderDetail.created_time);
                        //console.log('this.leftTime====', this.leftTime);
                        //this.props.showToast('this.leftTime===='+ this.leftTime);
                        if (cancelStatus == 2 || cancelStatus == 3) {
                            if (this.orderDetail.order_flows.length > 0) {
                                let cancel = this.orderDetail.order_flows;
                                for (let state in cancel) {
                                    status = cancel[state];
                                }
                            } else {
                                status = 0;
                            }
                        }
                        this.stateMapping(status, cancelStatus);

                        // TODO this is TEST!!!!!!!!!!!!
                        //this.orderState = 6;

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

    // 下拉刷新数据
    refreshingData = () => {
        //this.orderListData = [];
        this.setState({isRefreshing: true});
        this.loadData();
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
                    showShopId={this.orderDetail.seller_company_id}/>
            )
        } else if (rowData === '2') {
            return (
                <View style={styles.itemType2}>
                    <Image
                        style={{marginLeft: Pixel.getPixel(15)}}
                        source={require('../../../images/mainImage/agreed_sign.png')}/>
                    <Text style={{color: fontAndColor.COLORA1, marginLeft: Pixel.getPixel(5)}}>我已同意签署</Text>
                    {
                        this.orderState == 1 &&
                        <Text
                            onPress={() => {
                                this.getTypeContractInfo(1)
                            }}
                            style={{color: fontAndColor.COLORA2}}>《买卖协议》</Text>
                    }
                    {
                        this.orderState == 3 &&
                        <Text
                            onPress={() => {
                                this.getTypeContractInfo(2)
                            }}
                            style={{color: fontAndColor.COLORA2}}>《买卖协议附件》</Text>
                    }
                    {/*<Text style={{color: fontAndColor.COLORA1}}>和</Text>
                     <Text
                     onPress={() => {
                     this.getTypeContractInfo(2)
                     }}
                     style={{color: fontAndColor.COLORA2}}>《授权声明》</Text>*/}
                </View>
            )
        } else if (rowData === '3') {
            let initReg = this.orderDetail.orders_item_data[0].car_data.init_reg;
            let mileage = this.orderDetail.orders_item_data[0].car_data.mileage;
            let initRegDate = initReg === 0 ? '暂无' : this.dateReversal(initReg + '000');
            let imageUrl = this.orderDetail.orders_item_data[0].car_data.imgs;
            /*let imageUrl = [];
             let initRegDate = this.dateReversal('1496462' + '000');*/
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
                                  numberOfLines={1}>{this.orderDetail.orders_item_data[0].car_data.model_name}</Text>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(10), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>里程：</Text>
                                <Text
                                    style={styles.carDescribe}>{mileage}万</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>上牌：</Text>
                                <Text style={styles.carDescribe}>{initRegDate}</Text>
                            </View>
                            {this.orderState !== 0 ? <View
                                style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>成交价：</Text>
                                <Text style={styles.carDescribe}>{this.orderDetail.transaction_amount}元</Text>
                            </View> : null}
                        </View>
                    </View>
                </View>
            )
        } else if (rowData === '4') {
            return (
                <View style={styles.itemType4}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>采购信息</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>支付订金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.done_deposit_amount}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付尾款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.done_balance_amount}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付总计</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            style={styles.infoContent}>{this.orderDetail.done_total_amount}元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '5') {
            return (
                <LoanInfo
                    loanCode={this.orderDetail.orders_item_data[0].car_finance_data.loan_code}
                />
            )
        } else if (rowData === '6') {
            return (
                <View style={styles.itemType6}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>卖家信息</Text>
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
                        <Text style={styles.infoContent}>{this.orderDetail.seller_name}</Text>
                    </View>
                    {/*<View style={styles.infoItem}>
                     <Text style={styles.orderInfo}>联系方式</Text>
                     <View style={{flex: 1}}/>
                     <Text style={styles.infoContent}>{this.orderDetail.seller_phone}</Text>
                     </View>*/}
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>企业名称</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.seller_company_name}</Text>
                    </View>
                </View>
            )
        } else if (rowData === '7') {
            return (
                <TouchableOpacity
                    style={styles.itemType7}
                    onPress={() => {
                        // 跳转金融页面  借款详情
                        //this.props.showToast('rowData === 7');
                    }}>
                    <View style={{alignItems: 'center', flexDirection: 'row', height: Pixel.getPixel(44)}}>
                        <Text style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORA0
                        }}>借款单号</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{
                            marginRight: Pixel.getPixel(10),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA1
                        }}>{this.orderDetail.orders_item_data[0].car_finance_data.loan_code ? this.orderDetail.orders_item_data[0].car_finance_data.loan_code : '未生成借款单号'}</Text>
                        <Image source={require('../../../images/mainImage/celljiantou.png')}
                               style={{marginRight: Pixel.getPixel(15)}}/>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData === '8') {
            return (
                <TouchableOpacity
                    style={styles.itemType7}
                    onPress={() => {
                        // 跳转金融页面
                        //this.props.showToast('rowData === 7');
                    }}>
                    <View style={{alignItems: 'center', flexDirection: 'row', height: Pixel.getPixel(44)}}>
                        <Text style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORA0
                        }}>贷款信息</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{
                            marginRight: Pixel.getPixel(10),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA1
                        }}>贷款单号：</Text>
                        <Image source={require('../../../images/mainImage/celljiantou.png')}
                               style={{marginRight: Pixel.getPixel(15)}}/>
                    </View>
                </TouchableOpacity>
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
        fontSize: Pixel.getFontPixel(fontAndColor.TITLEFONT40),
        color: fontAndColor.COLORB2
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
    itemType6: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(121)
    },
    infoContent: {
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
        height: Pixel.getPixel(240)
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
        color: fontAndColor.COLORA2
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
    tradingCountdown: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(10),
        paddingBottom: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORB6
    },
    expButton: {
        marginBottom: Pixel.getPixel(20),
        width: Pixel.getPixel(100),
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
    positiveTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
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
    negativeTextStyle: {
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
    itemType7: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(44)
    }
});