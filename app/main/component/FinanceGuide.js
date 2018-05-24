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
export default class FinanceGuide extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            width: width,
            height: height,
        };
    }

    componentWillMount() {

    }


    render() {
        return (
            <TouchableOpacity onPress={()=>{
            }} activeOpacity={1} style={{width:this.state.width,height:this.state.height,overflow:'hidden',
            backgroundColor:'rgba(0,0,0,0.6)',position: 'absolute'}}>

            </TouchableOpacity>
        );
    }
}
