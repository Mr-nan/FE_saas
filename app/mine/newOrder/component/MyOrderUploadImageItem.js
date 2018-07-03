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
export  default class MyOrderUploadImageItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(107),backgroundColor:'#fff', flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(15)}}>{this.props.name}</Text>
            </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <Image style={{width:Pixel.getPixel(79),height:Pixel.getPixel(59),marginRight:Pixel.getPixel(15)}} source={require('../../../../images/neworder/tianjia.png')}/>
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