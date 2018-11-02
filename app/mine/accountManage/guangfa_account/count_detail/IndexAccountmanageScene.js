/*
*
* created on marongting by 2018/10/19
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ScrollView,
    RefreshControl,
    DeviceEventEmitter,

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from '../../../../constant/appUrls';
import GFBankWebScene from "../open_count/GFBankWebScene";
import Log from "../../xintuo/accountLog/Log";
import WithdrawDepositScene from "./WithdrawDepositScene";
import BankcardScene from "./BankcardScene";
import AuthenticatePublicScene from "./AuthenticatePublicScene";
import AlertPhoneNumberScene from "./AlertPhoneNumberScene";
import GFRechargeScene from "./GFRechargeScene";
import AccountSettingScene from "./AccountSettingScene";

export default class IndexAccountmanageScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            isRefreshing:false,
            accountData:{},
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'loading',
        })
        this.loadData();
    }

    loadData=()=>{
        let maps = {
            enter_base_ids: global.companyBaseID,
            child_type: '1',
            bank_id: 'gfyh'
        };
        request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
            .then((response) => {
                 console.log(response);
                this.setState({
                    renderPlaceholderOnly: 'success',
                    isRefreshing: false,
                    accountData:response.mjson.data['gfyh'][0],
                });
            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'error',
                    isRefreshing: false,
                });
                this.props.showToast(error.mjson.msg);
            });
    }

    refreshData=()=>{

        this.setState({
            isRefreshing:true,
        });
        let maps = {
            enter_base_ids: global.companyBaseID,
            child_type: '1',
            bank_id: 'gfyh'
        };
        request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
            .then((response) => {
                console.log(response);
                this.setState({
                    isRefreshing: false,
                    accountData:response.mjson.data['gfyh'][0],
                });
            }, (error) => {
                this.setState({
                    isRefreshing: false,
                });
                this.props.showToast(error.mjson.msg);
            });
    }


    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
            return(
                <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                    {
                        this.loadView()
                    }
                    <NavigationView backIconClick={this.backPage}
                                    title='账户管理'/>
                </View>
            )
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle={this.state.accountData.cancel_status==1? 'default':'light-content'}/>
                {
                    this.state.accountData.cancel_status==1? (
                            <View style={{backgroundColor:'#ffffff',width:width,marginTop:Pixel.getTitlePixel(74)}}>
                                <CellItem imageData={require('../../../../../images/mine/guangfa_account/zhuxiao.png')} title="账户销户" isShowBottomLin={true} click={()=>{this.cancelAccountAction()}}/>
                            </View>

                        ):(
                            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                                <Image source={require('../../../../../images/mine/guangfa_account/tou-bg.png')} style={{width:width,height:width*0.5}}>
                                    <View style={{flexDirection: 'row',marginTop: Pixel.getPixel(88),alignItems:'center',justifyContent:'space-between',marginLeft:Pixel.getPixel(34),marginRight: Pixel.getPixel(30,5)}}>
                                        <View style={{flexDirection:'column',alignItems:'center',width:Pixel.getPixel(130)}}>
                                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),lineHeight:Pixel.getPixel(17)}}>可用余额(元)</Text>
                                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(22),lineHeight:Pixel.getPixel(26),fontWeight: 'bold'}}>{this.state.accountData.balance}</Text>
                                        </View>
                                        <View style={{width:Pixel.getPixel(1),height:Pixel.getPixel(20),backgroundColor:'#ffffff'}}/>
                                        <View style={{flexDirection:'column',alignItems:'center',width:Pixel.getPixel(130)}}>
                                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),lineHeight:Pixel.getPixel(17)}}>冻结余额(元)</Text>
                                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(22),lineHeight:Pixel.getPixel(26),fontWeight: 'bold'}}>{this.state.accountData.frozen_balance}</Text>
                                        </View>
                                    </View>
                                </Image>
                                <ScrollView  style={{paddingBottom:Pixel.getPixel(44)}}
                                             refreshControl={
                                                 <RefreshControl
                                                     refreshing={this.state.isRefreshing}
                                                     onRefresh={()=>{ this.refreshData()}}
                                                     tintColor={[fontAndColor.COLORB0]}
                                                     colors={[fontAndColor.COLORB0]}
                                                 />
                                             }>
                                    <View style={{width:width,height:Pixel.getPixel(36),justifyContent:'center'}}>
                                        <Text style={{color:fontAndColor.COLORA1,fontSize:Pixel.getFontPixel(12),marginLeft:Pixel.getPixel(15)}} allowFontScaling={false}>账户功能</Text>
                                    </View>
                                    <View style={{backgroundColor:'#ffffff',width:width}}>
                                        <CellItem imageData={require('../../../../../images/mine/guangfa_account/yinghangka.png')} title="银行卡" isShowBottomLin={true} click={()=>{this.bankList()}}/>
                                        {
                                            this.state.accountData.account_open_type==1&&(
                                                    <CellItem imageData={require('../../../../../images/mine/guangfa_account/jianquan.png')} title="小额鉴权" isShowBottomLin={true} click={()=>{this.small()}}/>
                                            )
                                        }

                                        <CellItem imageData={require('../../../../../images/mine/guangfa_account/jiaoyimingxi.png')} title="交易明细查询" isShowBottomLin={false} click={()=>{this.priceDetailAction()}}/>
                                    </View>
                                    <View style={{backgroundColor:'#ffffff',width:width,marginTop:Pixel.getPixel(10)}}>
                                        {
                                            this.state.accountData.account_open_type==2 &&  <CellItem imageData={require('../../../../../images/mine/guangfa_account/shoujihao.png')} title="修改预留手机号" isShowBottomLin={true} click={()=>{this.editerPhone()}}/>
                                        }
                                        <CellItem imageData={require('../../../../../images/mine/guangfa_account/chongzhimima.png')} title="重置密码" isShowBottomLin={true} click={()=>{this.setPasswordAction()}}/>
                                    </View>
                                    {
                                        this.state.accountData.account_open_type==1 && (
                                            <View style={{backgroundColor:'#ffffff',width:width,marginTop:Pixel.getPixel(10)}}>
                                                <CellItem imageData={require('../../../../../images/mine/guangfa_account/shehzi.png')} title="账户设置" isShowBottomLin={true} click={()=>{this.accountSetting()}}/>
                                            </View>
                                        )
                                    }

                                </ScrollView>
                                <View style={{left:0,right:0,height:Pixel.getPixel(44),flexDirection:'row',bottom:Pixel.getBottomPixel(0),position: 'absolute'}}>
                                    <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',alignItems:'center',justifyContent:'center'}}
                                                      onPress={this.withdrawAction}>
                                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(15)}}>提现</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',marginLeft:Pixel.getPixel(1),alignItems:'center',justifyContent:'center'}}
                                                      onPress={this.payAction}>
                                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(15)}}>充值</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )

                }

                <NavigationView backIconClick={this.backPage} title='账户管理'
                                wrapStyle={{backgroundColor: this.state.accountData.cancel_status==1?'white':'transparent'}} titleStyle={{color: this.state.accountData.cancel_status==1?fontAndColor.COLORA0:'#ffffff'}}/>


            </View>
        );
    }

    //账户设置
    accountSetting = ()=>{
        this.toNextPage({
            name:'AccountSettingScene',
            component:AccountSettingScene,
            params:{
                 account:this.state.accountData
            }});
    }
    // 银行卡列表
    bankList=()=>{
        this.toNextPage({
            name:'BankcardScene',
            component:BankcardScene,
            params:{
                account:this.state.accountData
            }});
    }

    //小额鉴权
    small = () =>{
        this.toNextPage({
            name:'AuthenticatePublicScene',
            component:AuthenticatePublicScene,
            params:{

            }});
    }
    //修改预留手机号
    editerPhone = ()=>{
        this.toNextPage({
            name:'AlertPhoneNumberScene',
            component:AlertPhoneNumberScene,
            params:{

            }});
    }



    // 充值
    payAction=()=>{
        this.toNextPage({
            name:'GFRechargeScene',
            component:GFRechargeScene,
            params:{

            }});
    }

    // 提现
    withdrawAction=()=>{
        this.toNextPage({
            name:'WithdrawDepositScene',
            component:WithdrawDepositScene,
            params:{
                account:this.state.accountData,
            }});
    }
    //修改密码
    setPasswordAction=()=>{
        this.props.showModal(true);
        request(Urls.GF_REST_PASSWORD, 'Post', {
            enter_base_id:global.companyBaseID,
            reback_url:'restPassword'

        })
            .then((response)=> {
                this.props.showModal(false);
                let da = response.mjson;
                if(response.mjson.code==1){
                    this.toNextPage({
                        name:'GFBankWebScene',
                        component:GFBankWebScene,
                        params:{
                            callback:()=>{this.props.callback()},
                            uri:da.data.url_wap,
                            pa:da.data.params,
                            sign:da.data.sign,
                            serial_no:da.data.serial_no,
                            reback_url:'restPassword',
                        }});
                }else {
                    this.props.showToast(response.mjson.msg);

                }

            },(error)=>{
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
            });
    }

    //流水查询
    priceDetailAction=()=>{
        this.toNextPage({
            name:'Log',
            component:Log,
            params:{
                account: this.state.accountData,
                bankID:'gfyh'
            }});
    }


    // 销户
    cancelAccountAction=()=>{
        this.props.showModal(true);
        request(Urls.GF_CANCEL_ACCOUNT, 'Post', {
            enter_base_id:global.companyBaseID,
            reback_url:'cancelAccount'

        })
            .then((response)=> {
                this.props.showModal(false);
                let da = response.mjson;

                if(response.mjson.code==1){
                    this.toNextPage({
                        name:'GFBankWebScene',
                        component:GFBankWebScene,
                        params:{
                            callback:()=>{this.props.callback()},
                            uri:da.data.url_wap,
                            pa:da.data.params,
                            sign:da.data.sign,
                            serial_no:da.data.serial_no,
                            reback_url:'cancelAccount',
                        }});
                }else {
                    this.props.showToast(response.mjson.msg);
                }

                },(error)=>{
                    this.props.showModal(false);
                    this.props.showToast(error.mjson.msg);
                });

    }

    backPage=()=>{
        // DeviceEventEmitter.emit('myAccountSceneLoadData');
        this.backToRoute('MyAccountScene');
    }

}

class CellItem extends  Component{

    render(){
        let {imageData,title,click,isShowBottomLin} = this.props;
        return(
            <View>
                <TouchableOpacity style={{
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    height:Pixel.getPixel(43),
                    width:width,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'}} onPress={()=>{click && click(title)}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={imageData}/>
                        <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>{title}</Text>
                    </View>
                    <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>

                </TouchableOpacity>
                {
                    isShowBottomLin && <View style={{height:Pixel.getPixel(1),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3}}/>
                }
            </View>
        )
    }

}