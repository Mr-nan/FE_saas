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
let contentData=[{title:'保证金额度',value:'100万'},{title:'保证金余度',value:'100万'}];
export default class FinanceSence extends BaseComponet {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.isShow = false;
        this.state = {
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            source: ds.cloneWithRows([1, 2, 0, 4, 5, 6, 7, 8, 9, 0, 11, 11, 11, 11, 11, 11])
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
            this.setState({renderPlaceholderOnly: 'success'});
            this.initFinish();
            //});
        }
    }


    initFinish = () => {

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
                <ExplainModal ref='loanModal'  buttonStyle={cellSheet.expButton} textStyle={cellSheet.expText}/>
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
            return ( <FinanceHeader/>);
        } else if (rowId == 1) {
            return (<FinanceButton borrowBt={() => {
                this.refs.loanModal.changeShowType(true, '保证金', '知道了',contentData,[]);
            }} payBt={
                () => {
                    this.refs.loanModal.changeShowType(true, '提示', '确定',contentData,contentData);
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
        backgroundColor:fontAndColor.COLORB0
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