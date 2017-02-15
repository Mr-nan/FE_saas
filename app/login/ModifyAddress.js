import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet} from "react-native";
import BaseComponent from "../component/BaseComponent";
var WeChat = require('react-native-wechat');
import ShareSpanner from './../component/WxShare';

export default class ModifyAddress extends BaseComponent {
    initFinish = () => {
        //应用注册
        WeChat.registerApp('wx8d560da3ba038e7e');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.fontStyle } onPress={()=>{this.shareSpanner.setModalVisible()}}>ModifyAddress</Text>
                <ShareSpanner
                    ref={(shareSpanner)=>{this.shareSpanner = shareSpanner}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    fontStyle: {
        color: '#cc092f',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 50
    }
});