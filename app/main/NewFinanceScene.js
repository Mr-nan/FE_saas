/**
 * Created by yujinzhong on 2017/2/8.
 */

import React, {Component, PropTypes} from 'react'
import {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    InteractionManager,
    TouchableOpacity,
    RefreshControl,
    NativeModules,
    BackAndroid,
    Platform,
    StatusBar
} from 'react-native'

let mnyData = {};
let movies = [];
let page = 1;
let allPage = 0;


import HomeHeaderItem from './component/HomeHeaderItem';
import PixelUtil from '../utils/PixelUtil'
import KurongDetaileScene from '../finance/lend/KurongDetaileScene';
import ChedidaiDetaileScene from '../finance/lend/ChedidaiDetaileScene';
import DDDetailScene from '../finance/lend/DDDetailScene';
import DDApplyLendScene from '../finance/lend/DDApplyLendScene';

import CGDDetailSence from '../finance/lend/CGDDetailSence';
import SingDetaileSence from '../finance/lend/SingDetaileSence';
import StorageUtil from '../utils/StorageUtil';
import * as storageKeyNames from '../constant/storageKeyNames';
import NavigationView from '../component/AllNavigationView';
import ExplainModal from "./component/ExplainModal";

let Pixel = new PixelUtil();
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
import LendMoneySence from '../finance/lend/LendMoneyScene';

import MyButton from '../component/MyButton';
import RepaymentScene from '../finance/repayment/RepaymentScene';
import BaseComponet from '../component/BaseComponent';
import {request} from '../utils/RequestUtil';
import LoadMoreFooter from '../component/LoadMoreFooter';
import * as Urls from '../constant/appUrls';
import * as fontAndColor from '../constant/fontAndColor';
import QuotaApplication from '../login/QuotaApplication';
import {LendSuccessAlert} from '../finance/lend/component/ModelComponent'
import CGDLendScenes from '../finance/lend/CGDLendScenes';
import AccountModal from '../component/AccountModal';
import MyAccountScene from "../mine/accountManage/MyAccountScene";
import FinanceHeader from './component/FinanceHeader';
import FinanceButton from './component/FinanceButton';
import FinanceScreen from './component/FinanceScreen';
import FinanceScreenPop from './component/FinanceScreenPop';
import FinanceItem from './component/FinanceItem';
import FinanceGuide from './component/FinanceGuide';

let contentData = [{title: '保证金额度', value: '100万'}, {title: '保证金余度', value: '100万'}];
let firstType = '-1';
let lastType = '-1';
export default class NewFinanceScene extends BaseComponet {

    constructor(props) {
        super(props);
        this.allData1 = {};
        this.allData = [this.allData1, 2, 3, 4, 5,];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.isShow = false;
        this.state = {
            renderPlaceholderOnly: 'loading',
            isRefreshing: false,
            source: this.ds.cloneWithRows(this.allData)
        }
        ;
    }

    handleBack = () => {
        NativeModules.VinScan.goBack();
        return true;
    }

