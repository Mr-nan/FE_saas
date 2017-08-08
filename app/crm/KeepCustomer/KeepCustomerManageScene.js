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
import WebViewTitle from "../../mine/accountManage/component/WebViewTitle";
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class KeepCustomerManageScene extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            addTimeHide: false,
            selectFilterHide: false
        };
    }

    /**
     *
     **/
    initFinish = () => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['', '', '', '', '', '', '', '', '']),
            renderPlaceholderOnly: 'success'
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
                        title="门店接待管理"
                        renderRihtFootView={this._navigatorRightView}/>
                    {this.loadView()}
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <NavigationView
                        backIconClick={this.backPage}
                        title="门店接待管理"
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
                                ref="but1" title="今天" index={1} btnClick={this.selectAddTime}/>
                        </View>
                        <View style={styles.lineView}>
                            <View style={styles.line}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <ClientScreeningSelectButton
                                style={{flex: 1}}
                                ref="but2" title="筛选" index={2} btnClick={this.selectFilterItems}/>
                        </View>
                    </Image>
                    <ListView style={{backgroundColor: fontAndColor.COLORA3}}
                              dataSource={this.state.dataSource}
                              removeClippedSubviews={false}
                              renderRow={this._renderRow}
                              enableEmptySections={true}
                              renderSeparator={this._renderSeperator}/>
                    {this.state.addTimeHide && <ClientAddTimeSelectView hideView={this.selectAddTime}/>}
                    {this.state.selectFilterHide && <ClientScreeningView hideView={this.selectFilterItems}/>}
                </View>
            );
        }
    }

    /**
     *  listView间隔线
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(1)}}/>
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
                        name: 'ClientInfoScene',
                        component: ClientInfoScene,
                        params: {

                        }
                    });
                }}
                activeOpacity={0.9}
            >
                <View style={{
                    height: Pixel.getPixel(44),
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0
                        }}>测试人员</Text>
                    <View style={{flex: 1}}/>
                    <Image source={cellJianTou} style={{marginRight: Pixel.getPixel(15),}}/>
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
                    style={{marginRight: Pixel.getPixel(7)}}
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
                <TouchableOpacity
                    style={{marginLeft: Pixel.getPixel(7)}}
                    activeOpacity={0.9}
                    onPress={() => {
                        this.toNextPage({
                            name: 'ClientAddScene',
                            component: CustomerAddScene,
                            params: {}
                        })
                    }}>
                    <Image source={require('../../../images/employee_manage.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),
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
    }
});
