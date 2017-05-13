/**
 * Created by zhengnan on 2017/5/12.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
import ImageSource from '../publish/component/NewImageSource';


const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;

export default class CarUpImageScene extends BaseComponent{

    initFinish=()=>{

    }
    render(){
        return(
            <View style={styles.rootContainer}>
                <AllNavigationView title="上传图片" backIconClick={this.backPage}/>
            </View>)
    }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
});