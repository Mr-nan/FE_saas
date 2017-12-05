import React, {Component, PropTypes} from 'react'
import {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    RefreshControl,
    Platform,
} from 'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil'

var Pixel = new PixelUtil();
import BaseComponent from "../../component/BaseComponent";
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import LoadMoreFooter from '../../component/LoadMoreFooter';
import CheckStand from "./CheckStand";
import AccountManageScene from '../../mine/accountManage/AccountTypeSelectScene';
import WaitActivationAccountScene from '../../mine/accountManage/WaitActivationAccountScene';
import AccountScene from '../../mine/accountManage/AccountScene';
import BindCardScene from '../../mine/accountManage/BindCardScene';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
/*
 * 获取屏幕的宽和高
 **/
let page = 1;
let allPage = 1;
let allSouce = [];
const {width, height} = Dimensions.get('window');
import * as fontAndClolr from '../../constant/fontAndColor';

let lastType = '-1';
let haveOrder = 0;
let listLength=0;
export default class SupervisionNoPayScene extends BaseComponent {
    constructor(props) {
        super(props);
        listLength=0;
        this.flag=true;
        this.tabNum = this.props.tabNum;
        lastType = '-1';
        allSouce = [];
        this.url = '';
        this.accountStatus = '';
        this.isVisible = false;
        this.payFee = 0;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.accountStatus = '';
        this.state = {
            dataSource: this.ds.cloneWithRows(allSouce),
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            accountStatus: '',
            isVisible: false,
            noPay: false,
        };
    }

    initFinish = () => {
        page = 1;
        allSouce = [];
        this.getData();
    }

    componentDidUpdate() {
        //记得改
        if (this.state.renderPlaceholderOnly !== 'success') {
            if(this.flag){

                this.checkAcountState();
            }
        }
    }

