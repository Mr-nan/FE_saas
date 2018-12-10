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
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class SubmitComponent extends Component{
    constructor(props) {
        super(props);

    }

    render(){
        if(this.props.btnType == 1){
            this.tu = require('../../../../../images/mine/guangfa_account/anniu-1.png');
        }else if(this.props.btnType == 2){
            this.tu = require('../../../../../images/mine/guangfa_account/anniu-2.png');
        }else{
            this.tu = require('../../../../../images/mine/guangfa_account/anniu-3.png');
        }
        const {warpStyle,iconWrap} = this.props;
        return(
            <Image source={this.tu} style={[styles.btnStyle,iconWrap]}>
                <TouchableOpacity style={[styles.btn,warpStyle]} onPress={this.props.btn} >
                    <Text style={{color:"#ffffff",backgroundColor:'transparent',fontSize:Pixel.getPixel(15)}}>{this.props.title}</Text>
                </TouchableOpacity>
            </Image>

        )
    }
}

const styles = StyleSheet.create({
    btn:{
        width:Pixel.getPixel(345),
        height:Pixel.getPixel(44),
        alignItems:'center',
        justifyContent:'center',
    },
    btnStyle:{
        width:width-Pixel.getPixel(20),
        height:(width-Pixel.getPixel(20))*0.17,
        marginTop:Pixel.getPixel(17),
        marginLeft:Pixel.getPixel(10),
    }
})