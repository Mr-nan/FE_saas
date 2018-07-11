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
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import  GetImage from '../../../utils/GetOrderImageUtil'
import  GetText from '../../../utils/GetOrderTextUtil'
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class MyOrderInfoTitleItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        let height = 214;
        let imageHeight = 214;
        if (this.props.type==4){
            height = 249;
            imageHeight = 226;
        }
        return (
            <View style={{width:width,height:Pixel.getPixel(height)}}>
                <Image style={{width:width,height:Pixel.getPixel(imageHeight)}} source={GetImage.getTitle(this.props.type,this.props.from)}>
                    {GetText.getTitle(this.props.type,this.props.from)}
                </Image>
                {GetText.getTitleBottom(this.props.type,this.props.from)}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})