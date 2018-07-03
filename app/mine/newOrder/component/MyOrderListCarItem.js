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
export  default class MyOrderListCarItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={{width:width,backgroundColor:'#fff'}}>
                <View style={{marginTop:Pixel.getPixel(17),width:width,height:Pixel.getPixel(84), flexDirection:'row'}}>
                    <Image style={{width:Pixel.getPixel(120),height:Pixel.getPixel(84),marginLeft:Pixel.getPixel(15),
                        resizeMode:'stretch'}}
                           source={require('../../../../images/carSourceImages/car_null_img.png')}/>
                    <View style={{height:Pixel.getPixel(84), marginLeft:Pixel.getPixel(14)}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#000'}}  numberOfLines={1}>2016款 昂科威 20T 四驱豪华型</Text>
                        <Text style={{fontSize:Pixel.getPixel(11),color:'#9b9b9b',
                        marginTop:Pixel.getPixel(6)}}  numberOfLines={1}>2018年11月/1.2万公里/黑色/北京</Text>

                        <View style={{marginTop:Pixel.getPixel(12), flexDirection:'row',alignItems:'center'}}>
                            <View style={{flex:5}}><Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b'}}
                                                         numberOfLines={1}>单车成交价</Text></View>
                            <View style={{flex:9}}>
                                <Text style={{fontSize:Pixel.getPixel(9),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                    <Text style={{fontSize:Pixel.getPixel(14),color:'#666', fontWeight:'bold'}}>
                                        15.20
                                    </Text>万元
                                </Text>
                            </View>
                        </View>
                        <View style={{marginTop:Pixel.getPixel(6), flexDirection:'row',alignItems:'center'}}>
                            <View style={{flex:5}}><Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b'}}
                                                         numberOfLines={1}>单车订金</Text></View>
                            <View style={{flex:9}}>
                                <Text style={{fontSize:Pixel.getPixel(9),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                    <Text style={{fontSize:Pixel.getPixel(14),color:'#666', fontWeight:'bold'}}>
                                        2.00
                                    </Text>万元
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#d8d8d8',marginTop:Pixel.getPixel(20)}}></View>
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