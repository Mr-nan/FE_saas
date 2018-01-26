/**
 * Created by zhengnan on 2018/1/26.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;

export default class CarShoppingCell extends Component{
    render(){
        return(
            <View style={styles.cellView}>
                <ShopView/>

            </View>
        )
    }
}

class ShopView extends Component{
    render(){
        <View style={styles.shopView}>
            <View style={styles.circleViewr}/>
            <Text style={styles.shopTitle}>商户1</Text>
        </View>
    }
}

class CarCell extends Component{
    render(){
        <View>
            
        </View>
    }
}

const styles = StyleSheet.create({
    cellView:{
        width:ScreenWidth,
        backgroundColor:'white',
    },
    shopView:{
        justifyContent:'center',
        alignItems:'center',
        height:Pixel.getPixel(30),
        width:ScreenWidth,
        borderBottomWidth:Pixel.getPixel(1),
        borderBottomColor:fontAndColor.COLORA3,
        paddingLeft:Pixel.getPixel(15),
        flexDirection:'row',
    },
    shopTitle:{
        marginLeft:Pixel.getPixel(5),
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color:fontAndColor.COLORA1,
    },
    circleView:{
        width:Pixel.getPixel(20),
        height:Pixel.getPixel(20),
        borderRadius:Pixel.getPixel(10),
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA3,
    }
})