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
    TouchableOpacity
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import  PlanChildItem from './PlanChildItem';
export  default class RepaymentInfoDateItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={styles.itemStyle}>
                <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                    <Text style={[styles.loanCodeStyle]}>还款日期</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                                  style={{flex:1,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                    <Text style={[styles.loanCodeStyle,{color:fontAndColor.COLORA2,marginRight:Pixel.getPixel(10)}]}>2017-02-28</Text>
                    <Image style={[{width:Pixel.getPixel(22),height:Pixel.getPixel(22)}]}
                           source={require('../../../../images/financeImages/dateIcon.png')}/>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    itemStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        backgroundColor: '#ffffff'
    },
    loanCodeStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1
    }
})