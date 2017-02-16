import React from 'react';
import {
    PixelRatio,
    Platform,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
const PixelUtil = React.createClass({

    render(){
        return null;
    },
    getPixel(px){

        if (Platform.OS === 'android') {
            return ((px / 375.0) * width);
        } else {
            return ((px / 375.0) * width);
        }
    },
    getFontPixel(px){
        if (Platform.OS === 'android') {
            return ((px / 375.0) * width) + 2;
        } else {
            return ((px / 375.0) * width) + 2;

        }
    }
});

module.exports = PixelUtil;