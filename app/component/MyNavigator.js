import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Navigator,
    TouchableHighlight
} from 'react-native';
var Platform = require('Platform');
import RootScene from '../main/MainPage';

export default class MyNavigator extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: RootScene,
                    name: 'rootScene'
                }}
                configureScene={(route) => {
                    if (Platform.OS === 'android') {
                        return Navigator.SceneConfigs.FloatFromBottomAndroid;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    if (route.component) {
                        return <Component {...route.params} navigator={navigator}/>
                    }
                }}>
            </Navigator>
        );
    }
}