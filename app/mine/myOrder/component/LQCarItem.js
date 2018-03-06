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
import LQSelectComponent from './LQSelectComponent';

export  default class LQCarItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.refs.lqselectcomponenttop.setSelectName(props.firstName);
        this.refs.lqselectcomponentbottom.setSelectName(props.lastName);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(108),justifyContent:'center',alignItems:'center',
            backgroundColor:'#fff'}}>
                <LQSelectComponent ref="lqselectcomponenttop" leftName={'车辆新旧'} select={()=>{
                    this.props.selectType();
                }}/>
                <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(1),
                backgroundColor:'#D8D8D8'}}></View>
                <LQSelectComponent ref="lqselectcomponentbottom" leftName={'车型'} select={()=>{
                     this.props.selectModel();
                }}/>
                <View style={{width:width,height:Pixel.getPixel(10),
                backgroundColor:fontAndColor.COLORA3}}></View>
            </View>
        );
    }


}
