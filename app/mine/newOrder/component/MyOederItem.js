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
export  default class MyOederItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(129),backgroundColor:'#fff',marginLeft:Pixel.getPixel(10)}}>
                <View style={{marginTop:Pixel.getPixel(16),marginLeft:Pixel.getPixel(11),flexDirection:'row',alignItems:'center'}}>
                    <Image style={{width:Pixel.getPixel(16),height:Pixel.getPixel(15)}} source={this.props.data.icon}/>
                    <Text style={{fontSize:Pixel.getPixel(14), color:'#333333',
                    marginLeft:Pixel.getPixel(9)}}>{this.props.data.name}</Text>
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