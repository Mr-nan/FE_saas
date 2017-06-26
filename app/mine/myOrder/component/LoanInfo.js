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
const Pixel = new PixelUtil();


export default class LoanInfo extends BaseComponent {

    constructor(props) {
        super(props);
        this.transactionAmount = this.props.transactionAmount;
        this.state = {
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
                <View style={styles.inputBorder}>
                    <Text  style={styles.inputStyle}>0</Text>
                    <Text style={{marginRight: Pixel.getPixel(10)}}>元</Text>
                </View>
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
        this.props.updateCarAmount(newAmount);
        this.setState({
            amount: newAmount,
            deposit: newAmount / 10
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
    }
});