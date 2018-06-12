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

let contentData = [{title: '保证金额度', value: '100万'}, {title: '保证金余额', value: '100万'}];
let firstType = '-1';
let lastType = '-1';
let names = '';
export default class NewFinanceScene extends BaseComponet {

    constructor(props) {
        super(props);
        this.allData1 = {};
        this.type = 0;
        this.time_order = 'asc';
        movies=[];
        this.allData = [this.allData1, 1, 2, []];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.isShow = false;
        this.state = {
            renderPlaceholderOnly: 'loading',
            isRefreshing: false,
            source: this.ds.cloneWithRows(this.allData),
            customerName: ''
        }
        ;
    }

    isEmpty = (str) => {
        if (typeof(str) != 'undefined' && str !== null && str !== '') {
            return false;
        } else {
            return true;
        }
    };

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
                    // multiple_credit_type	授信类型	string	1 综合授信 2 小额授信
                    // newcar_creditmny	新车授信额度	string	单位 元
                    // newcar_loanbalance	新车贷款余额	string	单位 元
                    // newcar_maxloanmny   新车可借额度

                    this.allData1 = {
                        bond_total_mny: mnyData.bond_total_mny / 10000,
                        bond_mny: mnyData.bond_mny / 10000,
                    }

                    contentData[0].value = this.allData1.bond_total_mny + '万';
                    contentData[1].value = this.allData1.bond_mny + '万';

