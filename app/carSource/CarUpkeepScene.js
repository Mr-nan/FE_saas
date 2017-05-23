/**
 * Created by zhengnan on 2017/4/21.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import *as fontAndColor from '../constant/fontAndColor';
import *as appUrls from '../constant/appUrls';
import *as RequestUtil from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

const data=[
    {
        title:'2016-06-20|5532公里',
        type:'正常维修',
        content:'更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },{
        title:'2016-06-20|5532公里',
        type:'正常维修',
        content:'更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },{
        title:'2016-06-20|5532公里',
        type:'正常维修',
        content:'更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },{
        title:'2016-06-20|5532公里',
        type:'正常维修',
        content:'更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },{
        title:'2016-06-20|5532公里',
        type:'正常维修',
        content:'更换左右制动总成，更换右后制动组件。车身控制模块线接头。'
    },
];

export  default class CarUpkeepScene extends  BaseComponent{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态

          let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});

        this.state = {

            dataSource:ds,
            renderPlaceholderOnly: 'blank',
        }
      }
    initFinish = () => {

          this.loadData();
    }
    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    {this.loadView()}
                    <NavigationView title="维修保养记录" backIconClick={()=>{this.backPage();}}/>
                </View>);
        }
        return(
            <View style={styles.rootContainer}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={()=>
                        <View style={styles.headView}>
                            <Text style={styles.headViewText}>特别提示：<Text style={{fontWeight: 'normal'}}>若车辆在非4S店制造商授权店的维修保养信息可能被采集和收录，仅供参考，请结合实车看眼结果和试乘试驾体验，做出准确的交易决策。</Text></Text>
                    </View>
                    }
                    renderRow={this.renderRow}/>
                <NavigationView title="维修保养记录" backIconClick={()=>{this.backPage();}}/>
            </View>
        )
    }

    renderRow =(rowData)=>{
        return(
            <View style={styles.cellView}>
                <View style={styles.cellTitleView}>
                    <Text style={styles.cellTitleViewTitle}>{rowData.date+' | '+rowData.mile + '公里'}</Text>
                    <Text style={styles.cellTitleViewValue}>{rowData.type}</Text>
                </View>
                <Text style={styles.cellContent}>{rowData.detail}</Text>
            </View>
        )
    }

    loadData=()=>{
        RequestUtil.request(appUrls.CAR_GET_ERPORT,'post',{'vin':this.props.vin}).then((response)=>{

            console.log(response);
            if(response.mjson.data.lengte>0){

                this.setState({
                    dataSource:this.state.dataSource(response.mjson.data),
                    renderPlaceholderOnly: 'success',

                });

            }else {
                this.setState({
                    renderPlaceholderOnly: 'null',
                });
            }

        },(error)=>{
            this.setState({
                renderPlaceholderOnly: 'null',
            });
        });
    }

}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    },
    headView:{
        paddingHorizontal:Pixel.getPixel(15),
        paddingVertical:Pixel.getPixel(10),
        backgroundColor:fontAndColor.COLORB6,
    },
    headViewText:{
        color:fontAndColor.COLORB2,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        fontWeight: 'bold'
    },
    cellView:{
        paddingHorizontal:Pixel.getPixel(15),
        borderBottomColor:fontAndColor.COLORA4,
        borderBottomWidth:StyleSheet.hairlineWidth,
        marginTop:Pixel.getPixel(15),
        backgroundColor:'white',
        height:Pixel.getPixel(100),
    },
    cellTitleView:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:Pixel.getPixel(10),

    },
    cellTitleViewTitle:{
        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellTitleViewValue:{
        color:fontAndColor.COLORB0,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellContent:{
        marginTop:Pixel.getPixel(10),
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
});