/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component,PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class AddEmployeeInput extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    changeVisible = (value) => {
        this.setState({

        });
    }


    render() {
        return (<View style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#fff'}}>
            <View style={{width:width,height:Pixel.getPixel(44),backgroundColor:'#00000000',flexDirection: 'row'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color:'#000'}}></Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                </View>
            </View>
            <View style={{width:width,height:Pixel.getPixel(1),backgroundColor:fontAndColor.COLORA3}}>

            </View>
        </View>);
    }
}