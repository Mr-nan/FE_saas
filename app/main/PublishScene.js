/**
 * Created by yujinzhong on 2017/2/8.
 */


import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const  publishReceive = require('../../images/mainImage/publishReceive.png');
const publishNew = require('../../images/mainImage/publishNew.png');
import  PixelUtil from '../utils/PixelUtil'
const Pixel = new PixelUtil();

export default class PublishScene extends Component {

    constructor(props){
        super(props);
    }

    _receivePress = ()=>{

    };

    _newPress = ()=>{

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.fillSpace}/>
                <View style={styles.contentContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={()=>{this._newPress()}}
                    >
                        <View style={styles.rowCenter}>
                            <Image style={styles.img} source={publishNew}/>
                            <Text style={styles.fontMain}>发布新车源</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.fillSpace}/>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={()=>{this._receivePress()}}>
                        <View style={styles.rowCenter}>
                            <Image style={styles.img} source={publishReceive}/>
                            <Text style={styles.fontMain}>发布收车意向</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    contentContainer:{
        flexDirection:'row',
        marginBottom:Pixel.getPixel(155),
        width:Pixel.getPixel(242)
    },
    btnContainer: {
        flexDirection:'row'
    },
    img:{
        width:Pixel.getPixel(67),
        height:Pixel.getPixel(67),
        borderRadius:Pixel.getPixel(67)
    },
    fontMain:{
        fontSize:Pixel.getFontPixel(14),
        color:'#000000',
        marginTop:Pixel.getPixel(10)
    },
    rowCenter:{
        alignItems:'center'
    },
    fillSpace:{
        flex:1
    }
});
