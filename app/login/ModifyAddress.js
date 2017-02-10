import React, {Component} from "react";
import {AppRegistry, View, Text, StyleSheet} from "react-native";
import BaseComponent from "../component/BaseComponent";

export default class ModifyAddress extends BaseComponent {
    initFinish = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>ModifyAddress</Text>
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