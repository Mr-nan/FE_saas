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
export  default class BankTitleItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image style={{width:width,height:Pixel.getPixel(169),resizeMode:'stretch'}} source={require('../../../../images/neworder/sanjiaobg.png')}>
                <Image style={{width:width-Pixel.getPixel(28),marginLeft:Pixel.getPixel(14),marginTop:Pixel.getPixel(5),
                height:Pixel.getPixel(134)}} source={require('../../../../images/neworder/qianbg.png')}></Image>
            </Image>
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