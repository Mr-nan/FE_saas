/**
 * Created by yujinzhong on 2017/2/8.
 */

import  React, {Component, PropTypes} from  'react'
import  {

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
    BackAndroid
} from  'react-native'

let mnyData = {};
let movies = [];
let page = 1;
let allPage = 0;


import  HomeHeaderItem from './component/HomeHeaderItem';
import  PixelUtil from '../utils/PixelUtil'
import KurongDetaileScene from '../finance/lend/KurongDetaileSceneNew';
import DDDetailScene from '../finance/lend/DDDetailScene';
import DDApplyLendScene from '../finance/lend/DDApplyLendScene';

import CGDDetailSence from '../finance/lend/CGDDetailSence';
import SingDetaileSence from '../finance/lend/SingDetaileSenceNew';
import  StorageUtil from '../utils/StorageUtil';
import * as storageKeyNames from '../constant/storageKeyNames';
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
import  LoadMoreFooter from '../component/LoadMoreFooter';
import * as Urls from '../constant/appUrls';
import * as fontAndColor from '../constant/fontAndColor';
import SelectCompanyScene from '../finance/SelectCompanyScene';
import AginSelectCompanyScene from '../finance/AginSelectCompanyScene';
import QuotaApplication from '../login/QuotaApplication';
import {LendSuccessAlert} from '../finance/lend/component/ModelComponent'
let loanList = [];
import CGDLendScenes from '../finance/lend/CGDLendScenes';
import AccountModal from '../component/AccountModal';
import ReceiptInfoScene from '../finance/page/ReceiptInfoScene';
import AccountTypeSelectScene from '../mine/accountManage/AccountTypeSelectScene'
import WaitActivationAccountScene from '../mine/accountManage/WaitActivationAccountScene'
import BindCardScene from '../mine/accountManage/BindCardScene'
import MyAccountScene from "../mine/accountManage/MyAccountScene";
import FinanceSeekMoreScene from "../finance/lend/FinanceSeekMoreScene";
let firstType = '-1';
let lastType = '-1';


export class HomeHeaderItemInfo {
    constructor(ref, key, functionTitle, describeTitle, functionImage) {

        this.ref = ref;
        this.key = key;
        this.functionTitle = functionTitle;
        this.describeTitle = describeTitle;
        this.functionImage = functionImage;
    }

}

const bossFuncArray = [
    new HomeHeaderItemInfo('jiekuan', 'page1', '借款', '一步快速搞定', require('../../images/financeImages/borrowicon.png')),
    new HomeHeaderItemInfo('huankuan', 'page2', '还款', '智能自动提醒', require('../../images/financeImages/repaymenticon.png')),
];


export default class FinanceSence extends BaseComponet {

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