                    this.allData[0] = mnyData;
                    this.getApplyData();
                }
                ,
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                }
            )
        ;
    }

    getApplyData = () => {
        //0全部,2单车;3采购贷(旧);4库存融资;5采购贷6订单融资8车抵贷

        let maps = {
            api: Urls.GET_APPLY_LIST,
            p: page,
            loan_type: this.type,
            time_order: this.time_order,

        };
        request(Urls.FINANCE, 'Post', maps, () => {
            this.props.backToLogin();
        })
            .then((response) => {
                    this.props.showModal(false);
                    movies.push(...response.mjson.data.list);
                    this.allData[3]=movies
                    allPage = response.mjson.data.page;
                    StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
                        if (data.code == 1) {
                            let datas = JSON.parse(data.result);
                            if (datas.companyname == null || datas.companyname == '') {
                                names = datas.name;
                            } else {
                                names = datas.companyname;
                            }
                            this.setState({
                                renderPlaceholderOnly: 'success',
                                source: this.ds.cloneWithRows(this.allData),
                                isRefreshing: false,
                                customerName: names
                            });
                        }
                    })

                },
                (error) => {
                    this.props.showModal(false);

                    if (error.mycode == '-2100045') {
                        movies=[];
                        this.allData[3] = [];
                        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
                            if (data.code == 1) {
                                let datas = JSON.parse(data.result);
                                this.setState({
                                    isRefreshing: false,
                                    renderPlaceholderOnly: 'success',
                                    source: this.ds.cloneWithRows(this.allData),
                                    customerName: datas.companyname
                                });
                            }
                        })

                    } else {
                        this.setState({renderPlaceholderOnly: 'error'});
                    }
                });
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
                this.getApplyData();
            }
        }

    };

    allRefresh = () => {
        firstType = '-1';
        lastType = '-1';
        movies = [];
        page = 1;
        this.setState({renderPlaceholderOnly: 'loading'});
        this.getMnyData();
    }
    /**
     *   更新 lastType;
     **/
    updateType = (newLastType) => {
        lastType = newLastType;
        //firstType = newLastType;
        //console.log('firstType=======',firstType);
    };


    componentDidUpdate() {

    }

    refreshingData = () => {
        firstType = '-1';
        lastType = '-1';
        movies = [];
        page = 1;
        this.setState({isRefreshing: true});
        this.getMnyData();
        this.getAccountInfo();
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
                    renderFooter={
                        this.renderListFooter
                    }
                    onEndReached={this.toEnd}
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
                        movies = [];
                            page = 1;
                        switch (select) {
                            case 0:
                                this.type = 0;//全部
                                break;
                            case 1:
                                this.type = 2;//单车
                                break;
                            case 2:
                                this.type = 4;//库融
                                break;
                            case 3:
                                this.type = 5;//采购贷
                                break;
                            case 4:
                                this.type = 6;//订单融资
                                break;
                            case 5:
                                this.type = 8;//车抵贷

                                break;
                        }
                        this.props.showModal(true);
                        this.getApplyData();
                        this.financeScreen.setSelect(select);
                        this.refs.financescreenpop.changeSelect(select);
                    }
                    this.closePop();
                }}/>
                <LendSuccessAlert ref="showAlert"
                                  title={'审核未通过'}
                                  subtitle={mnyData.microchinese_audit_reason}
                                  confimClick={()=>{
                                      if(mnyData.microchinese_apply_status == 0){

                                      }
                                      else {
                                          let navigationParams={
                                              name: "QuotaApplication",
                                              component: QuotaApplication,
                                              params: {
                                                  callBack:()=>{
                                                      this.allRefresh()
                                                  }
                                              }
                                          }
                                          this.props.callBack(navigationParams);
                                      }

                                  }}

                                  confimTitle={mnyData.microchinese_apply_status == 0 ? "好的":"重新审核"}

                />
                <ExplainModal ref='loanModal' buttonStyle={cellSheet.expButton} textStyle={cellSheet.expText}/>
                {/*<FinanceGuide/>*/}
                <NavigationView title="锋之行汽车销售" wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0,
                    fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                    textAlign: 'center',
                    backgroundColor: 'transparent',}}/>
            </View>
        )
    }

    closePop = () => {
        this.isShow = false;
        this.refs.financescreenpop.changeTop(0, 0, 0);
        this.refs.listview.setNativeProps({scrollEnabled: true});
    }

    navigatorParams = {
        name: 'LendMoneySence',
        component: LendMoneySence,
        params: {}
    }

    itemClick = (data, nextPage) => {
        console.log(nextPage);
        if (nextPage === CGDDetailSence) {//采购贷
            if (data.payment_status == '31') {//审核未通过
                this.navigatorParams.name = 'CGDLendScenes';
                this.navigatorParams.component = CGDLendScenes;
                this.navigatorParams.params = {
                    loan_code: data.loan_code,
                    backRefresh: () => {
                        this.allRefresh()
                    }, customerName: this.state.customerName,
                }
            } else {
                this.navigatorParams.name = 'DetaileSence';
                this.navigatorParams.component = nextPage;
                this.navigatorParams.params = {
                    loanNumber: data.loan_code,
                    backRefresh: () => {
                        this.allRefresh()
                    }
                }
            }
        }
        else if (nextPage === DDDetailScene) {//订单融资
            if (data.payment_status == '31') {//审核未通过
                this.navigatorParams.name = 'DDApplyLendScene';
                this.navigatorParams.component = DDApplyLendScene;
                this.navigatorParams.params = {
                    sceneName: "FinanceScene",
                    loan_code: data.loan_code,//借款单号
                    orderNo: data.order_number,//平台订单号
                    orderId: data.order_id,

                    callBack: () => {
                        this.allRefresh()
                    }, customerName: this.state.customerName,
                }
            } else {
                this.navigatorParams.name = 'DDDetailScene';
                this.navigatorParams.component = nextPage;
                this.navigatorParams.params = {
                    financeNo: data.loan_code,//借款单号
                    orderNo: data.order_number,//平台订单号
                    FromScene: "FinanceScene",

                    backRefresh: () => {
                        this.allRefresh()
                    }
                }
            }
        }
        else {
            this.navigatorParams.name = 'DetaileSence';
            this.navigatorParams.component = nextPage;
            this.navigatorParams.params = {
                loanNumber: data.loan_code,
                backRefresh: () => {
                    this.allRefresh()
                }
            }

        }
        this.props.callBack(this.navigatorParams);

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

                depositPop={() => {
                    this.refs.loanModal.changeShowType(true, '保证金', '知道了', contentData, [])
                }}
                creditPop={() => {
                }}
                balancePop={() => {
                }}
                weizongPop={() => {
                    if(movie.is_microchinese_mny==4){
                        this.refs.showAlert.setModelVisible(true);
                    }else if (movie.is_microchinese_mny == 1 && movie.microchinese_apply_status != 0){
                            let navigationParams={
                                name: "QuotaApplication",
                                component: QuotaApplication,
                                params: {
                                    callBack:()=>{
                                        this.allRefresh()
                                    }
                                }
                            }
                            this.props.callBack(navigationParams);
                    }}
                }/>);
        } else if (rowId == 1) {
            return (<FinanceButton borrowBt={() => {
                this.homeItemOnPress('借款');
            }} payBt={() => {
                this.homeItemOnPress('还款');
                // this.refs.loanModal.changeShowType(true, '提示', '确定', contentData, contentData);
            }
            }/>);
        } else if (rowId == 2) {
            return (
                <FinanceScreen
                    ref={(ref) => {
                        this.financeScreen = ref
                    }}
                    onCheck={(select) => {
                        movies = [];
                        page = 1;
                        switch (select) {
                            case 0:
                                this.type = 0;//全部
                                break;
                            case 1:
                                this.type = 2;//单车
                                break;
                            case 2:
                                this.type = 4;//库融
                                break;
                        }
                        this.props.showModal(true);
                        this.getApplyData();
                        this.financeScreen.setSelect(select);
                        this.refs.financescreenpop.changeSelect(select);
                        this.closePop();
                    }}
                    select={0}
                    onPress={(y) => {
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

                    }}
                    timeOrderClick={(isTop) => {
                        movies = [];
                        page = 1;
                        if (isTop) {
                            this.time_order = 'asc';
                        } else {
                            this.time_order = 'desc';
                        }
                        this.props.showModal(true);
                        this.getApplyData();
                    }}
                />);
        } else {

            return (<View>
                {movie.map((data, index) => {
                    return (<FinanceItem key={index + 'item'}
                                         data={data}
                                         customerName={this.state.customerName}
                                         itemClick={this.itemClick}
                    />)

                })}
            </View>);
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
                        // credit_status: mnyData.credit_status,
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