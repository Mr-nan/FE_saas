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
        if(Platform.OS==='ios'){
            return px * (PixelRatio.get() / 2);
        }else{
            return px * (PixelRatio.get() / 3);
        }
    }
});

module.exports = PixelUtil;