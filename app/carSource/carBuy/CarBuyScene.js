/**
 * Created by zhengnan on 2017/7/26.
 */

import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    ListView,
    Dimensions,
    RefreshControl,

} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListFooter           from '../znComponent/LoadMoreFooter';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';
import CarBuyCell from './View/CarBuyCell';
import * as AppUrls from "../../constant/appUrls";
import  {request}           from '../../utils/RequestUtil';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarBuyTaskScene from "./CarBuyTaskScene";
let Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;

export default class CarBuyScene extends BaseComponent {

    render(){
        let tabBar = <RepaymenyTabBar refs={(ref)=>{this.tabBar =ref }} style={{backgroundColor:'white'}} tabName={["未成交", "已成交", "已放弃"]}/>
        return(
            <View style={styles.rootContainer}>
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={0}
                    locked={true}
                    renderTabBar={()=>tabBar}>
                    <CarBuyUnsettledView ref="CarBuyUnsettledView"  tabLabel="ios-paper1" updateHeadView ={this.updateHeadView} cellClick={this.cellClick}/>
                    <CarBuyTradedView   ref="CarBuyTradedView"  tabLabel="ios-paper2" updateHeadView ={this.updateHeadView}/>
                    <CarBuyAbandonView  ref="CarBuyAbandonView"   tabLabel="ios-paper3" updateHeadView ={this.updateHeadView}/>
                </ScrollableTabView>
                <TouchableOpacity style={styles.footBtn} onPress={this.footBtnClick}>
                    <Text style={styles.footBtnText}>创建</Text>
                </TouchableOpacity>
                <AllNavigationView title='名车行' backIconClick={this.backPage}/>
            </View>
        )
    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
      }
    

      footBtnClick=()=>{

        this.toNextPage({
            name: "CarBuyTaskScene",
            component: CarBuyTaskScene,
            params: {
            }
        })
      }

    updateHeadView =(dealN,dealY,dealF)=>{


    }

    updateData=()=>{
        this.refs.CarBuyUnsettledView && this.refs.CarBuyUnsettledView.allRefresh();
        this.refs.CarBuyTradedView && this.refs.CarBuyTradedView.allRefresh();
        this.refs.CarBuyAbandonView && this.refs.CarBuyAbandonView.allRefresh();
    }

    cellClick=(data)=>{
        this.toNextPage({
            name: "CarBuyTaskScene",
            component: CarBuyTaskScene,
            params: {
                id:data.id,
                updateData:this.updateData,
            }
        })
    }
}

/**
 * 未成交View
 */

class CarBuyUnsettledView extends BaseComponent {

    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return(
           <ListView
               style={{marginTop:Pixel.getPixel(10)}}
               dataSource={this.state.dataSource}
               renderRow={this.renderRow}
               enableEmptySections={true}
               renderFooter={this.renderListFooter}
               onEndReached={this.toEnd}
               refreshControl={
                   <RefreshControl
                       refreshing={this.state.isRefreshing}
                       onRefresh={this.refreshingData}
                       tintColor={[fontAndColor.COLORB0]}
                       colors={[fontAndColor.COLORB0]}/>}
           />
        )
    }
    // 构造
    constructor(props) {
        super(props);

        this.carArray=[];
        this.pc = 1;
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds,
            isRefreshing:true,
            tr:1,
            renderPlaceholderOnly: 'blank',

        };
    }


    initFinish=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    }

    refreshingData=()=>{
        this.setState({
            isRefreshing:true,
        });
        this.loadData();
    }

    allRefresh=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    }

    loadData=()=>{

        this.pc = 1;
        request(AppUrls.CAR_SASS_SELECT_LIST, 'post', {
            mobile:'15102373847',
            status:'2',
            pc:this.pc,
            pr: 10,
            token:'c5cd2f08-f052-4d3e-8943-86c798945953'

        }).then((response) => {
            let data = response.mjson.data
            this.carArray = data.record.beanlist;
            this.props.updateHeadView(data.count.dealN,data.count.dealY,data.count.dealF);
            if(this.carArray.length>0){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.carArray),
                    isRefreshing:false,
                    renderPlaceholderOnly: 'success',
                    tr:data.record.tr,
                });
            }else {
                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    tr:data.record.tr,
                });
            }

        }, (error) => {
            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error',
            });
        });
    }

    loadMoreData = () => {

        this.pc += 1;
        request(AppUrls.CAR_SASS_SELECT_LIST, 'post', {
            mobile:'15102373847',
            status:'2',
            page: this.pc,
            pr: 10,
            token:'c5cd2f08-f052-4d3e-8943-86c798945953'

        }).then((response) => {
            let carData = response.mjson.data.record.beanlist;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {

                    this.carArray.push(carData[i]);
                }

                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.carArray),
                    tr:response.mjson.data.record.tr,

                });
            } else {

                this.setState({
                    tr:response.mjson.data.record.tr,

                });
            }

        }, (error) => {


        });
    }


    toEnd = () => {

        if (this.carArray.length && !this.state.isRefreshing && this.carArray.length<this.state.tr) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.carArray.length<this.state.tr? false : true}/>)
        }
    }




      renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="跟进"  cellData ={rowData} cellBtnClick={()=>{this.props.cellClick(rowData)}}/>
        )
      }
}

/**
 * 已成交View
 */
