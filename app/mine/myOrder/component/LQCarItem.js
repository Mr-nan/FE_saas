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
import LQInputComponent from './LQInputComponent';
import LQAndComponent from './LQAndComponent';
import SeperateLine from './SeperateLine';

export default class LQCarItem extends PureComponent {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    componentWillReceiveProps(props) {


    }

    render() {
        let height = Pixel.getPixel(108);
        if (this.props.money != 'n' && this.props.type != 0) {
            height = Pixel.getPixel(157);
        }


        return (
            <View style={{
                width: width, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff', height: height
            }}>

                <LQSelectComponent ref="lqselectcomponenttop" value={this.props.carName} leftName={'车型'} select={() => {
                    this.props.selectModel();
                }}/>

                {height == Pixel.getPixel(157) ? <SeperateLine/> : <View/>}
                {height == Pixel.getPixel(157) ?
                    <LQInputComponent inputMoney={(text) => {
                        this.props.inputMoney(text);
                    }
                    } money={this.props.money} ref="lqselectcomponentbottoms"/> : <View/>}
                <SeperateLine/>
                <LQAndComponent ref="lqselectcomponentbottom" leftName={'数量'} value={this.props.count} changeNumber={(number) => {
                    this.props.changeNumber(number);
                }}
                />

            </View>
        )
    }


}
