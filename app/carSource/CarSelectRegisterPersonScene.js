/**
 * Created by zhengnan on 2017/5/12.
 */

import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions,
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import CarAddRegisterPersonScene   from './CarAddRegisterPersonScene';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;


let data = [
    '张一丰 1999900000',
    '张二丰 1999900000',
    '张三丰 1999900000',
    '张四丰 1999900000',
    '张五丰 1999900000',
    '张六丰 1999900000',
];

export default class CarSelectRegisterPersonScene extends BaseComponent{
    initFinish=()=>{

    }
    // 构造
      constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
           rowHasChanged:(r1,r2)=>r1!==r2,
        });
        this.state = {
            dataSource:dataSource.cloneWithRows(data),
        };
      }

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView style={{marginBottom:Pixel.getPixel(64)}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}/>
                <AllNavigationView title="选择登记人" backIconClick={this.backPage} />
                <TouchableOpacity onPress={this.addPersonClick}>
                    <View style={styles.footView}>
                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(fontAndColor.TITLEFONT40),fontWeight:'bold'}}>+</Text>
                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28) }}>  添加新登记人  </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderRow =(data)=>{
        return(
            <TouchableOpacity
                onPress={()=>{
                    this.props.selectPersonClick(data);
                    this.backPage()}}>
                <View style={styles.cellView}>
                    <Text style={[styles.cellText,data==this.props.currentPerson && {color:fontAndColor.COLORB0}]}>{data}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    addPersonClick=()=>{
        let navigatorParams = {
            name: "CarAddRegisterPersonScene",
            component: CarAddRegisterPersonScene,
            params: {
            }
        };
        this.toNextPage(navigatorParams);
    }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    },
    cellView:{
        backgroundColor:'white',
        height:Pixel.getPixel(44),
        borderBottomColor:fontAndColor.COLORA4,
        borderBottomWidth:StyleSheet.hairlineWidth,
        justifyContent:'center',
        alignItems:'center',
    },
    cellText:{
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28) ,
        color:fontAndColor.COLORA0,
    },
    footView:{
        width:sceneWidth - Pixel.getPixel(30),
        height:Pixel.getPixel(44),
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORB0,
        borderRadius:3,
        left:Pixel.getPixel(15),
        right:Pixel.getPixel(15),
        bottom:Pixel.getPixel(20),
        position:'absolute',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
});