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
    Dimensions

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from "../component/SubmitComponent";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import IndexAccountmanageScene from "./IndexAccountmanageScene";


export default class AccountSettingScene extends BaseComponent{
    constructor(props) {
        super(props);
        console.log('this.props.account.account_open_type',this.props.account.account_open_type);
        this.state = {
            renderPlaceholderOnly:'blank',

        }
       this.SData = {
            agent_cert_no:'',
            agent_mobile:'',
            agent_name:'',
            customer_type:'B',
            ent_name:'',
            ent_phone:'',
            enter_base_id:global.companyBaseID,
            legal_cert_no:'',
            legal_real_name:'',
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'loading',
        })
        this.loadData();
    }

    loadData = () => {
        let maps = {
            enter_base_ids: global.companyBaseID,
            bank_id:'gfyh',
            child_type:'1'
        };
        request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
            .then((response) => {
                console.log('response',response);
                this.setState({
                    renderPlaceholderOnly: 'success',
                    accountData:response.mjson.data.gfyh[0],
                });
            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
                this.props.showToast(error.mjson.msg);
            });
    }
    render(){
        if(this.state.renderPlaceholderOnly !== 'success'){
           return(
               <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                   <NavigationView backIconClick={this.backPage} title='账户管理'
                                   wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                   {this.loadView()}
               </View>
           )
        }
        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='light-content'/>
                <Image source={require('../../../../../images/mine/guangfa_account/tou-bg.png')} style={{alignItems:'center'}}>
                    <NavigationView backIconClick={this.backPage} title='账户设置'
                                    wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                    <View style={{width:Pixel.getPixel(92),height:Pixel.getPixel(20),backgroundColor:'rgba(0,0,0,0.1)',borderRadius:Pixel.getPixel(13),alignItems:'center',justifyContent: 'center',marginTop: Pixel.getPixel(74)}}>
                        <Text style={{color:'#ffffff',fontSize:Pixel.getFontPixel(14),backgroundColor:'transparent'}}>资金账户ID号</Text>
                    </View>
                    <Text style={{color:'#ffffff',fontSize:Pixel.getFontPixel(26),backgroundColor:'transparent',marginTop:Pixel.getPixel(8),fontWeight: 'bold'}}>{this.state.accountData.bank_card_no}</Text>
                </Image>
                {this.props.account.account_open_type == '2' ?
                    (<View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(191),backgroundColor:'#ffffff',borderRadius:Pixel.getPixel(5),marginTop:Pixel.getPixel(-30),
                        shadowColor: '#9DA1B3',shadowOffset: {width:0,height:8},shadowOpacity:0.1,paddingLeft:Pixel.getPixel(15),paddingTop: Pixel.getPixel(26),paddingRight: Pixel.getPixel(16),alignItems:'center'}}>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.bank_card_name}
                            leftText = '姓名'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(45),paddingLeft:0}}/>
                        <SubmitComponent title='确认修改' warpStyle={{marginTop:Pixel.getPixel(21),marginLeft:0,width:Pixel.getPixel(309)}}/>
                    </View> ) :
                    (<View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(417),backgroundColor:'#ffffff',borderRadius:Pixel.getPixel(5),marginTop:Pixel.getPixel(-30),
                        shadowColor: '#9DA1B3',shadowOffset: {width:0,height:8},shadowOpacity:0.1,paddingLeft:Pixel.getPixel(15),paddingTop: Pixel.getPixel(26),paddingRight: Pixel.getPixel(16),alignItems:'center'}}>
                        <LoginInputText
                            ref = 'companyName'
                            textPlaceholder={this.state.accountData.bank_card_name}
                            leftText = '企业名称'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(89),paddingLeft:0}}/>
                        <LoginInputText
                            ref = 'companyPhone'
                            textPlaceholder={this.state.accountData.enterprise_phone}
                            leftText = '企业固定电话'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(61),paddingLeft:0}}/>
                        <LoginInputText
                            ref = 'corporation_name'
                            textPlaceholder={this.state.accountData.legal_real_name}
                            leftText = '法人代表姓名'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(61),paddingLeft:0}}/>
                        <LoginInputText
                            ref='corporation_code'
                            textPlaceholder={this.state.accountData.legal_cert_no}
                            leftText = '法人代表身份证号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(33),paddingLeft:0}}/>
                        <LoginInputText
                            ref='contact_name'
                            textPlaceholder={this.state.accountData.agent_name}
                            leftText = '联系人姓名'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(75),paddingLeft:0}}/>
                        <LoginInputText
                            ref='contact_code'
                            textPlaceholder={this.state.accountData.agent_cert_no}
                            leftText = '联系人身份证号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(47),paddingLeft:0}}/>
                        <SubmitComponent title='确认修改' btn={()=>{this.nextCompany()}} warpStyle={{marginTop:Pixel.getPixel(21),marginLeft:0,width:Pixel.getPixel(309)}}/>
                    </View>)
                }
                <Text style={{color:'#AEAEAE',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),marginTop:Pixel.getPixel(18)}}>仅用于后台查询使用不可用于转账</Text>
            </View>
        )
    }

    nextCompany = ()=>{
      //  this.SData.agent_cert_no = this.refs.contact_code.getInputTextValue();
        this.SData.agent_cert_no = this.refs.contact_code.getInputTextValue();
       this.SData.agent_mobile = this.state.accountData.person_mobile;
        this.SData.agent_name = this.refs.contact_name.getInputTextValue();
        this.SData.ent_name = this.refs.companyName.getInputTextValue();
        this.SData.ent_phone = this.refs.companyPhone.getInputTextValue();
        this.SData.legal_cert_no = this.refs.corporation_code.getInputTextValue();
        this.SData.legal_real_name = this.refs.corporation_name.getInputTextValue();
        if(this.SData.agent_name == '') {
            this.SData.agent_name = this.state.accountData.agent_name;
        }
        if(this.SData.ent_name == '') {
            this.SData.ent_name = this.state.accountData.bank_card_name;
        }
        if(this.SData.ent_phone == ''){
            this.SData.ent_phone = this.state.accountData.enterprise_phone;
        }
        if(this.SData.legal_cert_no == ''){
            this.SData.legal_cert_no = this.state.accountData.legal_cert_no;
        }
        if(this.SData.legal_real_name == ''){
            this.SData.legal_real_name = this.state.accountData.legal_real_name;
        }
        this.props.showModal(true);
        request(Urls.GF_CHANGE_COMPANY, 'Post', this.SData)
            .then((response)=> {
                this.props.showModal(false);
                let da = response.mjson;
                console.log('da',da);
                this.toNextPage({
                    name:'IndexAccountmanageScene',
                    component:IndexAccountmanageScene,
                    params:{
                    }
                })
            },(error)=>{
                this.props.showToast(error.mjson.msg);
            })

    }

}