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
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil;
import * as fontColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import NavigationView from '../../../../component/AllNavigationView';
import GfOpenPersonalCountScene from './GfOpenPersonalCountScene';

export default class WebScene extends BaseComponent{
    constructor(props) {
        super(props);

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
            <WebView style={{ width: width - 60, height: 310 * KAdaptionHeight }}
                     scalesPageToFit={isTrue}
                     bounces={false}
                     source={{uri: this.props.uri, method: 'POST', body: {params:this.props.pa,sign:this.props.sign}}}/>
        );
    }

}