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


export default class AccountSettingScene extends BaseComponent{
    constructor(props) {
        super(props);
        console.log('this.props.account.account_open_type',this.props.account.account_open_type);
        this.state = {
            renderPlaceholderOnly:'blank',
            accountData:{},
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
        };
        request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
            .then((response) => {
                console.log('response',response);
                this.setState({
                    renderPlaceholderOnly: 'success',
                    accountData:response.mjson.data,
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
                    <Text style={{color:'#ffffff',fontSize:Pixel.getFontPixel(26),backgroundColor:'transparent',marginTop:Pixel.getPixel(8),fontWeight: 'bold'}}>{this.state.accountData.account.bank_card_no}</Text>
                </Image>
                {this.props.account.account_open_type == '2' ?
                    (<View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(191),backgroundColor:'#ffffff',borderRadius:Pixel.getPixel(5),marginTop:Pixel.getPixel(-30),
                        shadowColor: '#9DA1B3',shadowOffset: {width:0,height:8},shadowOpacity:0.1,paddingLeft:Pixel.getPixel(15),paddingTop: Pixel.getPixel(26),paddingRight: Pixel.getPixel(16),alignItems:'center'}}>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.account.person_name}
                            leftText = '姓名'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(45),paddingLeft:0}}/>
                        <SubmitComponent title='确认修改' btn={this.backToTop()} warpStyle={{marginTop:Pixel.getPixel(21),marginLeft:0,width:Pixel.getPixel(309)}}/>
                    </View> ) :
                    (<View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(417),backgroundColor:'#ffffff',borderRadius:Pixel.getPixel(5),marginTop:Pixel.getPixel(-30),
                        shadowColor: '#9DA1B3',shadowOffset: {width:0,height:8},shadowOpacity:0.1,paddingLeft:Pixel.getPixel(15),paddingTop: Pixel.getPixel(26),paddingRight: Pixel.getPixel(16),alignItems:'center'}}>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.account.bank_card_name}
                            leftText = '企业名称'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(89),paddingLeft:0}}/>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.account.operate_mobile}
                            leftText = '企业固定电话'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(61),paddingLeft:0}}/>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.account.legal_real_name}
                            leftText = '法人代表姓名'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(61),paddingLeft:0}}/>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.account.legal_cert_no}
                            leftText = '法人代表身份证号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(33),paddingLeft:0}}/>
                        <LoginInputText
                            textPlaceholder={this.state.accountData.account.person_name}
                            leftText = '联系人姓名'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(75),paddingLeft:0}}/>
                        <LoginInputText
                            textPlaceholder={'123'}
                            leftText = '联系人身份证号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(47),paddingLeft:0}}/>
                        <SubmitComponent title='确认修改' btn={this.backToTop} warpStyle={{marginTop:Pixel.getPixel(21),marginLeft:0,width:Pixel.getPixel(309)}}/>
                    </View>)
                }
                <Text style={{color:'#AEAEAE',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),marginTop:Pixel.getPixel(18)}}>仅用于后台查询使用不可用于转账</Text>
            </View>
        )
    }
}