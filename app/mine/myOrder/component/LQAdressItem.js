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
import SeperateLine from './SeperateLine'

export  default class PurchasePickerItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.refs.lqselectcomponentfrom.setSelectName(props.firstName);
        this.refs.lqselectcomponentto.setSelectName(props.lastName);
        this.refs.lqselectcomponentnewold.setSelectName(props.typeName)
    }

    render() {
        return (
            <View style={{width:width,justifyContent:'center',alignItems:'center',
            backgroundColor:'#fff'}}>
                <LQSelectComponent ref="lqselectcomponentfrom" value={this.props.firstName} leftName={'始发地'} select={()=>{
                    this.props.selectCity(1);
                }}/>
                <SeperateLine/>
                <LQSelectComponent ref="lqselectcomponentto" value={this.props.lastName} leftName={'目的地'}  select={()=>{
                     this.props.selectCity(2);
                }}/>
                <SeperateLine/>
                <LQSelectComponent ref="lqselectcomponentnewold" value={this.props.typeName} leftName={'车辆新旧'} select={()=>{
                    this.props.selectCity(3);
                }}/>
                <View style={{width:width,height:Pixel.getPixel(10),
                backgroundColor:fontAndColor.COLORA3}}/>
            </View>
        );
    }


}