        this.getMnyData();
        this.getAccountInfo();
    }


    getMnyData = () => {
        let that = this;
        let maps = {
            api: Urls.GET_MNY
        };
        request(Urls.FINANCE, 'Post', maps, () => {
            this.props.backToLogin();
        })
            .then((response) => {
                    mnyData = response.mjson.data;
                    let title = '';
                    if (mnyData.is_microchinese_mny == 1) {
                        title = '立即激活微单额度';
                    } else if (mnyData.is_microchinese_mny == 2) {
                        title = '待审核';
                    } else if (mnyData.is_microchinese_mny == 4) {
                        title = '审核不通过';
                    }
                    that.setState({
                        allData: {
                            keyongedu: mnyData.credit_maxloanmny / 10000,
                            daikuanyue: mnyData.loan_balance_mny / 10000,
                            baozhengjinedu: mnyData.bond_total_mny / 10000,
                            baozhengjinyue: mnyData.bond_mny / 10000,
                            microchineseTitle: title,
                        },
                        mnyData: mnyData,
                    });
                    that.getApplyData();
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
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

    getApplyData = () => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        /**
         * payment_number单号
         * auto_vin车架号
         * min_loanmny最小金额
         * max_loanmny最大金额
         * loanperiod期限
         * logic_status 状态 全部all
         * product_type_code产品类型 全部all
         * 搜索字段
         * @type {{api, p: number, rows: number, loan_type: number}}
         *【0全部、2单车、3采购贷旧(信用贷)、4库融、5采购贷、7应收账款、8车抵贷】
         */
        let maps = {
            api: Urls.GET_APPLY_LIST,
            p: page,
            rows:10,
            product_type_cod:0,
            ...this.seekParameter,
        };
        request(Urls.FINANCE, 'Post', maps, () => {
            this.props.backToLogin();
        })
            .then((response) => {
                    if(page==1){
                        movies = response.mjson.data.list;

                    }else {
                        movies.push(...response.mjson.data.list);

                    }
                    allPage = response.mjson.data.page;
                    StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
                        if (data.code == 1) {
                            let datas = JSON.parse(data.result);
                            let names = '';
                            if (datas.companyname == null || datas.companyname == '') {
                                names = datas.name;
                            } else {
                                names = datas.companyname;
                            }
                            this.setState({
                                renderPlaceholderOnly: 'success',
                                source: ds.cloneWithRows(movies),
                                isRefreshing: false,
                                customerName: names
                            });
                        }
                    })

                },
                (error) => {
                    if (error.mycode == '-2100045') {
                        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
                            if (data.code == 1) {
                                let datas = JSON.parse(data.result);
                                this.setState({
                                    isRefreshing: false,
                                    renderPlaceholderOnly: 'success',
                                    source: ds.cloneWithRows(['1']),
                                    customerName: datas.companyname
                                });
                            }
                        })

                    } else {
                        this.setState({renderPlaceholderOnly: 'error'});
                    }
                });
    }

    allRefresh = () => {
        firstType = '-1';
        lastType = '-1';
        movies = [];
        page = 1;
        this.setState({renderPlaceholderOnly: 'loading'});
        this.getMnyData();
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

    /**
     *   更新 lastType;
     **/
    updateType = (newLastType) => {
        lastType = newLastType;
        //firstType = newLastType;
        //console.log('firstType=======',firstType);
    };

    /**
     * from @zhaojian
     *
     * 判定账户开户绑卡激活跳转
     **/
    toPage = () => {
        this.navigatorParams.name = 'MyAccountScene';
        this.navigatorParams.component = MyAccountScene;
        this.navigatorParams.params = {callBack: this.updateType};
        this.refs.accountmodal.changeShowType(false);
        //firstType = lastType;
        this.props.callBack(this.navigatorParams);
    };

    // 构造
    constructor(props) {
        super(props);
        firstType = '-1';
        lastType = '-1';
        movies = [];
        page = 1;
        this.state = {
            source: [],
            allData: {
                keyongedu: mnyData.credit_maxloanmny / 10000,
                daikuanyue: mnyData.loan_balance_mny / 10000,
                baozhengjinedu: mnyData.bond_total_mny / 10000,
                baozhengjinyue: mnyData.bond_mny / 10000,
                microchineseTitle: '',
            },
            mnyData: mnyData,
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            customerName: '',
            seekData:[]
        };

        this.seekParameter={
            auto_vin:'', // 车架号
            payment_number:'', // 订单标号
            min_loanmny:'',
            max_loanmny:'',
            min_loan_time:'',
            max_loan_time:'',
            loanperiod:'', // 借款期限
            logic_status:'', // 状态
            product_type_code:'', // 产品类型

        };
        this.offY = 0;
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

    refreshingListData =()=>{
        page = 1;
        this.setState({isRefreshing: true});
        this.getApplyData();
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={cellSheet.container}>
                <ListView
                    scrollEnabled={this.state.seekData.length>0?false:true}
                    removeClippedSubviews={false}
                    enableEmptySections={true}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    renderFooter={
                        this.renderListFooter
                    }
                    onEndReached={this.toEnd}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshingData}
                            tintColor={[fontAndColor.COLORB0]}
                            colors={[fontAndColor.COLORB0]}
                        />
                    }
                    onScroll={(event)=>{
                        this.offY = Pixel.getPixel(event.nativeEvent.contentOffset.y);
                    }}
                />
                <LendSuccessAlert title="提示" subtitle="采购融资功能正在维护中，请您移步BMS系统申请采购融资" ref='cgdModal'
                                  confimClick={() => {
                                  }}/>
                <LendSuccessAlert ref="showAlert"
                                  title={'审核未通过'}
                                  subtitle={this.state.mnyData.microchinese_audit_reason}
                                  confimClick={()=>{
                                      if(this.state.mnyData.microchinese_apply_status == 0){

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

                                  confimTitle={this.state.mnyData.microchinese_apply_status == 0 ? "好的":"重新审核"}

                />
                <AccountModal ref="accountmodal"/>
                <LendSuccessAlert ref="showTitleAlert" title={'提示'} subtitle={'微单可用额度只适用于单车产品'}/>
                {
                   this.state.seekData.length >0 && <FinanceSeekContentView ref={(ref)=>{this.FinanceSeekContentView = ref}}
                                                                            data={this.state.seekData}
                                                                            currentTitle={this.seekCurrentTitle}
                                                                            seekSelectContentClick={this.seekSelectContentClick}
                                                                            cancel={this.seekCancelClick}
                                                                            offY={this.offY}
                   />
                }

            </View>
        )
    }

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page >= allPage ? true : false}/>)
        }
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: cellSheet.parentStyle,
        childStyle: cellSheet.childStyle,
        opacity: 1,
    }

    typeButtonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: cellSheet.typeParentStyle,
        childStyle: cellSheet.typeChildStyle,
        opacity: 1,
    }

    _renderRow = (movie) => {
        let nextPage = {};
        if (movie == '1') {
            return (<View/>);
        } else {
            if (movie.product_code == 1) {
                nextPage = KurongDetaileScene;
                this.buttonParams.content = '库融';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB4}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB4}];
            }
            else if (movie.product_code == 2) {
                nextPage = SingDetaileSence;
                this.buttonParams.content = '单车';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB0}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB0}];
            } else if (movie.product_code == 3) {
                nextPage = KurongDetaileScene;
                this.buttonParams.content = '信贷';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB1}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB1}];
            } else if (movie.product_code == 4) {
                nextPage = KurongDetaileScene;
                this.buttonParams.content = '库融';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB4}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB4}];
            } else if (movie.product_code == 5) {
                if (movie.product_type_change_status == 0) {
                    nextPage = CGDDetailSence;
                    this.buttonParams.content = '采购';
                    this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB1}];
                    this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB1}];
                } else if (movie.product_type_change_status == 1) {
                    nextPage = SingDetaileSence;
                    this.buttonParams.content = '单车采购';
                    this.buttonParams.parentStyle = [cellSheet.parentStyle, {
                        borderColor: fontAndColor.COLORB1,
                        width: Pixel.getPixel(58)
                    }];
                    this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB1}];
                } else {
                    nextPage = SingDetaileSence;
                    this.buttonParams.content = '单车';
                    this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB0}];
                    this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB0}];
                }
            } else if (movie.product_code == 6) {
                nextPage = DDDetailScene;
                this.buttonParams.content = '订单';
                this.buttonParams.parentStyle = [cellSheet.parentStyle, {borderColor: fontAndColor.COLORB4}];
                this.buttonParams.childStyle = [cellSheet.childStyle, {color: fontAndColor.COLORB4}];
            }

            if (movie.status == 1) {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORB3}];
            } else if (movie.status == 7) {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORB2}];
            } else if (movie.status == 6 || movie.status == 0 || movie.status == 5) {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORA1}];
            } else {
                this.typeButtonParams.childStyle = [cellSheet.typeChildStyle, {color: fontAndColor.COLORB0}];
            }
            this.typeButtonParams.content = movie.product_type_code;
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    if (nextPage === CGDDetailSence) {//采购贷
                        if (movie.status == '31') {//审核未通过
                            this.navigatorParams.name = 'CGDLendScenes';
                            this.navigatorParams.component = CGDLendScenes;
                            this.navigatorParams.params = {
                                loan_code: movie.payment_number,
                                backRefresh: () => {
                                    this.allRefresh()
                                }, customerName: this.state.customerName,
                            }
                        } else {
                            this.navigatorParams.name = 'DetaileSence';
                            this.navigatorParams.component = nextPage;
                            this.navigatorParams.params = {
                                loanNumber: movie.payment_number,
                                backRefresh: () => {
                                    this.allRefresh()
                                }
                            }
                        }
                    }
                    else if (nextPage === DDDetailScene) {//订单融资
                        if (movie.status == '31') {//审核未通过
                            this.navigatorParams.name = 'DDApplyLendScene';
                            this.navigatorParams.component = DDApplyLendScene;
                            this.navigatorParams.params = {
                                sceneName:"FinanceScene",
                                loan_code: movie.payment_number,//借款单号
                                orderNo: movie.order_number,//平台订单号
                                orderId: movie.order_id,

                                callBack: () => {
                                    this.allRefresh()
                                }, customerName: this.state.customerName,
                            }
                        } else {
                            this.navigatorParams.name = 'DDDetailScene';
                            this.navigatorParams.component = nextPage;
                            this.navigatorParams.params = {
                                financeNo: movie.payment_number,//借款单号
                                orderNo: movie.order_number,//平台订单号
                                FromScene:"FinanceScene",

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
                            loanNumber: movie.payment_number,
                            backRefresh: () => {
                                this.allRefresh()
                            }
                        }

                    }
                    this.props.callBack(this.navigatorParams);

                }} style={[cellSheet.row, cellSheet.padding]}>
                    <View style={cellSheet.rowViewStyle}>
                        <View style={[{
                            height: Pixel.getPixel(40),
                            justifyContent: 'flex-start', flex: 3, flexDirection: 'row',
                            alignItems: 'center'
                        }]}>

                            <MyButton {...this.buttonParams}/>
                            <Text allowFontScaling={false} numberOfLines={1}
                                  style={cellSheet.rowTopTextStyle}>{this.state.customerName}</Text>
                        </View>
                        <View style={[{
                            height: Pixel.getPixel(40),
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }]}>

                            <Text allowFontScaling={false}
                                  style={cellSheet.rowTopGrayTextStyle}>{movie.payment_number}</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: fontAndColor.COLORA4}}></View>
                    <View style={cellSheet.rowBottomViewStyle}>
                        <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-start'}]}>
                            <Text allowFontScaling={false} style={cellSheet.rowBottomLittleStyle}>借款金额</Text>
                            <Text allowFontScaling={false}
                                  style={[cellSheet.rowBottomBigStyle, {color: fontAndColor.COLORB2}]}>{movie.loanmny+'万'}</Text>
                        </View>
                        <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-start'}]}>
                            <Text allowFontScaling={false} style={cellSheet.rowBottomLittleStyle}>借款期限</Text>
                            <Text allowFontScaling={false}
                                  style={[cellSheet.rowBottomBigStyle, {color: fontAndColor.COLORA0}]}>{movie.loanperiod+'天'}</Text>
                        </View>
                        <View
                            style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-end', justifyContent: 'center'}]}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: fontAndColor.COLORA4,
                                borderRadius: 100,
                                height: Pixel.getPixel(23),
                                width: Pixel.getPixel(120),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <Text allowFontScaling={false} style={{
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                    color: fontAndColor.COLORB3,
                                }}>{this.getStatusStr(movie.logic_status)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>


            )
        }
    }

    getStatusStr = (stateCode) => {
        if (stateCode !== '') {
            let tempTitle = []
            if (stateCode == '10') {
                tempTitle = ['评估监管中']
            } else if (stateCode == '20') {
                tempTitle = ['审核中']
            } else if (stateCode == '30') {
                tempTitle = ['渠道审核中']
            }else if (stateCode == '40') {
                tempTitle = ['待签合同']
            }else if (stateCode == '50') {
                tempTitle = ['待确认借据']
            }else if (stateCode == '60') {
                tempTitle = ['处理中']
            }else if (stateCode == '70') {
                tempTitle = ['已放款']
            }else if (stateCode == '80') {
                tempTitle = ['已还清']
            }else if (stateCode == '21') {
                tempTitle = ['审核未通过']
            }else if (stateCode == '0') {
                tempTitle = ['已取消']
            }
            return tempTitle;
        }
    }
    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    _renderPlaceholderView = () => {
        return (
            <View style={{flex: 1, backgroundColor: fontAndColor.COLORA3, alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    navigatorParams = {
        name: 'LendMoneySence',
        component: LendMoneySence,
        params: {}
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
                        car_loan_status:mnyData.car_loan_status,
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


    _renderHeader = () => {
        let tablist;
        tablist = bossFuncArray;
        let items = [];
        tablist.map((data) => {
            let tabItem;
            tabItem = <HomeHeaderItem
                ref={data.ref}
                key={data.key}
                functionTitle={data.functionTitle}
                describeTitle={data.describeTitle}
                functionImage={data.functionImage}
                callBack={this.homeItemOnPress}
            />
            items.push(tabItem);
        });

        return (
            <View>
                <Image style={[cellSheet.titleStyle]}
                       source={require('../../images/financeImages/dinancebg.png')}>
                    <View style={{width: width, flexDirection: 'row',}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 3, alignItems: 'center'}}>
                            <Text allowFontScaling={false} numberOfLines={1}
                                  style={{
                                      fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                                      color: '#fff', marginTop: Pixel.getTitlePixel(25), backgroundColor: '#00000000'
                                  }}>
                                金融 ({this.state.customerName})</Text>
                        </View>
                        <View style={{flex: 1}}>

                        </View>
                    </View>
                    <View>
                        <View
                            style={{width: width, height: Pixel.getBottomPixel(65), flexDirection: 'row',marginTop:Pixel.getPixel(30),justifyContent:'space-between'}}>
                            <View style={{flex: 1, alignItems: 'center',}}>
                                <Text allowFontScaling={false}
                                      style={{
                                          fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                          color: '#fff',
                                          backgroundColor: '#00000000'
                                      }}>{this.state.mnyData.is_microchinese_mny == 3 && '综合'}可用额度(万)</Text>

                                <Text allowFontScaling={false}
                                      style={{
                                          fontSize: Pixel.getFontPixel(28),
                                          color: '#fff',
                                          marginTop: Pixel.getPixel(7),
                                          fontWeight: 'bold',
                                          backgroundColor: '#00000000',
                                          flex: 1,
                                          textAlign: 'center'
                                      }}>{this.state.allData.keyongedu}</Text>

                            </View>
                            {
                                false && (
                                    <View style={{flex: 1, alignItems: 'center',}}>
                                        <TouchableOpacity style={{flexDirection:'row'}} activeOpacity={1}
                                                          onPress={()=>{this.refs.showTitleAlert.setModelVisible(true)}}>
                                            <Text allowFontScaling={false}
                                                  style={{
                                                      fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                                      color: '#fff',
                                                      backgroundColor: '#00000000'
                                                  }}>微众可用额度(万)</Text>

                                            <Image source={require('../../images/financeImages/titleAlert.png')}
                                                   style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <Text allowFontScaling={false}
                                              style={{
                                                  fontSize: Pixel.getFontPixel(28),
                                                  color: '#fff',
                                                  marginTop: Pixel.getPixel(7),
                                                  fontWeight: 'bold',
                                                  backgroundColor: '#00000000',
                                                  flex: 1,
                                                  textAlign: 'center'
                                              }}>{this.state.mnyData.is_microchinese_mny == 5 ? 0 : this.state.mnyData.microchinese_mny / 10000}</Text>

                                    </View>)
                            }
                            <View
                                style={{flex: 1, alignItems: 'center',borderLeftColor:'white',borderLeftWidth:StyleSheet.hairlineWidth}}>
                                <Text allowFontScaling={false}
                                      style={{
                                          fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                          color: '#fff',
                                          backgroundColor: '#00000000'
                                      }}>贷款余额(万)</Text>

                                <Text allowFontScaling={false}
                                      style={{
                                          fontSize: Pixel.getFontPixel(28),
                                          color: '#fff',
                                          marginTop: Pixel.getPixel(7),
                                          fontWeight: 'bold',
                                          backgroundColor: '#00000000',
                                          flex: 1,
                                          textAlign: 'center'
                                      }}>{this.state.allData.daikuanyue}</Text>
                            </View>
                        </View>
                        {
                            (this.state.allData.microchineseTitle !== '') ?
                                (<View style={{height:Pixel.getPixel(40), alignItems:'center',justifyContent:'center'}}>
                                    <TouchableOpacity onPress={()=>{

                                        if(this.state.mnyData.is_microchinese_mny==4){
                                            this.refs.showAlert.setModelVisible(true)
                                        }else if (this.state.mnyData.is_microchinese_mny == 1){
                                            if(this.state.mnyData.microchinese_apply_status == 0){
                                            }
                                            else{
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
                                        }

                                    }} activeOpacity={1}>
                                        <View style={{height:Pixel.getPixel(24),borderRadius:Pixel.getPixel(12),
                                            borderColor:this.state.mnyData.microchinese_apply_status == 0 ? 'gray':'white',borderWidth:Pixel.getPixel(1),alignItems:'center',
                                            justifyContent:'center',overflow:'hidden',
                                            paddingHorizontal:Pixel.getPixel(20),
                                        }}>

                                            <Text allowFontScaling={false} style={{color:this.state.mnyData.microchinese_apply_status == 0 ? 'gray':'white', fontSize:Pixel.getFontPixel(14),
                                                backgroundColor:'#00000000',fontWeight: 'bold',}}>  {this.state.allData.microchineseTitle}  </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)
                        }
                    </View>
                    <View
                        style={{
                            width: width, height: Pixel.getPixel(40), backgroundColor: 'rgba(56,199,232,0.35)',
                            paddingRight: Pixel.getPixel(15), paddingLeft: Pixel.getPixel(15), flexDirection: 'row',
                            bottom:0,position: 'absolute',
                        }}>

                        <View
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text allowFontScaling={false}
                                  style={{
                                      fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                      color: '#fff',
                                      backgroundColor: '#00000000'
                                  }}>保证金额度:</Text>

                            <Text allowFontScaling={false}
                                  style={{
                                      fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                      color: '#fff',
                                      backgroundColor: '#00000000',
                                      fontWeight: 'bold'
                                  }}>{this.state.allData.baozhengjinedu}万</Text>

                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Text allowFontScaling={false}
                                  style={{
                                      fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                      color: '#fff',
                                      backgroundColor: '#00000000'
                                  }}>保证金余额:</Text>

                            <Text allowFontScaling={false}
                                  style={{
                                      fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                      color: '#fff',
                                      backgroundColor: '#00000000',
                                      fontWeight: 'bold'
                                  }}>{this.state.allData.baozhengjinyue}万</Text>
                        </View>
                    </View>
                </Image>
                <View style={cellSheet.header}>
                    {items}
                </View>
                <FinanceTypeSeekView ref={(ref)=>{this.financeTypeSeekView=ref}} seekClick={this.seekAction}/>
            </View>

        )
    }

    seekAction=(type,isSelect)=>{

        this.currentSeekType = type;
        let  seekData = [];
        if(isSelect){
            if(type==0){
              seekData = ['库存融资','单车融资','车抵贷','采购贷'];
              this.seekCurrentTitle = this.seekParameter.product_type_code;
            }else if(type==1){
                seekData = ['评估监控中','审核中','渠道审核中','待签合同','待确认借据','处理中','已放款','已还清','已取消'];
                this.seekCurrentTitle = this.seekParameter.logic_status;

            }else if(type==2){
                seekData = ['30天','60天','90天','180天'];
                this.seekCurrentTitle = this.seekParameter.loanperiod;
            }
        }

        this.setState({
            seekData:seekData
        });

        if(type==3){
            let navigationParams={
                name: "FinanceSeekMoreScene",
                component: FinanceSeekMoreScene,
                params: {
                    seekParameter:{...this.seekParameter},
                    confirmClick:this.financeSeekMoreConfirmClick
                }
            }
            this.props.callBack(navigationParams);
        }

    }

    financeSeekMoreConfirmClick=(parameter)=>{

        console.log('=======',parameter);
        this.seekParameter.auto_vin = parameter.number;
        this.seekParameter.payment_number = parameter.number;

        this.seekParameter.min_loanmny = parameter.minPrice;
        this.seekParameter.max_loanmny = parameter.maxPrice;
        this.seekParameter.min_loan_time = parameter.minDate;
        this.seekParameter.max_loan_time = parameter.maxDate;

        this.refreshingListData();


    }

    seekSelectContentClick=(title)=>{

        if(this.currentSeekType==0){

            this.seekParameter.product_type_code = title;

        }else if(this.currentSeekType==1){

            this.seekParameter.logic_status = title;

        }else if(this.currentSeekType==2){

            this.seekParameter.loanperiod = title;

        }

        this.refreshingListData();

    }

    seekCancelClick=()=>{

        this.setState({
            seekData:[]
        });
        this.financeTypeSeekView && this.financeTypeSeekView.seekViewCancel();
    }
}

class FinanceTypeSeekView extends  Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

      }

    render(){
        this.subItem=[];
        return(
            <View style={{flex:1, height:Pixel.getPixel(49), backgroundColor:'white', flexDirection:'row', alignItems:'center',justifyContent:'space-between',borderBottomColor:fontAndColor.COLORA4,borderBottomWidth:Pixel.getPixel(1),
            }}>
                <FinaceTypeSeekItem ref={(ref)=>{ref && this.subItem.push(ref)}} type={0} title={'全部借款'} seekClick={this.seekClick}/>
                <FinaceTypeSeekItem ref={(ref)=>{ ref && this.subItem.push(ref)}} type={1} title={'状态'} seekClick={this.seekClick}/>
                <FinaceTypeSeekItem ref={(ref)=>{ref && this.subItem.push(ref)}} type={2} title={'期限'} seekClick={this.seekClick}/>
                <View style={{width:Pixel.getPixel(1),height:Pixel.getPixel(15), backgroundColor:fontAndColor.COLORA4}}/>
                <FinaceTypeSeekItem ref={(ref)=>{ ref && this.subItem.push(ref)}} type={3} title={'更多'} seekClick={this.seekClick}/>
            </View>
        )
    }

    seekViewCancel=()=>{

        if(this.currentSelectType != null){
            this.subItem[this.currentSelectType].setSelectType(false);
            this.currentSelectType = null;
        }
    }

    seekClick=(type,isSelect)=>{

        this.props.seekClick(type,isSelect);
        if(isSelect){

            if( this.currentSelectType!=type && this.currentSelectType != null){

                this.subItem[this.currentSelectType].setSelectType(false);

            }
            this.currentSelectType = type;


        }else {
           this.currentSelectType = null;
        }

    }



}

class FinaceTypeSeekItem extends  Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isSelect:false,
        };
      }

    setSelectType=(type)=>{
        this.setState({
            isSelect:type,
        });
    }

    render(){
        return(
            <TouchableOpacity style={{width:(width-Pixel.getPixel(1))/Pixel.getPixel(4),height:Pixel.getPixel(49),
                alignItems:'center',justifyContent:'center'
            }} activeOpacity={1} onPress={()=>{

                if(this.props.type == 3){
                    this.props.seekClick && this.props.seekClick(this.props.type,true);

                }else {
                    this.props.seekClick && this.props.seekClick(this.props.type,!this.state.isSelect);
                    this.setSelectType(!this.state.isSelect);
                }


            }}>
                <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28), color:this.state.isSelect?fontAndColor.COLORB0:fontAndColor.COLORA1}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

