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
import ListFooter           from '../../carSource/znComponent/LoadMoreFooter';
import SGListView           from 'react-native-sglistview';
import CarInfoScene         from '../../carSource/CarInfoScene';
import MyCarCell     from '../../carSource/znComponent/MyCarCell';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';
import * as fontAndColor from '../../constant/fontAndColor';
import * as AppUrls from "../../constant/appUrls";
import  {request}           from '../../utils/RequestUtil';
import {LendSuccessAlert} from '../../finance/lend/component/ModelComponent'
import PixelUtil from '../../utils/PixelUtil';
import {StatisticalListView} from "../../message/dailyReminder/StatisticalListView";
import {FollowUpRecordsView} from "./FollowUpRecordsView";
import ClientInfoDetailView from "./ClientInfoDetailView";
const Pixel = new PixelUtil();


let carUpperFrameData = [];
let carDropFrameData = [];
let carAuditData = [];

let carUpperFramePage = 1;
let carUpperFrameStatus = 1;

let carDropFramePage = 1;
let carDropFrameStatus = 1;

let carAuditPage = 1;
let carAuditStatus = 1;

export default class ClientInfoScene extends BaceComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        // 初始状态
        this.timeFrame = [{name: '每日', value: ''}, {name: '每周', value: ''}, {name: '每月', value: ''}];
        this.state = {
            isHide: true,
        };
    }

    /**
     *
     * @param carData
     **/
    carCellClick = (carData) => {
        let navigatorParams = {

            name: "CarInfoScene",
            component: CarInfoScene,
            params: {
                carID: carData.id,
            }
        };
        this.toNextPage(navigatorParams);

    }


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
                        }}>韩梦</Text>
                    <View style={{
                        marginLeft: Pixel.getPixel(32),
                        backgroundColor: '#ffffff',
                        height: Pixel.getPixel(35),
                        width: 1
                    }}/>
                    <View style={{alignItems: 'center', marginLeft: Pixel.getPixel(12),}}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: '#ffffff',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>销售顾问：</Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                marginTop: Pixel.getPixel(8),
                                color: '#ffffff',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                            }}>客户状态：</Text>
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
                    <FollowUpRecordsView navigator={this.props.navigator} tabLabel="ios-paper1"/>
                    <ClientInfoDetailView navigator={this.props.navigator} tabLabel="ios-paper2"/>
                </ScrollableTabView>
            </View>
        )

    }

    /**
     *
     **/
    checkTimeFrameClick = () => {
        this.setState({
            isHide: false,
        });
    }

    /**
     *
     **/
    hideCheckedView = () => {
        this.setState({
            isHide: true,
        });
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