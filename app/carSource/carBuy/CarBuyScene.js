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

} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';
import CarBuyCell from './View/CarBuyCell';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarBuyTaskScene from "./CarBuyTaskScene";
let Pixel = new  PixelUtil();

const sceneWidth = Dimensions.get('window').width;

export default class CarBuyScene extends BaseComponent {

    render(){
        return(
            <View style={styles.rootContainer}>
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={0}
                    locked={true}
                    renderTabBar={() =><RepaymenyTabBar style={{backgroundColor:'white'}} tabName={["未成交(0)", "已成交(0)", "已放弃(0)"]}/>}>
                    <CarBuyUnsettledView ref="CarBuyUnsettledView"  tabLabel="ios-paper1"/>
                    <CarBuyTradedView   ref="CarBuyTradedView"  tabLabel="ios-paper2"/>
                    <CarBuyAbandonView  ref="CarBuyAbandonView"   tabLabel="ios-paper3"/>
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
}

/**
 * 未成交View
 */

class CarBuyUnsettledView extends BaseComponent {

    render(){
        return(
           <ListView style={{marginTop:Pixel.getPixel(10)}}
               dataSource={this.state.dataSource}
               renderRow={this.renderRow}
           />
        )
    }

    // 构造
      constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds.cloneWithRows(['1','2','3','4','5']),
        };
      }

      renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="跟进" />
        )
      }
}

/**
 * 已成交View
 */
class CarBuyTradedView extends BaseComponent {
    render(){
        return(
            <ListView style={{marginTop:Pixel.getPixel(10)}}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
            />
        )
    }

    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds.cloneWithRows(['1','2','3','4','5']),
        };
    }

    renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="补充"/>
        )
    }
}


/**
 * 已放弃View
 */
class CarBuyAbandonView extends BaseComponent {
    render(){
        return(
            <ListView style={{marginTop:Pixel.getPixel(10)}}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
            />
        )
    }

    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds.cloneWithRows(['1','2','3','4','5']),
        };
    }

    renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="补充"/>
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
    }
});
