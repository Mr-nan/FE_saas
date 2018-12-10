import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class SeperateLine extends Component{

    render(){
        return(
            <View
                style={{backgroundColor:'#D8D8D8', width:width-Pixel.getPixel(30), marginHorizontal:Pixel.getPixel(15), height:StyleSheet.hairlineWidth}}
            />
        )

    }


}