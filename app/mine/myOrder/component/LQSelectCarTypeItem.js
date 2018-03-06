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
import ViewPager from './ViewPager';
export  default class PurchasePickerItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }

    changeShow = () => {
        this.setState({
            width: width,
            height: height
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                 this.setState({
                        width: 0,
                        height: 0
                 });
            }} activeOpacity={1}
                              style={{width:this.state.width,height:this.state.height,overflow:'hidden',
            justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,0.6)'}}>
                <View style={{width:width,height:Pixel.getPixel(134),backgroundColor:'#fff'}}>
                    <TouchableOpacity activeOpacity={1}
                                      style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Text allowFontScaling={false}
                              style={{fontSize: Pixel.getFontPixel(15),color:'#000'}}>新车</Text>
                    </TouchableOpacity>
                    <View style={{width:width-Pixel.getPixel(15),height:Pixel.getPixel(1),
                backgroundColor:'#d8d8d8'}}></View>
                    <TouchableOpacity activeOpacity={1}
                                      style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Text allowFontScaling={false}
                              style={{fontSize: Pixel.getFontPixel(15),color:'#000'}}>二手车</Text>
                    </TouchableOpacity>
                    <View style={{width:width-Pixel.getPixel(15),height:Pixel.getPixel(1),
                backgroundColor:'#d8d8d8'}}></View>
                    <TouchableOpacity activeOpacity={1}
                                      style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                        <Text allowFontScaling={false}
                              style={{fontSize: Pixel.getFontPixel(15),color:'#90A1B5'}}>取消</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }


}
