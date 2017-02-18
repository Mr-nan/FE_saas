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
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from './component/RepaymenyTabBar';
import InventoryRepaymentPage from './page/InventoryRepaymentPage';
import SingleRepaymentPage from './page/SingleRepaymentPage';
import PurchaseRepaymentPage from './page/PurchaseRepaymentPage';
export  default class RepaymentScene extends BaseComponent {

    initFinish = () => {
    }

    render() {

        return (
            <ScrollableTabView
                style={{marginTop: Pixel.getPixel(25),}}
                initialPage={0}
                renderTabBar={() => <RepaymenyTabBar tabName={["单车融资", "库存融资", "采购融资"]}/>}
            >
                <SingleRepaymentPage tabLabel="ios-paper" />

                <InventoryRepaymentPage tabLabel="ios-people" />

                <PurchaseRepaymentPage tabLabel="ios-chatboxes"/>

            </ScrollableTabView>
        );
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