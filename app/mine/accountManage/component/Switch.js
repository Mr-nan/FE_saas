/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component,PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class Switch extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            isDateTimePickerVisible:false
        }
    }

    changeVisible=(value)=>{
        this.setState({
            isDateTimePickerVisible:value
        });
    }

    render() {
        return(<View style={{width:Pixel.getPixel(50),height:Pixel.getPixel(31),
        borderRadius:100,backgroundColor:'#4AD762',justifyContent:'center',
        paddingLeft: Pixel.getPixel(2),paddingRight: Pixel.getPixel(2)
        }}>
            <View style={{width:Pixel.getPixel(27),height:Pixel.getPixel(27),backgroundColor:'#fff',borderRadius:100}}></View>
        </View>);
    }


}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})