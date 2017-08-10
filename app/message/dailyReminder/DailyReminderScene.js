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
import CarInfoScene         from '../../carSource/CarInfoScene';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';
import * as fontAndColor from '../../constant/fontAndColor';
import * as AppUrls from "../../constant/appUrls";
import  {request}           from '../../utils/RequestUtil';
import PixelUtil from '../../utils/PixelUtil';
import {DailyReminderSelectView} from "../component/DailyReminderSelectView";
import {ShareListView} from "./ShareListView";
import {StatisticalListView} from "./StatisticalListView";
const Pixel = new PixelUtil();

export default class DailyReminderScene extends BaceComponent {

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
    renderRightFootView = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    style={{marginLeft: Pixel.getPixel(10)}}
                    onPress={() => {
                        this.setState({
                            isHide: false
                        });
                    }}
                    activeOpacity={0.9}
                >
                    <Image source={require('../../../images/mainImage/screening.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    /**
     *
     **/
    render() {
        return (
            <View style={styles.rootContainer}>
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={this.props.page ? this.props.page : 0}
                    locked={true}
                    renderTabBar={() => <RepaymenyTabBar style={{backgroundColor: 'white'}} tabName={["分享", "统计"]}/>}>
                    <ShareListView navigator={this.props.navigator} ref="shareListView" tabLabel="ios-paper1"/>
                    <StatisticalListView navigator={this.props.navigator} ref="statisticalListView"
                                         tabLabel="ios-paper2"/>
                </ScrollableTabView>
                {
                    !this.state.isHide && (
                        <DailyReminderSelectView
                            checkedSource={this.timeFrame}
                            checkTimeFrameClick={this.checkTimeFrameClick}
                            hideClick={this.hideCheckedView}
                        />)
                }
                <NavigatorView title='每日提醒' backIconClick={this.backPage}
                               renderRihtFootView={this.renderRightFootView}/>
            </View>)

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
//MyCarSourceUpperFrameView
//MyCarSourceDropFrameView
//MyCarSourceAuditView


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