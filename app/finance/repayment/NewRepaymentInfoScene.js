/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from './component/RepaymenyTabBar';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PlanListScene from './PlanListScene';

export  default class NewRepaymentInfoScene extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {renderPlaceholderOnly: 'blank'};
    }


    initFinish = () => {
        this.setState({renderPlaceholderOnly: 'success'});
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{width: width, height: height}}>
                <ScrollableTabView
                    style={{marginTop: Pixel.getTitlePixel(64), flex: 1}}
                    initialPage={0}
                    renderTabBar={() => <RepaymenyTabBar tabName={["还款详情", "还款计划"]}/>}
                >

                    <View style={{flex:1,backgroundColor: 'red'}} tabLabel="ios-paper"></View>
                    <View style={{flex:1,backgroundColor: 'blue'}} tabLabel="ios-paper1"></View>
                </ScrollableTabView>
                <NavigationView
                    title="还款详情"
                    backIconClick={this.backPage}
                />
            </View>
        );

    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height}}>
                <NavigationView
                    title="还款详情"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    navigatorParams = {
        name: "PlanListScene",
        component: PlanListScene,
        params: {}
    }
}
const styles = StyleSheet.create({

    image: {

        width: 43,
        height: 43,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    }
})