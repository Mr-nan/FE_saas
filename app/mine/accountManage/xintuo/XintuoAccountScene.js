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
import Log from "./accountLog/Log";
import DepositScene from "./depositAndWithdraw/DepositScene";
import WithdrawScene from "./depositAndWithdraw/WithdrawScene";
import SaasText from "./component/SaasText";
import MyButton from '../../../../app/component/MyButton'


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
            isRefreshing: false,
            service_in: '',
            service_out: '',
            alert: false

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
                    bank_id: 'zsyxt'
                };
                request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
                    .then((response) => {
                            account = response.mjson.data['zsyxt'][0];
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


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    removeClippedSubviews={false}
                    style={{marginTop: Pixel.getTitlePixel(64)}}
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
                    <TouchableOpacity onPress={() => {  // 提现

                                this.toNextPage({
                                    name: 'WithdrawScene',
                                    component: WithdrawScene, params: {
                                        callBack:this.refreshingData,
                                        account: account,
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
                              style={{color: fontAndColor.COLORB0, fontSize: Pixel.getFontPixel(15)}}>粮票提现</Text>
                    </TouchableOpacity>
                </View>
                <NavigationView
                    title="车贷粮票"
                    backIconClick={this.backPage}
                />


            </View>
        );
    }


    is_in_operation = (operation_type) => {


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

                <View/>
                //
                //
                // <View style={{
                //     width: width, height: Pixel.getPixel(72), backgroundColor: fontAndColor.COLORA3, flexDirection: 'row',
                //     paddingRight: Pixel.getPixel(15), paddingLeft: Pixel.getPixel(15)
                // }}>
                //     <View style={{flex: 1, justifyContent: 'center'}}>
                //         <Text allowFontScaling={false} style={{color: '#000', fontSize: Pixel.getPixel(14)}}>
                //             {movie.operate_name}
                //         </Text>
                //         <Text allowFontScaling={false}
                //               style={{color: fontAndColor.COLORA1, fontSize: Pixel.getPixel(12)}}>
                //             {movie.create_time}
                //         </Text>
                //     </View>
                //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                //         <Text allowFontScaling={false} style={{color: '#000', fontSize: Pixel.getPixel(20)}}>
                //             {movie.amount}
                //         </Text>
                //     </View>
                // </View>
                //
                //
            )
        }
    }
    _renderHeader = () => {
        return (
            <ZheShangAccountTitle info={this.state.info}

                                  flow={() => {  //流水

                                      this.toNextPage({
                                          name: 'Log',
                                          component: Log, params: {
                                              account: account
                                          }
                                      })
                                  }}

                                  moreFlow={() => {
                                      /*this.toNextPage({
                                          name: 'AccountFlowScene',
                                          component: AccountFlowScene, params: {}
                                      })*/
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
                    title="粮票账户"
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