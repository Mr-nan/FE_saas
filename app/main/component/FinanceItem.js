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
export default class FinanceItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={{backgroundColor:'#fff',width:width,height: Pixel.getPixel(130),
            marginBottom:Pixel.getPixel(10)}}>
                <View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(44),flexDirection:'row',
                marginHorizontal:Pixel.getPixel(15)}}>
                    <View style={{flex:2,flexDirection: 'row',alignItems: 'center'}}>
                        <View style={{width:Pixel.getPixel(16),height:Pixel.getPixel(16),
                        justifyContent:'center',alignItems: 'center',backgroundColor:fontAndColor.COLORB0}}>
                            <Text style={{fontSize: Pixel.getFontPixel(12),color: '#fff'}}>单</Text>
                        </View>
                        <Text style={{fontSize: Pixel.getFontPixel(15),color: '#000',
                        marginLeft:Pixel.getPixel(8)}} numberOfLines={1}>锋之行汽车销售有限公司</Text>
                    </View>
                    <View style={{flex:1,flexDirection: 'row',alignItems: 'center',justifyContent:'flex-end'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(12),color: '#999'}}>201711210143</Text>
                    </View>
                </View>
                <View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(1),backgroundColor:'#d8d8d8',
                marginHorizontal:Pixel.getPixel(15)}}></View>
                <View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(84),flexDirection:'row',
                marginHorizontal:Pixel.getPixel(15)}}>
                    <View style={{flex:3,justifyContent:'center',alignItems:'center',alignItems: 'flex-start'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(24),color: '#fa5741'}}>100
                            <Text style={{fontSize: Pixel.getFontPixel(12),color: '#fa5741'}}>万</Text>
                        </Text>
                        <Text style={{fontSize: Pixel.getFontPixel(12),color: '#999',
                        marginTop:Pixel.getPixel(5)}}>借款金额</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(24),color: '#000'}}>3
                            <Text style={{fontSize: Pixel.getFontPixel(12),color: '#000'}}>个月</Text>
                        </Text>
                        <Text style={{fontSize: Pixel.getFontPixel(12),color: '#999',
                        marginTop:Pixel.getPixel(5)}}>借款期限</Text>
                    </View>
                    <View style={{flex:5,justifyContent:'center',alignItems:'flex-end'}}>
                        <View style={{width:Pixel.getPixel(70),height:Pixel.getPixel(30),
                        justifyContent:'center',alignItems: 'center',borderWidth:1,borderColor:'#fa5741',
                        borderRadius:3}}>
                            <Text style={{fontSize: Pixel.getFontPixel(15),color: '#fa5741'}}>审核中</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
