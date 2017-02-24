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
import * as fontAndColor from '../../../constant/fontAndColor';
import  PlanChildItem from './PlanChildItem';
export  default class RepaymentInfoBottomItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={[{width: width, backgroundColor: '#ffffff',height:Pixel.getPixel(124)},styles.padding]}>
                <View style={styles.itemStyle}>
                    <Text style={styles.loanCodeStyle}>计算公式</Text>
                </View>
                <View style={styles.lineStyle}/>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text
                        style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA1}}>
                        {this.props.formulaStr}
                    </Text>
                    <View style={{marginTop:Pixel.getPixel(15),flexDirection:'row'}}>
                        <Text
                            style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORB2}}>
                            {this.props.allMoney}
                        </Text>
                        <Text
                            style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA0}}>
                            {this.props.formula}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    padding: {
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    itemStyle: {
        width: width - Pixel.getPixel(30),
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineStyle: {height: Pixel.getPixel(1), backgroundColor: fontAndColor.COLORA3, width: width - Pixel.getPixel(30)},
    loanCodeStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: fontAndColor.COLORA0
    },
    loanMoneyStyle: {fontSize: Pixel.getFontPixel(32), color: fontAndColor.COLORB2, marginTop: Pixel.getPixel(5)}
})