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
export  default class LogisCarInfoCenterItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
    }

    render() {
        return (
            <View style={{width:width,backgroundColor:'#fff',height:Pixel.getPixel(169),
            paddingHorizontal:Pixel.getPixel(15)}}>
                <View style={{width:width-Pixel.getPixel(30),backgroundColor:'#D8D8D8',
                height:1}}></View>
                <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(129),
                flexDirection: 'row'}}>
                    <View style={{flex:1,alignItems: 'flex-start'}}>
                        <TopBottomText name={'运费'} money={'300'} marginTop={Pixel.getPixel(18)}/>
                        <TopBottomText name={'提验车费'} money={'62'} marginTop={Pixel.getPixel(23)}/>
                    </View>
                    <View style={{flex:1,alignItems: 'center'}}>
                        <TopBottomText name={'保险费'} money={'30'} marginTop={Pixel.getPixel(18)}/>
                        <TopBottomText name={'送店费'} money={'380'} marginTop={Pixel.getPixel(23)}/>
                    </View>
                    <View style={{flex:1,alignItems: 'flex-end'}}>
                        <TopBottomText name={'服务费'} money={'268'} marginTop={Pixel.getPixel(18)}/>
                    </View>
                </View>
                <View style={{width:width-Pixel.getPixel(30),backgroundColor:'#D8D8D8',
                height:1}}></View>
                <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(39),
                justifyContent:'center'}}>
                    <Text style={{color: '#333333',
                        fontSize: Pixel.getPixel(15)}}>单车运费总价：
                        <Text style={{color:'#FA5741'}}>
                            1290.00元</Text></Text>
                </View>
            </View>
        );
    }


}
