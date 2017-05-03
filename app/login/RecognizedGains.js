import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    InteractionManager,
    ScrollView,
    Image,
    ListView
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import LoginInputText from './component/LoginInputText';
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import MyButton from "../component/MyButton";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var Platform = require('Platform');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var imgSrc: '';
var imgSid: '';

var itemWidth = width;

var contents = [
    {name: "黑色", color: '#000000'},
    {name: "白色", color: '#E1E1E1'},
    {name: "银灰色", color: '#999999'},

];
export default class RecognizedGains extends BaseComponent {

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
                        centerText={"确认收据"}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.containerStyle}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"确认收据"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}
                />

                <ListView
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderFooter={this._renderFooter}
                />


            </View>
        );
    }

    _renderFooter = () => {
        return (
            <View>
                <Text style={{
                    color: FontAndColor.COLORA0,
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    fontSize: Pixel.getPixel(FontAndColor.CONTENTFONT24),
                    paddingTop: Pixel.getPixel(10),
                    paddingBottom: Pixel.getPixel(10),
                }}>注意：<Text style={{color: FontAndColor.COLORA1}}>请确保银行预留手机号码准确,短信验证码将发送给您银行银行预留手机号码。</Text></Text>

                <TouchableWithoutFeedback >
                    <View style={{
                        width: width,
                        paddingTop: Pixel.getPixel(15),
                        paddingBottom: Pixel.getPixel(15),
                        paddingLeft: Pixel.getPixel(15),
                        paddingRight: Pixel.getPixel(15),
                    }}>
                        <Text style={{fontSize: Pixel.getFontPixel(12), color: FontAndColor.COLORA2}}>
                            <Image style={{
                                width: Pixel.getPixel(45),
                                height: Pixel.getPixel(45),
                            }}
                                   source={require('./../../images/login/amou_choose.png')}/>
                            我已详细阅读并同意《债券转让协议及借款合同》
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确认申请'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                          }}/>
            </View>
        );
    }

    _renderRow = (data, sindex, rowID) => {
        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => this.finshPage(data)}>
                <Text style={[styles.itemIconStyle, {flex: 1}]}>{data.color}</Text>
                <Text style={styles.itemTextStyle}>{data.name}</Text>
            </TouchableOpacity>

        )
    }

    finshPage = (data) => {
        if (this.props.callBack) {
            this.props.callBack(data.name);
        }
        this.backPage();
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}/>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3
    },
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: FontAndColor.COLORA4,
    },
    itemStyel: {},
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: itemWidth - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        alignSelf: 'center'
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    listStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    itemStyle: {
        width: width,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15)
    },
    itemIconStyle: {
        width: 30,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
    },
    itemTextStyle: {
        // flex: 1,
        textAlign: 'center',
        marginRight: 5,
    },
    Separator: {
        height: Pixel.getPixel(1),
        backgroundColor: FontAndColor.COLORA3

    },
});