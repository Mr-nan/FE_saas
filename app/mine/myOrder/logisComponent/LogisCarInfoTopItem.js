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

export  default class LogisCarInfoTopItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
    }

    render() {
        return (
            <View style={{width:width,backgroundColor:'#fff',height:Pixel.getPixel(107),
            flexDirection:'row',paddingHorizontal:Pixel.getPixel(15),paddingVertical: Pixel.getPixel(13)}}>
                <Image source={require('../../../../images/share_icon_wechat.png')}
                       style={{width:Pixel.getPixel(120),height:Pixel.getPixel(80),resizeMode:'cover'}}></Image>
                <View style={{width:Pixel.getPixel(213),height:Pixel.getPixel(80),
                marginLeft:Pixel.getPixel(12)}}>
                    <Text style={{fontSize: Pixel.getPixel(14),backgroundColor:'#00000000',
                    color: '#000'}} numberOfLines={2}>
                        [北京]奔驰M级（进口） 2015款 M奔驰奔驰M级（进口） 2015款</Text>
                    <Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#9b9b9b',marginTop:Pixel.getPixel(15)}} >
                        单车指导价：<Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#000'}}>120000万</Text></Text>
                    <Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#9b9b9b',marginTop:Pixel.getPixel(5)}} >
                        车架号：<Text style={{fontSize: Pixel.getPixel(12),backgroundColor:'#00000000',
                    color: '#000'}}>***********</Text></Text>
                </View>
            </View>
        );
    }


}