    checkAcountState() {
        lastType = '-1';
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1'
                };
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                            haveOrder = response.mjson.data.order.tradeing_count;
                            lastType = response.mjson.data.account.status;
                            console.log('-------', lastType);
                            if (lastType == '0') {
                                this.accountStatus = '开户';
                                this.isVisible = true;

                            } else if (lastType == '1') {
                                this.accountStatus = '绑卡';
                                this.isVisible = true;

                            } else if (lastType == '2') {
                                this.accountStatus = '激活';
                                this.isVisible = true;
                            } else {
                                this.isVisible = false;
                            }
                            this.setState({
                                isVisible: this.isVisible,
                                accountStatus: this.accountStatus
                            });
                            this.flag=false;

                        },
                        (error) => {
                            this.props.showToast('用户信息查询失败');
                        });
            } else {
                this.props.showToast('用户信息查询失败');
            }
        });
    }

    allRefresh = () => {
        page = 1;
        allPage = 1;
        allSouce = [];
        this.setState({
            renderPlaceholderOnly: 'loading',
        });
        this.getData();
    }

    toPage = () => {
        this.props.showLoading();
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1'
                };
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                            this.props.closeLoading();
                            haveOrder = response.mjson.data.order.tradeing_count;
                            lastType = response.mjson.data.account.status;
                            if (lastType == '0') {
                                this.toNextPage({
                                    name: 'AccountManageScene',
                                    component: AccountManageScene,
                                    params: {
                                        callBack: () => {
                                            this.props.closeLoading();
                                            this.checkAcountState();
                                        }
                                    }
                                });

                            } else if (lastType == '1') {
                                this.toNextPage({
                                    name: 'BindCardScene',
                                    component: BindCardScene,
                                    params: {
                                        callBack: () => {
                                            this.props.closeLoading();
                                            this.checkAcountState();
                                        }
                                    }
                                });

                            } else if (lastType == '2') {
                                this.toNextPage({
                                    name: 'WaitActivationAccountScene',
                                    component: WaitActivationAccountScene,
                                    params: {
                                        callBack: () => {
                                            this.props.closeLoading();
                                            this.checkAcountState();
                                        }
                                    }
                                });
                            }
                        },
                        (error) => {
                            this.props.showToast('用户信息查询失败');
                        });
            } else {
                this.props.closeLoading();
                this.props.showToast('用户信息查询失败');
            }
        });
    }
    navigatorParams = {

        name: 'AccountManageScene',
        component: AccountManageScene,
        params: {}
    }

    getData = () => {
        let maps = {
            api: Urls.SUPERVISE_LIST,
            status: '1',
        };
        request(Urls.FINANCE, 'Post', maps)

            .then((response) => {
                    this.payFee=0;
                    let data=response.mjson.data;
                    // let data = json.data.response;
                    if (page == 1 && data.order_list.length <= 0) {
                        listLength=0;
                        this.setState({renderPlaceholderOnly: 'noPayOrder'});
                    } else {
                        listLength=data.order_list.length;
                        allSouce.push(...data.order_list);
                        this.payFee=parseFloat(data.supervision_fee_total).toFixed(2);
                        this.setState({
                            dataSource: this.ds.cloneWithRows(allSouce),
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success',
                            noPay: this.payFee > 0 ? true : false

                        });
                        this.props.freshData(listLength);
                    }
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    }

    refreshingData = () => {
        allSouce = [];
        this.setState({isRefreshing: true});
        this.getData();
    };

    render() {
        let bottomStyle={};
        if(Platform.OS === 'android'){
            bottomStyle={marginBottom: Pixel.getPixel(25)};
            if(this.state.noPay){
                bottomStyle={marginBottom: Pixel.getPixel(78)};
            }
        }else{
            bottomStyle={marginBottom: Pixel.getPixel(5)};
            if(this.state.noPay){
                bottomStyle={marginBottom: Pixel.getPixel(55)};
            }
        }
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (<View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, paddingTop: Pixel.getPixel(15)}}>
                {this.loadView()}
            </View>);
        } else {

            return (
                <View style={{flex: 1,}}>
                    <View style={[styles.container, bottomStyle]}>
                        {
                            this.state.isVisible ? this._renderHeader() : null
                        }
                        <ListView
                            contentContainerStyle={styles.listStyle}
                            dataSource={this.state.dataSource}
                            removeClippedSubviews={false}
                            renderRow={this._renderRow}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.refreshingData}
                                    tintColor={[fontAndColor.COLORB0]}
                                    colors={[fontAndColor.COLORB0]}
                                />
                            }
                        />

                    </View>
                    {this.state.noPay ?
                        <View
                            style={[styles.footerStyle, Platform.OS === 'android' ? {bottom: Pixel.getPixel(25)} : {}]}>
                            <Text
                                style={{
                                    color: '#666666',
                                    fontSize: 13,
                                    marginHorizontal: Pixel.getPixel(10)
                                }}>待付合计:</Text>
                            <Text style={{color: '#FA5C48', fontSize: 18, flex: 1}}>{'￥' + this.payFee}</Text>
                            <TouchableOpacity activeOpacity={0.8} style={{
                                width: Pixel.getPixel(80),
                                height: Pixel.getPixel(38),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#69dcda',
                                borderRadius: 4,
                                marginRight: Pixel.getPixel(10)
                            }} onPress={() => {
                                this.toNextPage({
                                    name: 'CheckStand',
                                    component: CheckStand,
                                    params: {
                                        payAmount: this.payFee,
                                        callBack: () => {
                                            allSouce = [];
                                            this.setState({renderPlaceholderOnly: 'loading'});
                                            this.getData();
                                        },
                                    },
                                })
                            }}
                            >
                                <Text style={{color: 'white', fontSize: 18}}>支付</Text>
                            </TouchableOpacity>
                        </View> : null}
                </View>
            );
        }
    }

    // }
    _renderHeader = () => {
        return (
            <View style={styles.headerStyle}>
                <Text style={{color: '#846546', flex: 1, fontSize: 15}}>{"还未开通" + this.state.accountStatus}</Text>
                <TouchableOpacity activeOpacity={0.8} style={{
                    width: Pixel.getPixel(66),
                    height: Pixel.getPixel(27),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffbd2f',
                    borderRadius: 5
                }} onPress={() => {
                    this.toPage();
                }}>
                    <Text style={{color: 'white', fontSize: 15}}>{"去" + this.state.accountStatus}</Text>
                </TouchableOpacity>
            </View>);

    }

    // 每一行中的数据
    _renderRow = (rowData, sectionID, rowID,) => {
        return (
            <TouchableOpacity activeOpacity={0.8}>
                <View style={[styles.rowView, rowID == '0' ? {marginTop: 0} : {marginTop: Pixel.getPixel(10)}]}>

                    <View style={styles.orderNumStyle}>
                        <Text style={{flex: 1, fontSize: 14}}>{'订单号:' + rowData.supervision_fee_order_number}</Text>
                        <Text style={{
                            color: fontAndColor.COLORB2,
                            fontSize: 14
                        }}>{'未支付'}</Text>
                    </View>
                    <Text style={{
                        color: '#333333',
                        marginVertical: Pixel.getPixel(10),
                        fontSize: 14,
                    }}>{rowData.order_title}</Text>
                    <Text style={{color: '#9b9b9b', fontSize: 13}}>{'置换时间：' + rowData.regulation_time}</Text>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    listStyle: {
        marginTop: Pixel.getPixel(0),
    },
    rowView: {
        backgroundColor: 'white',
        height: Pixel.getPixel(115),
        paddingHorizontal: Pixel.getPixel(16),
        borderBottomWidth: 1,
        borderColor: fontAndClolr.COLORA4,
    },
    headerStyle: {
        height: Pixel.getPixel(41),
        flexDirection: 'row',
        backgroundColor: '#FFF8EB',
        alignItems: 'center',
        paddingHorizontal: Pixel.getPixel(16),

    },
    footerStyle: {
        height: Pixel.getPixel(50),
        width: width,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        bottom: Pixel.getPixel(0),

    },
    orderNumStyle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: fontAndClolr.COLORA4,
        height: Pixel.getPixel(40),
        alignItems: 'center',

    },

    rowRightTitle: {
        color: fontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),

    },


});