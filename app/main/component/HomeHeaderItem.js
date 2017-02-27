/**
 * Created by yujinzhong on 2017/2/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';


/*
 * 获取字体型号,和颜色的文件
 **/
import * as fontAndClolr from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class HomeHeaderItem extends Component {

    render() {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={()=> {
                this.props.callBack(this.props.functionTitle);
            }}>
                <Image
                    source={ this.props.functionImage }
                    style={styles.imageStyle}
                />
                <View style={styles.titleStytle}>
                    <Text style={styles.functionTitleStytle}>{this.props.functionTitle }</Text>
                    <Text style={styles.describeTitleStytle}>{this.props.describeTitle }</Text>
                </View>


            </TouchableOpacity>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width:width/2.0,
        height:Pixel.getPixel(75),
        backgroundColor:'#ffffff',
        borderWidth:0.3,
        borderColor:fontAndClolr.COLORA4

    },
    imageStyle: {
        width: Pixel.getPixel(46),
        height: Pixel.getPixel(46),
        marginLeft: Pixel.getPixel(7)
    },
    titleStytle: {
        justifyContent: 'center',
        marginLeft: Pixel.getPixel(7),
    },
    functionTitleStytle: {
        marginBottom: Pixel.getPixel(7),
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        color: fontAndClolr.COLORA0,

    },
    describeTitleStytle: {
        fontSize: Pixel.getFontPixel(fontAndClolr.CONTENTFONT24),
        color: fontAndClolr.COLORA1,

    },


});