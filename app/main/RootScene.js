import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import LoginScene from '../login/LoginScene';
import BaseComponent from '../component/BaseComponent';


export default class SplashScene extends BaseComponent {
    mProps = {
        name: 'login',
        component: LoginScene,
        params: {
            showname: 'login',
            dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 123, 123, 123]
        }
    };

    initFinish = () => {

    }
    onPress = () => {
        this.toNextPage(this.mProps)
    }


    render() {
        return (
            <View style={{backgroundColor: '#ff8800', flex: 1, paddingTop: 20}}>

            </View>
        );
    }
}