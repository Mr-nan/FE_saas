/**
 * Created by zhengnan on 2018/7/4.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StatusBar

}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import {CellView,CellSelectView} from '../../carSource/znComponent/CarPublishCell';

import * as AppUrls from "../../constant/appUrls";
import {request} from '../../utils/RequestUtil';
import CarSuperviseCarSelectScreen from "./CarSuperviseCarSelectScreen";

const Pixel = new PixelUtil();
const IS_ANDROID = Platform.OS === 'android';

export default class CarSuperviseApplyScreen extends BaseComponent{

    // 构造
    constructor(props) {
        super(props);

        this.titleData=[
            [

                {
                    title:'车辆',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
                {
                    title:'借出物',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
                {
                    title:'借出时间',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
                {
                    title:'借出天数',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                    selectDict: {current: this.nature_use, data: [{title: '1天', value: 1}, {title: '2天', value: 2},{title: '3天', value: 3}]},

                },
                {
                    title:'借用原因',
                    isShowTag:false,
                    value:'请选择',
                    isShowTail:true,
                },
            ]

        ];
    }

    render(){
        return(
            <View style={styles.root}>
                <StatusBar barStyle={'light-content'}/>
                <ScrollView  ref={(ref)=>{this.scrollView = ref}}>
                    {
                        this.titleData.map((data,index)=>{
                            return(
                                <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                    {
                                        data.map((rowData,subIndex)=>{
                                            return( rowData.selectDict?(
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        onPress={()=>{this.cellClick(rowData.title)}}
                                                        activeOpacity={1}>
                                                        <CellSelectView
                                                            currentTitle={rowData.selectDict.current}
                                                            cellData={rowData}
                                                            cellSelectAction={this.cellSelectAction}
                                                            ref="cellSelectView"
                                                        />
                                                    </TouchableOpacity>):(
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        onPress={
                                                            ()=>{this.cellClick(rowData.title)}
                                                        }
                                                        activeOpacity={1}>
                                                        <CellView cellData={rowData}/>
                                                    </TouchableOpacity>))
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                    <View style={styles.footContainer}>
                        <TouchableOpacity onPress={this.footBtnClick}>
                            <View style={styles.footView}>
                                <Text allowFontScaling={false}  style={styles.footText}>提交</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <NavigationView title="申请监管物借出" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellClick=(title)=>{


        switch (title){
            case  '车辆':
                console.log(title);
                break;
            case  '借出物':
                break;
            case '借出时间':
                break;
            case '借出原因':
                break;
        }

    }

    cellSelectAction=(title,value)=>{

        console.log(title,value);
    }

    footBtnClick=()=>{
        this.toNextPage({
            name: 'CarSuperviseCarSelectScreen',
            component: CarSuperviseCarSelectScreen,
            params: {

            }
        });
    }
}

const styles = StyleSheet.create({
    root:{
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        flex:1
    },
    footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(30),

    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:width-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
        marginBottom:Pixel.getPixel(20),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
})