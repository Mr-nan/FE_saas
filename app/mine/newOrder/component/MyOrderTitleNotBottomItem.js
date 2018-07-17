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
export  default class MyOrderTitleNotBottomItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(47),backgroundColor:'#fff',
            position:'absolute',left:Pixel.getPixel(10),bottom:0, flexDirection:'row',borderRadius:5}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize:Pixel.getPixel(14),color:'#333',marginLeft:Pixel.getPixel(17)}}>
                        收车方式
                    </Text>
                </View>
                <View  style={{flex:1,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                    <Text
                        style={{
                            fontSize: Pixel.getFontPixel(14),
                            color: '#91A2B6',
                            padding: 0,
                            marginRight:Pixel.getPixel(19),
                        }}
                    >自提</Text>
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