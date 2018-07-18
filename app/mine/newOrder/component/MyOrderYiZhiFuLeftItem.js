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
export  default class MyOrderYiZhiFuLeftItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={{marginTop:Pixel.getPixel(92),marginLeft:Pixel.getPixel(167)}}>
                <Text style={{color:'#fff',fontSize:Pixel.getPixel(14), fontWeight:'bold',backgroundColor: '#00000000'}}>订金已支付，待买家付尾款</Text>
                <Text style={{color:'#fff',fontSize:Pixel.getPixel(12),marginTop:Pixel.getPixel(8),backgroundColor: '#00000000'}}>买家交易确认后，方可提现</Text>
               <View style={{marginTop:Pixel.getPixel(21),flexDirection:'row'}}>
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{

                   }} style={{width:Pixel.getPixel(71),height:Pixel.getPixel(25),borderColor:'#fff',borderWidth:1,borderRadius:3,
                   justifyContent:'center',alignItems:'center'}}>
                       <Text style={{color:'#fff',fontSize:Pixel.getPixel(13),backgroundColor: '#00000000'}}>买家电话</Text>
                   </TouchableOpacity>
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{

                   }} style={{width:Pixel.getPixel(71),height:Pixel.getPixel(25),borderColor:'#fff',borderWidth:1,borderRadius:3,
                       justifyContent:'center',alignItems:'center',marginLeft:Pixel.getPixel(13)}}>
                       <Text style={{color:'#fff',fontSize:Pixel.getPixel(13),backgroundColor: '#00000000'}}>平台客服</Text>
                   </TouchableOpacity>
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