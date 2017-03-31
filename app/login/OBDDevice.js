import React, {Component} from "react";
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
    Image
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import MyButton from "../component/MyButton";
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import PurchasePickerItem from "../finance/component/PurchasePickerItem";
import DeviceNumber from './DeviceNumber';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var onePT = 1 / PixelRatio.get(); //一个像素
var Platform = require('Platform');
const childItems = [];
export default class OBDDevice extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            values: "",//输入框输入内容
            obd_number: "",
            boundState: "未绑定",
            source: {},
        };
        this.bind_type = -1;
    }

    defaultProps = {
        payment_number: 123456789,
    }

    initFinish = () => {
        this.getPurchaAutoPicCate();
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
                        centerText={"OBD设备"}
                        rightText={"安装说明"}/>
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"OBD设备"}
                    rightText={"安装说明"}
                    rightTextCallBack={() => {
                        alert(this.state.source == {})
                    }}
                    leftImageCallBack={this.backPage}/>

                <View style={{
                    width: width,
                    height: Pixel.getPixel(57),
                    flexDirection: 'row',
                    backgroundColor: '#FFF8EA',
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{width: Pixel.getPixel(18), height: Pixel.getPixel(18), marginTop: Pixel.getPixel(-13)}}
                        source={require('./../../images/login/tanhao.png')}/>

                    <Text style={{
                        flex: 1,
                        color: FontAndColor.COLORB2,
                        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
                        marginLeft: Pixel.getPixel(15),
                        fontWeight: 'bold'
                    }}>提示：<Text style={{fontWeight: 'normal'}}>请将OBD设备安装后进行检测，绑定失败或2015年以前的车请进行手动绑定。</Text></Text>
                </View>
                <View style={{
                    marginTop: Pixel.getPixel(10),
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    backgroundColor: '#ffffff',
                    width: width,
                    height: Pixel.getPixel(44),
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: FontAndColor.COLORA0,
                        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
                    }}>绑定状态</Text>
                    <Text
                        style={this.state.boundState == "未绑定" ? styles.boundStateStyle : styles.boundSuccessStyle}>
                        {this.state.boundState == "未绑定" ? "未绑定" : "已绑定"}</Text>
                </View>
                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>
                <View style={{
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    backgroundColor: '#ffffff',
                    width: width,
                    height: Pixel.getPixel(44),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: FontAndColor.COLORA0,
                        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
                    }}>设备号</Text>
                    {
                        this.state.obd_number ?
                            <Text style={{
                                color: FontAndColor.COLORA0,
                                fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30),
                                textAlign: 'right',
                                flex: 1
                            }}>{this.state.obd_number}</Text>
                            :
                            <Text style={{
                                color: FontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30),
                                textAlign: 'right',
                                flex: 1
                            }}>请输入</Text>
                    }

                </View>
                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>
                <View style={{
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15),
                    backgroundColor: '#ffffff',
                    width: width,
                    height: Pixel.getPixel(70),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{flex: 1}}/>
                    <MyButton buttonType={MyButton.TEXTBUTTON} content="检测"
                              parentStyle={this.state.obd_number ? styles.buttonSelectStyle : styles.buttonStyle}
                              childStyle={this.state.obd_number ? styles.buttonTextSelectStyle : styles.buttonTextStyle}
                              mOnPress={() => {
                                  this.checkOBD(1);
                              }}/>
                    <View style={{width: Pixel.getPixel(22)}}/>
                    <MyButton buttonType={MyButton.TEXTBUTTON} content="手动绑定" parentStyle={styles.buttonStyle}
                              childStyle={styles.buttonTextStyle} mOnPress={() => {
                        this.toNextPage({
                            name: 'DeviceNumber',
                            component: DeviceNumber,
                            params: {
                                callBack: (obd_number) => {
                                    this.setState({
                                        obd_number: obd_number,
                                    });
                                }
                            },
                        })
                    }}/>
                </View>
                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>

                <View style={{
                    width: width,
                    flexDirection: 'column',
                    flex: 1,
                    marginTop: Pixel.getPixel(15)
                }}>
                    <Text style={{
                        backgroundColor: '#FFFFFF',
                        color: FontAndColor.COLORA0,
                        paddingLeft: Pixel.getPixel(15),
                        paddingRight: Pixel.getPixel(15),
                        paddingTop: Pixel.getPixel(15),
                    }}>OBD设备照片</Text>
                    {
                        this.state.source ?
                            <ListView
                                dataSource={this.state.source}
                                renderRow={this._renderRow}
                                renderSeparator={this._renderSeparator}/>
                            : null
                    }

                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'完成'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this.submit}/>
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <PurchasePickerItem items={movie} childList={childItems[rowId]}/>
        )
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    // 绑定OBD设备
    submit = () => {
        let maps = {
            api: AppUrls.BINDOBD,
            bind_type: "2",
            file_list: JSON.stringify(childItems),
            info_id: "12345678",
            obd_number: this.state.obd_number,
        };
        this.props.showModal(true);
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    this.props.showToast("OBD绑定成功");
                    this.backPage();
                }, (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("网络请求失败");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                }
            )
    }

    // 检测OBD设备号
    checkOBD = (bind_type) => {
        let maps;
        if (bind_type == 1) {
            maps = {
                api: AppUrls.AUTODETECTOBD,
                frame_number: "LBEHDAEB58Y038860",
            };
        } else {
            maps = {
                api: AppUrls.AUTODETECTOBD,
                frame_number: "LBEHDAEB58Y038860",
                obd_number: this.state.obd_number,
            };
        }
        this.props.showModal(true);
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    this.props.showToast("OBD检测成功");
                    if (bind_type == 1) {
                        this.bind_type = 1;
                    } else {
                        this.bind_type = 2;
                    }
                    this.setState({
                        boundState: '已绑定',
                        obd_number: response.mjson.retdata.obd_number,
                    });
                }, (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("网络请求失败");
                    } else {
                        this.setState({
                            boundState: '未绑定',
                            obd_number: ''
                        });
                        this.props.showToast(error.mjson.msg + "");
                    }
                }
            )
    }

    // 获取采购贷车辆照片分类
    getPurchaAutoPicCate = () => {
        let maps = {
            api: AppUrls.GETPURCHAAUTOPICCATE,
            source_type: '3',
            archives_status: '2',
        };
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    for (let i = 0; i < response.mjson.data.cate_list.length; i++) {
                        childItems.push({
                            code: response.mjson.data.cate_list[i].code,
                            id: response.mjson.data.cate_list[i].id,
                            list: []
                        });
                    }
                    this.setState({
                        source: ds.cloneWithRows(response.mjson.data.cate_list),
                        renderPlaceholderOnly: false
                    });
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
        alignItems: 'center'
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
    },
    buttonStyle: {
        borderColor: FontAndColor.COLORB0,
        borderWidth: 1,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Pixel.getPixel(12),
        marginBottom: Pixel.getPixel(12),
    },
    buttonTextStyle: {
        fontSize: Pixel.getFontPixel(18),
        color: FontAndColor.COLORB0,
    },
    buttonSelectStyle: {
        borderColor: FontAndColor.COLORA2,
        borderWidth: 1,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Pixel.getPixel(12),
        marginBottom: Pixel.getPixel(12),
    },
    buttonTextSelectStyle: {
        fontSize: Pixel.getFontPixel(18),
        color: FontAndColor.COLORA2,
    },
    imageButtonStyle: {
        width: Pixel.getPixel(78),
        height: Pixel.getPixel(58),
    },
    myButtonStyle: {
        marginBottom: Pixel.getPixel(10),
    },
    myImageButtonStyle: {
        width: Pixel.getPixel(78),
        height: Pixel.getPixel(58),
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(20),
        marginBottom: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    itemStyel: {flex: 1},
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30),
    },
    boundStateStyle: {
        flex: 1,
        color: FontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
        textAlign: 'right'
    },
    boundSuccessStyle: {
        flex: 1,
        color: FontAndColor.COLORB0,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
        textAlign: 'right'
    },
    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})
