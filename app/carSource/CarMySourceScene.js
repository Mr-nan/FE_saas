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

} from 'react-native';

import BaceComponent from '../component/BaseComponent';
import NavigatorView from '../component/AllNavigationView';
import MyCarCell     from './znComponent/MyCarCell';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../finance/repayment/component/RepaymenyTabBar';
import * as fontAndColor from '../constant/fontAndColor';
import ZNLoadView       from './znComponent/ZNLoadView';
import * as AppUrls from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

var screenWidth = Dimensions.get('window').width;


let carData1 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:0,

    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:0,

    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:0,

    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:0,

    },

];

let carData2 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:2,
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:2,
    },

];


let carData3 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:1,
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:1,
    },

];

let carUpperFrameData = [];
let carDropFrameData = [];
let carAuditData = [];

export default class CarMySourceScene extends BaceComponent{


    render(){
        return(
            <View style={styles.rootContainer}>
            <ScrollableTabView
                style={{marginTop: Pixel.getTitlePixel(64), flex: 1}}
                initialPage={0}
                renderTabBar={() =><RepaymenyTabBar tabName={["已上架", "已下架", "未审核"]}/>}>

                <MyCarSourceUpperFrameView      tabLabel="ios-paper1"/>
                <MyCarSourceDropFrameView       tabLabel="ios-paper2"/>
                <MyCarSourceAuditView           tabLabel="ios-paper3"/>

            </ScrollableTabView>
            <NavigatorView title='我的车源' backIconClick={this.backPage}/>
        </View>)

    }

}

class MyCarSourceUpperFrameView extends BaceComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData,

        };
    }

    initFinish=()=>{
            this.loadData();
    };

    loadData=()=>{

        this.startLoadData();
        let url = AppUrls.BASEURL +'v1/car/car'
        request(url,'post',{

            car_status:'1',
            page:1,
            row:10,

        }).then((response) => {

            console.log(response.mjson.data);
            carUpperFrameData.push(...response.mjson.data.list);
            if(carUpperFrameData.length)
            {
                this.setState({
                    carData:this.state.carData.cloneWithRows(carUpperFrameData),
                });
            }
            this.stopLoadData();

        }, (error) => {

            console.log(error);
            this.stopLoadData();


        });

    }
    startLoadData=()=>{

        this.refs.ZNLoadView.visibleClick(true);

    }

    stopLoadData=()=>{

        this.refs.ZNLoadView.visibleClick(false);
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                <ZNLoadView ref="ZNLoadView"/>
                {
                    this.state.carData &&
                    <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:5}}
                              dataSource={this.state.carData}
                              renderRow={(rowData) =>
                                  <MyCarCell carCellData={rowData} type={0}/>}/>
                }
            </View>
        )
    }

}

class MyCarSourceDropFrameView extends BaceComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData,

        };
    }

    initFinish=()=>{

    };

    render(){
        return(
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                {
                    this.state.carData &&
                    <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:5}}
                              dataSource={this.state.carData}
                              renderRow={(rowData) => <MyCarCell carMainText={rowData.title} carSubText={rowData.subTitle} type={2}/>}/>
                }
            </View>
        )
    }

}

class MyCarSourceAuditView extends BaceComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {
            carData:carData,
        };
    }

    initFinish=()=>{

    };

    render(){
        return(
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                {
                    this.state.carData &&
                    <ListView style={{backgroundColor:fontAndColor.COLORA3,marginTop:5}}
                                                    dataSource={this.state.carData}
                                                    renderRow={(rowData) => <MyCarCell carMainText={rowData.title} carSubText={rowData.subTitle} type={1}/>}/>
                }
            </View>
        )
    }

}


const styles = StyleSheet.create({

    rootContainer:{

        flex:1,
        backgroundColor:'white',

    },

})