import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import LQSelectComponent from './LQSelectComponent';
import LQAndComponent from './LQAndComponent';
import SaasText from "../../accountManage/zheshangAccount/component/SaasText";


export default class NewCarItem extends PureComponent{


    render(){
        return(
            <View>
                <SaasText style={{color:fontAndColor.COLORA1, fontSize:12, marginHorizontal:Pixel.getPixel(15), marginVertical:Pixel.getPixel(10)}}>车型列表</SaasText>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    activeOpacity={.8}
                    style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:15, backgroundColor:'white'}}
                >

                    <Image style={{width:Pixel.getPixel(15), height:Pixel.getPixel(15), marginRight:Pixel.getPixel(4)}} source={require('../../../../images/mine/addnewcar.png')}/>
                    <SaasText style={{color:fontAndColor.COLORB5}}>新增车型</SaasText>
                </TouchableOpacity>
                <View style={{
                    width: width, height: Pixel.getPixel(5),
                    backgroundColor: fontAndColor.COLORA3
                }}/>
            </View>
        )
    };
}