    componentDidMount() {
        console.log(this.state.topWidth);
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.initFinish();
            //});
        }
    }


    initFinish = () => {
        this.getMnyData();
        this.getAccountInfo();

    }

    getAccountInfo = () => {
        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1'
                };
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                            lastType = response.mjson.data.account.status;
                        },
                        (error) => {

                        });
            }
        });
    }

    getMnyData = () => {
        let maps = {
            api: Urls.GET_MNY
        };
        request(Urls.FINANCE, 'Post', maps, () => {
            this.props.backToLogin();
        })
            .then((response) => {
                    mnyData = response.mjson.data;
                    this.allData1 = {
                        credit_mny: mnyData.credit_mny / 10000,
                        credit_maxloanmny: mnyData.credit_maxloanmny / 10000,
                        loan_balance_mny: mnyData.loan_balance_mny / 10000,
                        bond_total_mny: mnyData.bond_total_mny/ 10000,
                        bond_mny: mnyData.bond_mny / 10000,
                    }

                    contentData[0].value=this.allData1.bond_total_mny;
                    contentData[1].value=this.allData1.bond_mny;

                    this.allData[0] = this.allData1;
                    console.log('-----', this.allData)
                    this.setState({
                        source: this.ds.cloneWithRows(this.allData),
                        renderPlaceholderOnly: 'success'
                    })
                    //     mnyData: mnyData,
                    // });
                    // that.getApplyData();
                }
                ,
                (error) => {
                    this
                        .setState({renderPlaceholderOnly: 'error'});
                }
            )
        ;
    }

    toPage = () => {
        this.navigatorParams.name = 'MyAccountScene';
        this.navigatorParams.component = MyAccountScene;
        this.navigatorParams.params = {callBack: this.updateType};
        this.refs.accountmodal.changeShowType(false);
        //firstType = lastType;
        this.props.callBack(this.navigatorParams);
    };

    componentDidUpdate() {

        if (this.state.renderPlaceholderOnly == 'success') {
            if (firstType != lastType) {
                if (lastType != 3) {
                    StorageUtil.mGetItem(storageKeyNames.ENTERPRISE_LIST, (data) => {
                        if (data.code == 1) {
                            let datas = JSON.parse(data.result);
                            console.log(datas);
                            if (datas[0].role_type == '1') {
                                StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (datac) => {
                                    if (datac.code == 1) {
                                        let datasc = JSON.parse(datac.result);
                                        let maps = {
                                            enter_base_ids: datasc.company_base_id,
                                            child_type: '1'
                                        };
                                        request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                                            .then((response) => {
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
            }
        }
    }


    toEnd = () => {
        if (this.state.isRefreshing) {

        } else {
            if (page < allPage) {
                page++;
            }
        }

    };

    allRefresh = () => {
        movies = [];
        page = 1;
    }

    componentDidUpdate() {

    }

    refreshingData = () => {
        movies = [];
        page = 1;
        this.getMnyData();
        this.setState({isRefreshing: true});
    };

    render() {
        const IS_ANDROID = Platform.OS === 'android';
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={cellSheet.container}>
                {IS_ANDROID ? null : <StatusBar barStyle={'default'}/>}
                <ListView
                    ref="listview"
                    contentContainerStyle={{marginTop: Pixel.getPixel(40)}}
                    removeClippedSubviews={false}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshingData}
                            tintColor={[fontAndColor.COLORB0]}
                            colors={[fontAndColor.COLORB0]}
                        />
                    }
                />
                <FinanceScreenPop ref="financescreenpop" hidden={(select) => {
                    if (select != 'null') {
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({source: ds.cloneWithRows([1, 2, select, 4, 5, 6, 7, 8, 9, 0, 11, 11, 11, 11, 11, 11])});
                    }
                    this.closePop();
                }}/>
                <ExplainModal ref='loanModal' buttonStyle={cellSheet.expButton} textStyle={cellSheet.expText}/>
                {/*<FinanceGuide/>*/}
                <NavigationView title="锋之行汽车销售"/>
            </View>
        )
    }

    closePop = () => {
        this.isShow = false;
        this.refs.financescreenpop.changeTop(0, 0, 0);
        this.refs.listview.setNativeProps({scrollEnabled: true});
    }


    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page >= allPage ? true : false}/>)
        }
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return ( <FinanceHeader
                allData1={movie}
                depositPop={()=>{this.refs.loanModal.changeShowType(true, '保证金', '知道了', contentData, [])}}
                creditPop={()=>{}}
                balancePop={()=>{}}
                weizongPop={()=>{}}/>);
        } else if (rowId == 1) {
            return (<FinanceButton borrowBt={() => {
                this.refs.loanModal.changeShowType(true, '保证金', '知道了', contentData, []);
            }} payBt={
                () => {
                    this.refs.loanModal.changeShowType(true, '提示', '确定', contentData, contentData);
                }
            }/>);
        } else if (rowId == 2) {
            return (
                <FinanceScreen onCheck={(select) => {
                    this.refs.financescreenpop.changeSelect(select);
                    this.closePop();
                }} select={movie} onPress={(y) => {
                    if (this.isShow) {
                        this.closePop();
                    } else {
                        let heights = 303;
                        if (Platform.OS === 'android') {
                            heights = 323;
                        }
                        this.isShow = !this.isShow;
                        this.refs.listview.scrollTo({x: 0, y: Pixel.getTitlePixel(heights), animated: false});
                        this.refs.financescreenpop.changeTop(Pixel.getTitlePixel(61),
                            width, Pixel.getPixel(height));
                        this.refs.listview.setNativeProps({scrollEnabled: false});
                    }

                }}/>);
        } else {
            return (<FinanceItem/>);
        }

    }

    _renderPlaceholderView = () => {
        return (
            <View style={{flex: 1, backgroundColor: fontAndColor.COLORA3, alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    /**
     * from @zhaojian
     *
     * 跳转借款或还款
     **/
    homeItemOnPress = (title) => {
        try {
            if (title === '借款') {
                try {
                    this.navigatorParams.name = 'LendMoneySence';
                    this.navigatorParams.component = LendMoneySence;
                    this.navigatorParams.params = {
                        credit_status: mnyData.credit_status,
                        inventory_financing_status: mnyData.inventory_financing_status,
                        purchase_archives_after_status: mnyData.purchase_archives_after_status,
                        purchase_archives_first_status: mnyData.purchase_archives_first_status,
                        purchase_status: mnyData.purchase_status,
                        customerName: this.state.customerName,
                        backRefresh: () => {
                            this.allRefresh()
                        }
                    }
                    ;
                    this.props.callBack(this.navigatorParams);
                } catch (error) {
                    this.props.showToast('数据错误');
                }

            } else {
                this.navigatorParams.name = "RepaymentScene";
                this.navigatorParams.component = RepaymentScene;
                this.navigatorParams.params = {
                    customerName: this.state.customerName,

                };
                this.props.callBack(this.navigatorParams);
            }
        } catch (error) {
            this.props.showToast('数据错误');
        }

    }

}


const cellSheet = StyleSheet.create({


    header: {
        flex: 1,

        backgroundColor: fontAndColor.COLORA3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: Pixel.getPixel(10),

    },

    headerTitle: {

        fontSize: 20,
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
        borderColor: fontAndColor.COLORB0,
        backgroundColor: fontAndColor.COLORB0
    },
    expText: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: 'white'
    },

    container: {

        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },
});