import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, TextInput, Image,
} from 'react-native';
import BaseComponent from '../../../../component/BaseComponent';
import NavigationBar from '../../../../component/NavigationBar';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import MyButton from "../../../../component/MyButton";
import CheckWaybill from '../CheckWaybill';
import SelectDestination from '../SelectDestination';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import ScrollableTabView , {DefaultTabBar,ScrollableTabBar}from 'react-native-scrollable-tab-view';
import Page from './Page'

import RepaymenyTabBar from '../../../../finance/repayment/component/RepaymenyTabBar';

import {request} from '../../../../utils/RequestUtil';
import * as Urls from '../../../../constant/appUrls';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
const Pixel = new PixelUtil();


export default  class  List extends BaseComponent{

    constructor(props){
        super(props)

        this.state = {
            renderPlaceholderOnly: "loading",
        }

    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly: "success",
        })
    }



    render(){

        if (this.state.renderPlaceholderOnly !== 'success') {
            // 加载中....
            return ( <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'我的运单'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                {this.loadView()}
            </View>);
        }

        return(<View  style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'我的运单'}
                    rightTextShow={false}
                    rightImageShow={true}
                    rightImage={require('../../../../../images/carriagePriceImage/search.png')}
                    rightImageCallBack={()=>{
                        console.log('12345678')
                    }}
                    leftImageCallBack={this.backPage}
                />


                <ScrollableTabView
                    style={{flex: 1}}
                    initialPage={0}
                    locked={false}
                    onChangeTab={(obj) => {

                    }}
                    renderTabBar={() => <RepaymenyTabBar tabName={['全部','代付款', "待发运",'在途','已到达','已失效']}/>}

                >
                    <Page/>
                    <Page/>
                    <Page/>
                    <Page/>
                    <Page/>
                    <Page/>
                </ScrollableTabView>



            </View>
        )
    }


}


const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3,
        paddingBottom: Pixel.getPixel(50.5)
    },


})