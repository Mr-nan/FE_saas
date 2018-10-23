/**
 * Created by hanmeng on 2017/10/30.
 */
import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from 'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import BaseComponent from "../../../component/BaseComponent";
import AccountManageScene from "../AccountTypeSelectScene";
import BindCardScene from "../BindCardScene";
import WaitActivationAccountScene from "../WaitActivationAccountScene";
import AccountScene from "../AccountScene";
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";
import {request} from "../../../utils/RequestUtil";
import * as Urls from '../../../constant/appUrls';
import ZheShangAccountScene from "../zheshangAccount/ZheShangAccountScene";
import ZSAccountTypeSelectScene from "../zheshangAccount/ZSAccountTypeSelectScene";
import WebScene from '../../../main/WebScene';
import {BASEURL} from '../../../constant/appUrls';
import XintuoAccountScene from '../xintuo/XintuoAccountScene'
import OpenAccountBaseScene from '../xintuo/openAccount/OpenAccountBaseScene';
import OpenPersonalCountScene from '../../accountManage/OpenPersonalCountScene';
import OpenCompanyCountScene from '../../accountManage/OpenCompanyCountScene';
import IndexAccountmanageScene from '../guangfa_account/count_detail/IndexAccountmanageScene';
import SelectCountCompany from '../guangfa_account/open_count/SelectCountCompany';
import SelectCountPersonal from '../guangfa_account/open_count/SelectCountPersonal';
const Pixel = new PixelUtil();

const cellJianTou = require('../../../../images/mainImage/celljiantou.png');

export default class MyAccountItem extends BaseComponent {

