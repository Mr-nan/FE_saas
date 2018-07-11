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
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class BankTextItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,backgroundColor:'#00000000',paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15)}}>
                <Text style={{fontSize:Pixel.getPixel(12),color:'#999',marginTop:Pixel.getPixel(20),marginBottom:Pixel.getPixel(33)}}>
                    付款即表示您已同意 <Text style={{fontSize:Pixel.getPixel(12),color:'#91A2B6'}}>
                    《机动车车辆买卖合同协议》
                </Text>
                </Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})