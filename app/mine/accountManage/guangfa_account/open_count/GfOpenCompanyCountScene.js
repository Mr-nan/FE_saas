/*
* created by marongting on 2018/10/18
*
* */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
import NavigationView from "../../../../component/AllNavigationView";
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from "../component/SubmitComponent";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import GFBankWebScene from './GFBankWebScene';
import SelectBankScene from "../../SelectBankScene";
import SmallAmountofPawerScene from "../count_detail/SmallAmountofPawerScene";
import  AllLoading from '../../../../component/AllLoading';

const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class GfOpenCompanyCountScene extends BaseComponent{

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            topSize:-179,
            bankName:'请选择银行',

        }

        this.sData={
            agent_cert_no:'',
            agent_mobile:'',
            agent_name:'',
            bank_card_no:'',
            bank_name:'',
            bank_no:'',
            customer_type:'B',
            ent_name:'',
            ent_phone:'',
            enter_base_id:'',
            legal_cert_no:'',
            legal_real_name:'',
            reback_url:'123456',
            unified_credit_code:'',
            user_id:''
        }
    }

    initFinish(){
        StorageUtil.mGetItem(StorageKeyNames.USER_INFO,(data)=>{
            if(data.code == 1){
                let userData = JSON.parse(data.result);
                this.userID = userData.base_user_id;
            }
        })

        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    renderPlaceholderView = () => {
        return(
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView backIconClick={this.backPage} title={this.props.title}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>
            </View>
            )

    }



    render() {
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this.renderPlaceholderView();
        }
        return (

            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title={this.props.title}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>

                <ScrollView style={{marginTop:Pixel.getPixel(64)}}>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={this.state.topSize}>
                <View style={{marginTop:Pixel.getPixel(15),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        ref = 'cust_name'
                        textPlaceholder={'请输入企业名称'}
                        leftText = '企业名称'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(84),paddingLeft:0}}
                        foucsChange = {()=>{
                            if(this.state.topSize == 5){
                                this.setState({
                                    topSize:-179
                                })
                            }
                        }}/>
                    <LoginInputText
                        ref ='cust_phone'
                        textPlaceholder={'请输入企业固定电话'}
                        leftText = '企业固定电话'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={15}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}
                        foucsChange={() => {
                            if (this.state.topSize == 5) {
                                this.setState({
                                    topSize: -179
                                });
                            }
                        }}/>
                    <LoginInputText
                        ref = 'society_code'
                        textPlaceholder={'请输入社会信用代码'}
                        leftText = '统一社会信用代码'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={18}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}
                        foucsChange={() => {
                            if (this.state.topSize == 5) {
                                this.setState({
                                    topSize: -179
                                });
                            }
                        }}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        ref = 'corporation_name'
                        textPlaceholder={'请输入法人姓名'}
                        leftText = '法人代表姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}
                        foucsChange={() => {
                            if (this.state.topSize == 5) {
                                this.setState({
                                    topSize: -179
                                });
                            }
                        }}/>
                    <LoginInputText
                        ref='corporation_code'
                        textPlaceholder={'请输入法人身份证号'}
                        leftText = '法人代表身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={18}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}
                        foucsChange={() => {
                            if (this.state.topSize == 5) {
                                this.setState({
                                    topSize: -179
                                });
                            }
                        }}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        ref = 'contact_name'
                        textPlaceholder={'请输入联系人姓名'}
                        leftText = '企业联系人姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(42),paddingLeft:0}}
                        foucsChange={() => {
                            if (this.state.topSize == -179) {
                                this.setState({
                                    topSize: 5
                                });
                            }
                        }}/>
                    <LoginInputText
                        ref = 'contact_code'
                        textPlaceholder={'请输入联系人身份证号'}
                        leftText = '联系人身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={18}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(43),paddingLeft:0}}/>
                    <LoginInputText
                        ref='contact_phone'
                        textPlaceholder={'请输入联系人手机号'}
                        leftText = '联系人手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={11}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}
                        foucsChange={() => {
                            if (this.state.topSize == -179) {
                                this.setState({
                                    topSize: 5
                                });
                            }
                        }}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        ref='bank_account'
                        textPlaceholder={'请输入银行账号'}
                        leftText = '银行账号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={19}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(84),paddingLeft:0
                        }}
                        foucsChange={() => {
                            if (this.state.topSize == -179) {
                                this.setState({
                                    topSize: 5
                                });
                            }
                        }}
                    />
                    <TouchableOpacity ref='bank_type' onPress={()=>{this.next()}} style={{flexDirection: 'row',flex:1,alignItems:'center',width:Pixel.getPixel(345),height:Pixel.getPixel(45)}}>
                        <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),justifyContent: 'flex-start'}}>银行</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight: Pixel.getPixel(15),width:Pixel.getPixel(316)}}>
                            <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:'#AEAEAE',marginRight:Pixel.getPixel(20)}}>{this.state.bankName}</Text>
                            <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop:Pixel.getPixel(19),alignItems:'flex-end' }}>
                        <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                        <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>请确认信息的准确性，开户时间为7*24小时 </Text>
                    </View>
                    <SubmitComponent title={this.props.btnText} btn = {()=>{this.submit();}}/>
                    </KeyboardAvoidingView>
                    <AllLoading callEsc={()=>{}} ref="allloading" callBack={()=>{

                        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT,(data) => {
                            if(data.code == 1 && data.result != null){
                                let datas = JSON.parse(data.result);
                                this.sData.enter_base_id = datas.company_base_id;
                                this.sData.user_id = this.userID;
                                this.sendData(this.sData);
                            }
                        })

                    }}/>
                </ScrollView>
            </View>
        );
    }

    next = () =>{
        this.toNextPage({
            name:'SelectBankScene',
            component:SelectBankScene,
            params:{getBankData:(data)=>{
                 console.log('bankdata',data);
                 this.sData.bank_name = data.bankName;
                 this.sData.bank_no = data.bankNo;
                 this.setState({
                     bankName:data.bankName
                 })
                }}

        })
    }

    submit = () => {
        this.sData.ent_name = this.refs.cust_name.getInputTextValue();
        this.sData.ent_phone = this.refs.cust_phone.getInputTextValue();
        this.sData.unified_credit_code = this.refs.society_code.getInputTextValue();
        this.sData.legal_real_name = this.refs.corporation_name.getInputTextValue();
        this.sData.legal_cert_no = this.refs.corporation_code.getInputTextValue();
        this.sData.agent_name = this.refs.contact_name.getInputTextValue();
        this.sData.agent_cert_no = this.refs.contact_code.getInputTextValue();
        this.sData.agent_mobile = this.refs.contact_phone.getInputTextValue();
        this.sData.bank_card_no = this.refs.bank_account.getInputTextValue();

        if(this.sData.ent_name == ''){
            this.props.showToast('请输入企业名称');
            return;
        }else if(this.sData.ent_phone == '' && this.sData.ent_phone.length <= 15){
            this.props.showToast('请输入企业固定电话');
            return;
        }else if(this.sData.unified_credit_code.length!=18){
            this.props.showToast('请输入正确的社会信用代码');
            return;
        }else if(this.sData.legal_real_name == ''){
            this.props.showToast('请输入法人姓名');
            return;
        }else if(this.sData.legal_cert_no.length!=18){
            this.props.showToast('请输入法人身份证号');
            return;
        }else if(this.sData.agent_name == ''){
            this.props.showToast('请输入联系人姓名');
            return;
        }else if(this.sData.agent_cert_no.length!=18){
            this.props.showToast('请输入联系人身份证');
            return;
        }else if(this.sData.agent_mobile.length != 11){
            this.props.showToast('请输入正确的联系人手机号');
            return;
        }else if(isNaN(Number(this.sData.bank_card_no)) || this.sData.bank_card_no < 16 || this.sData.bank_card_no == ''){
            this.props.showToast('请输入正确的银行账号');
            return;
        }else if(this.sData.bank_name == '' ){
            this.props.showToast('请选择银行');
            return;
        }
        this.refs.allloading.changeShowType(true,'请确认开户信息\n提交后暂不支持修改');


    }

    sendData = (data) => {
        this.props.showModal(true);
        request(Urls.USER_OPEN_GUANGFA_ACCOUNT_COMPANY, 'Post', data)
            .then((response)=> {
                this.props.showModal(false);
                let da = response.mjson;
                this.toNextPage({
                    name:'GFBankWebScene',
                    component:GFBankWebScene,
                    params:{
                        callback:()=>{this.props.callback()},
                            uri:da.data.url_wap,
                            pa:da.data.params,
                            sign:da.data.sign,
                            isShowWarn:true,
                            reback_url:this.sData.reback_url,
                            serial_no:da.data.serial_no,
                            toNextPageData:{
                                name:'SmallAmountofPawerScene',
                                component:SmallAmountofPawerScene,
                                params:{}}
                            }
                })
            },(error)=>{
                this.props.showToast(error.mjson.msg);
            })
    }
}
