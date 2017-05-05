/**
 * Created by Administrator on 2017/4/20.
 */
/**
 * Created by Administrator on 2017/3/22.
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
}from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import * as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
import {CarConfigurationView}   from './../carSource/znComponent/CarInfoAllComponent';

const Pixel = new PixelUtil();

import * as Net from '../utils/RequestUtil';
import * as AppUrls from '../constant/appUrls';

const config_no_data = require('../../images/noData.png');

export default class CGDAddCarScene extends BaseComponent {

    constructor(props) {
        super(props);

    }

    initFinish = () => {
        console.log(this.props.modelID);
    };

    _showLoading = () => {
        this.props.showModal(true);
    };

    _closeLoading = () => {
        this.props.showModal(false);
    };

    //提示信息
    _showHint = (hint) => {
        this.props.showToast(hint);
    };

    _onBack = () => {
        this.backPage();
    };


    render() {
        return (
            <View style={styles.container}>
                <AllNavigationView
                    backIconClick={this._onBack}
                    title='车辆配置'
                />
                <CarConfigurationView carConfigurationData={[]} modelID ={this.props.modelID}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    noDataContainer:{
        flex:1,
        alignItems:'center'
    },
    imgContainer:{
        marginTop:Pixel.getPixel(120),
        width:Pixel.getPixel(130),
        height:Pixel.getPixel(160)
    },
    noDataFont:{
        fontSize:Pixel.getFontPixel(16),
        color:'black',
        marginTop:Pixel.getPixel(20)
    }
});