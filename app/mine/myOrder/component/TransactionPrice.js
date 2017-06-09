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


export default class TransactionPrice extends BaseComponent {

    constructor(props) {
        super(props);
        let setAmount = this.props.amount;
        this.state = {
            amount: setAmount,
            deposit: setAmount / 10
        }
    }

/*    isShowFinance = (financeInfo) => {
        this.props.isShowFinance(financeInfo);
    };*/

    render() {
        return (
            <View style={styles.itemType4}>
                <Text style={{marginLeft: Pixel.getPixel(15), marginTop: Pixel.getPixel(12)}}>成交价(元)</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{flex: 1, justifyContent: 'center'}}
                    onPress={() => {
                        this.toNextPage({
                            name: 'InputAmountScene',
                            component: InputAmountScene,
                            params: {
                                amount: this.state.amount,
                                updateAmount: this.updateAmount,
                                carId: this.props.carId,
                                orderId: this.props.orderId,
                                isShowFinance: this.props.isShowFinance
                            }
                        });
                    }}>
                    <View style={{
                        alignItems: 'center',
                        marginLeft: Pixel.getPixel(15),
                        flexDirection: 'row'
                    }}>
                        <Image
                            style={{marginTop: Pixel.getPixel(5), marginBottom: Pixel.getPixel(10)}}
                            source={require('../../../../images/mainImage/rmb.png')}/>
                        {/*<Text style={{fontSize: Pixel.getFontPixel(25), marginTop: Pixel.getPixel(5)}}>￥</Text>*/}
                        <Text style={{
                            //height: Pixel.getPixel(38),
                            marginLeft: Pixel.getPixel(5),
                            fontSize: Pixel.getFontPixel(38),
                            color: fontAndColor.COLORA2,
                            textAlign: 'center'
                        }}>{this.state.amount}</Text>
                        <Image
                            style={{
                                marginTop: Pixel.getPixel(5),
                                marginLeft: Pixel.getPixel(5)
                            }}
                            source={require('../../../../images/mainImage/transaction_price.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.separatedLine}/>
                <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT28),
                        marginLeft: Pixel.getPixel(15),
                        color: fontAndColor.COLORA1
                    }}>应付订金：</Text>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT28),
                    }}>{this.state.deposit}元</Text>
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
    itemType4: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(151)
    }
});