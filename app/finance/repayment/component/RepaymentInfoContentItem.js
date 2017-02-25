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
export  default class RepaymentInfoContentItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let itemList = [];
        for (let i = 0; i < this.props.items.length; i++) {
            itemList.push(
                <View key={i} style={styles.itemStyle}>
                    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                        <Text style={[styles.loanCodeStyle]}>{this.props.items[i].name}</Text>
                    </View>
                    <View activeOpacity={0.8}
                          style={{flex:2,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                        <Text
                            style={[styles.loanCodeStyle,{color:fontAndColor.COLORA0}]}>
                            {this.props.items[i].data}</Text>
                    </View>
                </View>
            );
            if (i !== this.props.items.length - 1) {
                itemList.push(
                    <View key={i+'child'}
                          style={{flex: 1, height: Pixel.getPixel(1), backgroundColor: fontAndColor.COLORA3}}/>
                );
            }
        }
        return (
            <View style={{backgroundColor:'#ffffff',width:width,paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),}}>
                {itemList}
            </View>

        );
    }

}
const styles = StyleSheet.create({
    itemStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center'
    },
    loanCodeStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1
    }
})