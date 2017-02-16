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
<<<<<<< HEAD
        if(Platform.os==='android'){
            return px * (PixelRatio.get() / 3);
        }else{
            return px * (PixelRatio.get() / 2);
=======
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
>>>>>>> 3e145433a22fba6596084cec2909e2b1d6a471f3
        }
    }
});

module.exports = PixelUtil;