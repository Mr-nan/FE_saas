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
import PriceInput from "./PriceInput";
import DepositInputState from "./DepositInputState";
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";
import * as AppUrls from "../../../constant/appUrls";
import {request} from "../../../utils/RequestUtil";
const Pixel = new PixelUtil();


export default class TransactionPrice extends BaseComponent {

    constructor(props) {
        super(props);
        this.oldAmount = this.props.amount;
        this.state = {
            amount: this.props.amount,
            deposit: this.props.deposit
        }
    }

    /*    isShowFinance = (financeInfo) => {
     this.props.isShowFinance(financeInfo);
     };*/


    componentWillReceiveProps(nextProps) {
        this.setState({amount: nextProps.amount});
    }

    render() {
        return (
            <View style={styles.itemType4}>
                <PriceInput title="成交价(元)" amount={this.state.amount}
                            inputOnBlur={this.checkPrice(this.state.amount, this.state.deposit)}/>
                <View style={styles.separatedLine}/>
                <PriceInput title="应付订金(元)" amount={this.state.deposit}/>
                {/*<View style={styles.separatedLine}/>*/}
                <Image style={{marginTop: Pixel.getPixel(-3)}} source={require('../../../../images/transact/line.png')}/>
                <DepositInputState depositInputState="请输入成交价"/>
            </View>
        )
    }

    /**
     *  更新订单详情页面成交价
     **/
    updateTransactionPrice = (newPrice) => {

    };

    /**
     *   成交价本地检查
     **/
    localCheckPrice = (price) => {

    };

    /**
     *  定价检查接口
     **/
    checkPrice = (price, deposit) => {
        if (this.oldAmount != price) {
            this.oldAmount = price;
            this.props.showModal(true);
            StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
                if (data.code == 1 && data.result != null) {
                    let datas = JSON.parse(data.result);
                    let maps = {
                        company_id: datas.company_base_id,
                        car_id: this.props.carId,
                        order_id: this.props.orderId,
                        pricing_amount: price,
                        deposit_amount: deposit
                    };
                    let url = AppUrls.ORDER_CHECK_PRICE;
                    request(url, 'post', maps).then((response) => {
                        if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                            this.props.showModal(false);
                            this.props.isShowFinance(response.mjson.data);
                        } else {
                            this.props.showToast(response.mjson.msg);
                        }
                    }, (error) => {
                        this.props.showToast(error.mjson.msg);
                    });
                } else {
                    this.props.showToast('车辆定价检查失败');
                }
            });
        }
    };

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
        height: 0.5,
        backgroundColor: fontAndColor.COLORA4
    },
    itemType4: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(133)
    }
});