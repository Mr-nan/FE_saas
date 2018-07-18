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
let {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class MyOrderListCarItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        let widths = width;
        let bottomWidths = width;
        if(!this.isNull(this.props.parentWidth)){
            widths = this.props.parentWidth;
            bottomWidths = widths - Pixel.getPixel(20)
        }
        let date = new Date(this.props.data.manufacture*1000);
        let time = date.getFullYear()+'年'+date.getMonth()+'月'
        return (
            <View style={{width:widths,backgroundColor:'#fff',alignItems:'center'}}>
                <View style={{marginTop:Pixel.getPixel(17),width:widths,height:Pixel.getPixel(84), flexDirection:'row'}}>
                    <Image style={{width:Pixel.getPixel(120),height:Pixel.getPixel(84),marginLeft:Pixel.getPixel(15),
                        resizeMode:'stretch'}}
                           source={{uri:this.props.data.imgs[0].icon_url}}/>
                    <View style={{height:Pixel.getPixel(84), marginLeft:Pixel.getPixel(14),width:widths-Pixel.getPixel(149)}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#000'}}  numberOfLines={1}>{this.props.data.car_name}</Text>
                        <Text style={{fontSize:Pixel.getPixel(11),color:'#9b9b9b',
                        marginTop:Pixel.getPixel(6)}}  numberOfLines={1}>{time}/{this.props.data.mileage/10000}万公里/{this.props.data.car_color_name}/{this.props.data.provice_name}</Text>

                        <View style={{marginTop:Pixel.getPixel(12), flexDirection:'row',alignItems:'center'}}>
                            <View style={{flex:5}}><Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b'}}
                                                         >单车成交价</Text></View>
                            <View style={{flex:9}}>
                                <Text style={{fontSize:Pixel.getPixel(9),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                    <Text style={{fontSize:Pixel.getPixel(14),color:'#666', fontWeight:'bold'}}>
                                        {this.props.data.transaction_price/10000}
                                    </Text>万元
                                </Text>
                            </View>
                        </View>
                        <View style={{marginTop:Pixel.getPixel(6), flexDirection:'row',alignItems:'center'}}>
                            <View style={{flex:5}}><Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b'}}
                                                         >单车订金</Text></View>
                            <View style={{flex:9}}>
                                <Text style={{fontSize:Pixel.getPixel(9),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                    <Text style={{fontSize:Pixel.getPixel(14),color:'#666', fontWeight:'bold'}}>
                                        {this.props.data.deposit_amount/10000}
                                    </Text>万元
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{width:bottomWidths,height:1,backgroundColor:'#d8d8d8',marginTop:Pixel.getPixel(20)}}></View>
            </View>
        );
    }

    /**
     * 非空判断
     * @param content  任意类型值
     */
    isNull = (content) => {
        try {
            if (content == undefined) {
                return true;
            }
            if (content == null) {
                return true;
            }
            if (content instanceof Array) {
                if (content.length <= 0) {
                    return true;
                }
            }
            if (content instanceof Object) {
                if (JSON.stringify(content) == '{}') {
                    return true;
                }
            }
            if (content == 'null') {
                return true;
            }
            if ((content+'').trim() == '') {
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }
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