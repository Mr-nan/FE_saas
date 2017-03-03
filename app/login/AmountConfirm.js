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
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import MyButton from '../component/MyButton';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var onePT = 1 / PixelRatio.get(); //一个像素
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var contents = [
    {name: "黑色", des: "xxxxxxxxxxxx", color: '#000000'},
    {name: "白色", des: "xxxxxxxxxxxx", color: '#E1E1E1'},
    {name: "银灰色", des: "xxxxxxxxxxxx", color: '#999999'},
    {name: "深灰色", des: "xxxxxxxxxxxx", color: '#707070'},
    {name: "红色", des: "xxxxxxxxxxxx", color: '#FF0000'},
];

let map = new Map();
export default class AmountConfirm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            source: ds.cloneWithRows(contents),
        };
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
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
                    }}>12345678765</Text>
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
                    bounces={false}/>

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
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: Pixel.getFontPixel(22),
                        color: FontAndColor.COLORA4
                    }}>000</Text>
                    <Text style={{
                        flex: 1,
                        fontWeight: 'bold',
                        fontSize: Pixel.getFontPixel(22),
                        color: FontAndColor.COLORA0
                    }}>万元</Text>
                    <MyButton buttonType={MyButton.TEXTBUTTON} content="确认" parentStyle={styles.buttonStyle}
                              childStyle={styles.buttonTextStyle} mOnPress={() => {
                        alert("确定")

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
                        <View style={styles.itemIconStyle}/>
                        : <View style={[styles.itemIconStyle, {borderColor: FontAndColor.COLORA1}]}/>
                    }
                    <View style={{flex: 1, marginLeft: Pixel.getPixel(15)}}>
                        <Text style={styles.itemTextStyle}>{data.name}</Text>
                        <Text style={[styles.itemTextStyle, {color: FontAndColor.COLORA1}]}>{data.des}</Text>
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
        height: Pixel.getPixel(60),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: Pixel.getPixel(1),
        borderBottomColor: FontAndColor.COLORA4,
        justifyContent: 'center',

    },
    itemIconStyle: {
        width: 30,
        height: 30,
        marginLeft: 15,
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: FontAndColor.COLORB0,
        borderWidth: Pixel.getPixel(1),
    },
    itemTextStyle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA0
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
