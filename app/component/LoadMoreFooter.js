import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
class LoadMoreFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.footer}>
                <Text allowFontScaling={false}  style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    footer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Pixel.getPixel(40),
    },
    footerTitle: {
        marginLeft: Pixel.getPixel(10),
        fontSize: Pixel.getFontPixel(14),
        color: 'gray'
    }
})

export default LoadMoreFooter