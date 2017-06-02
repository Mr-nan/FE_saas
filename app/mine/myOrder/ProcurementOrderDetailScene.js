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
    InteractionManager
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
const Pixel = new PixelUtil();

export default class ProcurementOrderDetailScene extends BaseComponent {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
            dataSource: ds,
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
        (this.PrefixInteger(date.getDate() + 1, 2)));
    };

    PrefixInteger = (num, length) => {
        return (Array(length).join('0') + num).slice(-length);
    };

    /**
     * 获取订单剩余时间
     * @param createdTime  订单创建时间
     */
    getLeftTime = (createdTime) => {
        let currentTime = new Date().getTime();
        let oldTime = new Date(createdTime).getTime();
        //console.log('当前时间:::', currentTime);
        //console.log('创建时间:::', oldTime);
        //this.formatLongToTimeStr(currentTime - oldTime);
        return currentTime - oldTime;
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
                this.mList = ['0', '1', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '已拍下',
                    setPrompt: false,
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 1: // 待付订金
                this.mList = [];
                this.mList = ['0', '1', '2', '3', '4', '6'];
                this.contactData = {
                    layoutTitle: '付订金',
                    layoutContent: '请尽快支付订金，避免此车被其他买家买走。',
                    setPrompt: true,
                    promptTitle: '订金说明',
                    promptContent: '交付订金后卖家会为您保留车源，且卖家不可提现，如果交易最终未完成，您可以和卖家协商',
                    MerchantNum: merchantNum,
                    CustomerServiceNum: customerServiceNum
                };
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 2: // 已付订金(待付尾款)
                this.mList = [];
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
                this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 3: // 全款付清
                this.mList = [];
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
                this.items.push({title: '结算尾款', nodeState: 1, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 4: // 已完成
                this.mList = [];
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
                this.items.push({title: '结算尾款', nodeState: 0, isLast: false, isFirst: false});
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
                            <Text style={{
                                marginLeft: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB7
                            }}>订金支付剩余时间:</Text>
                            <DepositCountDown leftTime={this.leftTime}/>
                            <Text style={{
                                marginLeft: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB7
                            }}>超时未付订单自动取消</Text>
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
                            }}>您申请的贷款已准备放款</Text>
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
                    this.loadData();
                }, (error) => {
                    this.props.showToast('取消订单申请失败');
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
        let url = AppUrls.ORDER_CONFIRM_CAR;
        request(url, 'post', {
            order_id: this.orderDetail.id
        }).then((response) => {
            //this.props.showModal(false);
            this.loadData();
        }, (error) => {
            //this.props.showModal(false);
            //console.log("成交价提交失败");
            this.props.showToast('确认验收失败');
        });
    };

    /**
     * 撤销取消订单请求
     */
    revertOrder = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.orderDetail.id
                };
                let url = AppUrls.ORDER_REVERT;
                request(url, 'post', maps).then((response) => {
                    this.loadData();
                }, (error) => {
                    this.props.showToast('恢复订单失败');
                });
            } else {
                this.props.showToast('恢复订单失败');
            }
        });
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
                                this.refs.chooseModal.changeShowType(true);
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
                                     content='卖家将在您发起取消申请24小时内回复，如已支付订金将与卖家协商退款。'/>
                    </View>
                )
                break;
            case 1:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.chooseModal.changeShowType(true);
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
                                        payAmount: this.orderDetail.deposit_amount,
                                        orderId: this.props.orderId
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
                                     content='卖家将在您发起取消申请24小时内回复，如已支付订金将与卖家协商退款。'/>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.showModal(true);
                                this.confirmCar();
                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>确认验收</Text>
                            </View>
                        </TouchableOpacity>
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
            case 0:  // 已拍下，价格未定
            case 1:
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
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 0;
                    this.topState = -1;
                    this.bottomState = 4;
                }
                break;
            case 2: // 待付订金
            case 3:
                if (cancelStatus === 0) {
                    this.orderState = 1;
                    this.topState = 0;
                    this.bottomState = 1;
                } else if (cancelStatus === 1) {
                    this.orderState = 1;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 1;
                    this.topState = -1;
                    this.bottomState = 4;
                } else if (cancelStatus === 3) {
                    this.orderState = 1;
                    this.topState = -1;
                    this.bottomState = 4;
                }

                break;
            case 4:  // 待付尾款
            case 5:
                if (cancelStatus === 0) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 1;
                } else if (cancelStatus === 1) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 6;
                } else if (cancelStatus === 3) {
                    this.orderState = 2;
                    this.topState = -1;
                    this.bottomState = 5;
                }
                break;
            case 6: // 全款付清
            case 7:
                if (cancelStatus === 0) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 2;
                } else if (cancelStatus === 1) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 3;
                } else if (cancelStatus === 2) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 6;
                } else if (cancelStatus === 3) {
                    this.orderState = 3;
                    this.topState = -1;
                    this.bottomState = 5;
                }
                break;
            case 8:  // 订单完成
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
                    this.bottomState = 6;
                } else if (cancelStatus === 3) {
                    this.orderState = 4;
                    this.topState = -1;
                    this.bottomState = 5;
                }
                break;
        }
    };

    loadData = () => {
        let url = AppUrls.ORDER_DETAIL;
        request(url, 'post', {
            order_id: this.props.orderId,
            type: 2
        }).then((response) => {
            this.props.showModal(false);
            this.orderDetail = response.mjson.data;
            let status = response.mjson.data.status;
            let cancelStatus = response.mjson.data.cancel_status;
            this.stateMapping(status, cancelStatus);
            this.leftTime = this.getLeftTime(this.orderDetail.created_time);
            if (this.orderDetail) {
                this.initListData(this.orderState);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.mList),
                    isRefreshing: false,
                    renderPlaceholderOnly: 'success'
                });
            } else {
                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null'
                });
            }

        }, (error) => {
            this.props.showModal(false);
            //this.stateMapping(2, 0);
            this.setState({
                //dataSource: this.state.dataSource.cloneWithRows(this.mList),
                isRefreshing: false,
                renderPlaceholderOnly: 'error'
            });
        });
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
                        showsVerticalScrollIndicator={false}/>
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
                    MerchantNum={this.contactData.merchantNum ? this.contactData.merchantNum : ''}
                    CustomerServiceNum={this.contactData.customerServiceNum ? this.contactData.customerServiceNum : ''}/>
            )
        } else if (rowData === '2') {
            return (
                <View style={styles.itemType2}>
                    <Image
                        style={{marginLeft: Pixel.getPixel(15)}}
                        source={require('../../../images/mainImage/agreed_sign.png')}/>
                    <Text style={{color: fontAndColor.COLORA1, marginLeft: Pixel.getPixel(5)}}>我已同意签署</Text>
                    <Text style={{color: fontAndColor.COLORA2}}>《买卖协议》</Text>
                    <Text style={{color: fontAndColor.COLORA1}}>和</Text>
                    <Text style={{color: fontAndColor.COLORA2}}>《授权声明》</Text>
                </View>
            )
        } else if (rowData === '3') {
            let initRegDate = this.dateReversal(this.orderDetail.orders_item_data[0].car_data.init_reg + '000');
            let imageUrl = this.orderDetail.orders_item_data[0].car_data.imgs;
            return (
                <View style={styles.itemType3}>
                    <View style={{
                        flexDirection: 'row',
                        height: Pixel.getPixel(40),
                        marginLeft: Pixel.getPixel(15),
                        marginRight: Pixel.getPixel(15),
                        alignItems: 'center'
                    }}>
                        <Text style={styles.orderInfo}>订单号:</Text>
                        <Text style={styles.orderInfo}>{this.orderDetail.order_no}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.orderInfo}>订单日期:</Text>
                        <Text style={styles.orderInfo}>{this.orderDetail.created_time}</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{flexDirection: 'row', height: Pixel.getPixel(105), alignItems: 'center'}}>
                        <Image style={styles.image}
                               source={imageUrl.length ? {uri: imageUrl[0].icon_url} : require('../../../images/carSourceImages/car_null_img.png')}/>
                        <View style={{marginLeft: Pixel.getPixel(10)}}>
                            <Text style={{width: width - Pixel.getPixel(15 + 120 + 10 + 15)}}
                                  numberOfLines={1}>{this.orderDetail.orders_item_data[0].car_name}</Text>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(10), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>里程：</Text>
                                <Text
                                    style={styles.carDescribe}>{this.orderDetail.orders_item_data[0].car_data.mileage}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>上牌：</Text>
                                <Text style={styles.carDescribe}>{initRegDate}</Text>
                            </View>
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
                        <Text style={styles.infoContent}>{this.orderDetail.deposit_amount}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付尾款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.balance_amount}元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付总计</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            style={styles.infoContent}>{this.orderDetail.deposit_amount + this.orderDetail.balance_amount}元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '5') {
            return (
                <View style={styles.itemType5}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>贷款信息</Text>
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
                        <Text style={styles.orderInfo}>最大可贷额度</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    {/*TODO 输入申请贷款额度*/}
                    <View style={styles.inputBorder}>
                        <TextInput defaultValue={0}
                                   placeholder={"请输入申请贷款的额度"}
                                   style={styles.inputStyle}
                                   secureTextEntry={false}
                                   underlineColorAndroid="transparent"
                        />
                        <Text style={{marginRight: Pixel.getPixel(10)}}>元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>需支付服务费</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>需支付OBD使用费</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>应付首付款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '6') {
            return (
                <View style={styles.itemType4}>
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
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>联系方式</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.seller_phone}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>企业名称</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>{this.orderDetail.seller_company_name}</Text>
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
        height: Pixel.getPixel(40),
        backgroundColor: fontAndColor.COLORB6
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
    }
});