/*
* created by marongting on 2018/10/18
*
* */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    Image,
    TouchableOpacity

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class SubmitComponent extends BaseComponent{
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <TouchableOpacity style={styles.btn}>
                <Text style={{color:"#ffffff",fontSize:Pixel.getPixel(15)}}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }


}

const styles = StyleSheet.create({
    btn:{
        marginTop:Pixel.getPixel(30),
        marginLeft:Pixel.getPixel(15),
        width:Pixel.getPixel(345),
        height:Pixel.getPixel(44),
        backgroundColor:'#16BCCF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:Pixel.getPixel(2),
        shadowOpacity: 1.0,
        shadowColor:'#D0E7E6',
        shadowOffset: {width:0,height:Pixel.getPixel(7),

        }
    }
})