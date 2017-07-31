/**
 * Created by zhengnan on 2017/7/28.
 */
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
import CarTrimHeaderView from './View/CarTrimHeaderView';
import CarBuyCell from './View/CarBuyCell';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
import CarInitialTaskScene from "./CarInitialTaskScene";
import CarTrimInformationScene from "./CarTrimInformationScene";
import CarManagerTaskScene from "./CarManagerTaskScene";
import CarOperationScene from "./CarOperationScene";
let Pixel = new  PixelUtil();

const sceneWidth = Dimensions.get('window').width;


export default class CarTrimScene extends BaseComponent {

    render(){
        return(
            <View style={styles.rootContainer}>
                {
                  this.state.isShowHeadView &&  <CarTrimHeaderView click={this.headerViewItemClick}/>
                }
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={0}
                    locked={true}
                    renderTabBar={() =><RepaymenyTabBar style={{backgroundColor:'white'}} tabName={["未办任务(0)", "已办任务(0)"]}/>}>
                    <CarTaskUnsettledView ref='CarTaskUnsettledView'  toNextPage={this.toNextPage} tabLabel="ios-paper1" isShowHeadView={this.isShowHeadView}/>
                    <CarTaskTradedView   ref='CarTaskTradedView'  tabLabel="ios-paper2" isShowHeadView={this.isShowHeadView}/>
                </ScrollableTabView>
                <AllNavigationView title='名车行' backIconClick={this.backPage} renderRihtFootView={this.renderRightView}/>
            </View>
        )
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShowHeadView:true
        };
    }

    /**
     * 导航右侧按钮
     */
    renderRightView=()=>{

        return(
            <TouchableOpacity onPress={()=>{

                this.toNextPage(
                    {
                        name: 'CarInitialTaskScene',
                        component: CarInitialTaskScene,
                        params: {}
                    }
                );
            }}>
                <View style={{marginLeft:Pixel.getPixel(20),width:Pixel.getPixel(50),height:Pixel.getPixel(40),justifyContent:'center',
                    alignItems:'center'}}>
                    <Text allowFontScaling={false}  style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>创建</Text>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * from @zn
     * 角色切换事件
     * @param title
     */
    headerViewItemClick=(title)=>{
        this.refs.CarTaskUnsettledView &&  this.refs.CarTaskUnsettledView.setRoleType(title);
        this.refs.CarTaskTradedView && this.refs.CarTaskTradedView.setRoleType(title);

    }


    isShowHeadView =(isShow)=>{

        this.setState({
            isShowHeadView:isShow,
        });
    }

}

/**
 * 未成交View
 */

class CarTaskUnsettledView extends BaseComponent {

    render(){
        return(
            <ListView style={{marginTop:Pixel.getPixel(10)}}
                      onScroll={(event)=>{
                          if (event.nativeEvent.contentOffset.y > Pixel.getPixel(30)) {

                             this.props.isShowHeadView(false);

                          } else {
                              this.props.isShowHeadView(true);
                          }
                      }}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
            />
        )
    }

    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.roleType='手续员';
        this.state = {
            dataSource:ds.cloneWithRows(['1','2','3','4','5']),
        };
    }

    renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="跟进" cellBtnClick={this.cellBtnClick}/>
        )
    }

    /**
     * from @zn
     * 获取当前角色状态
     * @param roleType
     */
    setRoleType=(roleType)=>{
        this.roleType= roleType;
    }

    cellBtnClick=()=>{

        if(this.roleType == '整备员')
        {
            this.props.toNextPage(
                {
                    name: 'CarTrimInformationScene',
                    component: CarTrimInformationScene,
                    params: {}
                }
            );
        }else if(this.roleType == '经理')
        {
            this.props.toNextPage(
                {
                    name: 'CarManagerTaskScene',
                    component: CarManagerTaskScene,
                    params: {}
                }
            );
        }else if(this.roleType == '运营专员')
        {
            this.props.toNextPage(
                {
                    name: 'CarOperationScene',
                    component: CarOperationScene,
                    params: {}
                }
            );
        }
    }
}

/**
 * 已成交View
 */
class CarTaskTradedView extends BaseComponent {
    render(){
        return(
            <ListView style={{marginTop:Pixel.getPixel(10)}}
                      onScroll={(event)=>{
                          if (event.nativeEvent.contentOffset.y > Pixel.getPixel(30)) {
                              this.props.isShowHeadView(false);
                          } else {
                              this.props.isShowHeadView(true);
                          }
                      }}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
            />
        )
    }

    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.roleType='手续员';
        this.state = {
            dataSource:ds.cloneWithRows(['1','2','3','4','5']),
        };
    }

    renderRow=(rowData)=>{
        return(
            <CarBuyCell btnTitle="查看" cellBtnClick={this.cellBtnClick}/>
        )
    }

    /**
     * from @zn
     * 获取当前角色状态
     * @param roleType
     */
    setRoleType=(roleType)=>{
        this.roleType= roleType;
    }
    cellBtnClick=()=>{
        alert(this.roleType);
    }
}




const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
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
