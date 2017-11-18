/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager,
    RefreshControl
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import BaseComponent from '../../../component/BaseComponent';
import NavigationView from '../../../component/AllNavigationView';
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';
import AccountTitle from '../component/AccountTitle';
import RechargeScene from '../RechargeScene';
import WithdrawalsScene from '../WithdrawalsScene';
import BankCardScene from '../BankCardScene';
import AccountFlowScene from '../AccountFlowScene';
import AccountSettingScene from '../AccountSettingScene';
import TransferScene from '../TransferScene';
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";
import * as webBackUrl from "../../../constant/webBackUrl";
import AccountWebScene from '../AccountWebScene';
import ZheShangAccountTitle from "./component/ZheShangAccountTitle";
import ModifyBankCard from "./modifyBandCard/ModifyBankCard";
import Log from "./accountLog/Log";
import InformationFillScene from "./modifyPhone/InformationFillScene";
import DepositScene from "./depositAndWithdraw/DepositScene";
import WithdrawScene from "./depositAndWithdraw/WithdrawScene";


let account = {}


export default class ZheShangAccountScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
            info: {},
            enter_id: '',
            isRefreshing: false
        };
    }

    initFinish = () => {
        this.getData()
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.setState({
        //     renderPlaceholderOnly:'success',
        //     source:ds.cloneWithRows([1,2,3,4,5,6,7])
        // });
    }

    allRefresh = () => {
        this.setState({
            renderPlaceholderOnly: 'loading'
        });
        this.getData()
    }

    getData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1 && data.result !== null) {
                let datas = JSON.parse(data.result);
                //this.isOpenContract = datas.is_open_electron_repayment_contract;
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1',
                    bank_id: 316
                };
                request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
                    .then((response) => {
                            account = response.mjson.data['316'][0];
                            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            this.setState({
                                renderPlaceholderOnly: 'success',
                                source: ds.cloneWithRows([1]),
                                info: account,
                                isRefreshing: false
                            })
                            // this.getAccountData(datas.company_base_id,
                            //     response.mjson.data.account.account_open_type)
                        },
                        (error) => {
                            this.props.showToast('用户信息查询失败');
                            this.setState({
                                renderPlaceholderOnly: 'error',
                                isRefreshing: false
                            });
                        });
            } else {
                this.props.showToast('用户信息查询失败');
                this.setState({
                    renderPlaceholderOnly: 'error',
                    isRefreshing: false
                });
            }
        })
    }

    // getAccountData = (id, type) => {
    //     let maps = {
    //         enter_base_id: id,
    //         user_type: type,
    //         transfer_type: '0,3,4,104',
    //         bank_id: 316
    //     };
    //     request(Urls.USER_ACCOUNT_INDEX, 'Post', maps)
    //         .then((response) => {
    //                 //TODO test
    //                 if (response.mjson.data.info.status === '6') {
    //                     this.props.callBack();
    //                     this.backPage();
    //                 } else {
    //                     if (response.mjson.data.payLogs === null || response.mjson.data.payLogs.length <= 0) {
    //                         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //                         this.setState({
    //                             renderPlaceholderOnly: 'success',
    //                             source: ds.cloneWithRows([1]),
    //                             info: response.mjson.data.info,
    //                             enter_id: id,
    //                             isRefreshing: false
    //
    //                         });
    //                     } else {
    //                         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //                         this.setState({
    //                             renderPlaceholderOnly: 'success',
    //                             // source: ds.cloneWithRows(response.mjson.data.payLogs),
    //                             source: ds.cloneWithRows([1]),
    //                             info: response.mjson.data.info,
    //                             enter_id: id,
    //                             isRefreshing: false
    //                         });
    //                     }
    //                 }
    //             },
    //             (error) => {
    //                 this.props.showToast('用户信息查询失败');
    //                 this.setState({
    //                     renderPlaceholderOnly: 'error',
    //                     isRefreshing: false
    //                 });
    //             });
    // }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    removeClippedSubviews={false}
                    style={{marginTop: Pixel.getTitlePixel(64), marginBottom: Pixel.getPixel(45)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderHeader={this._renderHeader}
                    renderSeparator={this._renderSeparator}
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
                <View style={{
                    width: width, height: Pixel.getPixel(44), backgroundColor: fontAndColor.COLORA3,
                    flexDirection: 'row', position: 'absolute', bottom: 0
                }}>
                    <TouchableOpacity onPress={() => {
                        this.toNextPage({
                            name: 'WithdrawScene',
                            component: WithdrawScene, params: {
                                callBack: () => {
                                    this.allRefresh()
                                },
                                account:account,
                            }
                        })
                    }} activeOpacity={0.8}
                                      style={{
                                          flex: 1,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          backgroundColor: '#fff'
                                      }}>
                        <Text allowFontScaling={false}
                              style={{color: fontAndColor.COLORB0, fontSize: Pixel.getFontPixel(15)}}>提现</Text>
                    </TouchableOpacity>
                    <View style={{
                        width: 1, justifyContent: 'center',
                        alignItems: 'center', height: Pixel.getPixel(44)
                    }}/>
                    <TouchableOpacity onPress={() => {
                        this.toNextPage({name: 'DepositScene', component: DepositScene, params: {account:account}})
                    }} activeOpacity={0.8}
                                      style={{
                                          flex: 1,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          backgroundColor: '#fff'
                                      }}>
                        <Text allowFontScaling={false}
                              style={{color: fontAndColor.COLORB0, fontSize: Pixel.getFontPixel(15)}}>充值</Text>
                    </TouchableOpacity>
                </View>
                <NavigationView
                    title="账户管理"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.getData();
    };

    _renderRow = (movie, sectionId, rowId) => {
        if (movie === '1') {
            return (<View/>);
        } else {
            return (
                <View style={{
                    width: width, height: Pixel.getPixel(72), backgroundColor: '#fff', flexDirection: 'row',
                    paddingRight: Pixel.getPixel(15), paddingLeft: Pixel.getPixel(15)
                }}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text allowFontScaling={false} style={{color: '#000', fontSize: Pixel.getPixel(14)}}>
                            {movie.operate_name}
                        </Text>
                        <Text allowFontScaling={false}
                              style={{color: fontAndColor.COLORA1, fontSize: Pixel.getPixel(12)}}>
                            {movie.create_time}
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text allowFontScaling={false} style={{color: '#000', fontSize: Pixel.getPixel(20)}}>
                            {movie.amount}
                        </Text>
                    </View>
                </View>
            )
        }
    }
    _renderHeader = () => {
        return (
            <ZheShangAccountTitle info={this.state.info}
                                  bankCard={() => {  //更换银行卡
                                      this.toNextPage({
                                          name: 'ModifyBankCard',
                                          component: ModifyBankCard,
                                          params: {account:account,}
                                      })
                                  }}
                                  flow={() => {  //流水
                                      this.toNextPage({
                                          name: 'Log',
                                          component: Log, params: {
                                              account:account
                                          }
                                      })
                                  }}
                                  changePhone={() => { //修改银行预留手机号码
                                      this.toNextPage({
                                          name: 'InformationFillScene',
                                          component: InformationFillScene, params: {
                                              account:account
                                          }
                                      })
                                  }}
                                  moreFlow={() => {
                                      /*this.toNextPage({
                                          name: 'AccountFlowScene',
                                          component: AccountFlowScene, params: {}
                                      })*/
                                  }}
                                  frozen={() => {
                                      {/*this.toNextPage({name:'FrozenScene',component:FrozenScene,params:{}})*/
                                      }
                                  }}
                                  copy={(number) => {
                                      this.props.showToast(number);
                                  }}
            />
        )
    };

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="账户管理"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: 1,

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})