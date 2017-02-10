import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet} from "react-native";
import BaseComponent from "../component/BaseComponent";

export default class LoginFail extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: '#cc092f', alignSelf: 'center', fontSize: 30, marginTop: 50}}>
                    LoginFail
                </Text>
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
    }
});