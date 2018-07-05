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
    ListView, TextInput
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class MyOrderDHKItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(47),backgroundColor:'#fff', flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(15)}}>
                            待还款金额
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={{fontSize:Pixel.getPixel(19),color:'#FA5741',marginRight:Pixel.getPixel(15)}}>
                            24.80
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#FA5741'}}>
                            万元
                        </Text>
                        </Text>
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