    /**
     *  constructor
     **/
    constructor(props) {
        super(props);
        this.navigatorParams = {
            name: '',
            component: '',
            params: {}
        };
        console.log("this.props.data",this.props.data);
            this.state = {
                data: this.props.data
            };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    /**
     *   跳转页面分发
     *   type 315恒丰 316浙商
     *   state 开户状态
     **/
    pageDispense = (type, state,iscompany) => {
        if(type == 'gfyh'){
            switch (state) {
                case 0:
                    if(iscompany){
                        this.navigatorParams.name = 'SelectCountCompany';
                        this.navigatorParams.component = SelectCountCompany;
                        this.navigatorParams.params = {
                            callBack:() =>{
                                this.props.callBack();
                            }
                        };
                    }else{
                        this.navigatorParams.name = 'SelectCountPersonal';
                        this.navigatorParams.component = SelectCountPersonal;
                        this.navigatorParams.params = {
                            callBack: () => {
                                this.props.callBack();
                            }
                        };
                    }
                    break;
                default:
                    this.navigatorParams.name = 'IndexAccountmanageScene';
                    this.navigatorParams.component = IndexAccountmanageScene;
                    this.navigatorParams.params = {
                        callBack: () =>{
                            this.props.callBack();
                        }
                    }
                    break;
            }
            this.toNextPage(this.navigatorParams);
        }
       else if (type == '315') {
            switch (state) {
                case 0:
                    if(iscompany){
                                this.navigatorParams.name = 'OpenCompanyCountScene';
                                this.navigatorParams.component = OpenCompanyCountScene;
                                this.navigatorParams.params = {
                                    callBack: () => {
                                        this.props.callBack();
                                    }
                                };
                            }else{
                                this.navigatorParams.name = 'OpenPersonalCountScene';
                                this.navigatorParams.component = OpenPersonalCountScene;
                                this.navigatorParams.params = {
                                    callBack: () => {
                                        this.props.callBack();
                                    }
                                };
                            }
                    break;
                case 1:
                    this.navigatorParams.name = 'BindCardScene';
                    this.navigatorParams.component = BindCardScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
                case 2:
                    this.navigatorParams.name = 'WaitActivationAccountScene';
                    this.navigatorParams.component = WaitActivationAccountScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
                default:
                    this.navigatorParams.name = 'AccountScene';
                    this.navigatorParams.component = AccountScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
            }
            this.toNextPage(this.navigatorParams);
        } else if (type == '316') {

            switch (state) {
                case 0://未开户
                    this.navigatorParams.name = 'ZSAccountTypeSelectScene';
                    this.navigatorParams.component = ZSAccountTypeSelectScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    this.toNextPage(this.navigatorParams);
                    break;
                case 2: // 未激活
                    // this.navigatorParams.name = 'WaitActivationAccountScene';
                    // this.navigatorParams.component = WaitActivationAccountScene;
                    // this.navigatorParams.params = {
                    //     callBack: () => {
                    //         this.props.callBack();
                    //     }
                    // };
                    this.props.showToast('您的资料已经提交，请耐心等待');
                    break;
                default:  //已开户
                    this.navigatorParams.name = 'ZheShangAccountScene';
                    this.navigatorParams.component = ZheShangAccountScene;
                    this.navigatorParams.params = {};
                    this.toNextPage(this.navigatorParams);
                    break;
            }
        } else if (type == 'zsyxt') {

            // this.props.clickCallBack()
            // return

            switch (state) {
                case 0://未开户
                    this.props.clickCallBack()

                    break;
                case 2: // 未激活
                    // this.navigatorParams.name = 'WaitActivationAccountScene';
                    // this.navigatorParams.component = WaitActivationAccountScene;
                    // this.navigatorParams.params = {
                    //     callBack: () => {
                    //         this.props.callBack();
                    //     }
                    // };
                    this.props.showToast('您的资料已经提交，请耐心等待');
                    break;
                default:  //已开户
                    this.navigatorParams.name = 'XintuoAccountScene';
                    this.navigatorParams.component = XintuoAccountScene;
                    this.navigatorParams.params = {};
                    this.toNextPage(this.navigatorParams);
                    break;
            }

        }
    };

    /**
     *   点击跳转方法
     *   type 315恒丰 316浙商
     **/
    jumpDetailPage = (type) => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                let iscompany = true;
                if(datas.role_type instanceof Array){
                    for(let item of datas.role_type){
                        if(item == 19){
                           iscompany = false;
                            break;
                        }
                    }
                }

                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1',
                    bank_id: type
                };
                request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
                    .then((response) => {
                        this.props.showModal(false);
                        //this.pageDispense(type, 0);
                        this.pageDispense(type, response.mjson.data[type][0].status,iscompany);

                    }, (error) => {
                        this.props.showModal(false);
                        this.props.showToast('用户信息查询失败');
                    });
            } else {
                this.props.showModal(false);
                this.props.showToast('用户信息查询失败');
            }
        });

        //return;

        // if (type == '315') {
        //     this.props.showModal(true);
        //     StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
        //         if (data.code == 1) {
        //             let datas = JSON.parse(data.result);
        //             console.log('1111111111111111111111');
        //             let maps = {
        //                 enter_base_ids: datas.company_base_id,
        //                 child_type: '1'
        //             };
        //             request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
        //                 .then((response) => {
        //                     this.props.showModal(false);
        //                     this.pageDispense(type, response.mjson.data.account.status);
        //                 }, (error) => {
        //                     this.props.showModal(false);
        //                     this.props.showToast('用户信息查询失败');
        //                 });
        //         } else {
        //             this.props.showModal(false);
        //             this.props.showToast('用户信息查询失败');
        //         }
        //     });
        // } else if (type == '316') {
        //     this.props.showModal(true);
        //     StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
        //         if (data.code == 1) {
        //             let datas = JSON.parse(data.result);
        //
        //             let maps = {
        //                 enter_base_ids: datas.company_base_id,
        //                 child_type: '1',
        //                 bank_id: type
        //             };
        //             request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
        //                 .then((response) => {
        //                     this.props.showModal(false);
        //                     //this.pageDispense(type, 0);
        //                     this.pageDispense(type, response.mjson.data[type][0].status);
        //
        //                 }, (error) => {
        //                     this.props.showModal(false);
        //                     this.props.showToast('用户信息查询失败');
        //                 });
        //         } else {
        //             this.props.showModal(false);
        //             this.props.showToast('用户信息查询失败');
        //         }
        //     });
        // } else if (type == 'zsyxt') {
        //
        //
        //     if (this.data.status = 'undefined' || this.data == {} || this.data.state == 0) {
        //         this.props.clickCallBack();
        //     } else {
        //         this.pageDispense(type)
        //     }
        //
        //
        // }
    };

    /**
     *  render
     **/
    render() {
        let back = ''; //背景图
        let bank = ''; //银行图标
        let bankName = ''; //账户类型名称
        let accountState = ''; //账户状态
        let bankNo = ''; // 资金账号
        let bindBankName = '**********'; // 绑定银行卡开户行
        if(this.props.type == 'gfyh'){
           back = require('../../../../images/mine/guangfa_account/guangfa-bg.png');
           bank = require('../../../../images/mine/guangfa_account/广发银行 copy.png');
           bankName = '广发银行';
        }
         else if (this.props.type == '315') {   //恒丰
            back = require('../../../../images/account/hengfengback.png');
            bank = require('../../../../images/account/hengfengbank.png');
            bankName = '恒丰银行';
            bankNo = this.state.data.bank_card_no && this.state.data.status != 0 ? this.state.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") :
                '***** ***** *****';
        } else if (this.props.type == '316') {  //浙商
            back = require('../../../../images/account/zheshangback@2x.png');
            bank = require('../../../../images/account/zheshangbank.png');
            bankName = '浙商银行';

            let b = (this.state.data.bind_bank_card_type === 1 && this.state.data.account_open_type === 1) ? this.state.data.bank_card_no.replace(/^(....).*(....)$/, "$1****$2") : this.state.data.cz_elec_account.replace(/^(....).*(....)$/, "$1****$2")
            bankNo = b && this.state.data.status != 0 ? b :
                '***** ***** *****';
        } else {   // 信托
            back = require('../../../../images/account/xintuo_background.png');
            bank = require('../../../../images/account/xintuo.png');
            bankName = '1 车粮票';

            let b = (this.state.data.bind_bank_card_type === 1 && this.state.data.account_open_type === 1) ? this.state.data.bank_card_no : this.state.data.cz_elec_account

            bankNo = b && this.state.data.status != 0 ? b :
                '***** ***** *****';
        }
        if (this.state.data.status === 0 || !this.state.data.status) {
            accountState = '去开户';
        } else if (this.state.data.status === 1) {
            accountState = '未绑卡';
            bindBankName = this.state.data.bind_bank_name ? this.state.data.bind_bank_name : '**********';
        } else if (this.state.data.status === 2) {
            accountState = '未激活';
            bindBankName = this.state.data.bind_bank_name ? this.state.data.bind_bank_name : '**********';
        }else {
            if(this.state.data.account_open_type === 1){
                accountState = '企业账户';
                bindBankName = this.state.data.bind_bank_name ? this.state.data.bind_bank_name : '**********';
            }else  if(this.state.data.account_open_type === 2){
                accountState = '个人账户';
                bindBankName = this.state.data.bind_bank_name ? this.state.data.bind_bank_name : '**********';
            }
        }
        return (
            <View style={{alignItems: 'center',width:Pixel.getPixel(345), height: Pixel.getPixel(204),marginLeft:Pixel.getPixel(15)}}>
                <Image
                    style={{width:Pixel.getPixel(345), height: Pixel.getPixel(204), resizeMode: "stretch"}}
                    source={back}>
                    <TouchableOpacity
                        style={{
                            //backgroundColor: '#ffdaff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: Pixel.getPixel(62),
                            marginTop: Pixel.getPixel(5)
                        }}
                        onPress={() => {
                            this.jumpDetailPage(this.props.type);
                        }}
                        activeOpacity={0.9}>
                        <View style={{
                            marginLeft: Pixel.getPixel(20),
                            marginRight: Pixel.getPixel(20),
                            //backgroundColor: '#ffdaff',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image source={bank} style={{width:Pixel.getPixel(40),height:Pixel.getPixel(40),resizeMode:'stretch'}}/>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    backgroundColor: 'white',
                                    marginLeft: Pixel.getPixel(12),
                                    includeFontPadding: false,
                                    textAlign: 'left',
                                    fontSize: Pixel.getPixel(15),
                                    color: fontAndColor.COLORA0
                                }}>{bankName}</Text>
                            {this.state.data.status === 0 || this.state.data.status === 1 || this.state.data.status === 2 ?
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#ffffff',
                                        marginRight: Pixel.getPixel(10),
                                        textAlign: 'right',
                                        fontSize: Pixel.getPixel(15),
                                        color: fontAndColor.COLORB2
                                    }}>{accountState}</Text> :
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#ffffff',
                                        marginRight: Pixel.getPixel(10),
                                        textAlign: 'right',
                                        fontSize: Pixel.getPixel(15),
                                        color: '#666666'
                                    }}>{accountState}</Text>
                            }
                            <Image source={cellJianTou}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: fontAndColor.COLORA4,
                        height: StyleSheet.hairlineWidth,
                        marginHorizontal: Pixel.getPixel(20),

                    }}/>
                    <View style={{
                        height: Pixel.getPixel(50),
                        marginTop: Pixel.getPixel(15),
                        alignItems: 'center',
                        marginHorizontal: Pixel.getPixel(20),
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                        flexDirection: 'row',

                    }}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    //includeFontPadding: false,
                                    textAlign: 'left',
                                    fontSize: Pixel.getFontPixel(12),
                                    color: fontAndColor.COLORA0
                                }}>{this.props.type == 'zsyxt' ? "粮票余额（元）" : "账号余额（元）"}</Text>
                            {
                                this.state.data.status == 0 || !this.state.data.status ?
                                    <View style={{flexDirection:'row',marginTop:Pixel.getPixel(3)}}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                includeFontPadding: false,
                                                textAlign: 'left',
                                                fontSize: Pixel.getFontPixel(26),
                                                color:'#333333',
                                            }}>****
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                includeFontPadding: false,
                                                textAlign: 'left',
                                                fontSize: Pixel.getFontPixel(14),
                                                marginTop:Pixel.getPixel(3),
                                                color:'#333333',

                                            }}>.
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                includeFontPadding: false,
                                                textAlign: 'left',
                                                fontSize: Pixel.getFontPixel(26),
                                                color:'#333333',
                                            }}>**
                                        </Text>
                                    </View>
                                    :
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            includeFontPadding: false,
                                            marginTop: Pixel.getPixel(3),
                                            textAlign: 'left',
                                            fontSize: Pixel.getFontPixel(26),
                                            color:'#333333',
                                        }}>{this.state.data.balance}</Text>
                            }

                        </View>

                        {

                            this.props.showQuestion == true ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.questionClick(this.props.type)
                                    }}
                                >
                                    <Image style={{width: Pixel.getPixel(15), height: Pixel.getPixel(15), padding: 10}}
                                           source={require('../../../../images/account/question.png')}/>

                                </TouchableOpacity>
                                : null
                        }

                    </View>
                    <View style={{
                        height: Pixel.getPixel(45),
                        marginTop: Pixel.getPixel(6),
                        alignItems: 'center',
                        marginLeft: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(20),
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        flexDirection: 'row',

                    }}>

                        {
                            this.props.type != "zsyxt" && this.props.type != 'gfyh' ?
                                <View
                                    style={{flex: 2}}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{

                                            textAlign: 'left',
                                            fontSize: Pixel.getPixel(12),
                                            color: fontAndColor.COLORA1
                                        }}>资金账号</Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            includeFontPadding: false,
                                            marginTop: Pixel.getPixel(3),
                                            textAlign: 'left',
                                            fontSize: Pixel.getPixel(20),
                                            color: fontAndColor.COLORA1
                                        }}>{bankNo}</Text>

                                </View>
                                :
                               null
                        }
                        {
                            this.props.type == 'gfyh' ?
                                <View
                                    style={{flex: 2}}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{

                                            textAlign: 'left',
                                            fontSize: Pixel.getPixel(12),
                                            color: fontAndColor.COLORA1
                                        }}>开通时间</Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            includeFontPadding: false,
                                            marginTop: Pixel.getPixel(3),
                                            textAlign: 'left',
                                            fontSize: Pixel.getPixel(15),
                                            color: fontAndColor.COLORA1
                                        }}>{this.state.data.account_open_date ?  this.state.data.account_open_date.substr(0, 10):'****-**-**'}</Text>

                                </View> :null

                        }
                        {
                            this.props.type == 'zsyxt' ?
                                <View
                                style={{flex: 2}}
                            >
                                <Text
                                    allowFontScaling={false}
                                    onPress={()=>{
                                        this.props.questionClick(this.props.type)
                                    }}
                                    style={{
                                        includeFontPadding: false,
                                        textAlign: 'left',
                                        fontSize: Pixel.getPixel(12),
                                        color: fontAndColor.COLORA1
                                    }}>什么是1车粮票？</Text>
                            </View> : null
                        }

                        {
                            this.props.type != 'gfyh' ?
                                <View
                                    style={{flex: 1}}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            includeFontPadding: false,
                                            textAlign: 'right',
                                            fontSize: Pixel.getPixel(12),
                                            color: fontAndColor.COLORA1
                                        }}>开通时间</Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            includeFontPadding: false,
                                            marginTop: Pixel.getPixel(3),
                                            textAlign: 'right',
                                            fontSize: Pixel.getPixel(15),
                                            color: fontAndColor.COLORA1
                                        }}>
                                        {this.state.data.account_open_date ?  this.state.data.account_open_date.substr(0, 10):'****-**-**'}
                                    </Text>
                                </View> : null
                        }

                    </View>
                </Image>
            </View>
        )
    }

}

const styles = StyleSheet.create({});