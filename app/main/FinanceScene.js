/**
 * Created by yujinzhong on 2017/2/8.
 */

import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
} from  'react-native'


let MovleData = require('./MoveData.json');
let movies = MovleData.subjects;
import  HomeHeaderItem from './component/HomeHeaderItem';
import * as fontAndColor from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
import MainScene from './MainScene';
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
import LendMoneySence from '../finance/LendMoneySence';
import MyButton from '../component/MyButton';
import RepaymentScene from '../finance/RepaymentScene';


export class HomeHeaderItemInfo {
    constructor(ref, key, functionTitle, describeTitle, functionImage) {

        this.ref = ref;
        this.key = key;
        this.functionTitle = functionTitle;
        this.describeTitle = describeTitle;
        this.functionImage = functionImage;
    }

}

const bossFuncArray = [
    new HomeHeaderItemInfo('jiekuan', 'page1', '借款', '一步快速搞定', require('../../images/financeImages/borrowicon.png')),
    new HomeHeaderItemInfo('huankuan', 'page2', '还款', '智能自动提醒', require('../../images/financeImages/repaymenticon.png')),
];
const employerFuncArray = [bossFuncArray[0], bossFuncArray[1]];


export default class FinanceSence extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            source: ds.cloneWithRows(movies),
            allData: {
                keyongedu: "500",
                daikuanyue: "200",
                baozhengjinedu: "20",
                baozhengjinyue: "4.65",
            }
        };
    }

    initFinish = () => {
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: cellSheet.parentStyle,
        childStyle: cellSheet.childStyle,
        opacity: 1,
    }

    typeButtonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: cellSheet.typeParentStyle,
        childStyle: cellSheet.typeChildStyle,
        opacity: 1,
    }

    _renderRow = (movie) => {

        return (
            <View style={[cellSheet.row, cellSheet.padding]}>
                <View style={cellSheet.rowViewStyle}>
                    <View style={[cellSheet.rowViewStyle, {justifyContent: 'flex-start',}]}>
                        <MyButton {...this.buttonParams} content="单车"/>
                        <Text style={cellSheet.rowTopTextStyle}>源之宝汽车经销公司</Text>
                    </View>
                    <View style={[cellSheet.rowTopViewStyle, {
                        flex: 2,
                        justifyContent: 'flex-end'
                    }]}>
                        <Text style={cellSheet.rowTopGrayTextStyle}>201701100225</Text>
                    </View>
                </View>
                <View style={{height: 0.5, backgroundColor: fontAndColor.COLORA4}}></View>
                <View style={cellSheet.rowBottomViewStyle}>
                    <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-start'}]}>
                        <Text style={cellSheet.rowBottomLittleStyle}>借款金额</Text>
                        <Text style={[cellSheet.rowBottomBigStyle, {color: fontAndColor.COLORB2}]}>30万</Text>
                    </View>
                    <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-start'}]}>
                        <Text style={cellSheet.rowBottomLittleStyle}>借款期限</Text>
                        <Text style={[cellSheet.rowBottomBigStyle, {color: fontAndColor.COLORA0}]}>3个月</Text>
                    </View>
                    <View style={[cellSheet.rowBottomChildStyle, {alignItems: 'flex-end', justifyContent: 'center'}]}>
                        <MyButton {...this.typeButtonParams} content="处理中"/>
                    </View>
                </View>
            </View>


        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    render() {
        return (
            <View style={cellSheet.container}>
                <ListView
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    bounces={false}
                />

            </View>
        )
    }

    navigatorParams = {
        name: 'LendMoneySence',
        component: LendMoneySence,
        params: {}
    }

    homeItemOnPress = (title) => {
        if (title === '借款') {
            this.navigatorParams.name = 'LendMoneySence';
            this.navigatorParams.component = LendMoneySence;
            this.props.callBack(this.navigatorParams);
        } else {
            this.navigatorParams.name = "RepaymentScene";
            this.navigatorParams.component = RepaymentScene;
            this.props.callBack(this.navigatorParams);
        }
    }


    _renderHeader = () => {
        let tablist;
        tablist = bossFuncArray;
        let items = [];
        tablist.map((data) => {
            let tabItem;

            tabItem = <HomeHeaderItem
                ref={data.ref}
                key={data.key}
                functionTitle={data.functionTitle}
                describeTitle={data.describeTitle}
                functionImage={data.functionImage}
                callBack={this.homeItemOnPress}
            />
            items.push(tabItem);
        });

        return (
            <View>
                <View style={[cellSheet.titleStyle, cellSheet.titleViewStyle]}>
                    <Image style={[cellSheet.titleStyle, cellSheet.titleImageStyle]}
                           source={require('../../images/financeImages/dinancebg.png')}/>
                    <Text style={cellSheet.titleOneTextStyle}>可用额度(万)</Text>
                    <Text style={cellSheet.titleTwoTextStyle}>{this.state.allData.keyongedu}</Text>
                    <Text style={cellSheet.titleThreeTextStyle}>贷款余额(万)</Text>
                    <Text style={cellSheet.titleFourTextStyle}>{this.state.allData.daikuanyue}</Text>
                    <View style={cellSheet.titleViewBottomStyle}>
                        <View style={cellSheet.titleViewBottomBGStyle}></View>
                        <View style={[cellSheet.titleViewBottomViewStyle, {paddingRight: Pixel.getPixel(40)}]}>
                            <Text style={cellSheet.titleViewTextStyle}>保证金额度:</Text>
                            <Text
                                style={[cellSheet.titleViewTextStyle, {fontWeight: 'bold'}]}>{this.state.allData.baozhengjinedu}万</Text>
                        </View>
                        <View style={[cellSheet.titleViewBottomViewStyle, {paddingLeft: Pixel.getPixel(40)}]}>
                            <Text style={[cellSheet.titleViewTextStyle]}>保证金余额:</Text>
                            <Text
                                style={[cellSheet.titleViewTextStyle, {fontWeight: 'bold'}]}>{this.state.allData.baozhengjinyue}万</Text>
                        </View>
                    </View>
                </View>
                <View style={cellSheet.header}>
                    {items}
                </View>

            </View>

        )
    }
}


const cellSheet = StyleSheet.create({


    header: {
        flex: 1,

        backgroundColor: fontAndColor.COLORA3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: Pixel.getPixel(10),

    },

    headerTitle: {

        fontSize: 20,
    },

    container: {

        flex: 1,
        marginTop: 0,   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },

    row: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(111)
    },
    rightContainer: {

        marginLeft: 20,
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainerTop: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },

    rightContainerBottom: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        flex: 1,
        fontSize: 15,
        textAlign: 'left',

    },
    year: {
        fontSize: 15,
        textAlign: 'center',
        marginRight: 20,
    },
    Separator: {

        backgroundColor: fontAndColor.COLORA4,
        height: 1,

    },
    titleStyle: {
        width: width,
        height: Pixel.getPixel(230)
    },
    titleViewStyle: {
        alignItems: 'center',
    },
    titleImageStyle: {
        position: 'absolute'
    },
    titleViewBottomStyle: {
        width: width,
        height: Pixel.getPixel(40),
        marginTop: Pixel.getPixel(25), flexDirection: 'row', alignItems: 'center'
    },
    titleViewBottomBGStyle: {
        backgroundColor: '#0970cf', width: width,
        height: Pixel.getPixel(40), opacity: 0.25, position: 'absolute'
    },
    titleViewBottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleViewTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA3,
        backgroundColor:'#00000000'
    },
    titleOneTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA3, marginTop: Pixel.getPixel(64),
        backgroundColor:'#00000000'
    },
    titleTwoTextStyle: {
        fontSize: Pixel.getFontPixel(24),
        color: fontAndColor.COLORA3, marginTop: Pixel.getPixel(4), fontWeight: 'bold',
        backgroundColor:'#00000000'
    },
    titleThreeTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA3, marginTop: Pixel.getPixel(12),
        backgroundColor:'#00000000'
    },
    titleFourTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24), fontWeight: 'bold',
        color: fontAndColor.COLORA3, marginTop: Pixel.getPixel(4)
    },
    parentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0,
        borderRadius: 3,
        height: Pixel.getPixel(16),
        width: Pixel.getPixel(34),
        justifyContent: 'center',
        alignItems: 'center'
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORB0,
    },
    typeParentStyle: {
        borderWidth: 1,
        borderColor: fontAndColor.COLORA4,
        borderRadius: 100,
        height: Pixel.getPixel(23),
        width: Pixel.getPixel(72),
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeChildStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB3,
    },
    padding: {
        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
    },
    rowViewStyle: {
        height: Pixel.getPixel(40),
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowTopTextStyle: {
        marginLeft: Pixel.getPixel(7), fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0
    },
    rowTopGrayTextStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT20),
        color: fontAndColor.COLORA1
    },
    rowBottomViewStyle: {
        height: Pixel.getPixel(71), flexDirection: 'row'
    },
    rowBottomChildStyle: {
        height: Pixel.getPixel(71),
        flex: 1,
    },
    rowBottomLittleStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(16)
    },
    rowBottomBigStyle: {
        fontSize: Pixel.getFontPixel(16),
        marginTop: Pixel.getPixel(6)
    }
});
