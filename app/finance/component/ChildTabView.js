import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as  fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
// var tabName = ["单车融资","库存融资","采购融资"];
export default class ChildTabView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabName: this.props.tabName
        }
    }

    render() {
        let that = this;
        return (<TouchableOpacity  onPress={()=>{
            this.props.goToPages(this.props.i)
        }} style={styles.tab}>
            <View
                style={[{flex: 1, height: Pixel.getPixel(38), justifyContent: 'center', alignItems: 'center'}]}>
                <Text ref="ttt"
                    style={[this.props.activeTab === this.props.i ? {color: fontAndColor.COLORB0} : {color: fontAndColor.COLORA0},
                        {fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}]}>
                    {that.state.tabName[this.props.i]}
                </Text>
            </View>
            <View style={[{height: Pixel.getPixel(2)},
                this.props.activeTab === this.props.i ? {backgroundColor: fontAndColor.COLORB0} : {backgroundColor: '#ffffff'}]}>
            </View>
        </TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    tabs: {
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        borderBottomColor: '#fff',
    },
});

