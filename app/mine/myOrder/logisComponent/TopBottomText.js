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

export  default class TopBottomText extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
    }

    render() {
        return (
            <View >
                <Text style={{marginTop:Pixel.getPixel(this.props.marginTop),color: '#9B9B9B',
                        fontSize: Pixel.getPixel(14)}}>{this.props.name}</Text>
                <Text style={{marginTop:Pixel.getPixel(10),color: '#000',
                        fontSize: Pixel.getPixel(14)}}>{this.props.money}
                    <Text style={{fontSize: Pixel.getPixel(12)}}>
                        元</Text></Text>
            </View>
        );
    }


}
