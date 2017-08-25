/**
 * Created by hanmeng on 2017/8/7.
 */
import  React, {Component, PropTypes} from  'react'
import  {
    View,
    TextInput,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from  'react-native'

import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
import {request} from '../../utils/RequestUtil';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from "../../component/BaseComponent";
import NavigationView from '../../component/AllNavigationView';
import * as AppUrls from '../../constant/appUrls';
import {ClientAddTimeSelectView} from "../StoresReception/component/ClientAddTimeSelectView";
import ClientSearchScene from "../StoresReception/ClientSearchScene";
import {ClientScreeningSelectButton} from "../StoresReception/component/ClientScreeningSelectButton";
import {ClientStateSelectView} from "./component/ClientStateSelectView";
import KeepCustomerDetailScene from "./KeepCustomerDetailScene";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
const {width, height} = Dimensions.get('window');


export default class KeepCustomerManageScene extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.keepCustomerList = [];
        this.timeSelect = '今天';
        this.stateSelect = '待完善客户';
        this.selectMonth = '选择月份';
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            addTimeHide: false,
            selectFilterHide: false,
            loadingMarginTop: Pixel.getPixel(-30),
        };
    }

    /**
     *  页面初始化
     **/
    initFinish = () => {
/*        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['', '', '', '1', '', '1', '', '', '']),
            renderPlaceholderOnly: 'success'
        });*/
        this.loadData();
    };

    /**
     *   数据请求
     **/
    loadData = () => {
        StorageUtil.mGetItem(StorageKeyNames.PHONE, (data) => {
            if (data.code == 1 && data.result != null) {
                let maps = {
                    mobile: data.result,
                    perfectStatus: 2,
                    pc: 1,
                    times: 3,
                    mouth: ''
                };
                let url = AppUrls.TENURE_PERFECT_IF_LIST;
                request(url, 'post', maps).then((response) => {
                    this.props.showModal(false);
                    this.keepCustomerList = response.mjson.data.record.beanlist;
                    if (this.keepCustomerList && this.keepCustomerList.length > 0) {
                        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(this.keepCustomerList),
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success'
                        });
                    } else {
                        this.setState({
                            isRefreshing: false,
                            renderPlaceholderOnly: 'null'
                        });
                    }
                }, (error) => {
                    this.props.showModal(false);
                    this.setState({
                        isRefreshing: false,
                        renderPlaceholderOnly: 'error'
                    });
                });
            } else {
                this.props.showToast('查询账户信息失败');
            }
        });
    };

    /**
     *
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return (
                <View style={styles.container}>
                    <NavigationView
                        backIconClick={this.backPage}
                        title="保有客户管理"
                        renderRihtFootView={this._navigatorRightView}/>
                    <Image style={{
                        marginTop: Pixel.getTitlePixel(64),
                        height: Pixel.getPixel(40),
                        width: width,
                        flexDirection: 'row'
                    }}
                           source={require('../../../images/carSourceImages/bottomShaow.png')}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <ClientScreeningSelectButton
                                style={{flex: 1}}
                                ref={(ref) => {
                                    this.btn1 = ref
                                }} title={this.timeSelect} index={1} btnClick={this.selectAddTime}/>
                        </View>
                        <View style={styles.lineView}>
                            <View style={styles.line}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <ClientScreeningSelectButton
                                style={{flex: 1}}
                                ref={(ref) => {
                                    this.btn2 = ref
                                }} title={this.stateSelect} index={2} btnClick={this.selectFilterItems}/>
                        </View>
                    </Image>
                    {this.loadView()}
                    {this.state.addTimeHide && <ClientAddTimeSelectView hideView={this.selectAddTime}
                                                                        selectMonth={this.selectMonth}
                                                                        updateMonth={this.updateMonth}
                                                                        currentSelect={this.timeSelect}
                                                                        callBack={this.updateTimeSelect}/>}

                    {this.state.selectFilterHide &&
                    <ClientStateSelectView hideView={this.selectFilterItems}
                                           currentSelect={this.stateSelect}
                                           callBack={this.updateStateSelect}/>}
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <NavigationView
                        backIconClick={this.backPage}
                        title="保有客户管理"
                        renderRihtFootView={this._navigatorRightView}/>
                    {/*<ClientScreeningHeadView ref="headView"/>*/}
                    <Image style={{
                        marginTop: Pixel.getTitlePixel(64),
                        height: Pixel.getPixel(40),
                        width: width,
                        flexDirection: 'row'
                    }}
                           source={require('../../../images/carSourceImages/bottomShaow.png')}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <ClientScreeningSelectButton
                                style={{flex: 1}}
                                ref={(ref) => {
                                    this.btn1 = ref
                                }} title={this.timeSelect} index={1} btnClick={this.selectAddTime}/>
                        </View>
                        <View style={styles.lineView}>
                            <View style={styles.line}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <ClientScreeningSelectButton
                                style={{flex: 1}}
                                ref={(ref) => {
                                    this.btn2 = ref
                                }} title={this.stateSelect} index={2} btnClick={this.selectFilterItems}/>
                        </View>
                    </Image>
                    <ListView style={{backgroundColor: fontAndColor.COLORA3}}
                              dataSource={this.state.dataSource}
                              removeClippedSubviews={false}
                              renderRow={this._renderRow}
                              enableEmptySections={true}
                              renderSeparator={this._renderSeperator}/>
                    {this.state.addTimeHide && <ClientAddTimeSelectView hideView={this.selectAddTime}
                                                                        selectMonth={this.selectMonth}
                                                                        updateMonth={this.updateMonth}
                                                                        currentSelect={this.timeSelect}
                                                                        callBack={this.updateTimeSelect}/>}

                    {this.state.selectFilterHide &&
                    <ClientStateSelectView hideView={this.selectFilterItems}
                                           currentSelect={this.stateSelect}
                                           callBack={this.updateStateSelect}/>}
                </View>
            );
        }
    }

    /**
     *
     **/
    updateTimeSelect = (newTime) => {
        this.timeSelect = newTime;
        this.selectAddTime();
        this.btn1.setTitle(this.timeSelect);
        this.selectMonth = '选择月份';
    };

    /**
     *
     * @param newMonth
     **/
    updateMonth = (newMonth) => {
        this.selectMonth = newMonth;
        this.selectAddTime();
        this.btn1.setTitle(this.selectMonth);
        this.timeSelect = '';
    };

    /**
     *
     **/
    updateStateSelect = (newState) => {
        this.stateSelect = newState;
        this.selectFilterItems();
        this.btn2.setTitle(this.stateSelect);
    };

    /**
     *  listView间隔线
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    /**
     *  _renderRow
     **/
    _renderRow = (rowData, selectionID, rowID) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.toNextPage({
                        name: 'KeepCustomerDetailScene',
                        component: KeepCustomerDetailScene,
                        params: {
                            tid: rowData.tid,
                            tcid: rowData.tcid
                        }
                    });
                }}
                activeOpacity={0.9}
            >
                <View style={{
                    height: Pixel.getPixel(125),
                    backgroundColor: '#ffffff'
                }}>
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{
                            marginTop: Pixel.getPixel(20),
                            width: width - Pixel.getPixel(30),
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0
                        }}>{rowData.tenureCarname}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: Pixel.getPixel(8),
                            marginLeft: Pixel.getPixel(15),
                            alignItems: 'center',
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                color: fontAndColor.COLORA1
                            }}>成交时间:{rowData.saleTime}</Text>
                        <View style={{flex: 1}}/>
                        <Text
                            allowFontScaling={false}
                            style={{
                                marginRight: Pixel.getPixel(15),
                                fontSize: Pixel.getFontPixel(19),
                                color: fontAndColor.COLORB2
                            }}>14.8万</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={{backgroundColor: fontAndColor.COLORA4, height: 1}}/>
                    {rowData.custName != null && rowData.custPhone != null &&
                    <View style={{height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center'}}>
                        <Text allowFontScaling={false} style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0
                        }}>购车人:{rowData.custName}</Text>
                        <View style={{flex: 1}}/>
                        <Text allowFontScaling={false} style={{
                            marginRight: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0
                        }}>手机号:{rowData.custPhone}</Text>
                    </View>}
                    {(rowData.custName == null || rowData.custPhone == null) &&
                    <View style={{
                        height: Pixel.getPixel(44),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <View style={[styles.expButton, {marginRight: Pixel.getPixel(15)}]}>
                            <Text allowFontScaling={false} style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORB0
                            }}>完善资料</Text>
                        </View>
                    </View>}
                </View>
            </TouchableOpacity>
        )
    }

    /**
     *  筛选项选择
     **/
    selectFilterItems = () => {
        this.setState({
            addTimeHide: false,
            selectFilterHide: !this.state.selectFilterHide
        });
    };

    /**
     *  时间选择
     **/
    selectAddTime = () => {
        this.setState({
            addTimeHide: !this.state.addTimeHide,
            selectFilterHide: false
        });
    };

    /**
     *
     **/
    _navigatorRightView = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'ClientSearchScene',
                            component: ClientSearchScene,
                            params: {
                                business: this.props.business,
                                status: this.status,
                            }
                        });
                    }}
                    activeOpacity={0.9}
                >
                    <Image source={require('../../../images/mainImage/search_order.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },
    selectView: {
        //top: Pixel.getTitlePixel(90),
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: 0,
    },
    lineView: {
        width: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },
    line: {
        height: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORA3,
    },
    expButton: {
        width: Pixel.getPixel(88),
        height: Pixel.getPixel(27),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
});
