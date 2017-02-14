import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import NavigationView from './znComponent/CarInfoNavigationView';
export default class CarInfoScene extends  BaseComponent {

    initFinish=()=>{

    }

    render(){

        return(<View style={{flex:1,backgroundColor:'red'}}>
              <NavigationView/>
        </View>)
    }


}