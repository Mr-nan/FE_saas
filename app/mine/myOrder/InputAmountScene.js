/**
 * Created by hanmeng on 2017/5/13.
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
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";
import ShowToast from "../../component/toast/ShowToast";
const Pixel = new PixelUtil();

export default class InputAmountScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.number = this.props.amount;
/*        this.state = {
            number: this.props.amount
        }*/
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorView title='输入金额' backIconClick={this.backPage} renderRihtFootView={this.renderRihtFootView}/>

                <View style={styles.inputBar}>
                    <TextInput
                        defaultValue={this.number+''}
                        underlineColorAndroid='transparent'
                        onChangeText={this.setNumber}
                        keyboardType='numeric'
                        style={{
                            flex: 1,
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                        }} placeholder='请输入金额'/>
                    <Image
                        style={{marginRight: Pixel.getPixel(15)}}
                        source={require('../../../images/login/clear.png')}/>
                </View>
            </View>
        )
    }

    setNumber = (number) => {
        this.number = number;
/*        this.setState({
            number: number,
        });*/
    }

    isNumberByHundred = (number) => {
        let re = /^[0-9]*[0-9]$/i;
        if (re.test(number) && number % 100 === 0) {
            return true;
        } else {
            return false;
        }
    };

    renderRihtFootView = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.isNumberByHundred(this.number)) {
                        this.props.showModal(true);
                        this.savePrice(this.number);
                    } else {
                        this.props.showToast("请输入整百金额");
                    }
                }}
                activeOpacity={0.9}
            >
                <Text style={{color: '#ffffff'}}>完成</Text>
            </TouchableOpacity>
        )
    }

    savePrice = (price) => {
        let url = AppUrls.ORDER_SAVE_PRICE;
        request(url, 'post', {
            car_id: this.props.carId,
            order_id: this.props.orderId,
            pricing_amount: price
        }).then((response) => {
            this.props.showModal(false);
            this.props.updateAmount(this.number);
            this.backPage();
        }, (error) => {
            //this.props.showModal(false);
            //console.log("成交价提交失败");
            this.props.showToast('成交价提交失败');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    inputBar: {
        alignItems: 'center',
        marginTop: Pixel.getPixel(74),
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(44),
        flexDirection: 'row'
    }
});