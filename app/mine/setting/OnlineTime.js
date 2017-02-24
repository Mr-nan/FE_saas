import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, Image, Dimensions, PixelRatio, TouchableOpacity} from "react-native";
import BaseComponent from '../../component/BaseComponent';
import PixelUtil from '../../utils/PixelUtil';
import * as FontAndColor from '../../constant/fontAndColor';
import NavigationBar from '../../component/NavigationBar';
import MyButton from '../../component/MyButton';

var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
var onePT = 1 / PixelRatio.get(); //一个像素
export default class OnlineTime extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"设置在线时长"}
                    rightText={""}
                    leftImageCallBack={this.backPage}/>

                <TouchableOpacity style={styles.itemStyle} onPress={() => {
                    alert("5分钟")
                }}>
                    <Text style={styles.centerTextStyle}>5分钟</Text>
                </TouchableOpacity>

                <View style={{height: Pixel.getPixel(1), backgroundColor: FontAndColor.COLORA4}}/>

                <TouchableOpacity style={styles.itemStyle} onPress={() => {
                    alert("10分钟")
                }}>
                    <Text style={styles.centerTextStyle}>10分钟</Text>
                </TouchableOpacity>

                <View style={{height: Pixel.getPixel(1), backgroundColor: FontAndColor.COLORA4}}/>

                <TouchableOpacity style={styles.itemStyle} onPress={() => {
                    alert("15分钟")
                }}>
                    <Text style={styles.centerTextStyle}>15分钟</Text>
                </TouchableOpacity>

                <View style={{height: Pixel.getPixel(1), backgroundColor: FontAndColor.COLORA4}}/>
                <Text style={{
                    marginTop: Pixel.getPixel(22),
                    fontSize: Pixel.getFontPixel(12),
                    color: FontAndColor.COLORA1,
                    width: Width,
                    paddingLeft: Pixel.getPixel(15),
                }}>如果程序在后台运行超过设置时长，需要重新验证手势密码</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    itemStyle: {
        width: Width,
        height: Pixel.getPixel(44),
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerTextStyle: {
        color: FontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        textAlign: 'center',

    },
});