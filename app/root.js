import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
} from 'react-native';
import MyNavigator  from './component/MyNavigator';

export default class root extends Component {

    render() {
        return (
            <View style={{flex:1}}>

                <MyNavigator/>
            </View>
        );
    }
}