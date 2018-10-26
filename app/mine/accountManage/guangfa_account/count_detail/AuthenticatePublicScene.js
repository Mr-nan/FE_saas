/*
*
* created on marongting by 2018/10/19
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ListView

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import SubmitComponent from "../component/SubmitComponent";
import AuthenticateCardComponent from '../component/AuthenticateCardComponent';

export default class AuthenticatePublicScene extends BaseComponent{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly:'blank',
            dataSource:ds.cloneWithRows(['row 1', 'row 2'])
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success',
            dataSource:this.props.data,
        })
    }

    render(){
        if(this.state.renderPlaceholderOnly !== 'success'){
           return this.renderPlaceholderView;
        }
        return (
            <View style={{height:height,width:width,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='对公账户鉴权'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <ListView style={{flex:1,marginTop: Pixel.getPixel(64),backgroundColor:'transparent'}} dataSource={this.state.dataSource} renderRow={this.renderRow}/>
            </View>
        )
    }

    renderRow = (rowData,rowID) =>{
        return(
            <AuthenticateCardComponent data = {rowData}/>
            )

     }

    renderPlaceholderView = () => {
        return(
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='对公账户鉴权'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>
        )

    }

}