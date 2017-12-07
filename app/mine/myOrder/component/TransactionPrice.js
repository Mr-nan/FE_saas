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
import TransactionPriceInput from "./TransactionPriceInput";
const Pixel = new PixelUtil();


export default class TransactionPrice extends BaseComponent {

    constructor(props) {
        super(props);
        let setAmount = this.props.amount;
        this.state = {
            amount: setAmount,
            //deposit: setAmount / 10
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
                <TransactionPriceInput amount={this.state.amount}/>
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
    itemType4: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(151)
    }
});