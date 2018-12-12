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
import HomeJobButton from './HomeJobButton';
import GetPermissionUtil from '../../utils/GetPermissionUtil';
const GetPermission = new GetPermissionUtil();
export default class FinanceHeaderBottom extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{fontSize: Pixel.getFontPixel(11),color: '#fff',
                backgroundColor:'#00000000'}}>新车订单额度 2000万</Text>
            </View>

        );
    }
}