/**
 * Created by hanmeng on 2017/5/8.
 * 采购订单
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager
} from  'react-native'

import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import NavigatorView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil'
import OrderScreeningScene from "./OrderScreeningScene";
import OrderSearchScene from "./OrderSearchScene";
import ProcurementOrderDetailScene from "./ProcurementOrderDetailScene";
import SalesOrderDetailScene from "./SalesOrderDetailScene";
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";

var Pixel = new PixelUtil();

export default class OrderListScene extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        this.orderListData = [];
        this.pageNum = 1;
        this.orderState = 0;
        this.startDate = '选择开始时间';
        this.endDate = '选择结束时间';
        //let business = this.props.business;
        this.state = {
            // ↓ ???
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        this.loadData();
    };

    loadData = () => {
        let url = AppUrls.ORDER_INDEX;
        this.pageNum = 1;
        request(url, 'post', {
            business: 0,
            page: this.pageNum,
            rows: 10
        }).then((response) => {
            this.orderListData = response.mjson.data.list;
            console.log('订单列表数据 = ', this.orderListData);
            if (this.orderListData.length) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.orderListData),
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
            console.log('请求错误 = ', error);
            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error'
            });
        });
    };

    render() {
        if (this.props.business === 0) {
            if (this.state.renderPlaceholderOnly !== 'success') {
                // 加载中....
                return ( <View style={styles.container}>
                    {this.loadView()}
                    <NavigatorView title='采购订单' backIconClick={this.backPage}
                                   renderRihtFootView={this.renderRihtFootView}/>
                </View>);
            } else {
                return (<View style={styles.container}>
                    <NavigatorView title='采购订单' backIconClick={this.backPage}
                                   renderRihtFootView={this.renderRihtFootView}/>
                    <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(84)}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow}
                              enableEmptySections={true}
                              renderSeparator={this._renderSeperator}/>
                </View>);
            }
        } else {
            if (this.state.renderPlaceholderOnly !== 'success') {
                // 加载中....
                return ( <View style={styles.container}>
                    {this.loadView()}
                    <NavigatorView title='销售订单' backIconClick={this.backPage}
                                   renderRihtFootView={this.renderRihtFootView}/>
                </View>);
            } else {
                return (<View style={styles.container}>
                    <NavigatorView title='销售订单' backIconClick={this.backPage}
                                   renderRihtFootView={this.renderRihtFootView}/>
                    <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(84)}}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow}
                              enableEmptySections={true}
                              renderSeparator={this._renderSeperator}/>
                </View>);
            }
        }
        //console.log('enderPlaceholderOnly===' + this.state.renderPlaceholderOnly);

    }

    renderRihtFootView = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'OrderSearchScene',
                            component: OrderSearchScene,
                            params: {}
                        });
                    }}
                    activeOpacity={0.9}
                >
                    <Image source={require('../../../images/mainImage/search_order.png')}/>
                </TouchableOpacity>
                {/*筛选*/}
                <TouchableOpacity
                    style={{marginLeft: Pixel.getPixel(10)}}
                    onPress={() => {
                        this.toNextPage({
                            name: 'OrderScreeningScene',
                            component: OrderScreeningScene,
                            params: {
                                business: this.props.business,
                                orderStage: this.props.orderStage,
                                orderState: this.orderState,
                                startDate: this.startDate,
                                endDate: this.endDate,
                                returnConditions: this.returnConditions
                            }
                        });
                    }}
                    activeOpacity={0.9}
                >
                    <Image source={require('../../../images/mainImage/screening.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    returnConditions = (newOrderState, newStartDate, newEndDate) => {
        console.log('newOrderState===' + newOrderState);
        console.log('newStartDate===' + newStartDate);
        console.log('newEndDate===' + newEndDate);
        this.orderState = newOrderState;
        this.startDate = newStartDate;
        this.endDate = newEndDate;
    };

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    _renderRow = (rowData, selectionID, rowID) => {
        //item 布局
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.props.business === 0) {
                        this.toNextPage({
                            name: 'ProcurementOrderDetailScene',
                            component: ProcurementOrderDetailScene,
                            params: {}
                        });
                    } else {
                        this.toNextPage({
                            name: 'SalesOrderDetailScene',
                            component: SalesOrderDetailScene,
                            params: {}
                        });
                    }
                }}
                activeOpacity={0.8}>
                <View style={styles.rowView}>
                    <View style={styles.rowTitleLine}>
                        <Text style={styles.rowTitleText}>中盛名车行</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                            color: fontAndColor.COLORA1,
                            marginLeft: Pixel.getPixel(5)
                        }}>(12332156743)</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.rowTitleState}>已拍下</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{flexDirection: 'row', height: Pixel.getPixel(104), alignItems: 'center'}}>
                        <Image style={styles.image}
                               source={{uri: 'http://dycd-static.oss-cn-beijing.aliyuncs.com/Uploads/Oss/201703/13/58c639474ef45.jpg?x-oss-process=image/resize,w_320,h_240'}}/>
                        <View style={{marginLeft: Pixel.getPixel(10)}}>
                            <Text>[北京]奔驰M级(进口) 2015款 M...</Text>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(10), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>里程：</Text>
                                <Text style={styles.carDescribe}>20.59万</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>上牌：</Text>
                                <Text style={styles.carDescribe}>2016-09-09</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(5), alignItems: 'center'}}>
                                <Text style={styles.carDescribeTitle}>标价：</Text>
                                <Text style={styles.carDescribe}>20.59万</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        height: Pixel.getPixel(40),
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                            color: fontAndColor.COLORA1,
                            marginLeft: Pixel.getPixel(145)
                        }}>成交价：</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0,
                            fontWeight: 'bold'
                        }}>13.90万</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                            color: fontAndColor.COLORA1,
                            marginLeft: Pixel.getPixel(25)
                        }}>订金：</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0,
                            fontWeight: 'bold'
                        }}>1.50万</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    rowView: {
        height: Pixel.getPixel(186),
        backgroundColor: 'white'
    },
    rowTitleLine: {
        alignItems: 'center',
        height: Pixel.getPixel(40),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //marginTop: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)
    },
    rowTitleText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: fontAndColor.COLORA0,
    },
    rowTitleState: {
        alignItems: 'flex-end',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB2,
        marginRight: Pixel.getPixel(15)
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    image: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        resizeMode: 'stretch'
    },
    carDescribeTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    carDescribe: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA0
    }
});