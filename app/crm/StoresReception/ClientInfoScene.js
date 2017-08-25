/**
 * Created by ZN on 17/2/25.
 */

import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    ScrollView,
    RefreshControl,
    InteractionManager,
    Image,
} from 'react-native';

import BaceComponent from '../../component/BaseComponent';
import NavigatorView from '../../component/AllNavigationView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';
import * as fontAndColor from '../../constant/fontAndColor';
import * as AppUrls from "../../constant/appUrls";
import  {request}           from '../../utils/RequestUtil';
import PixelUtil from '../../utils/PixelUtil';
import {FollowUpRecordsView} from "./FollowUpRecordsView";
import ClientInfoDetailView from "./ClientInfoDetailView";
const Pixel = new PixelUtil();


export default class ClientInfoScene extends BaceComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            rowData: this.props.rowData
        };
    }

    /**
     *   客户状态映射
     **/
    customerStatusMapping = (int) => {
        switch (int) {
            case 1:
                return '初次到店';
            case 2:
                return '电话邀约';
            case 3:
                return '已购买';
            case 4:
                return '置换';
            case 5:
                return '复购';
        }
    };

    /**
     *
     **/
    render() {
        return (
            <View style={styles.rootContainer}>
                <NavigatorView title='客户信息' backIconClick={this.backPage}/>
                <View style={{
                    height: Pixel.getPixel(90),
                    backgroundColor: fontAndColor.COLORB0,
                    marginTop: Pixel.getTitlePixel(64),
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            marginLeft: Pixel.getPixel(32),
                            color: '#ffffff',
                            fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34)
                        }}>{this.state.rowData.customerName}</Text>
                    <View style={{
                        marginLeft: Pixel.getPixel(32),
                        backgroundColor: '#ffffff',
                        height: Pixel.getPixel(35),
                        width: 1
                    }}/>
                    <View style={{alignItems: 'flex-start', marginLeft: Pixel.getPixel(12)}}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: '#ffffff',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>销售顾问:{this.state.rowData.salesAdviser}</Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                marginTop: Pixel.getPixel(8),
                                color: '#ffffff',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>客户状态:{this.customerStatusMapping(this.state.rowData.customerStatus)}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        onPress={() => {

                        }}>
                        <Image
                            style={{marginRight: Pixel.getPixel(20)}}
                            source={require('../../../images/mainImage/make_call.png')}/>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                    //style={styles.ScrollableTabView}
                    initialPage={this.props.page ? this.props.page : 0}
                    locked={true}
                    renderTabBar={() => <RepaymenyTabBar style={{backgroundColor: 'white'}}
                                                         tabName={["跟进记录", "详细资料"]}/>}>
                    <FollowUpRecordsView
                        rowData={this.state.rowData}
                        navigator={this.props.navigator}
                        showModal={this.props.showModal}
                        tabLabel="ios-paper1"/>
                    <ClientInfoDetailView
                        rowData={this.state.rowData}
                        navigator={this.props.navigator}
                        showModal={this.props.showModal}
                        tabLabel="ios-paper2"/>
                </ScrollableTabView>
            </View>
        )

    }

}


const styles = StyleSheet.create({

    rootContainer: {

        flex: 1,
        backgroundColor: fontAndColor.COLORA3,

    },
    ScrollableTabView: {

        marginTop: Pixel.getTitlePixel(64),
    },
    loadView: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Pixel.getPixel(5),
    },
    viewContainer: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    listView: {

        backgroundColor: fontAndColor.COLORA3,
        marginTop: Pixel.getPixel(5),
    }

})