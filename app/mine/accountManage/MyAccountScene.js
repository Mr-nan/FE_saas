/**
 * Created by hanmeng on 2017/10/30.
 *  恒丰银行、浙商银行统一账户管理页面
 *  页面接口调用规则:
 *  恒丰数据 -> 白名单 -> 浙商数据(如在白名单)
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid,
    RefreshControl,
    Dimensions
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import NavigatorView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil'
import {request} from "../../utils/RequestUtil";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import MyAccountItem from "./component/MyAccountItem";
import AccountManageScene from "./AccountManageScene";
import * as Urls from '../../constant/appUrls';

var Pixel = new PixelUtil();

export default class MyAccountScene extends BaseComponent {

    navigatorParams = {
        name: 'AccountManageScene',
        component: AccountManageScene,
        params: {}
    };

    // 构造
    constructor(props) {
        super(props);
        this.hengFengInfo = {};
        this.zheShangInfo = {};
        this.lastType = '-1';
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            backColor: fontAndColor.COLORA3
        };
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
        /*        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
         dataSource: ds.cloneWithRows(['0', '1']),
         renderPlaceholderOnly: 'success'
         });*/
        this.loadData();
    };

    // 下拉刷新数据
    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.loadData();
    };

    /**
     *  返回刷新数据
     **/
    allRefresh = () => {
        this.props.showModal(true);
        this.loadData();
    };

    loadData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1'
                };
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                        //this.props.showModal(false);
                        this.lastType = response.mjson.data.account.status;
                        this.hengFengInfo = response.mjson.data.account;
                        this.props.callBack(this.lastType);   //最新的账户状态回传给"我的"页面
                        /*                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                         this.setState({
                         dataSource: ds.cloneWithRows(['0', '1']),
                         renderPlaceholderOnly: 'success',
                         isRefreshing: false,
                         backColor: fontAndColor.COLORB0
                         });*/
                        this.getIsInWhiteList(datas.company_base_id);
                    }, (error) => {
                        this.props.showModal(false);
                        this.props.showToast('用户信息查询失败');
                        this.setState({
                            renderPlaceholderOnly: 'error',
                            isRefreshing: false
                        });
                    });
            } else {
                this.props.showModal(false);
                this.props.showToast('用户信息查询失败');
                this.setState({
                    renderPlaceholderOnly: 'error',
                    isRefreshing: false
                });
            }
        });

    };

    /**
     *  查询是否在(浙商)白名单
     * @returns {XML}
     **/
    getIsInWhiteList = (companyBaseId) => {
        let maps = {
            enter_base_id: companyBaseId
        };
        request(Urls.IS_IN_WHITE_LIST, 'Post', maps)
            .then((response) => {
                let isWhiteList = response.mjson.data.status;
                if (isWhiteList === 0) {
                    this.props.showModal(false);
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(['0']),
                        renderPlaceholderOnly: 'success',
                        isRefreshing: false,
                        backColor: fontAndColor.COLORB0
                    });
                } else {
                    this.getZheShangAccountInfo(companyBaseId, isWhiteList);
                }
            }, (error) => {
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
                this.setState({
                    renderPlaceholderOnly: 'error',
                    isRefreshing: false
                });
            });
    };

    /**
     *  获取浙商账户数据
     * @returns {XML}
     **/
    getZheShangAccountInfo = (companyBaseId, isWhiteList) => {
        let maps = {
            enter_base_ids: companyBaseId,
            child_type: '1',
            bank_id: 316
        };
        request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                //let zheShangStatus = response.mjson.data.account.status;
                this.zheShangInfo = response.mjson.data.account;
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(['0', '1']),
                    renderPlaceholderOnly: 'success',
                    isRefreshing: false,
                    backColor: fontAndColor.COLORB0
                });
            }, (error) => {
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
                this.setState({
                    renderPlaceholderOnly: 'error',
                    isRefreshing: false
                });
            });
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            // 加载中....
            return ( <View style={{
                flex: 1,
                backgroundColor: this.state.backColor
            }}>
                {this.loadView()}
                <NavigatorView title='我的账户' backIconClick={this.backPage}
                               renderRihtFootView={this.renderRihtFootView}/>
            </View>);
        } else {
            return (<View style={{
                flex: 1,
                backgroundColor: this.state.backColor
            }}>
                <NavigatorView title='我的账户' backIconClick={this.backPage}
                               renderRihtFootView={this.renderRihtFootView}/>
                <ListView style={{marginTop: Pixel.getTitlePixel(80)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          renderSeparator={this._renderSeperator}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this.refreshingData}
                                  tintColor={[fontAndColor.COLORA3]}
                                  colors={[fontAndColor.COLORA3]}
                              />
                          }/>
            </View>);
        }
    }

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORB0, height: Pixel.getPixel(20)}}/>
        )
    };

    _renderRow = (rowData, selectionID, rowID) => {
        let info = {};
        if (rowData == '0') {
            info = this.hengFengInfo;
        } else {
            info = this.zheShangInfo;
        }
        return (
            <MyAccountItem
                navigator={this.props.navigator}
                showModal={this.props.showModal}
                type={rowData}     //账户类型
                data={info}        //账户数据
                callBack={this.allRefresh}/>
        );
    }


}

const styles = StyleSheet.create({});