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
const Pixel = new PixelUtil();

export default class ProcurementOrderDetailScene extends BaseComponent {

    constructor(props) {
        super(props);
        //let mList = ['0', '1', '2', '3', '4', '5', '6'];

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.items = [];
        this.mList = [];
        this.listViewStyle = Pixel.getPixel(0);
        this.orderDetail = '';
        this.orderState = -1;
        /*        this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
         this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
         this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
         this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
         this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});*/
        this.state = {
            dataSource: ds
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

    initListData = (orderState) => {
        switch (orderState) {
            case 0: //创建订单
                this.mList = [];
                this.mList = ['0', '1', '3', '4', '6'];
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 1: //待付订金
                this.mList = [];
                this.mList = ['0', '1', '2', '3', '4', '6'];
                this.items.push({title: '创建订单', nodeState: 1, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            case 2: //已付订金(待付尾款)
                this.mList = [];
                this.mList = ['0', '1', '3', '4', '6'];
                this.items.push({title: '创建订单', nodeState: 0, isLast: false, isFirst: true});
                this.items.push({title: '已付订金', nodeState: 1, isLast: false, isFirst: false});
                this.items.push({title: '结算尾款', nodeState: 2, isLast: false, isFirst: false});
                //this.items.push({title: '车辆发车', nodeState: 2, isLast: false, isFirst: false});
                this.items.push({title: '完成交易', nodeState: 2, isLast: true, isFirst: false});
                break;
            default:
                break;
        }
    };

    initDetailPageTop = (orderState) => {
        // TODO 根据订单状态初始化详情页悬浮头、悬浮底
        switch (orderState) {
            case 0:
                this.listViewStyle = Pixel.getPixel(0);
                return (
                    <View style={{marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.tradingCountdown}>
                            <Text style={{
                                marginLeft: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB7
                            }}>订金支付剩余时间：</Text>
                            <DepositCountDown />
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
                            <DepositCountDown />
                        </View>
                        <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>
                    </View>
                )
                break;
            case 2:
                this.listViewStyle = Pixel.getTitlePixel(65);
                return null;
                break;
            default:
                return null;
                break;
        }
    };

    initDetailPageBottom = (orderState) => {
        switch (orderState) {
            case 0:
                return (
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.showModal(true);
                                this.loadData();
                            }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 1:
                return (
                    <View style={styles.bottomBar}>
                        <View style={styles.buttonCancel}>
                            <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.toNextPage({
                                    name: 'CheckStand',
                                    component: CheckStand,
                                    params: {}
                                });
                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>支付</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={styles.bottomBar}>
                        <View style={styles.buttonCancel}>
                            <Text style={{color: fontAndColor.COLORA2}}>取消订单</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.toNextPage({
                                    name: 'CheckStand',
                                    component: CheckStand,
                                    params: {}
                                });
                            }}>
                            <View style={styles.buttonConfirm}>
                                <Text style={{color: '#ffffff'}}>支付</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                break;
            default:
                return null;
                break;
        }
    };

    loadData = () => {
        let url = AppUrls.ORDER_DETAIL;
        request(url, 'post', {
            order_no: '20170511'
        }).then((response) => {
            this.props.showModal(false);
            this.orderDetail = response.mjson.data;
            this.orderState = response.mjson.data.status;
            //this.orderState = this.orderDetail.status;
            //console.log('订单列表数据 = ', this.orderListData);
            if (response.mjson.data && this.orderListData.length > 0) {
                this.initListData(orderState);
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
            //console.log('请求错误 = ', error);
            // todo test
            this.orderState = 0;
            this.initListData(this.orderState);
            this.setState({
                // todo test
                dataSource: this.state.dataSource.cloneWithRows(this.mList),
                isRefreshing: false,
                renderPlaceholderOnly: 'error'
            });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigatorView title='订单详情' backIconClick={this.backPage}/>
                {this.initDetailPageTop(this.orderState)}
                <ListView
                    style={{marginTop: this.listViewStyle}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeperator}
                    showsVerticalScrollIndicator={false}/>

                <View style={{flex: 1}}/>
                {this.initDetailPageBottom(this.orderState)}
            </View>
        )
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
                <View style={styles.itemType1}>
                    <View style={{width: Pixel.getPixel(310)}}>
                        <Text style={styles.itemType1Ttile}>已拍下</Text>
                        <Text style={styles.itemType1Content}>请尽快和卖家协商价格,待卖家通知后支付订金待卖家通知后支付订金</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        style={{marginRight: Pixel.getPixel(15), alignSelf: 'center'}}
                        onPress={() => {
                            /*TODO  拨打电话*/
                        }}>
                        <Image
                            source={require('../../../images/mainImage/making_call.png')}/>
                    </TouchableOpacity>
                </View>
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
                        <Text style={styles.orderInfo}>12312332133</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.orderInfo}>订单日期:</Text>
                        <Text style={styles.orderInfo}>2019/09/09</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{flexDirection: 'row', height: Pixel.getPixel(105), alignItems: 'center'}}>
                        <Image style={styles.image}
                               source={{uri: 'http://dycd-static.oss-cn-beijing.aliyuncs.com/Uploads/Oss/201703/13/58c639474ef45.jpg?x-oss-process=image/resize,w_320,h_240'}}/>
                        <View style={{marginLeft: Pixel.getPixel(10)}}>
                            <Text>[北京]奔驰M级(进口) 2015款 M...</Text>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(10), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>里程：</Text>
                                <Text style={styles.carDescribe}>20.59万</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>上牌：</Text>
                                <Text style={styles.carDescribe}>2016-09-09</Text>
                            </View>
{/*                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>标价：</Text>
                                <Text style={styles.carDescribe}>20.59万</Text>
                            </View>*/}
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
                        <Text style={styles.orderInfo}>支付定金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>15000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付尾款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>115000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付总计</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>125000元</Text>
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
                        <Text style={styles.infoContent}>异议</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>联系方式</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>123456664444</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>企业名称</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>终生二手车经销给你公司</Text>
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
        flexDirection: 'row'
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
    }
});