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
export  default class RepaymentInfoTopItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={[{width: width, backgroundColor: '#ffffff'},styles.padding]}>
                <View style={{flex:1,height:Pixel.getPixel(144)}}>
                    <Text
                        style={styles.loanCodeStyle}>单号：201702211002801</Text>
                    <View
                        style={{flex: 1,
                        marginTop:Pixel.getPixel(1),
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <Text style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(1)}]}>
                            应还总额
                        </Text>
                        <Text style={styles.loanMoneyStyle}>
                            45291.67
                        </Text>
                    </View>
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.itemStyle}>
                    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                        <Text style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0)}]}>
                            放款额:
                        </Text>
                        <Text style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0),color:fontAndColor.COLORA0}]}>
                            5万元 | 3个月
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0)}]}>
                            放款时间:2017-02-21
                        </Text>
                    </View>
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.itemStyle}>
                    <Text style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0)}]}>
                        明锐2017款TSI DS智行版自动挡
                    </Text>
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
    topViewStyle: {flex: 1, height: Pixel.getPixel(233), justifyContent: 'center'},
    itemStyle: {flex: 1, height: Pixel.getPixel(44), flexDirection: 'row',alignItems:'center'},
    lineStyle: {flex: 1, height: Pixel.getPixel(1), backgroundColor: fontAndColor.COLORA3},
    loanCodeStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(15)
    },
    loanMoneyStyle: {fontSize: Pixel.getFontPixel(32), color: fontAndColor.COLORB2, marginTop: Pixel.getPixel(5)}
})