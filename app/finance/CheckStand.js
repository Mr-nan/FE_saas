/**
 * Created by hanmeng on 2017/5/13.
 * 收银台
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from 'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../component/BaseComponent";
import NavigatorView from '../component/AllNavigationView';
import * as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
import MyButton from "../component/MyButton";
import ExplainModal from "../mine/myOrder/component/ExplainModal";
const Pixel = new PixelUtil();

export default class CheckStand extends BaseComponent {

    render() {
        return (
            <View style={styles.container}>
                <NavigatorView title='收银台' backIconClick={this.backPage}/>
                <View style={styles.tradingCountdown}>
                    <Text style={{marginRight: Pixel.getPixel(15), marginLeft: Pixel.getPixel(15)}}>
                        <Text style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORB2,
                            fontWeight: 'bold'
                        }}>重要提示：</Text>
                        <Text style={{
                            lineHeight: Pixel.getPixel(20),
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORB2
                        }}>您申请的订单融资贷款已到账，请向卖家支付，支付后卖家可提现到账资金。</Text>
                    </Text>
                </View>
                <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>
                <View style={{backgroundColor: 'white'}}>
                    <View style={styles.needPayBar}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            marginTop: Pixel.getPixel(25)
                        }}>需支付金额</Text>
                        <Text style={{
                            marginTop: Pixel.getPixel(6),
                            //fontWeight: 'bold',
                            fontSize: Pixel.getFontPixel(38)
                        }}>13000元</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={styles.accountBar}>
                        <Text style={styles.title}>账户：</Text>
                        <Text style={styles.content}>123131313131</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={styles.accountBar}>
                        <Text style={styles.title}>账户可用金额：</Text>
                        <Text style={styles.content}>150000元</Text>
                        <View style={{flex: 1}}/>
                        <View style={{
                            height: Pixel.getPixel(27),
                            width: Pixel.getPixel(70),
                            borderRadius: Pixel.getPixel(2),
                            borderWidth: Pixel.getPixel(1),
                            borderColor: fontAndColor.COLORB0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: Pixel.getPixel(15)
                        }}>
                            <Text style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                color: fontAndColor.COLORB0
                            }}>充值</Text>
                        </View>
                    </View>
                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'账户支付'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this.goPay}/>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    //marginTop: Pixel.getPixel(35)
                }}>
                    <View style={{
                        marginRight: Pixel.getPixel(15),
                        marginLeft: Pixel.getPixel(15),
                        backgroundColor: fontAndColor.COLORA1,
                        height: 1,
                        flex: 1
                    }}/>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        color: fontAndColor.COLORA1
                    }}>可选融资方案</Text>
                    <View style={{
                        marginRight: Pixel.getPixel(15),
                        marginLeft: Pixel.getPixel(15),
                        backgroundColor: fontAndColor.COLORA1,
                        height: 1,
                        flex: 1
                    }}/>
                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'订单融资'}
                          parentStyle={styles.loginBtnStyle1}
                          childStyle={styles.loginButtonTextStyle}/>
                <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(21), marginLeft: Pixel.getPixel(15)}}>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        color: fontAndColor.COLORA1
                    }}>授信可用额度：</Text>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                    }}>200万</Text>
                </View>
                <Text style={{
                    marginLeft: Pixel.getPixel(15),
                    fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                    color: fontAndColor.COLORA1,
                    marginTop: Pixel.getPixel(10)
                }}>申请订单融资额度请联系客服</Text>

                <ExplainModal ref='expModal' title='提示' buttonStyle={styles.expButton} textStyle={styles.expText}
                              text='确定' content='您的余额不足请充值'/>
            </View>
        )
    }

    goPay = () => {
        this.refs.expModal.changeShowType(true);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3
    },
    needPayBar: {
        alignItems: 'center',
        height: Pixel.getPixel(110),
        backgroundColor: 'white'
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    accountBar: {
        flexDirection: 'row',
        height: Pixel.getPixel(43),
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1
    },
    content: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: fontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: fontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT)
    },
    loginBtnStyle1: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: fontAndColor.COLORB1,
        marginTop: Pixel.getPixel(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    expButton: {
        marginBottom: Pixel.getPixel(20),
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        marginTop: Pixel.getPixel(32),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        backgroundColor: fontAndColor.COLORB0,
        borderColor: fontAndColor.COLORB0
    },
    expText: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
    },
    tradingCountdown: {
        marginTop: Pixel.getTitlePixel(65),
        flexDirection: 'row',
        alignItems: 'center',
        height: Pixel.getPixel(70),
        backgroundColor: fontAndColor.COLORB6
    }
});