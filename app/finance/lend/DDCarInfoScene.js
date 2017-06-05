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
    Image,
    NativeModules
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import NavigationBar from "../../component/NavigationBar";
import * as FontAndColor from "../../constant/fontAndColor";
import PixelUtil from "../../utils/PixelUtil";
import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";
import PurchasePickerItem from "../component/PurchasePickerItem";
import DeviceNumber from './DeviceNumber';
import WebScene from '../../main/WebScene';
let results = [];
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var onePT = 1 / PixelRatio.get(); //一个像素
var Platform = require('Platform');
let childItems = [];

export default class DDCarInfoScene extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            chexing: "奥迪",
            chejia_number: "1234567890",
            dengjiren: "张三",
            sign_type: "线上",

            source:{},
        };
        // this.bind_type = 1;
        // this.fromScene_type = "DDCarInfoScene";

    }
    componentWillUnmount() {
        results = [];
        childItems = [];
    }
    initFinish = () => {
        this.getPurchaAutoPicCate();
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
                    //下面的判断，是用来显示编辑状态下的界面，从上一界面带过来的数据
                    // if (this.props.carData.obd_bind_status == '1') {
                    //     for (let i = 0; i < childItems.length; i++) {
                    //         for (let j = 0; j < this.props.carData.file_list.length; j++) {
                    //             if (childItems[i].code == this.props.carData.file_list[j].code) {
                    //                 childItems[i].list.push({
                    //                     url: this.props.carData.file_list[j].icon,
                    //                     fileId: this.props.carData.file_list[j].file_id
                    //                 });
                    //                 results.push({
                    //                     code: this.props.carData.file_list[j].code,
                    //                     code_id: this.props.carData.file_list[j].id,
                    //                     file_id: this.props.carData.file_list[j].file_id
                    //                 });
                    //             }
                    //         }
                    //     }
                    //
                    // }
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
    render() {
        return(
            <View style={styles.container}>

                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"车辆信息"}
                    rightText={""}
                    rightTextCallBack={() => {

                        this.toNextPage({
                            name: 'WebScene',
                            component: WebScene,
                            params: {webUrl: "http://h5.bms.dycd.com/installation.html"}
                        })
                    }}
                    leftImageCallBack={this.backPage}/>


                <View style={{
                    width: width,
                    flexDirection: 'column',
                    flex: 1,
                    marginTop: Pixel.getPixel(0)
                }}>
                    {
                        this.state.renderPlaceholderOnly ?
                            null :
                            <ListView
                                dataSource={this.state.source}
                                renderRow={this._renderRow}
                                renderSeparator={this._renderSeparator}
                                renderSectionHeader={this._renderSectionHeader}
                            />

                    }

                </View>
            </View>

        )


    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <PurchasePickerItem results={results} showModal={(value) => {
                this.props.showModal(value)
            }}
                                showToast={(value) => {
                                    this.props.showToast(value)
                                }} items={movie} childList={childItems[rowId]}/>
        )
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }
    _renderSectionHeader = (sectionData, sectionID) => {

        return (
            <View style={styles.headerALL}>
                <View style={styles.itemBackground}>
                    <Text style={styles.leftFont}>车型</Text>
                    <View style={styles.fillSpace}/>
                    <Text style={styles.headerCellRight}>{this.state.chexing}</Text>

                </View>

                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>

                <View style={styles.itemBackground}>
                    <Text style={styles.leftFont}>车架号</Text>
                    <View style={styles.fillSpace}/>
                    <Text style={styles.headerCellRight}>{this.state.chejia_number}</Text>

                </View>

                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>

                <View style={styles.itemBackground}>
                    <Text style={styles.leftFont}>
                        <Text style={{color :FontAndColor.COLORB2}}>
                        *
                        </Text>
                        登记人
                    </Text>
                    <View style={styles.fillSpace}/>
                    <Text style={styles.headerCellRight}>{this.state.dengjiren}</Text>

                </View>

                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>

                <View style={styles.itemBackground}>
                    <Text style={styles.leftFont}>
                        <Text style={{color : FontAndColor.COLORB2}}>
                            *
                        </Text>
                    权属声明签署方式
                    </Text>
                    <View style={styles.fillSpace}/>
                    <Text style={styles.headerCellRight}>{this.state.sign_type}</Text>

                </View>

                <View style={{backgroundColor: FontAndColor.COLORA3, width: width, height: Pixel.getPixel(10)}}/>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerALL:{
        width:width,
        height:4*Pixel.getPixel(44),
        backgroundColor:'red',
    },
    headerCell:{

    },
    headerCellLeft:{

    },
    headerCellRight:{

    },
    fillSpace: {
        flex: 1
    },
    itemBackground: {
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: 'white',
        paddingHorizontal: Pixel.getPixel(15),
        alignItems: 'center'
    },
    leftFont: {
        fontSize: Pixel.getFontPixel(14),
        color: 'black'
    },
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: FontAndColor.COLORA3,
        alignItems: 'center'
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
    loginBtnEnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: "#69DCDA",
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
    boundStateStyle: {
        flex: 1,
        color: FontAndColor.COLORB2,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
        textAlign: 'right'
    },
    boundSuccessStyle: {
        flex: 1,
        color: FontAndColor.COLORB0,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
        textAlign: 'right'
    },
    Separator: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(1),
    },
})