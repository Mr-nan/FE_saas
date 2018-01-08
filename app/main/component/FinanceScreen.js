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
export default class FinanceScreen extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(45),marginTop:Pixel.getPixel(10),
            marginBottom:Pixel.getPixel(1),backgroundColor:'#fff',flexDirection: 'row',overflow:'visible'}}>
                <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: fontAndColor.COLORB0}}>
                        全部
                    </Text>
                </View>
                <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#999999'}}>
                        单车融资
                    </Text>
                </View>
                <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#999999'}}>
                        订单融资
                    </Text>
                </View>
                <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#999999'}}>
                        更多
                    </Text>
                </View>
                <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#999999'}}>
                        时间
                    </Text>
                </View>

            </View>
        );
    }
}
