import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import * as fontAnColor from '../../constant/fontAndColor'

class LoadMoreFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View  style={styles.footer}>
                <Text style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
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
        height: 40,
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: fontAnColor.CONTENTFONT24,
        color: fontAnColor.COLORA0,
    }
})

export default LoadMoreFooter