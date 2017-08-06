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
var Pixel = new PixelUtil();


export class ClientScreeningSelectButton extends Component {

    /**
     *
     **/
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgSource: require('../../../../images/carSourceImages/btnIcon@2x.png'),
            isHighlighted: false,
        };
    }

    /**
     * 筛选项点击
     * @private
     **/
    _btnClick = () => {
        // this._setImgHighlighted(!this.state.isHighlighted);
        this.props.btnClick(this.props.index, this.state.isHighlighted, this._setImgHighlighted);
    };

    /**
     *
     **/
    componentDidMount() {
        this._setImgHighlighted(false);
    }

    /**
     * 设置按钮图片类型
     * @private
     **/
    _setImgHighlighted = (bool) => {
        const {imgSource, isHighlighted} = this.state;
        this.setState({
            imgSource: bool ? (require('../../../../images/carSourceImages/btnIconHigh@2x.png')) : (require('../../../../images/carSourceImages/btnIcon@2x.png')),
            isHighlighted: bool,
        })
    }

    /**
     *
     * @returns {XML}
     **/
    render() {
        return (
            <TouchableOpacity
                onPress={this._btnClick}>
                <View style={styles.selectBtn}>
                    <View>
                        <Text allowFontScaling={false} style={styles.selectBtnText}>{this.props.title}</Text>
                    </View>
                    <View style={{marginLeft: 5}}>
                        <Image source={this.state.imgSource}></Image>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: Pixel.getPixel(40),
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between'
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