import React, {Component, PureComponent} from "react";
import {AppRegistry, View, Text, StyleSheet, Image, Dimensions} from "react-native";
import SetPwdGesture from "../gesture/SetPwdGesture";
import BaseComponent from "../component/BaseComponent";
import PixelUtil from "../utils/PixelUtil";
import * as FontAndColor from "../constant/fontAndColor";
import NavigationBar from '../component/NavigationBar';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import MainPage from '../main/MainPage';
var Pixel = new PixelUtil();
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

var Password = '';
export default class SetLoginPwdGesture extends BaseComponent {
    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            message: '绘制解锁图案',
            status: 'normal'
        }
    }

    initFinish = () => {
    }

    render() {
        return (
            <SetPwdGesture
                ref='pg'
                NavigationBar={
                    <View style={styles.topStyle}>
                        <NavigationBar
                            leftImageShow={true}
                            leftTextShow={false}
                            centerText={"设置手势密码"}
                            rightText={""}
                            leftImageCallBack={this.backPage}/>
                        <View style={styles.padResultsStyle}>
                            <View style={{flexDirection: 'row'}}>
                                {Password.indexOf("1") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                                {Password.indexOf("2") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                                {Password.indexOf("3") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {Password.indexOf("4") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                                {Password.indexOf("5") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                                {Password.indexOf("6") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {Password.indexOf("7") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                                {Password.indexOf("8") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                                {Password.indexOf("9") > -1 ? <View style={styles.cycleChoseStyle}/> :
                                    <View style={styles.cycleStyle}/>}
                            </View>
                        </View>
                        <Text style={this.state.status !== "wrong" ? styles.topMessageStyle : styles.topMessageWStyle}>
                            {this.state.message}
                        </Text>
                    </View>
                }
                status={this.state.status}
                message={this.state.message}
                style={styles.gestureStyle}
                interval={500}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}/>
        );
    }

    onEnd(pwd) {
        if (Password == '') {
            // The first password
            if (pwd.length > 3) {
                Password = pwd;
                this.setState({
                    status: 'normal',
                    message: '重新绘制解锁图案',
                });
            } else {
                this.setState({
                    status: 'wrong',
                    message: '请至少选择4个点',
                });
            }
        } else {
            // The second password
            if (pwd == Password) {
                this.setState({
                    status: 'right',
                    message: '密码设置成功',
                });

                StorageUtil.mGetItem(StorageKeyNames.PHONE, (data) => {
                    if (data.code == 1) {
                        if (data.result != null) {
                            StorageUtil.mSetItem(data.result + "", Password);
                            Password = '';
                        }
                    }
                })
                if (this.props.from == 'login') {
                    this.loginPage(this.loginSuccess)
                } else {
                    this.backPage();
                }
            } else {
                this.setState({
                    status: 'wrong',
                    message: '验证失败请重新输入'
                });
            }
        }
    }

    loginSuccess = {
        name: 'MainPage',
        component: MainPage,
        params: {}
    }

    loginPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.immediatelyResetRouteStack([{
                ...mProps
            }])
        }
    }

    onStart() {
        if (Password == '') {
            this.setState({
                status: 'normal',
                message: '绘制解锁图案',
            });
        } else {
            this.setState({
                status: 'normal',
                message: '重新绘制解锁图案',
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    gestureStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    topStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Width,
        paddingBottom: Pixel.getPixel(60),
    },
    cycleStyle: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        borderWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA1,
        borderRadius: Pixel.getPixel(15),
        margin: Pixel.getPixel(5),
    },
    cycleChoseStyle: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        margin: Pixel.getPixel(5),
        borderWidth: Pixel.getPixel(1),
        borderRadius: Pixel.getPixel(15),
        borderColor: FontAndColor.COLORB0,
        backgroundColor: FontAndColor.COLORB0,
    },
    topMessageStyle: {
        fontSize: Pixel.getFontPixel(17),
        color: FontAndColor.COLORA0,
    },
    topMessageWStyle: {
        fontSize: Pixel.getFontPixel(17),
        color: FontAndColor.COLORB2,
    },
    padResultsStyle: {
        flexDirection: 'column',
        marginBottom: 35,
        marginTop: 35
    }
});