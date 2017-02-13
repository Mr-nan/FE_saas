import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import BaseComponent from '../component/BaseComponent';
import SQLite from '../utils/SQLiteUtil';
var sqLite = new SQLite();
export default class LoginScene extends BaseComponent {
    initFinish = () => {
        sqLite.createTable();
        sqLite.insertData('INSERT INTO CarName VALUES (?)', [ "a"]);
        sqLite.selectData('SELECT *  FROM Collection');
    }


    render() {
        return (
            <View style={{backgroundColor: '#668800', flex: 1, paddingTop: 20}}>

            </View>
        );
    }
}