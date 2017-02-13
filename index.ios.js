/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

<<<<<<< HEAD
import {
    AppRegistry
=======
import React,{Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
>>>>>>> 74d8eb10f196d9bad7f37afddaf730c262365967
} from 'react-native';
import root from './app/root';

<<<<<<< HEAD
AppRegistry.registerComponent('FE_Sass', () => root);
=======

import CarSourceScene from './app/carSource/carSourceListScene';

export  default  class  FE_Sass extends  Component{


    render(){

        return(

                <CarSourceScene></CarSourceScene>

        )

    }

}



AppRegistry.registerComponent('FE_Sass', () => FE_Sass);


>>>>>>> 74d8eb10f196d9bad7f37afddaf730c262365967
