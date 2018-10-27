/*
*
* created by marongting on 2018-10-16
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    WebView

} from 'react-native';

const {width,height} = Dimensions.get('window');
import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil;
import * as fontColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import NavigationView from '../../../../component/AllNavigationView';
import GfOpenPersonalCountScene from './GfOpenPersonalCountScene';
import WattingTenScendsScene from '../count_detail/WattingTenScendsScene';

export default class GFBankWebScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank'
        }
        this.ispush = true;
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    renderPlaceholderView = () => {

        return(
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title='企业开户'
                    backIconClick={this.backPage}
                />
            </View>
        )

    }



    render() {
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this.renderPlaceholderView();
        }
        return (
            <WebView style={{ flex:1}}
                     scalesPageToFit={true}
                     bounces={false}
                     onNavigationStateChange={(navState) =>{
                         console.log('navState',navState);
                         console.log('navState.url',navState.url);
                         this.go(navState);
                     }}
                     source={{html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form id="test_form" style="width: 1000px"   enctype="form-data"   action="${this.props.uri}"  method="post">
    <p id="a">params:
        <input style="width:100px" type="text" name="params" value="${this.props.pa}"/>
    <p id="b">sign:
        <input type="text" name="sign" value="${this.props.sign}">
        <input type="submit" value="Submit" style="color:#FFFFFFFF" onclick='doSubmitForm()'/>
</form>
</body>
<script>
    var form = document.getElementById('test_form');
    form.submit();
    document.getElementById('a').style.display = "none";
    document.getElementById('b').style.display = "none";
</script>
</html>`}}/>

        );
    }

    go(nav){
        if(nav.url.indexOf(this.props.reback_url) !=-1 && this.ispush){
            this.ispush = false;
            this.toNextPage({
                name:'WattingTenScendsScene',
                component:WattingTenScendsScene,
<<<<<<< HEAD
                params:{callback:()=>{this.props.callback()},
                    serial_no:this.props.serial_no
                }
=======
                params:{callback:()=>{this.props.callback()},serial_no:this.props.serial_no,flag:this.props.flag}
>>>>>>> 235ab93248a0b6e5afc11e137717641b3e673c7e
            })
        }
    }

}