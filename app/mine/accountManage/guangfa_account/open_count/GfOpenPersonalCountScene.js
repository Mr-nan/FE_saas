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
    TouchableOpacity

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

import BaseComponent from "../../../../component/BaseComponent";
import NavigationView from '../../../../component/AllNavigationView';
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from '../component/SubmitComponent';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import GFBankWebScene from "./GFBankWebScene";
import SelectBankScene from "../../SelectBankScene";
import IndexAccountmanageScene from "../count_detail/IndexAccountmanageScene";
import  AllLoading from '../../../../component/AllLoading';


export default class GfOpenPersonalCountScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            bankName:'请选择银行',
        }
        this.sData = {
            bank_card_no:'',
            bank_name:'',
            bank_no:'',
            cert_no:'',
            cust_name:'',
            customer_type:'B',
            enter_base_id:'',
            mobile:'',
            reback_url:'123456',
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
    _renderPlaceholderView = () => {
        return(
            <View style={{width:width,height:height,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title={this.props.title}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>
                {this.loadView()}
            </View>
            )

    }
    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
           return this._renderPlaceholderView()
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title={this.props.title}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>
                <View style={styles.inputTextsStyleView}>
                    <LoginInputText
                        ref = 'name'
                        textPlaceholder={'请输入姓名'}
                        leftText = '姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}/>
                    <LoginInputText
                        ref='code'
                        textPlaceholder={'请输入身份证号'}
                        leftText = '身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={18}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>
                    <LoginInputText
                        ref = 'phone'
                        textPlaceholder={'请输入手机号码'}
                        leftText = '手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={11}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(42),paddingLeft:0}}/>
                    <LoginInputText
                        ref='bank_count'
                        textPlaceholder={'请输入银行卡号'}
                        leftText = '银行卡号'
                        maxLength={19}
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>
                    <TouchableOpacity ref='bank_type' onPress={()=>{this.next()}} style={{flexDirection: 'row',flex:1,alignItems:'center',width:Pixel.getPixel(345)}}>
                        <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),justifyContent: 'flex-start'}}>银行</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight: Pixel.getPixel(15),width:Pixel.getPixel(316)}}>
                            <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:'#AEAEAE',marginRight:Pixel.getPixel(20)}}>{this.state.bankName}</Text>
                            <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop: Pixel.getPixel(21),alignItems:'flex-end' }}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                    <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>请确认信息的准确性，开户时间为7*24小时 </Text>
                </View>
                <SubmitComponent btn ={()=>{this.submit();}}
                                 title={this.props.btnText}
                                 warpStyle={{marginTop:Pixel.getPixel(30)}}/>
                <AllLoading callEsc={()=>{}} ref="allloading" callBack={()=>{
                    this.sData.enter_base_id = global.companyBaseID;
                    this.sendData(this.sData);
                }}/>
            </View>

        );
    }

    next = () =>{
        this.toNextPage({
            name:'SelectBankScene',
            component:SelectBankScene,
            params:{getBankData:(data)=>{
                    this.sData.bank_name = data.bankName;
                    this.sData.bank_no = data.bankNo;
                    this.setState({
                        bankName:data.bankName
                    })
                }}

        })
    }
    submit = () => {
        this.sData.cust_name = this.refs.name.getInputTextValue();
        this.sData.cert_no = this.refs.code.getInputTextValue();
        this.sData.mobile = this.refs.phone.getInputTextValue();
        this.sData.bank_card_no  = this.refs.bank_count.getInputTextValue();
        if(this.sData.cust_name == ''){
            this.props.showToast('请输入姓名');
            return;
        }else if(this.sData.cert_no.length != 18){
            this.props.showToast('请输入正确的身份证号');
            return;
        }else if(this.sData.mobile.length != 11){
            this.props.showToast('请输入正确的手机号码');
            return;
        }else if(isNaN(Number(this.sData.bank_card_no))|| this.sData.bank_card_no.length < 17 || this.sData.bank_card_no == ''){
            this.props.showToast('请输入正确的银行卡号');
            return;
        }else if(this.sData.bank_name == '' ){
            this.props.showToast('请选择银行');
            return;
        }
        this.refs.allloading.changeShowType(true,'请确认开户信息\n提交后暂不支持修改');



    }

    sendData = (data) =>{
        this.props.showModal(true);
        request(Urls.USER_OPEN_GUANGFA_ACCOUNT_PERSONAL, 'Post', data)
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
                            isShowWarn:true,
                            reback_url:this.sData.reback_url,
                            serial_no:da.data.serial_no,
                            toNextPageData:{
                                name:'IndexAccountmanageScene',
                                component:IndexAccountmanageScene,
                                params:{}}
                        }});
                }else {
                    this.props.showToast(response.mjson.msg);
                }

                },(error)=>{
                    this.props.showToast(error.mjson.msg);
                });
    }

}

const styles = StyleSheet.create({
    inputTextsStyleView: {
        width:width,
        height:Pixel.getPixel(224),
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getTitlePixel(79)
    },

})