/**
 * Created by hanmeng on 2017/5/11.
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    ListView,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions,
    NativeModules,
    TextInput
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import InputAmountScene from "./InputAmountScene";
import InputVinInfo from "./InputVinInfo";
const Pixel = new PixelUtil();

const IS_ANDROID = Platform.OS === 'android';

export default class SalesOrderDetailScene extends BaseComponent {

    constructor(props) {
        super(props);
        let mList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.modelData = [];
        this.scanType = [{model_name: '扫描前风挡'}, {model_name: '扫描行驶证'}, {model_name: '手动输入'}];

        this.state = {
            source: ds.cloneWithRows(mList)
        }
    }

    //扫描
    _scanPress = () => {
        this.vinModal.refresh(this.scanType);
        this.vinModal.openModal(1);
    };

    _vinPress = (mType, index) => {
        if (mType === 0) {
            this.modelInfo['brand_id'] = this.modelData[index].brand_id;
            this.modelInfo['model_id'] = this.modelData[index].model_id;
            this.modelInfo['series_id'] = this.modelData[index].series_id;
            this.modelInfo['model_year'] = this.modelData[index].model_year;
            this.modelInfo['model_name'] = this.modelData[index].model_name;
            //this._insertVinAndModel(this.vin, JSON.stringify(this.modelInfo), this.modelInfo['model_name']);
        } else if (mType === 1) {
            if (IS_ANDROID === true) {
                NativeModules.VinScan.scan(parseInt(index)).then((vl) => {
                    this.vinInput.setNativeProps({
                        text: vl
                    });
                    this._onVinChange(vl);
                }, (error) => {
                });
            } else {
                this.timer = setTimeout(
                    () => {
                        NativeModules.VinScan.scan(parseInt(index)).then((vl) => {
                            this.vinInput.setNativeProps({
                                text: vl
                            });
                            this._onVinChange(vl);
                        }, (error) => {
                        });
                    },
                    500
                );
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <InputVinInfo viewData={this.modelData} vinPress={this._vinPress} ref={(modal) => {
                    this.vinModal = modal
                }} navigator={this.props.navigator}/>
                <NavigatorView title='订单详情' backIconClick={this.backPage}/>
                <ListView
                    style={{marginTop: Pixel.getPixel(73)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeperator}
                    showsVerticalScrollIndicator={false}/>

                <View style={{flex: 1}}/>
            </View>
        )
    }

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    _renderRow = (rowData, selectionID, rowID) => {
        //item 布局
        if (rowData === '0') {

        } else if (rowData === '1') {
            return (
                <View style={styles.itemType1}>
                    <View style={{width: Pixel.getPixel(310)}}>
                        <Text style={styles.itemType1Ttile}>确认成交价</Text>
                        <Text style={styles.itemType1Content}>请尽快和卖家通知后支付订金待卖家通知后支付订金</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        style={{marginRight: Pixel.getPixel(15), alignSelf: 'center'}}
                        onPress={() => {
                            /*TODO  拨打电话*/
                        }}>
                        <Image
                            source={require('../../../images/mainImage/making_call.png')}/>
                    </TouchableOpacity>
                </View>
            )
        } else if (rowData === '2') {
            return (
                <View style={styles.itemType4}>
                    <Text style={{marginLeft: Pixel.getPixel(15), marginTop: Pixel.getPixel(12)}}>成交价(元)</Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{flex: 1, justifyContent: 'center'}}
                        onPress={() => {
                            this.toNextPage({
                                name: 'InputAmountScene',
                                component: InputAmountScene,
                                params: {type: 'sales'}
                            });
                        }}>
                        <View style={{
                            alignItems: 'center',
                            marginLeft: Pixel.getPixel(15),
                            flexDirection: 'row'
                        }}>
                            {/*TODO 换成图片*/}
                            <Text style={{fontSize: Pixel.getFontPixel(25), marginTop: Pixel.getPixel(5)}}>￥</Text>
                            <Text style={{
                                //height: Pixel.getPixel(38),
                                marginLeft: Pixel.getPixel(5),
                                fontSize: Pixel.getFontPixel(38),
                                color: fontAndColor.COLORA2,
                                textAlign: 'center'
                            }}>18000</Text>
                            <Image
                                style={{
                                    marginLeft: Pixel.getPixel(5),
                                    marginBottom: Pixel.getPixel(5)
                                }}
                                source={require('../../../images/mainImage/transaction_price.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separatedLine}/>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT28),
                            marginLeft: Pixel.getPixel(15),
                            color: fontAndColor.COLORA1
                        }}>应付订金：</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT28),
                        }}>15000元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '3') {
            return (
                <View style={styles.itemType4}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>车辆已融资,交易需补差额</Text>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORB2
                        }}>5000元</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{marginRight: Pixel.getPixel(15), color: fontAndColor.COLORB4}}>补差额说明</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>贷款本金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContentRed}>12000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>贷款利息</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContentRed}>10000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>30日利息</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContentRed}>5000元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '4') {
            return (
                <View style={styles.itemType2}>
                    <Image
                        style={{marginLeft: Pixel.getPixel(15)}}
                        source={require('../../../images/mainImage/agreed_sign.png')}/>
                    <Text style={{color: fontAndColor.COLORA1, marginLeft: Pixel.getPixel(5)}}>我已同意签署</Text>
                    <Text style={{color: fontAndColor.COLORA2}}>《买卖协议》</Text>
                    <Text style={{color: fontAndColor.COLORA1}}>和</Text>
                    <Text style={{color: fontAndColor.COLORA2}}>《授权声明》</Text>
                </View>
            )
        } else if (rowData === '5') {
            return (
                <View style={styles.itemType3}>
                    <View style={{
                        flexDirection: 'row',
                        height: Pixel.getPixel(40),
                        marginLeft: Pixel.getPixel(15),
                        marginRight: Pixel.getPixel(15),
                        alignItems: 'center'
                    }}>
                        <Text style={styles.orderInfo}>订单号:</Text>
                        <Text style={styles.orderInfo}>12312332133</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.orderInfo}>订单日期:</Text>
                        <Text style={styles.orderInfo}>2019/09/09</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{flexDirection: 'row', height: Pixel.getPixel(105), alignItems: 'center'}}>
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
                </View>
            )
        } else if (rowData === '6') {
            return (
                <View style={styles.itemType6}>
                    <Text style={{
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(3),
                        color: fontAndColor.COLORB2
                    }}>*</Text>
                    <Text>车架号</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            this._scanPress()
                        }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: fontAndColor.COLORA2}}>扫描</Text>
                            <Image
                                style={styles.backIcon}
                                source={require('../../../images/mainImage/celljiantou.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else if (rowData === '7') {
            return (
                <View style={styles.itemType4}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>销售信息</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>支付定金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>15000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付尾款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>115000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>支付总计</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>125000元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '8') {
            return (
                <View style={styles.itemType5}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>单车融资还款</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORA2}}>还款单号:</Text>
                        <Text style={{color: fontAndColor.COLORA2}}>232222333</Text>
                        <Image
                            style={styles.backIcon}
                            source={require('../../../images/mainImage/celljiantou.png')}/>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>本金</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>利息</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>居间费</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>还款总计</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>剩余总计</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>100000元</Text>
                    </View>
                </View>
            )
        } else if (rowData === '9') {
            return (
                <View style={styles.itemType4}>
                    <View style={{height: Pixel.getPixel(40), alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            marginLeft: Pixel.getPixel(15)
                        }}>买家信息</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(15)
                    }}>
                        <Text style={styles.orderInfo}>姓名</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>异议</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>联系方式</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>123456664444</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.orderInfo}>企业名称</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.infoContent}>终生二手车经销给你公司</Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    backIcon: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(12),
        height: Pixel.getPixel(15),
        width: Pixel.getPixel(15)
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    carDescribeTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    carDescribe: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA0
    },
    image: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        resizeMode: 'stretch'
    },
    itemType1: {
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    itemType1Ttile: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.TITLEFONT40),
        color: fontAndColor.COLORB2,
        marginTop: Pixel.getPixel(21)
    },
    itemType1Content: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginTop: Pixel.getPixel(7),
        marginBottom: Pixel.getPixel(21)
    },
    itemType2: {
        alignItems: 'center',
        height: Pixel.getPixel(19),
        flexDirection: 'row'
    },
    itemType3: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(146)
    },
    orderInfo: {
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    itemType4: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(151)
    },
    infoContent: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    infoContentRed: {
        color: fontAndColor.COLORB2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    infoItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
        marginRight: Pixel.getPixel(15)
    },
    itemType5: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(200)
    },
    inputBorder: {
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
        height: Pixel.getPixel(40),
        marginTop: Pixel.getPixel(13),
        flexDirection: 'row',
        borderColor: fontAndColor.COLORB0,
        borderWidth: Pixel.getPixel(1),
        borderRadius: Pixel.getPixel(2)
    },
    inputStyle: {
        flex: 1,
        marginLeft: Pixel.getPixel(10),
        textAlign: 'left',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2,
    },
    itemType6: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: '#ffffff',
    },
});