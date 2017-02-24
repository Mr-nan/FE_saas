import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet, Image, Dimensions, PixelRatio, TouchableOpacity} from "react-native";
import BaseComponent from '../../component/BaseComponent';
import PixelUtil from '../../utils/PixelUtil';
import * as FontAndColor from '../../constant/fontAndColor';
import NavigationBar from '../../component/NavigationBar';
import MyButton from '../../component/MyButton';
import AccountSecurity from './AccountSecurity';
import AbountPlatform from './AbountPlatform';

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
                    centerText={"设置"}
                    rightText={""}
                    leftImageCallBack={this.backPage}/>

                <TouchableOpacity onPress={() => {
                    this.toNextPage({
                        name: 'AccountSecurity',
                        component: AccountSecurity,
                        params: {},
                    })
                }}>
                    <View style={[styles.itemStyle, {marginTop: Pixel.getPixel(15)}]}>
                        <Image source={require("./../../../images/setting/account_security.png")}
                               style={styles.leftImageStyle}/>
                        <Text style={styles.centerTextStyle}>账户与安全</Text>
                        <Image source={require("./../../../images/mainImage/celljiantou@3x.png")}
                               style={styles.rightImageStyle}/>
                    </View>
                </TouchableOpacity>

                <View style={{height: Pixel.getPixel(1), backgroundColor: FontAndColor.COLORA4}}/>

                <TouchableOpacity onPress={() => {
                    this.toNextPage({
                        name: 'AbountPlatform',
                        component: AbountPlatform,
                        params: {},
                    })
                }}>
                    <View style={styles.itemStyle}>
                        <Image source={require("./../../../images/setting/platform.png")}
                               style={styles.leftImageStyle}/>
                        <Text style={styles.centerTextStyle}>关于交易服务平台</Text>
                        <Image source={require("./../../../images/mainImage/celljiantou@3x.png")}
                               style={styles.rightImageStyle}/>
                    </View>
                </TouchableOpacity>

                <View style={{height: Pixel.getPixel(1), backgroundColor: FontAndColor.COLORA4}}/>
                <View style={{flex: 1}}/>

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'退出登录'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this.loginOut}/>

            </View>
        );
    }

    loginOut = () => {
        alert("退出登录")
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Width,
        height: Pixel.getPixel(44),
        backgroundColor: '#ffffff'
    },
    leftImageStyle: {
        width: Pixel.getPixel(24),
        height: Pixel.getPixel(24),
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
    },
    centerTextStyle: {
        flex: 1,
        color: FontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
    },
    rightImageStyle: {
        width: Pixel.getPixel(14),
        height: Pixel.getPixel(14),
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: Width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});