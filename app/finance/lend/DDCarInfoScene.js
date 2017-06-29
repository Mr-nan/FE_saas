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
    NativeModules,
    TouchableHighlight
} from "react-native";
import BaseComponent from "../../component/BaseComponent";
import NavigationView from '../../component/AllNavigationView';
import * as FontAndColor from "../../constant/fontAndColor";
import PixelUtil from "../../utils/PixelUtil";
import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";
import PurchasePickerItem from "../component/PurchasePickerItem";
import WebScene from "../../main/WebScene";
import SelectMaskComponent from "../../mine/employeeManage/SelectMaskComponent";
import ChooseButton from "../../component/ChooseButton";
import * as apis from "../../constant/appUrls";
import MyButton from '../../component/MyButton';
let results = [];
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var onePT = 1 / PixelRatio.get(); //一个像素
var Platform = require('Platform');
let childItems = [];
let DengJiRen = [];
export default class DDCarInfoScene extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: 'blank',
            chexing: "奥迪",
            chejia_number: "1234567890",
            dengjiren: "张三",
            sign_type: "线上",
            source: {},
        };
        this.xb = ['张三', '李四', '王五', '赵六'];
    }

    componentWillUnmount() {
        results = [];
        childItems = [];
    }

    initFinish = () => {
        this.getCarInfo();

    }

    /**
     * 获取订单融资车辆照片分类
     * getPurchaAutoPicCate
     **/
    getPurchaAutoPicCate = () => {
        let maps = {
            api: AppUrls.GETDINGDANAUTOPICCATE,

        };
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if(response.mjson.data.cate_list==null||response.mjson.data.cate_list.length<=0){
                this.setState({
                    source: ds.cloneWithRows(['10032']),
                    renderPlaceholderOnly: 'success'
                });
            }else{
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
                    renderPlaceholderOnly: 'success'
                });
            }

                }, (error) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    renderPlaceholderOnly: 'success',
                    source: ds.cloneWithRows(['10032']),
                });
                }
            )
    }


    /**
     * 获取车辆信息(车型，车架号)
     * getCarInfo
     */
    getCarInfo = () => {
        let maps = {
            api: apis.AUTODETAIL,
            info_id: this.props.info_id,
            platform_order_number: this.props.platform_order_number,
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                this.getBusinessList();

            }, (error) => {

            });
    }


    /**
     * 获取商户登记人/收车人列表
     * getBusinessList
     */
    getBusinessList = () => {
        let maps = {
            api: apis.GETBUSINESSLIST,
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                for (let i = 0; i < response.mjson.data.reg_user_list.length; i++) {
                    this.xb.push({
                        name: response.mjson.data.reg_user_list[i].name,
                        id: response.mjson.data.reg_user_list[i].id,
                        merge_id: response.mjson.data.reg_user_list[i].merge_id,
                    });
                    DengJiRen.push(
                        {
                            name: response.mjson.data.reg_user_list[i].name,
                        }
                    )
                }
                this.getPurchaAutoPicCate();
            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'error'
                });
            });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <View style={{
                    width: width,
                    flexDirection: 'column',
                    flex: 1,
                    marginTop: Pixel.getTitlePixel(69)
                }}>
                    {this._renderSectionHeader()}
                    {
                        this.state.renderPlaceholderOnly ? null :
                            <ListView
                                dataSource={this.state.source}
                                renderRow={this._renderRow}
                                renderSeparator={this._renderSeparator}
                            />
                    }

                </View>

                {/* 蒙版选择器 */}
                <SelectMaskComponent viewData={[]} onClick={(rowID) => {
                    this.refs.djr.changeRightText(DengJiRen[rowID]);
                }}
                                     ref={(modal) => {
                                         this.selectModal = modal
                                     }}/>

                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'完成'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={() => {
                              alert("完成")
                          }}/>
                <NavigationView
                    title="车辆信息"
                    backIconClick={this.backPage}
                />
            </View>
        )
    }

    _renderRow = (movie, sectionId, rowId) => {
        if(movie=='10032'){
            return (<View></View>);
        }
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
            <View style={styles.Separator} key={sectionId + rowId}/>
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

                <ChooseButton ref="djr" leftText={'登记人'} onPressButton={this.onPressButton}/>

                <View style={{backgroundColor: FontAndColor.COLORA4, width: width, height: Pixel.getPixel(1)}}/>

                <View style={styles.itemBackground}>
                    <Text style={styles.leftFont}>
                        <Text style={{color: FontAndColor.COLORB2}}>*</Text>权属声明签署方式</Text>
                    <View style={styles.fillSpace}/>
                    <Text style={styles.headerCellRight}>{this.state.sign_type}</Text>
                </View>

                <View style={{backgroundColor: FontAndColor.COLORA3, width: width, height: Pixel.getPixel(10)}}/>

            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: FontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="车辆信息"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    onPressButton = () => {

        this._openModal(DengJiRen);
    }

    _openModal = (dt) => {
        this.selectModal.changeData(dt);
        this.selectModal.openModal();
        this.currentData = dt;
    }
}

const styles = StyleSheet.create({
    headerALL: {
        width: width,
    },
    headerCell: {},
    headerCellLeft: {},
    headerCellRight: {},
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
        borderColor: FontAndColor.COLORB0,
        borderWidth: 1,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Pixel.getPixel(12),
        marginBottom: Pixel.getPixel(12),
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
    buttonStyleFill: {
        height: Pixel.getPixel(40),
        backgroundColor: FontAndColor.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: Pixel.getPixel(width) - Pixel.getPixel(20),
    },
    buttonsFlex: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(width) - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
})