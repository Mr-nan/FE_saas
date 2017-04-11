import React, {Component,} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    InteractionManager,
    ListView,
    PixelRatio,
    TextInput,
    Image,
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import NavigationBar from "../../component/NavigationBar";
import * as FontAndColor from "../../constant/fontAndColor";
import PixelUtil from "../../utils/PixelUtil";
import MyButton from '../../component/MyButton';
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var onePT = 1 / PixelRatio.get(); //一个像素
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var contents = [
    {name: "艾迪十多个我考吗率扩", des: "初评放款额", color: '#000000'},
    {name: "艾迪十多个我考吗率扩", des: "初评放款额", color: '#E1E1E1'},
    {name: "艾迪十多个我考吗率扩", des: "初评放款额", color: '#999999'},
    {name: "艾迪十多个我考吗率扩", des: "初评放款额", color: '#707070'},
    {name: "艾迪十多个我考吗率扩", des: "初评放款额", color: '#FF0000'},
];

let map = new Map();
export default class AmountConfirm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            source: ds.cloneWithRows(contents),
            values: "",//输入框输入内容
        };
    }

    defaultProps = {
        payment_number: 123456789,
    }
    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getAutoList();
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={"确认金额"}
                        rightText={""}/>
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"确认金额"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}/>

                <View style={{
                    width: width,
                    height: 40,
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)}}>借款单号</Text>
                    <Text style={{
                        flex: 1,
                        textAlign: 'right',
                        color: FontAndColor.COLORA0,
                        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
                    }}>{this.props.payment_number}</Text>
                </View>

                <Text style={{
                    color: FontAndColor.COLORA1,
                    fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
                    marginLeft: Pixel.getPixel(15),
                    marginTop: Pixel.getPixel(10),
                    marginBottom: Pixel.getPixel(10),
                }}>融资车辆</Text>

                <ListView
                    initialListSize={3}
                    stickyHeaderIndices={[]}
                    onEndReachedThreshold={1}
                    scrollRenderAheadDistance={1}
                    pageSize={3}
                    contentContainerStyle={styles.listStyle}
                    dataSource={this.state.source}
                    style={{
                        backgroundColor: '#ffffff'
                    }}
                    renderRow={this._renderRow}
                />

                <View style={{
                    width: width,
                    height: Pixel.getPixel(36),
                    backgroundColor: '#fff8ea',
                    flexDirection: 'row',
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    alignItems: 'center',
                }}>
                    <Text style={styles.bottomItemTextStyle}>您采购的</Text>
                    <Text style={[styles.bottomItemTextStyle, {fontWeight: 'bold'}]}>1辆</Text>
                    <Text style={styles.bottomItemTextStyle}>车辆最高融资为</Text>
                    <Text style={[styles.bottomItemTextStyle, {fontWeight: 'bold'}]}>100万元，</Text>
                    <Text style={styles.bottomItemTextStyle}>请确认借款金额。</Text>
                </View>

                <View style={{width: width, height: onePT, backgroundColor: FontAndColor.COLORA4}}/>

                <View style={{
                    width: width,
                    height: Pixel.getPixel(50),
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT), color: FontAndColor.COLORA0}}>借款金额：</Text>
                    <TextInput
                        ref="inputText"
                        underlineColorAndroid={"#00000000"}
                        placeholderTextColor={FontAndColor.COLORA4}
                        placeholder={'0.00'}
                        style={{
                            flex: 1,
                            fontWeight: 'bold',
                            fontSize: Pixel.getFontPixel(22),
                            color: FontAndColor.COLORA0,
                        }}
                        value={this.state.values}
                        onChangeText={(text) => {
                            this.setState({
                                values: text
                            });
                        }}/>
                    <Text style={{
                        flex: 2,
                        fontWeight: 'bold',
                        fontSize: Pixel.getFontPixel(22),
                        color: FontAndColor.COLORA0
                    }}>万元</Text>
                    <MyButton buttonType={MyButton.TEXTBUTTON} content="确认" parentStyle={styles.buttonStyle}
                              childStyle={styles.buttonTextStyle} mOnPress={() => {
                        this.makeSure();
                    }}/>
                </View>
            </View>
        );
    }

    _renderRow = (data, sindex, rowID) => {
        return (
            <TouchableOpacity onPress={() => this.finshPage(data, rowID)}>
                <View style={styles.itemStyle}>
                    {typeof(map.get(rowID)) == 'undefined' ?
                        <Image source={require("./../../../images/login/amou_unchoose.png")}
                               style={styles.itemIconStyle}/>
                        :
                        <Image source={require("./../../../images/login/amou_choose.png")}
                               style={styles.itemIconStyle}/>
                    }
                    <View style={{flex: 1, marginLeft: Pixel.getPixel(15)}}>
                        <Text style={styles.itemTextStyle}>{data.name}</Text>
                        <Text style={[styles.itemTextStyle, {
                            color: FontAndColor.COLORA1,
                            fontSize: FontAndColor.CONTENTFONT
                        }]}>
                            {data.des + " : "}
                            <Text style={{color: FontAndColor.COLORB2, fontSize: FontAndColor.CONTENTFONT}}>
                                25万
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    finshPage = (data, rowID) => {
        if (typeof(map.get(rowID)) == 'undefined') {
            map.set(rowID, data);
        } else {
            map.delete(rowID);
        }
        this.setState({
            source: ds.cloneWithRows(contents),
        });
    }


    //  获取采购贷车辆列表
    getAutoList = () => {
        let maps = {
            api: AppUrls.PURCHAAUTOAUTOLIST,
            payment_number: 201703200008/*this.props.loan_code*/,
        };
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showToast("数据请求成功");
                }, (error) => {
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("网络请求失败");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                }
            )
    }

    //  采购贷确认借款金额
    makeSure = () => {
        let inputText = this.refs.inputText.getInputTextValue();
        let maps = {
            car_lists: "",
            loan_code: this.props.loan_code,
            loan_mny: inputText,
            api: AppUrls.ACCOUNTCONFIRM_AMOUNT,
        };
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showToast("OBD检测成功");
                    this.backPage();
                }, (error) => {
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("网络请求失败");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                }
            )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3,
    },
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: 'white',
        backgroundColor: FontAndColor.COLORA3,
    },
    listStyle: {
        // justifyContent: 'flex-start',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignItems: 'flex-start',
    },
    itemStyle: {
        width: width,
        height: Pixel.getPixel(75),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: Pixel.getPixel(1),
        borderBottomColor: FontAndColor.COLORA4,
        justifyContent: 'center',

    },
    itemIconStyle: {
        width: 25,
        height: 25,
        marginLeft: 15,
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: FontAndColor.COLORB0,
        borderWidth: Pixel.getPixel(1),
    },
    itemTextStyle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA0,
        paddingTop: Pixel.getPixel(2),
        paddingBottom: Pixel.getPixel(2),
    },
    buttonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    buttonStyle: {
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        backgroundColor: FontAndColor.COLORB0,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomItemTextStyle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORB2
    }
})
