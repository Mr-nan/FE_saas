/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import TopBottomText from './TopBottomText';

export default class LogisCarInfoCenterItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    /*

         {
        "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
        "car_price": "130000.00",
        "tms_vin": "",
        "total_amount": "1976.00",
        "tax_amount": "0.00",
        "insure_amount": "0.00",
        "check_amount": "0.00",
        "freight_amount": "1587.00",
        "service_amount": "150.00",
        "tostore_amount": "239.00",
        "Logistics_info": [{
            "nodeDesc": "下单",
            "nodeTime": "2018-05-13 11:26:00",
            "nodeMsg": "备注信息"
        }, {
            "nodeDesc": "到达：辽宁省沈阳市",
            "nodeTime": "2018-05-13 11:26:00",
            "nodeMsg": "备注信息"
        }]
    }

    */

    render() {
        return (
            <View style={{
                width: width, backgroundColor: '#fff',
                paddingHorizontal: Pixel.getPixel(15)
            }}>
                <View style={{
                    width: width - Pixel.getPixel(30), backgroundColor: '#D8D8D8',
                    height: 1
                }}></View>
                <View style={{
                    width: width - Pixel.getPixel(30),
                    flexDirection: 'row',
                    marginBottom:Pixel.getPixel(15)
                }}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <TopBottomText name={'运费'} money={this.props.data.freight_amount}
                                       marginTop={Pixel.getPixel(18)}/>
                        <TopBottomText name={'提验车费'} money={this.props.data.check_amount}
                                       marginTop={Pixel.getPixel(23)}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TopBottomText name={'保险费'} money={this.props.data.insure_amount}
                                       marginTop={Pixel.getPixel(18)}/>
                        <TopBottomText name={'送店费'} money={this.props.data.tostore_amount}
                                       marginTop={Pixel.getPixel(23)}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <TopBottomText name={'服务费'} money={this.props.data.service_amount}
                                       marginTop={Pixel.getPixel(18)}/>
                    </View>
                </View>
                <View style={{
                    width: width - Pixel.getPixel(30), backgroundColor: '#D8D8D8',
                    height: 1
                }}></View>
                <View style={{
                    width: width - Pixel.getPixel(30), height: Pixel.getPixel(39),
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: '#333333',
                        fontSize: Pixel.getPixel(15)
                    }}>单车运费总价：
                        <Text style={{color: '#FA5741'}}>
                            {this.props.data.total_amount}元</Text></Text>
                </View>
            </View>
        );
    }


}
