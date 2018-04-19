/**
 * Created by hanmeng on 2017/10/30.
 *  恒丰银行、浙商银行统一账户管理页面
 *  页面接口调用规则:
 *  旧：恒丰数据 -> 浙商开关接口 -> 白名单 -> 浙商数据(如在白名单)
 *  新：浙商开关接口 -> 关：恒丰数据
 *                 -> 开：白名单  -> 在：所有银行数据
 *                               -> 不在：恒丰数据
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    Platform,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid,
    RefreshControl,
    Dimensions,
    TouchableWithoutFeedback
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
import OpenTrustAccountView from './component/OpenTrustAccountView'
import OpenAccountBaseScene from './xintuo/openAccount/OpenAccountBaseScene'
import ResultIndicativeScene from './xintuo/ResultIndicativeScene'

var Pixel = new PixelUtil();

let dataList = [];

let flag1 = 0;
let flag2 = 0;
let flag3 = 0;

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
        this.is_zheshang_in_whitelist = false;
        this.xintuoInfo = {};
        this.is_xintuo_in_whitelist = false;
        this.lastType = '-1';
        this.hight = Platform.OS === 'android' ? height + Pixel.getPixel(25) : height;
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            backColor: fontAndColor.COLORA3,

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

    componentWillUnmount(){
        dataList = [];
         flag1 = 0;
         flag2 = 0;
         flag3 = 0;
    }

    initFinish = () => {

        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
            if (data.code == 1) {
                let userData = JSON.parse(data.result);
                StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                    if (subData.code == 1) {
                        let obj = JSON.parse(subData.result);
                        if (obj == null) {
                            obj = {};
                        }
                        if (obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] == null) {
                            obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] = 0;
                            obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD] = 0;
                            obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD] = 0;
                            StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {})
                        }
                        this.setState({
                            mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                            mbWBKShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD],
                            mbKTShow:  obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD],
                        })
                    }
                })
            }
        })

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
        if (this.props.callBackData) {
            this.props.callBackData();
        }
    };

    /**
     *   页面起调，浙商开关接口
     **/
    loadData = () => {

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                
                let datas = JSON.parse(data.result);

                this.getAccountInfo(datas.company_base_id);
                
                request(Urls.IS_IN_WHITE_LIST, 'Post', {enter_base_id:datas.company_base_id})
                    .then((response) => {
                        let isWhiteList = response.mjson.data.status;

                        if (isWhiteList === 0) {  //0 不在白名单中
                            this.is_zheshang_in_whitelist = false;
                            flag2 = 1;
                            this.renderUI();
                        } else {   //1 在白名单中，
                            this.isZSshow()
                        }
                       

                    }, (error) => {
                        this.props.showModal(false);
                        this.props.showToast(error.mjson.msg);
                        this.setState({
                            renderPlaceholderOnly: 'error',
                            isRefreshing: false
                        });
                    });

                /******     信托白名单查询     ******/

                request(Urls.CAN_XINTUO,'POST', {enter_base_id:datas.company_base_id,type:1}).then((response)=>{

                    this.is_xintuo_in_whitelist = true;
                    flag3 = 1;
                    this.renderUI();
                }, (error)=>{
                    
                    this.is_xintuo_in_whitelist = false;
                    flag3 = 1;
                    this.renderUI()
                    console.log(error)
                })


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
     *  查询是否显示浙商账户
     **/
    isZSshow = () => {
        
        /******     浙商账户是否可见     ******/
        
        request(Urls.ZS_BANK_IS_SHOW, 'Post', {})
            .then((response) => {
                if (response.mjson.data.status === 1) {
                    this.is_zheshang_in_whitelist = true
                } else {
                    this.is_zheshang_in_whitelist = false;
                }
                flag2 = 1;
                this.renderUI();
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
     *  获取账户数据
     * @returns {XML}
     **/
    getAccountInfo = (companyBaseId, bankId) => {
        let maps = {
            enter_base_ids: companyBaseId,
            child_type: '1',
            bank_id: ''
        };
        request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);

                this.zheShangInfo = response.mjson.data['316'][0] ? response.mjson.data['316'][0] : {};
                this.xintuoInfo = response.mjson.data['zsyxt'][0] ? response.mjson.data['zsyxt'][0] : {};
                
                if (response.mjson.data['315'][0]) {
                    this.hengFengInfo = response.mjson.data['315'][0];


                    if (this.hengFengInfo.status == '0') {

                        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                            if (data.code == 1) {
                                let userData = JSON.parse(data.result);
                                StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                                    if (subData.code == 1) {
                                        let obj = JSON.parse(subData.result);

                                        if (obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] == 2){return}
                                        obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] = 1;
                                        StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {
                                        })
                                        this.setState({
                                            mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                                            mbWBKShow: 0,
                                            mbKTShow:  0,
                                        })
                                    }
                                })
                            }
                        })

                    } else if (this.hengFengInfo.status == '1') {

                        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                            if (data.code == 1) {
                                let userData = JSON.parse(data.result);
                                StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                                    if (subData.code == 1) {
                                        let obj = JSON.parse(subData.result);
                                        if (obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD] == 2){return}
                                        obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD] = 1;
                                        StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {
                                        })
                                        this.setState({
                                            mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                                            mbWBKShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD],
                                            mbKTShow:  0,
                                        })
                                    }
                                })
                            }
                        })

                    } else if (this.hengFengInfo.status == '3') {

                        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                            if (data.code == 1) {
                                let userData = JSON.parse(data.result);
                                StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                                    if (subData.code == 1) {
                                        let obj = JSON.parse(subData.result);
                                        if (obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD] == 2){return}
                                        obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD] = 1;
                                        StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {
                                        })
                                        this.setState({
                                            mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                                            mbWBKShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD],
                                            mbKTShow:  obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD],
                                        })
                                    }
                                })
                            }
                        })


                    }
                    this.lastType = response.mjson.data['315'][0].status;
                    if (this.props.callBack) {

                        this.props.callBack(this.lastType);
                    }
                }
               
                
                flag1 = 1;
                this.renderUI();
                
                
            }, (error) => {
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
                this.setState({
                    renderPlaceholderOnly: 'error',
                    isRefreshing: false
                });
            });
    };


    renderUI = ()=>{
        

        if (flag1 == 1&& flag2==1 &&flag3==1){
            
            dataList = []
            
            dataList.push('315');
            
            if (this.is_zheshang_in_whitelist){
                dataList.push('316');
            }
            if(this.is_xintuo_in_whitelist){
                dataList.push('zsyxt');
            }
            
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(dataList),
                renderPlaceholderOnly: 'success',
                isRefreshing: false,
                backColor: fontAndColor.COLORB0
            });

            flag1 = 0;
            flag2 = 0;
            flag3 = 0;
        }

    }



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

                <OpenTrustAccountView ref="openAccount" callBack={this.openTrustAccount}
                                      showModal={this.props.showModal}
                                      navigator={this.props.navigator}/>

                {
                    this.state.mbWKHShow == 1 ?
                        <View style={{position: 'absolute',bottom:0,top:0,width:width}}>
                            <TouchableWithoutFeedback
                                onPress={()=>{

                                    StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                                        if (data.code == 1) {
                                            let userData = JSON.parse(data.result);
                                            StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                                                if (subData.code == 1) {
                                                    let obj = JSON.parse(subData.result);
                                                    obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] = 2;
                                                    StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {
                                                    })
                                                    this.setState({
                                                        mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                                                        mbWBKShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD],
                                                        mbKTShow:  obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD],
                                                    })
                                                }
                                            })
                                        }
                                    })



                                }}>
                                <Image style={{width:width,flex:1,resizeMode:'stretch'}}
                                       source={require('../../../images/tishimengban/zhgl_wkhwbkyhk.png')}/>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
                {
                    this.state.mbWBKShow == 1 ?
                        <View style={{position: 'absolute',bottom:0,top:0,width:width}}>
                            <TouchableWithoutFeedback
                                onPress={()=>{
                                    StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                                        if (data.code == 1) {
                                            let userData = JSON.parse(data.result);
                                            StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                                                if (subData.code == 1) {
                                                    let obj = JSON.parse(subData.result);
                                                    obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD] = 2;
                                                    StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {
                                                    })
                                                    this.setState({
                                                        mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                                                        mbWBKShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD],
                                                        mbKTShow:  obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD],
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }}

                            >
                                <Image style={{width:width,flex:1,resizeMode:'stretch'}}
                                       source={require('../../../images/tishimengban/zhgl_bky.png')}/>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
                {
                    this.state.mbKTShow == 1 ?
                        <View style={{position: 'absolute',bottom:0,top:0,width:width}}>
                            <TouchableWithoutFeedback
                                onPress={()=>{

                                    StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
                                        if (data.code == 1) {
                                            let userData = JSON.parse(data.result);
                                            StorageUtil.mGetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), (subData) => {
                                                if (subData.code == 1) {
                                                    let obj = JSON.parse(subData.result);
                                                    obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD] = 2;
                                                    StorageUtil.mSetItem(String(userData['base_user_id'] + StorageKeyNames.HF_INDICATIVE_LAYER), JSON.stringify(obj), () => {
                                                    })
                                                    this.setState({
                                                        mbWKHShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_OPEN_ACCOUNT] ,
                                                        mbWBKShow: obj[StorageKeyNames.HF_ACCOUNT_DO_NOT_BIND_BANKCARD],
                                                        mbKTShow:  obj[StorageKeyNames.HF_ACCOUNT_DID_BIND_BANKCARD],
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }}>
                                <Image style={{width:width,flex:1,resizeMode:'stretch'}}
                                       source={require('../../../images/tishimengban/zhgl_ykhybk.png')}/>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
            </View>);
        }
    }


    // 信托开户
    openTrustAccount = ()=>{
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {

            if (data.code == 1) {
                let datas = JSON.parse(data.result);

                let params =  {enter_base_id:datas.company_base_id}

                request(Urls.OPEN_PERSON_TRUST_ACCOUNT, 'Post',params)
                    .then((response) => {
                        this.props.showModal(false)
                        this.toNextPage({
                            component: ResultIndicativeScene,
                            name: 'ResultIndicativeScene',
                            params: {
                                type:0,
                                status: 1,
                                params: params,
                                append: this.state.bankName,
                                callBack: this.allRefresh
                            }
                        })


                    }, (error) => {
                        this.props.showModal(false);

                        if(error.mycode === 8050324){  // 不在服务时间内
                            this.setState({
                                out_of_service_msg:error.mjson.msg,
                                alert:true
                            })
                            return
                        }
                        if (error.mycode === 8010007) {  // 存疑

                            this.toNextPage({
                                component: ResultIndicativeScene,
                                name: 'ResultIndicativeScene',
                                params: {
                                    type:  0,
                                    status: 0,
                                    params: params,
                                    error: error.mjson,
                                    callBack: this.allRefresh
                                }
                            })
                        } else if (error.mycode === -500 || error.mycode === -300) {
                            this.props.showToast(error.mycode)
                        } else { // 开户失败
                            this.toNextPage({
                                component: ResultIndicativeScene,
                                name: 'ResultIndicativeScene',
                                params: {
                                    type: 0,
                                    status: 2,
                                    params: params,
                                    error: error.mjson,
                                    callBack: this.allRefresh
                                }
                            })
                        }



                    });
            }
        })
    }



    clickCallBack = ()=>{

        // this.navigatorParams.name = 'OpenAccountBaseScene';
        // this.navigatorParams.component = OpenAccountBaseScene;
        // this.navigatorParams.params = {
        //     showModal:this.props.showModal,
        //     callBack: () => {
        //         this.props.callBack();
        //     }
        // };
        // this.toNextPage(this.navigatorParams);
        // return;
        

        if(this.hengFengInfo.account_open_type == 1){  // 企业

            this.navigatorParams.name = 'OpenAccountBaseScene';
            this.navigatorParams.component = OpenAccountBaseScene;
            this.navigatorParams.params = {
                showModal:this.props.showModal,
                callBack: this.allRefresh
            };
            this.toNextPage(this.navigatorParams);

        }else if(this.hengFengInfo.account_open_type == 2){  //个人

            this.props.showModal(true);
            let maps = {
                source_type: '3',
                fund_channel: '信托'
            };
            request(Urls.AGREEMENT_LISTS, 'Post', maps)
                .then((response) => {
                    this.props.showModal(false);
                    this.contractList = response.mjson.data.list;
                    this.refs.openAccount.changeStateWithData(true, this.contractList);
                }, (error) => {
                    this.props.showModal(false);
                    this.props.showToast(error.mjson.msg);
                });
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
        if (rowData == '315') {
            info = this.hengFengInfo;
        } else if (rowData == '316'){
            info = this.zheShangInfo;
        }else {
            info = this.xintuoInfo;
        }
        return (
            <MyAccountItem
                clickCallBack={this.clickCallBack}
                showQuestion = {rowData == 315?true:false}
                navigator={this.props.navigator}
                showToast={this.props.showToast}
                showModal={this.props.showModal}
                type={rowData}     //账户类型
                data={info}        //账户数据
                callBack={this.allRefresh}/>
        );
    }


}

const styles = StyleSheet.create({});