import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';

import * as fontAnColor from '../../constant/fontAndColor'

class LoadMoreFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {isLoadAll,isCarFoot,footAllClick} = this.props;
        return (
            <TouchableOpacity onPress={()=>{

                if(isLoadAll)
                {
                    footAllClick();
                }
            }}>
            <View  style={styles.footer}>
                <Text style={styles.footerTitle}>{isLoadAll ? '查看全部车源>' : '正在加载更多……'}</Text>
            </View>
            </TouchableOpacity>
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
        fontSize: fontAnColor.LITTLEFONT28,
        color: fontAnColor.COLORA2,
    }
})

export default LoadMoreFooter