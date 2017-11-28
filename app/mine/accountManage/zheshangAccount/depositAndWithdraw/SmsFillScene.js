/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,

} from "react-native";

import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import SendMmsCountDown from "../../../../login/component/SendMmsCountDown";
import SText from '../component/SaasText'
import CubeTextInput from '../component/CubeTextInput'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Platform = require('Platform');
const IS_ANDROID = Platform.OS === 'android';

let sms_no = ''
let did_send_sms = false;

export default class SmsFillScene extends Component {
    constructor(props) {
        super(props)

    }

    componentWillUnmount() {
        did_send_sms = false;
        sms_no = false;
    }

    render() {
        return (

            <View style={{
                alignItems: 'center',
                width: width,
                height: height,
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,.4)'
            }}>
                <View style={{flex: 1}}/>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 4,
                    marginBottom: 270,
                    height: 250,
                    width: 260,

                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 45,
                        borderBottomColor: FontAndColor.COLORA4,
                        borderBottomWidth: StyleSheet.hairlineWidth,

                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.closeCallBack()
                            }}
                        >
                            <Image style={{marginLeft: 15,}}
                                   source={require('../../../../../images/account/close.png')}/>
                        </TouchableOpacity>

                        <SText
                            style={{marginRight: 27, flex: 1, textAlign: 'center', fontSize: 16}}>请输入短信验证码</SText>
                    </View>

                    {/*/!*<SText style={{fontSize: 13, marginTop: 15,}}>订单号：{this.props.orderId}</SText>*!/  订单号取消*/}
                    <SText style={{fontSize: 26, marginTop: 15,}}>￥{this.props.money}</SText>
                    <SendMmsCountDown
                        parentStyle={{borderWidth: 0, marginTop: 15}}
                        childStyle={{color: FontAndColor.COLORB4}}
                        pressParentStyle={{borderWidth: 0, marginTop: 15}}
                        ref="sendMms"
                        callBackSms={this.callBackSms}/>
                    <CubeTextInput
                        style={{marginTop: 15}}
                        count={6}
                        onChangeText={(value) => {

                            if(!did_send_sms){
                                this.props.showToast('请先发送验证码')
                            }

                            if(value.length === 6){
                                if(!did_send_sms){
                                    return;
                                }
                                this.props.codeCallBack(value, sms_no)
                            }
                        }}
                    />

                    <SText style={{
                        color: FontAndColor.COLORA1,
                        fontSize: 14,
                        marginTop: 20
                    }}>支付方式：{this.props.account.bank_name}</SText>

                </View>
            </View>

        )
    }


    callBackSms = () => {

        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1) {
                let result = JSON.parse(data.result)
                let params = {
                    amount: parseFloat(this.props.money),
                    enter_base_id: result.company_base_id,
                    from_bank_id:this.props.account.bind_bank_card_no,
                    mobile_no:this.props.account.mobile_no,
                    sub_acct_no:this.props.account.bank_card_no,
                    type:1
            }

            request(AppUrls.ZS_SEND_SMS_CODE, 'POST', params).then((response)=>{

                sms_no = response.mjson.data.sms_no;
                this.refs.sendMms.StartCountDown()
                did_send_sms = true;

            }, (error)=>{
                this.props.showToast('发送验证码失败')

            })}
        })
    }

}