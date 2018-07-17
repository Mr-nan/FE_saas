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
export  default class LineItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(10),backgroundColor:'#fff',justifyContent:'center'}}>
                <View style={{width:Pixel.getPixel(10),height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3,borderRadius:50,
                    position:'absolute',left:-Pixel.getPixel(5),top:0}}></View>
                <Image style={{width:width-Pixel.getPixel(40),height:1,marginLeft:Pixel.getPixel(10)}}
                       source={require('../../../../images/neworder/xuxian.png')}></Image>
                <View style={{width:Pixel.getPixel(10),height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3,borderRadius:50,
                    position:'absolute',right:-Pixel.getPixel(5),top:0}}></View>
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