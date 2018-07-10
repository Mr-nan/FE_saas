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
import {CellView,CellSelectView} from './component/CarSuperviseCell';
import DateTimePicker from 'react-native-modal-datetime-picker';


import * as AppUrls from "../../constant/appUrls";
import {request} from '../../utils/RequestUtil';
import CarSuperviseCarSelectScreen from "./CarSuperviseCarSelectScreen";
import CarSuperviseSelectArticleScreen from "./CarSuperviseSelectArticleScreen";
import CarSuperviseSelectCauseScreen from "./CarSuperviseSelectCauseScreen";

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

        this.state={
            isDateTimePickerVisible:false,
            titleData:this.titleData,
        }
    }

    render(){
        return(
            <View style={styles.root}>
                <StatusBar barStyle={'light-content'}/>
                <ScrollView  ref={(ref)=>{this.scrollView = ref}}>
                    {
                        this.state.titleData.map((data,index)=>{
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
                <DateTimePicker
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                <NavigationView title="申请监管物借出" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellClick=(title)=>{

        switch (title){
            case  '车辆':
                this.toNextPage({
                    name: 'CarSuperviseCarSelectScreen',
                    component: CarSuperviseCarSelectScreen,
                    params: {
                        selectCar:this.selectCar,
                        confirmClick:(selectCar)=>{
                            this.selectCar= selectCar;
                            this.titleData[0][0].value =selectCar.vin+'\n'+selectCar.carName;
                            this.updataTitle();
                        }
                    }
                });
                break;
            case  '借出物':

                this.toNextPage({
                    name: 'CarSuperviseSelectArticleScreen',
                    component: CarSuperviseSelectArticleScreen,
                    params: {
                        selectArticle:this.selectArticle,
                        confirmClick:(selectArticle)=>{
                            this.selectArticle= selectArticle;
                            this.titleData[0][1].value =selectCar.vin+'\n'+selectCar.carName;
                            this.updataTitle();
                        }
                    }
                });

                break;
            case '借出时间':
                this.setState({ isDateTimePickerVisible: true });
                break;
            case '借用原因':
                this.toNextPage({
                    name: 'CarSuperviseSelectCauseScreen',
                    component: CarSuperviseSelectCauseScreen,
                    params: {

                    }
                });
                break;
        }

    }

    updataTitle=()=>{
        this.setState({
            titleData:this.titleData
        })
    }

    cellSelectAction=(title,value)=>{

        console.log(title,value);
    }

    footBtnClick=()=>{

    }

    _handleDatePicked = (date)=>{
        let d = this.dateFormat(date,'yyyy-MM-dd');
        console.log(d);
        this._hideDateTimePicker();
    };

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };


    dateFormat = (date,fmt) => {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
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