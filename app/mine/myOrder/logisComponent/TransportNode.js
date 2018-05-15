/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';

export  default class TopBottomText extends PureComponent {

    constructor(props) {
        super(props);
    }

// {
//     "nodeDesc": "到达：辽宁省沈阳市",
//     "nodeTime": "2018-05-13 11:26:00",
//     "nodeMsg": "备注信息"
// }

    componentWillReceiveProps(props) {
    }

    render() {
        let lineHeight = Pixel.getPixel(73);
        let lineTop = 0;
        let topWidth = Pixel.getPixel(12);
        let topHeight = Pixel.getPixel(12);
        let imageSource = require('../../../../images/wljt.png');
        if (this.props.rowId == 0) {
            lineHeight = Pixel.getPixel(73) + Pixel.getPixel(27)
            lineTop = Pixel.getPixel(27);
            topWidth = Pixel.getPixel(17);
            topHeight = Pixel.getPixel(10);
            imageSource = require('../../../../images/wlys.png');
        }
        return (
            <View style={{width:Pixel.getPixel(335),height:lineHeight,flexDirection: 'row'}}>
                <View style={{marginLeft:Pixel.getPixel(71),width:Pixel.getPixel(81),alignItems:'center',
                marginTop:lineTop}}>
                    <Text style={{fontSize:Pixel.getPixel(14),color:'#000',textAlign: 'center'}}>
                        {this.props.data.nodeTime}</Text>
                </View>
                <View style={{marginLeft:Pixel.getPixel(12),width:Pixel.getPixel(17),
                marginTop:lineTop,alignItems:'center'}}>
                    <Image style={{width:topWidth,height:topHeight}}
                           source={imageSource}></Image>
                    {this.props.rowId==this.props.length?<View></View>:<View style={{width:1,height:Pixel.getPixel(55),backgroundColor:'#D8D8D8',
                    marginTop:Pixel.getPixel(4)}}></View>}

                </View>
                <View style={{marginLeft:Pixel.getPixel(15),marginTop:lineTop}}>
                    <Text style={{fontSize:Pixel.getPixel(14),color:'#000',textAlign: 'center'}}>
                        {this.props.data.nodeDesc}</Text>
                </View>
            </View>
        );
    }


}
