import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import NavigationView from './znComponent/CarInfoNavigationView';

export default class CarInfoScene extends  BaseComponent {

    initFinish=()=>{

    }

    _backIconClick =()=>{

    };


    render(){

        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={styles.navigation}>
                    <NavigationView />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    navigation:{

        height:64,
        backgroundColor:fontAndColor.COLORB0,

    },

})