class CarBuyTradedView extends BaseComponent {

    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return(
            <ListView
                style={{marginTop:Pixel.getPixel(10)}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                renderFooter={this.renderListFooter}
                onEndReached={this.toEnd}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshingData}
                        tintColor={[fontAndColor.COLORB0]}
                        colors={[fontAndColor.COLORB0]}/>}
            />
        )
    }
    // 构造
    constructor(props) {
        super(props);

        this.carArray=[];
        this.pc = 1;
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds,
            isRefreshing:true,
            tr:1,
            renderPlaceholderOnly: 'blank',

        };
    }


    initFinish=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    }

    refreshingData=()=>{
        this.setState({
            isRefreshing:true,
        });
        this.loadData();
    }

    allRefresh=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    }

    loadData=()=>{

        this.pc = 1;
        request(AppUrls.CAR_SASS_SELECT_LIST, 'post', {
            mobile:'15102373847',
            status:'1',
            pc:this.pc,
            pr: 10,
            token:'c5cd2f08-f052-4d3e-8943-86c798945953'

        }).then((response) => {
            let data = response.mjson.data
            this.carArray = data.record.beanlist;
            this.props.updateHeadView(data.count.dealN,data.count.dealY,data.count.dealF);
            if(this.carArray.length>0){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.carArray),
                    isRefreshing:false,
                    renderPlaceholderOnly: 'success',
                    tr:data.record.tr,
                });
            }else {
                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    tr:data.record.tr,
                });
            }

        }, (error) => {
            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error',
            });
        });
    }

    loadMoreData = () => {

        this.pc += 1;
        request(AppUrls.CAR_SASS_SELECT_LIST, 'post', {
            mobile:'15102373847',
            status:'1',
            page: this.pc,
            pr: 10,
            token:'c5cd2f08-f052-4d3e-8943-86c798945953'

        }).then((response) => {
            let carData = response.mjson.data.record.beanlist;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {

                    this.carArray.push(carData[i]);
                }

                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.carArray),
                    tr:response.mjson.data.record.tr,

                });
            } else {

                this.setState({
                    tr:response.mjson.data.record.tr,

                });
            }

        }, (error) => {


        });
    }


    toEnd = () => {

        if (this.carArray.length && !this.state.isRefreshing && this.carArray.length<this.state.tr) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.carArray.length<this.state.tr? false : true}/>)
        }
    }




    renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="补充"  cellData ={rowData}/>
        )
    }
}


/**
 * 已放弃View
 */
class CarBuyAbandonView extends BaseComponent {
    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.loadView}>
                    {this.loadView()}
                </View>);
        }
        return(
            <ListView
                style={{marginTop:Pixel.getPixel(10)}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                renderFooter={this.renderListFooter}
                onEndReached={this.toEnd}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshingData}
                        tintColor={[fontAndColor.COLORB0]}
                        colors={[fontAndColor.COLORB0]}/>}
            />
        )
    }
    // 构造
    constructor(props) {
        super(props);

        this.carArray=[];
        this.pc = 1;
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds,
            isRefreshing:true,
            tr:1,
            renderPlaceholderOnly: 'blank',

        };
    }


    initFinish=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    }

    refreshingData=()=>{
        this.setState({
            isRefreshing:true,
        });
        this.loadData();
    }

    allRefresh=()=>{
        this.setState({renderPlaceholderOnly: 'loading'});
        this.loadData();
    }

    loadData=()=>{

        this.pc = 1;
        request(AppUrls.CAR_SASS_SELECT_LIST, 'post', {
            mobile:'15102373847',
            status:'3',
            pc:this.pc,
            pr: 10,
            token:'c5cd2f08-f052-4d3e-8943-86c798945953'

        }).then((response) => {
            let data = response.mjson.data
            this.carArray = data.record.beanlist;
            this.props.updateHeadView(data.count.dealN,data.count.dealY,data.count.dealF);
            if(this.carArray.length>0){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.carArray),
                    isRefreshing:false,
                    renderPlaceholderOnly: 'success',
                    tr:data.record.tr,
                });
            }else {
                this.setState({
                    isRefreshing: false,
                    renderPlaceholderOnly: 'null',
                    tr:data.record.tr,
                });
            }

        }, (error) => {
            this.setState({
                isRefreshing: false,
                renderPlaceholderOnly: 'error',
            });
        });
    }

    loadMoreData = () => {

        this.pc += 1;
        request(AppUrls.CAR_SASS_SELECT_LIST, 'post', {
            mobile:'15102373847',
            status:'3',
            page: this.pc,
            pr: 10,
            token:'c5cd2f08-f052-4d3e-8943-86c798945953'

        }).then((response) => {
            let carData = response.mjson.data.record.beanlist;
            if (carData.length) {
                for (let i = 0; i < carData.length; i++) {

                    this.carArray.push(carData[i]);
                }

                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(this.carArray),
                    tr:response.mjson.data.record.tr,

                });
            } else {

                this.setState({
                    tr:response.mjson.data.record.tr,

                });
            }

        }, (error) => {


        });
    }


    toEnd = () => {

        if (this.carArray.length && !this.state.isRefreshing && this.carArray.length<this.state.tr) {
            this.loadMoreData();
        }

    };

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.carArray.length<this.state.tr? false : true}/>)
        }
    }


    renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="补充"  cellData ={rowData}/>
        )
    }
}


const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(44),
    },
    footBtn:{
        left:0,
        bottom:0,
        right:0,
        backgroundColor:fontAndColor.COLORB0,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        height:Pixel.getPixel(44),
    },
    footBtnText:{
        textAlign:'center',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color:'white',
    },
    loadView: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Pixel.getPixel(5),
    },
});
