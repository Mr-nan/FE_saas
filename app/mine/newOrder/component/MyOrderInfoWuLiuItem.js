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
import DepositCountDown from "./DepositCountDown";
export  default class MyOrderInfoWuLiuItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#fff',alignItems:'center',
                flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(15)}}>
                            发车地址
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginRight:Pixel.getPixel(16)}}>
                            山西省太原市晋源区
                        </Text>
                        <Image style={{width:Pixel.getPixel(9),height:Pixel.getPixel(15),marginRight:Pixel.getPixel(15)}}
                               source={require('../../../../images/neworder/right.png')}/>
                    </View>
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