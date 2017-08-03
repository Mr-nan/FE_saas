import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
export default class HomeJobButton extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={{width:width,backgroundColor:fontAndColor.COLORA3}}>
                <View style={{width:width,backgroundColor:'#fff',height:200,
                marginBottom:Pixel.getPixel(10)}}>

                </View>
            </View>

        );
    }
}