class FinanceSeekContentView extends Component{

    // 构造
      constructor(props) {
        super(props);

        let ds = new  ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds.cloneWithRows(this.props.data),
        };
        this.currentTitle = this.props.currentTitle;

      }

    componentWillReceiveProps(newProps) {
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(newProps.data)
        });
        this.currentTitle = newProps.currentTitle;

    }

    render(){
        return(
            <TouchableOpacity activeOpacity={1} onPress={this.props.cancel} style={{top:Pixel.getPixel(364)-this.props.offY, backgroundColor:'rgba(0, 0, 0,0.3)', left: 0, right: 0, position: 'absolute', bottom:0,paddingTop:Pixel.getPixel(1)}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(rowDate)=>{
                              return(
                                  <TouchableOpacity activeOpacity={1} onPress={()=>{

                                      if(this.currentTitle == rowDate){
                                          this.props.seekSelectContentClick('');
                                      }else {
                                          this.props.seekSelectContentClick(rowDate);

                                      }
                                      this.props.cancel();

                                  }} style={{width:width,height:Pixel.getPixel(44), backgroundColor:'white',
                                      paddingHorizontal:Pixel.getPixel(15), flexDirection:'row', alignItems:'center',justifyContent:'space-between'
                                  }}>
                                      <Text style={{color:this.currentTitle==rowDate? fontAndColor.COLORB0 : fontAndColor.COLORA0, fontSize:Pixel.getPixel(fontAndColor.CONTENTFONT24)}}>{rowDate}</Text>

                                      {
                                          this.currentTitle==rowDate ? (<Image source={require('../../images/publish/hot-label.png')}/>):(<View style={{width:Pixel.getPixel(1),height:Pixel.getPixel(1)}}/>)
                                      }

                                  </TouchableOpacity>
                              )
                          }}
                          renderSeparator={this._renderSeparator}
                />
            </TouchableOpacity>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
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

    container: {

        flex: 1,
        marginTop: 0,   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },

    row: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(111)
    },
    rightContainer: {

        marginLeft: 20,
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainerTop: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },

    rightContainerBottom: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        flex: 1,
        fontSize: 15,
        textAlign: 'left',

    },
    year: {
        fontSize: 15,
        textAlign: 'center',
        marginRight: 20,
    },
    Separator: {

        backgroundColor: fontAndColor.COLORA4,
        height: 1,

    },
    titleStyle: {
        width: width,
        height: Pixel.getPixel(230)
    },
    titleViewStyle: {
        alignItems: 'center',
    },
    titleImageStyle: {
        position: 'absolute'
    },
    titleViewBottomStyle: {
        width: width,
        height: Pixel.getPixel(40),
        marginTop: Pixel.getPixel(25), flexDirection: 'row', alignItems: 'center'
    },
    titleViewBottomBGStyle: {
        backgroundColor: '#0970cf', width: width,
        height: Pixel.getPixel(40), opacity: 0.25, position: 'absolute'
    },
    titleViewBottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleViewTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: '#ffffff',
        backgroundColor: '#00000000'
    },
    titleOneTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff', marginTop: Pixel.getTitlePixel(71),
        backgroundColor: '#00000000'
    },
    titleTwoTextStyle: {
        fontSize: Pixel.getFontPixel(24),
        color: '#ffffff', marginTop: Pixel.getPixel(8), fontWeight: 'bold',
        backgroundColor: '#00000000'
    },
    titleThreeTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: '#ffffff', marginTop: Pixel.getPixel(21),
        backgroundColor: '#00000000'
    },
    titleFourTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.MARKFONT22), fontWeight: 'bold',
        color: '#ffffff', marginTop: Pixel.getPixel(6), backgroundColor: '#00000000'
    },
    parentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0,
        borderRadius: 3,
        height: Pixel.getPixel(16),
        width: Pixel.getPixel(34),
        justifyContent: 'center',
        alignItems: 'center'
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORB0,
    },
    typeParentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORA4,
        borderRadius: 100,
        height: Pixel.getPixel(23),
        width: Pixel.getPixel(72),
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeChildStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB3,
    },
    padding: {
        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
    },
    rowViewStyle: {
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowTopTextStyle: {
        marginLeft: Pixel.getPixel(7), fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0
    },
    rowTopGrayTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT20),
        color: fontAndColor.COLORA1
    },
    rowBottomViewStyle: {
        height: Pixel.getPixel(71), flexDirection: 'row'
    },
    rowBottomChildStyle: {
        height: Pixel.getPixel(71),
        flex: 1,
    },
    rowBottomLittleStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(16)
    },
    rowBottomBigStyle: {
        fontSize: Pixel.getFontPixel(16),
        marginTop: Pixel.getPixel(6)
    },
});