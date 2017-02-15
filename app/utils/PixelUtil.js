import React from 'react';
import {
    PixelRatio,
} from 'react-native';
const PixelUtil = React.createClass({

    render(){
        return null;
    },
    getPixel(px){
        return px * (PixelRatio.get() / 2);
    }
});

module.exports = PixelUtil;