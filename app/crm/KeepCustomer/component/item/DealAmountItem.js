/**
 * Created by hanmeng on 2017/8/12.
 */
import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();

export default class DealAmountItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
    }

    /**
     *
     **/
    initFinish = () => {
        /*this.setState({
         renderPlaceholderOnly: 'success'
         });*/
    }

    /**
     *
     **/
    render() {
        return (
            <View style={{
                height: Pixel.getPixel(44),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff'
            }}>
                <View style={styles.expButton}>
                    <Text
                        style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                            color: fontAndColor.COLORB0
                        }}
                        allowFontScaling={false}>全款</Text>
                </View>
                <Text allowFontScaling={false} style={{
                    marginLeft: Pixel.getPixel(5),
                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                    color: fontAndColor.COLORA0
                }}>成交金额</Text>
                <Text allowFontScaling={false} style={{
                    marginLeft: Pixel.getPixel(5),
                    fontSize: Pixel.getFontPixel(19),
                    color: fontAndColor.COLORB2
                }}>14.8万</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    expButton: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(36),
        height: Pixel.getPixel(18),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
});