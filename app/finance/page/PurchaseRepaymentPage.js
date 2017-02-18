/**
 * Created by lhc on 2017/2/15.
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
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
export  default class PurchaseRepaymentPage extends Component {

    initFinish = () => {
    }

    render() {

        return (
            <View style={{backgroundColor:'blue',flex:1}}>

            </View>
        );
    }
}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    }
})