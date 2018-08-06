/**
 * Created by hanmeng on 2017/5/18.
 */
import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import InputAmountScene from "../InputAmountScene";
import BaseComponent from "../../../component/BaseComponent";
import CheckLoanAmountScene from "../CheckLoanAmountScene";
import DDDetailScene from "../../../finance/lend/DDDetailScene";
import CheckLoanAmountOneScene from "../CheckLoanAmountOneScene";
const Pixel = new PixelUtil();


export default class LoanInfo extends BaseComponent {

    constructor(props) {
        super(props);
        this.balanceAmount = this.props.balanceAmount;
        //this.financeInfo = this.props.financeInfo;
        this.state = {
            applyLoanAmount: this.props.applyLoanAmount,
            financeInfo: this.props.financeInfo
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            applyLoanAmount: nextProps.applyLoanAmount,
            financeInfo: nextProps.financeInfo
        });
    }

    render() {
        return (
            <View style={styles.itemType5}>
                <TouchableOpacity
                    style={{height: Pixel.getPixel(40)}}
                    onPress={() => {
                        // 跳转金融页面  借款详情
                        this.toNextPage({
                            name: 'DDDetailScene',
                            component: DDDetailScene,
                            params: {
                                financeNo: this.state.financeInfo.loan_code,
                                orderNo: this.props.orderNo,
                                backRefresh: this.props.refresh

                            }
                        });
                    }}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text allowFontScaling={false} style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>贷款信息</Text>
                        <View style={{flex: 1}}/>
                        <Text allowFontScaling={false} style={{color: fontAndColor.COLORA2}}>借款单号：</Text>
                        <Text allowFontScaling={false}
                              style={{color: fontAndColor.COLORA2}}>{this.state.financeInfo.loan_code ? this.state.financeInfo.loan_code : '未生成借款单号'}</Text>
                        <Image
                            style={styles.backIcon}
                            source={require('../../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.separatedLine}/>
                {/*<View style={{*/}
                    {/*alignItems: 'center',*/}
                    {/*flexDirection: 'row',*/}
                    {/*marginLeft: Pixel.getPixel(15),*/}
                    {/*marginTop: Pixel.getPixel(20),*/}
                    {/*marginRight: Pixel.getPixel(15)*/}
                {/*}}>*/}
                    {/*<Text allowFontScaling={false} style={styles.orderInfo}>最大可贷额度</Text>*/}
                    {/*<View style={{flex: 1}}/>*/}
                    {/*<Text allowFontScaling={false}*/}
                          {/*style={styles.infoContent}>{this.state.financeInfo.max_loanmny ? parseFloat(this.state.financeInfo.max_loanmny).toFixed(2) : '0.00'}元</Text>*/}
                {/*</View>*/}
                {/*<View style={{
                 alignItems: 'center',
                 marginLeft: Pixel.getPixel(15),
                 marginRight: Pixel.getPixel(15),
                 height: Pixel.getPixel(40),
                 marginTop: Pixel.getPixel(13),
                 flexDirection: 'row'
                 }}>
                 <Text allowFontScaling={false} style={styles.orderInfo}>申请贷款额度</Text>*/}
                <TouchableOpacity
                    onPress={() => {
                        if(this.state.applyLoanAmount == "待设置借款金额"){
                            this.toNextPage({
                                name: 'CheckLoanAmountOneScene',
                                component: CheckLoanAmountOneScene,
                                params: {
                                    amount: this.state.applyLoanAmount != '待设置借款金额'?this.state.applyLoanAmount:'',
                                    updateAmount: this.updateAmount,
                                    companyId: this.props.companyId,
                                    orderId: this.props.orderId,
                                    financeNo: this.state.financeInfo.loan_code,
                                    maxLoanmny: this.state.financeInfo.max_loanmny,
                                    balanceAmount: this.props.balanceAmount,
                                    refreshLoanInfo: this.refreshLoanInfo
                                }
                            });
                        }
                    }}>
                    <View style={[styles.inputBorder,{}]}>
                        <Text allowFontScaling={false} style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                        }}>借款金额</Text>
                        <View style={{flex: 1}}/>
                        <Text allowFontScaling={false} style={{color: fontAndColor.COLORA2,padding:0}}>{this.state.applyLoanAmount}</Text>
                        {
                            this.state.applyLoanAmount != "待设置借款金额" ?
                                <Text allowFontScaling={false} style={{color: fontAndColor.COLORA2}}>元</Text>:null
                        }
                        {
                            this.state.applyLoanAmount == "待设置借款金额" ?
                                <Image style={{height: Pixel.getPixel(15), width: Pixel.getPixel(15)}}
                                source={require('../../../../images/mainImage/celljiantou.png')}/>: null
                        }

                    </View>
                </TouchableOpacity>
                {/*</View>*/}
                <View style={[styles.infoItem,{marginTop:0}]}>
                    <Text allowFontScaling={false} style={styles.orderInfo}>需支付服务费</Text>
                    <View style={{flex: 1}}/>
                    <Text allowFontScaling={false}
                          style={styles.infoContent}>{this.state.financeInfo.fee_mny ? parseFloat(this.state.financeInfo.fee_mny).toFixed(2) : '0.00'}元</Text>
                </View>
{/*                <View style={styles.infoItem}>
                    <Text allowFontScaling={false} style={styles.orderInfo}>需支付OBD使用费</Text>
                    <View style={{flex: 1}}/>
                    <Text allowFontScaling={false}
                          style={styles.infoContent}>{this.state.financeInfo.obd_mny ? parseFloat(this.state.financeInfo.obd_mny).toFixed(2) : '0.00'}元</Text>
                </View>*/}
                <View style={styles.infoItem}>
                    <Text allowFontScaling={false} style={styles.orderInfo}>需支付监管费</Text>
                    <View style={{flex: 1}}/>
                    <Text allowFontScaling={false}
                          style={styles.infoContent}>{this.state.financeInfo.supervision_fee ? parseFloat(this.state.financeInfo.supervision_fee).toFixed(2) : '0.00'}元</Text>
                </View>
                <View style={[styles.infoItem,{marginBottom:Pixel.getPixel(15)}]}>
                    <Text allowFontScaling={false} style={styles.orderInfo}>应付首付款</Text>
                    <View style={{flex: 1}}/>
                    <Text allowFontScaling={false}
                          style={styles.infoContent}>{parseFloat(this.balanceAmount - (this.state.applyLoanAmount == '待设置借款金额' ?
                        0 : parseFloat(this.state.applyLoanAmount)) +
                        parseFloat(this.state.financeInfo.fee_mny) +
                        parseFloat(this.state.financeInfo.supervision_fee ? parseFloat(this.state.financeInfo.supervision_fee).toFixed(2) : '0.00')).toFixed(2)}元</Text>
                </View>
            </View>
        )
    }

    /**
     * from @hanmeng
     *
     *
     **/
    refreshLoanInfo = (newLoanInfo,credit_record_id,supervision_code) => {
        this.props.refreshLoanInfo(newLoanInfo,credit_record_id,supervision_code);
        //this.props.updateLoanAmount(newLoanInfo.loan_amount);
        newLoanInfo.loan_code = newLoanInfo.finance_no;
        this.setState({
            financeInfo: newLoanInfo
        });
    };

    /**
     * from @hanmeng
     *
     *
     **/
    updateAmount = (newAmount) => {
        this.props.updateLoanAmount(newAmount);
        this.setState({
            applyLoanAmount: newAmount
        });
    }
}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    itemType5: {
        backgroundColor: '#ffffff',
    },
    backIcon: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(12),
        height: Pixel.getPixel(15),
        width: Pixel.getPixel(15)
    },
    orderInfo: {
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    infoContent: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    infoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
        marginRight: Pixel.getPixel(15)
    },
    inputBorder: {
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        backgroundColor:'#F8F8F8'
    },
    inputStyle: {
        flex: 1,
        marginLeft: Pixel.getPixel(10),
        textAlign: 'left',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2
    }
});