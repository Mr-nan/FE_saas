import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import BaseComponent from '../component/BaseComponent';
import ViewPagers from './ViewPager';
import SQLite from '../utils/SQLiteUtil';
var sqLite = new SQLite();
export default class LoginScene extends BaseComponent {
    initFinish = () => {
         sqLite.createTable();
    }

    render() {
        return (
            <View style={{backgroundColor: '#668800', flex: 1, paddingTop: 20}}>

            </View>
        );
    }
}