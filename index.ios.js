/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';


import CarSourceScene from './app/carSource/carSourceListScene';

export  default  class  FE_Sass extends  Component{


    render(){

        return(

                <CarSourceScene></CarSourceScene>

        )

    }

}



AppRegistry.registerComponent('FE_Sass', () => FE_Sass);


