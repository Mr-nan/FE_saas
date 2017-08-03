/**
 * Created by hanmeng on 2017/8/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Modal,

} from 'react-native';

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import {SelectButton} from "../../../carSource/znComponent/CarSourceSelectHeadView";
import {ClientScreeningSelectButton} from "./ClientScreeningSelectButton";
var Pixel = new PixelUtil();

export class ClientScreeningHeadView extends Component {

    // 构造
    /**
     *
     * @returns {XML}
     **/
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    /**
     *
     * @returns {XML}
     **/
    checkSelect = (index) => {

        switch (index) {
            case 1:
                this.refs.but1._setImgHighlighted(false);
                break;
            case 2:
                this.refs.but2._setImgHighlighted(false);
                break;
            default:
                break;
        }
    };

    /**
     *
     * @returns {XML}
     **/
    render() {
        return (
            <Image style={styles.container} source={require('../../../../images/carSourceImages/bottomShaow.png')}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <ClientScreeningSelectButton
                        style={{flex: 1}}
                        ref="but1" title="今天" index={1} btnClick={this.props.onPres}/>
                </View>
                <View style={styles.lineView}>
                    <View style={styles.line}/>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <ClientScreeningSelectButton
                        style={{flex: 1}}
                        ref="but2" title="筛选" index={2} btnClick={this.props.onPres}/>
                </View>
            </Image>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: Pixel.getTitlePixel(64),
        height: Pixel.getPixel(40),
        width: width,
        flexDirection: 'row',
    },
    lineView: {
        width: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },
    line: {
        height: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORA3,
    },

    countView: {
        marginLeft: Pixel.getPixel(10),
        justifyContent: 'center'
    },
    selectBtn: {
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(40),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    selectBtnText: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        backgroundColor: 'white',
    },
    countText: {
        color: fontAndColor.COLORB3,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    unitsView: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    unitsText: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        backgroundColor: 'white',
    },
    selectView: {
        top: Pixel.getTitlePixel(104),
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: 0,
    },
    checkedCell: {
        backgroundColor: 'white',
        height: Pixel.getPixel(44),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA3,
    },
    checkedCellText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT),
        textAlign: 'center',
        color: fontAndColor.COLORA0,
    },
});