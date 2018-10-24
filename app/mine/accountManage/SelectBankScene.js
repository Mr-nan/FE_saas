/**
 * Created by zhengnan on 2018/10/24.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import * as Url from '../../constant/appUrls';

export  default class SelectBankScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }


    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }



    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return (
                <View style={styles.root}>
                    {
                        this.loadView()
                    }
                    <NavigationView
                        title={'选择银行'}
                        backIconClick={this.backPage}
                    />
                </View>
            )
        }
        return (
            <View style={styles.root}>
                <NavigationView
                    title={'选择银行'}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }



}
const styles = StyleSheet.create({

   root:{
       backgroundColor:fontAndColor.COLORA3,
       flex:1,
       paddingTop:Pixel.getTitlePixel(64),
   }
})