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
import InventoryRepaymentPage from '../page/InventoryRepaymentPage';
import SingleRepaymentPage from '../page/SingleRepaymentPage';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PlanListScene from './PlanListScene';
import RepaymentInfoScene from '../repayment/NewRepaymentInfoScene';
import InventoryPlanInfoScene from '../repayment/NewInventoryPlanInfoScene';

export  default class RepaymentScene extends BaseComponent {

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
            <View style={{flex:1,backgroundColor: fontAndColor.COLORA3}}>
                <ScrollableTabView
                    style={{marginTop: Pixel.getTitlePixel(64), flex: 1}}
                    initialPage={0}
                    locked={true}
                    renderTabBar={() => <RepaymenyTabBar tabName={["单车融资", "库存融资"]}/>}
                >
                    <SingleRepaymentPage customerName={this.props.customerName} callBack={(loan_id,loan_number,type)=>{
                      this.toNextPage({name:'RepaymentInfoScene',component:RepaymentInfoScene,
                      params:{loan_id:loan_id,loan_number:loan_number,type:type,from:'SingleRepaymentPage'}});
                    }} tabLabel="ios-paper"/>

                    <InventoryRepaymentPage customerName={this.props.customerName} callBack={(loan_id,loan_number,type)=>{
                      this.toNextPage({name:'InventoryPlanInfoScene',component:InventoryPlanInfoScene,
                      params:{loan_id:loan_id,loan_number:loan_number,type:type,from:'InventoryRepaymentPage'}});
                    }} tabLabel="ios-people"/>

                    {/*<PurchaseRepaymentPage customerName={this.props.customerName} callBack={(loan_id,loan_number,type)=>{*/}
                      {/*this.toNextPage({name:'RepaymentInfoScene',component:RepaymentInfoScene,*/}
                      {/*params:{loan_id:loan_id,loan_number:loan_number,type:type,from:'PurchaseRepaymentPage'}});*/}
                    {/*}} tabLabel="ios-chatboxes"/>*/}

                </ScrollableTabView>
                <NavigationView
                    title="还款"
                    backIconClick={this.backPage}
                    renderRihtFootView={this._navigatorRightView}
                />
            </View>
        );

    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                <NavigationView
                    title="还款"
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
    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
            this.toNextPage(this.navigatorParams)
        }}>
                <Text style={{color: 'white',
                fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                textAlign: 'center',
                backgroundColor: 'transparent',}}>还款计划</Text>
            </TouchableOpacity>
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