import React from 'react';
import {
    PixelRatio,
    Platform
} from 'react-native';
const PixelUtil = React.createClass({

    render(){
        return null;
    },
    getPixel(px){
        if(Platform.os==='android'){
            return px * (PixelRatio.get() / 3);
        }else{
            return px * (PixelRatio.get() / 2);
        }
    }
});

module.exports = PixelUtil;