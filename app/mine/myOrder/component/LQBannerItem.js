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
import ViewPager from './ViewPager';
export  default class PurchasePickerItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(256)}}>
                <ViewPager/>
                <View style={{width:width,height:Pixel.getPixel(31),backgroundColor:'#FFF8EA',
                alignItems:'center',paddingLeft:Pixel.getPixel(15),flexDirection: 'row',
                paddingRight:Pixel.getPixel(15)}}>
                    <Image style={{width:Pixel.getPixel(12),height:Pixel.getPixel(11),
                    marginRight:Pixel.getPixel(6)}}
                    source={require('../../../../images/laba.png')}></Image>
                    <Text numberOfLines={1} style={{fontSize: Pixel.getFontPixel(12),color: '#D0874D',
                    marginRight:Pixel.getPixel(12)}}>
                        用户张**已下运单，路线河北省石家庄市——山西省大同市
                    </Text>
                </View>
            </View>
        );
    }


}
