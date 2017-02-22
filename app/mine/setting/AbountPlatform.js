import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, Image, Dimensions, PixelRatio, TouchableOpacity} from "react-native";
import BaseComponent from '../../component/BaseComponent';
import PixelUtil from '../../utils/PixelUtil';
import * as FontAndColor from '../../constant/fontAndColor';
import NavigationBar from '../../component/NavigationBar';
import MyButton from '../../component/MyButton';
import AccountSecurity from './AccountSecurity';
import OnlineTime from './OnlineTime';

var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
var onePT = 1 / PixelRatio.get(); //一个像素
export default class Setting extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"关于服务平台"}
                    rightText={""}
                    leftImageCallBack={this.backPage}/>
                <Image style={styles.logoStyle}/>
                <Text>当前版本1.0</Text>
                <Image style={styles.logoStyle}/>
                <Text>当前版本1.0</Text>
                <Text>您的朋友也可以下载</Text>

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
    logoStyle: {
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(100),
        marginTop: Pixel.getPixel(65),
        backgroundColor: '#000000',
    }
});