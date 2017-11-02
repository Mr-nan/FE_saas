/**
 * Created by dingyonggang on 2017/10/27.
 */

import React, {Component} from "react";
import {
    View,
    Text, Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ScrollView,
    Button
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import SText from '../component/SaasText'
import SmsFillScene from './SmsFillScene'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class DepositScene extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            renderPlaceholderOnly: true,
            sms_pad:false,
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: false,
        })
    }

    render() {

        if (this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'提现'}
                        rightText={""}

                    />
                </View>
            )
        }


        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'提现'}
                    rightText={''}
                    leftImageCallBack={() => {
                        this.backPage();
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator = {false}
                >


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: 15,
                        paddingVertical: 20
                    }}>
                        <Image source={require('../../../../../images/account/zheshang_bank.png')}
                               style={{width: 55, height: 55, marginHorizontal: 15}}/>
                        <View>
                            <SText  style={{fontSize: 17, marginBottom: 10}}>浙商银行账户 王锋</SText>
                            <SText  style={{color: FontAndColor.COLORA1}}>充值限额 100万/笔
                                ,1000万/日</SText>
                        </View>
                    </View>

                    <View style={{backgroundColor: 'white', marginTop: 10}}>
                        <View style={{marginHorizontal: 15,}}>
                            <View style={{
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: FontAndColor.COLORA4
                            }}>
                                <SText style={{marginVertical: 15, fontSize: 15}}>提现金额（元）</SText>
                                <View style={{flexDirection: 'row',}}>
                                    <SText style={{marginRight: 5, marginTop: 5, fontSize: 14}}>￥</SText>
                                    <TextInput
                                        style={{height: 40, fontSize: 35, flex: 1, marginBottom: 15}}
                                        keyboardType={'number-pad'}



                                    />
                                </View>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <View style={{flexDirection: 'row', marginBottom: 5}}>
                                    <SText 
                                          style={{color: FontAndColor.COLORA1}}>浙商银行现金余额:</SText>
                                    <SText >1234567.3元</SText>
                                    <SText
                                        onLongPress = {()=>{
                                            console.log('longpress')
                                        }}
                                        style = {{color:FontAndColor.COLORB4, fontSize:16, textAlign:'right', flex:1}}
                                        onPress = {()=>{
                                          console.log('123456')
                                        }}
                                    >全部提现</SText>

                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <SText  style={{color: FontAndColor.COLORA1}}>可用余额:</SText>
                                    <SText >34524.6元</SText>
                                </View>

                            </View>
                        </View>


                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'确认提现'}
                        parentStyle={styles.next_button_parent}
                        childStyle={{fontSize: 18, color: 'white'}}
                        mOnPress={() => {
                            this.setState({
                                sms_pad:true
                            })
                        }}

                    />

                    <View style={{marginHorizontal: 30, marginVertical: 40}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                            <View style={{height: 1, backgroundColor: FontAndColor.COLORA4, flex: 1, marginRight: 15}}/>
                            <SText  style={{color: FontAndColor.COLORA1}}>温馨提示</SText>
                            <View style={{height: 1, backgroundColor: FontAndColor.COLORA4, flex: 1, marginLeft: 15}}/>
                        </View>
                        <SText style={{color: FontAndColor.COLORA1, marginBottom: 5, lineHeight: 20}}>1
                            浙商银行及其它银行1000万以内的提现，实时到账，五分钟。</SText>

                        <SText  style={{color: FontAndColor.COLORA1, lineHeight: 20}}>2
                            企业用户及其它个人用户提现大于1000万以上的，工作日走大小额，资金0.5-2小时即可到达。</SText>
                        <SText  style={{color: FontAndColor.COLORA1, lineHeight: 20}}>2
                            企业用户及其它个人用户提现大于1000万以上的。</SText>

                    </View>

                </ScrollView>


                {this.state.sms_pad?
                    <SmsFillScene
                        orderId = {'12345698765432'}
                        money = {134241}
                        type = {1}
                        closeCallBack = {()=>{
                            this.setState({
                                sms_pad:false
                            })
                        }}

                    />
                    :null
                }
            </View>

        )
    }
}
const styles = StyleSheet.create({
    deposit_container_selected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: FontAndColor.COLORB0,
        borderBottomWidth: 1,
        height: 50
    },
    deposit_container_deselected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: FontAndColor.COLORA4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50
    },

    deposit_title_selected: {
        color: FontAndColor.COLORB0,
        fontSize: 16,
    },
    deposit_title_deselected: {
        color: 'black',
        fontSize: 16,
    },
    next_button_parent: {
        backgroundColor: FontAndColor.COLORB0,
        marginTop: 50,
        height: 50,
        width: width - 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        borderRadius: 3,
    }
})