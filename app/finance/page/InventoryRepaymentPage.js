/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import MyButton from '../../component/MyButton';
let MovleData = require('../../main/MoveData.json');
let movies = MovleData.subjects;
export  default class InventoryRepaymentPage extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            source: ds.cloneWithRows(movies),
            renderPlaceholderOnly: true

        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }


    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, paddingTop: Pixel.getPixel(15)}}>
                <ListView
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    bounces={false}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, paddingTop: Pixel.getPixel(15)}}>

            </View>
        );
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: styles.parentStyle,
        childStyle: styles.childStyle,
        opacity: 1,
    }

    _renderRow = (movie) => {

        return (
            <TouchableOpacity onPress={()=>{
                     this.props.callBack('13');
            }} activeOpacity={0.8} style={[styles.allBack]}>
                <View style={[styles.rowViewStyle, styles.margin]}>
                    <View style={[styles.rowTopViewStyle, {justifyContent: 'flex-start', flex: 3,}]}>
                        <MyButton {...this.buttonParams} content="库融"/>
                        <Text style={styles.rowTopTextStyle}>源之宝汽车经销公司</Text>
                    </View>
                    <View style={[styles.rowTopViewStyle, {
                        flex: 2,
                        justifyContent: 'flex-end'
                    }]}>
                        <Text style={styles.rowTopGrayTextStyle}>201701100225</Text>
                    </View>
                </View>
                <View style={[styles.line]}></View>
                <View
                    style={[styles.centerView]}>
                    <View style={[styles.centerChild, styles.margin, {alignItems: 'flex-start'}]}>
                        <Text style={[styles.centerText,{color: fontAndColor.COLORA1}]}>
                            到账日期
                        </Text>
                    </View>
                    <View style={[styles.centerChild, styles.margin, {alignItems: 'flex-end'}]}>
                        <Text style={[styles.centerText,{color: fontAndColor.COLORA0}]}>
                            2017-1-20
                        </Text>
                    </View>
                </View>
                <View style={{width: width, height: Pixel.getPixel(1), backgroundColor: fontAndColor.COLORA4}}></View>
            </TouchableOpacity>

        )
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(15),

    },
    rowViewStyle: {
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowTopViewStyle: {
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowTopTextStyle: {
        marginLeft: Pixel.getPixel(7), fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0
    },
    rowTopGrayTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT20),
        color: fontAndColor.COLORA1
    },
    margin: {
        marginLeft: Pixel.getPixel(15), marginRight: Pixel.getPixel(15),
    },
    parentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORB4,
        borderRadius: 3,
        height: Pixel.getPixel(16),
        width: Pixel.getPixel(34),
        justifyContent: 'center',
        alignItems: 'center'
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORB4,
    },
    allBack: {
        width: width, height: Pixel.getPixel(89), backgroundColor: '#ffffff', alignItems: 'center'
    },
    line: {
        width: width - Pixel.getPixel(30),
        height: Pixel.getPixel(1),
        backgroundColor: fontAndColor.COLORA3
    },
    centerView: {
        width: width,
        height: Pixel.getPixel(44),
        flexDirection: 'row'
    },
    centerChild: {
        flex: 1, height: Pixel.getPixel(44),
        justifyContent: 'center'
    },
    centerText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),

    },
    centerBottomText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        marginTop: Pixel.getPixel(8)
    },
    bottomView: {
        height: Pixel.getPixel(44),
        justifyContent: 'center',
        width: width - Pixel.getPixel(30)
    }
})