/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component} from 'react';

import {
    AppRegistry,
    View

} from 'react-native';


export  default  class  FE_Sass extends  Component{

    render(){

        return(<View style={{width:100,height:100,backgroundColor:'red'}}>)

    }

}

AppRegistry.registerComponent('FE_Sass', () => FE_Sass);


