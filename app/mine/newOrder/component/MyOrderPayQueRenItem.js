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
export  default class MyOrderPayQueRenItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.props.callBack(3);
            }} style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#05C5C2', flexDirection:'row',
                position:'absolute',left:0,bottom:0,justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:Pixel.getPixel(15),color:'#fff'}}>交易确认</Text>
            </TouchableOpacity>
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