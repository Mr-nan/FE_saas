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
    TouchableOpacity,
    Modal

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
import SelectBankScene from "../../SelectBankScene";
import NoAccountScene from "./NoAccountScene";
import SmallAmountBankStatusScene from "./SmallAmountBankStatusScene";
import IndexAccountmanageScene from "./IndexAccountmanageScene";
import GFBankWebScene from "../open_count/GFBankWebScene";

export default class AlertPhoneDeteilScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
        }
        this.SData = {
            bind_bank_card_no_id:this.props.bankCardId,
            new_mobile:'',
            enter_base_id:global.companyBaseID,
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly: 'success',
        });

    }
    _renderPlaceholderView = () => {
        return(
            <View style={{width:width,height:height,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title='修改手机号'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                {this.loadView()}
            </View>
        )

    }
    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
            return this._renderPlaceholderView()
        }
        this.cardNO = this.props.bankCardId && this.props.bankCardId != 0 ? this.props.bankCardId.replace(/^(....).*(....)$/, "$1****$2"):'***** ***** *****';

        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle="default"/>
                <View style={styles.inputTextsStyleView}>
                     <LoginInputText
                            ref = 'name'
                            exitValue={ this.cardNO}
                            leftText = '账号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(135),paddingLeft:0}}/>
                    <LoginInputText
                            ref = 'bankCode'
                            exitValue={this.props.mobile}
                            leftText = '绑定银行卡手机号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(47),paddingLeft:0}}/>
                    <LoginInputText
                        ref='code'
                        exitValue={''}
                        textPlaceholder={'请输入新手机号'}
                        leftText = '新绑定银行卡手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(33),paddingLeft:0}}/>
                </View>
                <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop: Pixel.getPixel(21),alignItems:'flex-end' }}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                    <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>修改的手机号需要和银行预留手机号保持一致</Text>
                </View>
                <SubmitComponent btn = {()=>{this.submit()}} title='提交' warpStyle={{marginTop:Pixel.getPixel(30)}}/>
                <NavigationView backIconClick={this.backPage} title='修改手机号'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>

        );
    }
    submit = () => {
        this.SData.new_mobile = this.refs.code.getInputTextValue();
        if(this.SData.bind_bank_card_no_id == ''){
            this.props.showToast('请输入新密码');
        }
        request(Urls.PERSONAL_CHANGE_PHONE, 'Post', this.SData)
            .then((response)=> {
                this.props.showModal(false);
                let da = response.mjson;
                console.log('da',da);
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
                    }
                })
            },(error)=>{
                this.props.showToast(error.mjson.msg);
            })
    }

}

const styles = StyleSheet.create({
    inputTextsStyleView: {
        width:width,
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getTitlePixel(79)
    }

})