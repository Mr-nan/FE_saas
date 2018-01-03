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
    BackAndroid,
    Animated,
    Platform,
    StatusBar
} from  'react-native'

let mnyData = {};
let movies = [];
let page = 1;
let allPage = 0;


import  HomeHeaderItem from './component/HomeHeaderItem';
import  PixelUtil from '../utils/PixelUtil'
import KurongDetaileScene from '../finance/lend/KurongDetaileScene';
import ChedidaiDetaileScene from '../finance/lend/ChedidaiDetaileScene';
import DDDetailScene from '../finance/lend/DDDetailScene';
import DDApplyLendScene from '../finance/lend/DDApplyLendScene';

import CGDDetailSence from '../finance/lend/CGDDetailSence';
import SingDetaileSence from '../finance/lend/SingDetaileSence';
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
import QuotaApplication from '../login/QuotaApplication';
import {LendSuccessAlert} from '../finance/lend/component/ModelComponent'
import CGDLendScenes from '../finance/lend/CGDLendScenes';
import AccountModal from '../component/AccountModal';
import MyAccountScene from "../mine/accountManage/MyAccountScene";
import  FinanceHeader from './component/FinanceHeader';

export default class FinanceSence extends BaseComponet {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            topWidth: new Animated.Value(330),
            scale1: new Animated.Value(1),
            scale2: new Animated.Value(1),
            scale3: new Animated.Value(1),
            scale4: new Animated.Value(1)
        };
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
                {IS_ANDROID ? null: <StatusBar barStyle={'default'} />}
                <FinanceHeader/>
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

    _renderRow = (movie) => {

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

    container: {

        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    }
});