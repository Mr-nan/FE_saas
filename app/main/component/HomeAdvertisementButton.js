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
export default class HomeAdvertisementButton extends PureComponent {

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
                <Image source={require('../../../images/mainImage/homeAdvertisement.png')}
                    style={{width:width,backgroundColor:'#fff',height:Pixel.getPixel(120),
                    marginBottom:Pixel.getPixel(10),resizeMode: 'stretch'}}>

                </Image>
            </View>

        );
    }
}