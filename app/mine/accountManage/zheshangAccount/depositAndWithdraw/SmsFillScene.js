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

export default class SmsFillScene extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(

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
                    marginBottom: 250,
                    height: 280,
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
                            onPress = {()=>{
                                this.props.closeCallBack()
                            }}
                        >
                            <Image style={{marginLeft: 15,}}
                                   source={require('../../../../../images/account/close.png')}/>
                        </TouchableOpacity>

                        <SText
                            style={{marginRight: 27, flex: 1, textAlign: 'center', fontSize: 16}}>请输入短信验证码</SText>
                    </View>

                    <SText style={{fontSize: 13, marginTop: 15,}}>订单号：{this.props.orderId}</SText>
                    <SText style={{fontSize: 26, marginTop: 15,}}>￥{this.props.money}</SText>
                    <SendMmsCountDown
                        parentStyle={{borderWidth: 0, marginTop: 15}}
                        childStyle={{color: FontAndColor.COLORB4}}
                        pressParentStyle={{borderWidth: 0, marginTop: 15}}
                        ref="sendMms"
                        callBackSms={this.callBackSms}/>


                    <CubeTextInput
                        style = {{marginTop:15}}
                        count={6}
                        onChangeText={(value) => {
                            console.log(value)
                        }}
                    />

                    <SText style={{color: FontAndColor.COLORA1, fontSize: 14, marginTop:20}}>支付方式：工商银行</SText>

                </View>
            </View>

        )
    }

}