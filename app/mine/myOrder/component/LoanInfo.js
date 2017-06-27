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
const Pixel = new PixelUtil();


export default class LoanInfo extends BaseComponent {

    constructor(props) {
        super(props);
        this.transactionAmount = this.props.transactionAmount;
        this.state = {
            applyLoanAmount: this.props.applyLoanAmount,
            loanCode: this.props.loanCode,
            maxLoanmny: this.props.maxLoanmny,
            feeMny: '0.00',
            obdMny: '0.00',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({amount: nextProps.amount, deposit: nextProps.amount / 10});

    }

    render() {
        return (
            <View style={styles.itemType5}>
                <TouchableOpacity
                    style={{height: Pixel.getPixel(40)}}
                    onPress={() => {
                        // 跳转金融页面  借款详情
                        //this.props.showToast('rowData === 7');
                    }}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>贷款信息</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORA2}}>借款单号：</Text>
                        <Text
                            style={{color: fontAndColor.COLORA2}}>{this.state.loanCode ? this.state.loanCode : '未生成借款单号'}</Text>
                        <Image
                            style={styles.backIcon}
                            source={require('../../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.separatedLine}/>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: Pixel.getPixel(15),
                    marginTop: Pixel.getPixel(20),
                    marginRight: Pixel.getPixel(15)
                }}>
                    <Text style={styles.orderInfo}>最大可贷额度</Text>
                    <View style={{flex: 1}}/>
                    <Text
                        style={styles.infoContent}>{this.state.maxLoanmny ? this.state.maxLoanmny : '0.00'}元</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'CheckLoanAmountScene',
                            component: CheckLoanAmountScene,
                            params: {
                                amount: this.state.applyLoanAmount,
                                updateAmount: this.updateAmount,
                                companyId: this.props.companyId,
                                orderId: this.props.orderId,
                            }
                        });
                    }}>
                    <View style={styles.inputBorder}>
                        <Text style={styles.inputStyle}>{this.state.applyLoanAmount}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{marginRight: Pixel.getPixel(10)}}>元</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.infoItem}>
                    <Text style={styles.orderInfo}>需支付服务费</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.infoContent}>100000元</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.orderInfo}>需支付OBD使用费</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.infoContent}>100000元</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.orderInfo}>应付首付款</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.infoContent}>100000元</Text>
                </View>
            </View>
        )
    }


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
        height: Pixel.getPixel(240)
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
        marginTop: Pixel.getPixel(13),
        flexDirection: 'row',
        borderColor: fontAndColor.COLORB0,
        borderWidth: Pixel.getPixel(1),
        borderRadius: Pixel.getPixel(2)
    },
    inputStyle: {
        flex: 1,
        marginLeft: Pixel.getPixel(10),
        textAlign: 'left',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2
    }
});