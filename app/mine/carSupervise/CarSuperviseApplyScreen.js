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

        this.borrow_date = '';
        this.borrow_days='';
        this.selectCar={};
        this.selectArticle={
            data:[],
            remark:'',
        };
        this.selectCause={
            data:{},
            remark:'',
        };


        this.state={
            isDateTimePickerVisible:false,
            titleData:this.titleData,
            isButtonTouch:false,
        }
    }

    render(){
        return(
            <View style={styles.root}>
                <StatusBar barStyle={'light-content'}/>
                <ScrollView  ref={(ref)=>{this.scrollView = ref}}>
                    {/*<View style={{padding:Pixel.getPixel(15), flexDirection:'row',*/}
                        {/*alignItems:'center',backgroundColor:fontAndColor.COLORB6,*/}
                        {/*borderBottomColor:fontAndColor.COLORA4,borderBottomWidth:StyleSheet.hairlineWidth,*/}
                    {/*}}>*/}
                        {/*<Text style={{color:fontAndColor.COLORB7, fontSize:fontAndColor.CONTENTFONT24,width:width-Pixel.getPixel(30)}}>仅限从您当前质押的车辆中申请借出质押物(车辆、权证、钥匙)</Text>*/}
                    {/*</View>*/}
                    {
                        this.state.titleData.map((data,index)=>{
                            return(
                                <View style={{backgroundColor:'white'}} key={index}>
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
                        <TouchableOpacity onPress={this.footBtnClick} activeOpacity={1}>
                            <View style={[styles.footView,{backgroundColor:this.state.isButtonTouch?fontAndColor.COLORB0:fontAndColor.COLORB5}]}>
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

                            if(selectCar.auto_vin){
                                this.selectCar= selectCar;
                                this.titleData[0][0].value =selectCar.auto_vin+'\n'+selectCar.model_name;
                                this.updataTitle();
                            }

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

                            if(selectArticle){
                                this.selectArticle= selectArticle;
                                let value = '';

                                for(let i=0;i<selectArticle.data.length;i++){

                                    let data = selectArticle.data[i];
                                    if(i>0){
                                        value+='/';
                                    }
                                    value+=data.title;
                                }

                                let string = '请选择';

                                if(value && selectArticle.remark){
                                    string = value+'\n'+selectArticle.remark;

                                }else if(value){
                                    string = value;
                                }else if(selectArticle.remark) {
                                    string = selectArticle.remark
                                }

                                this.titleData[0][1].value =string;
                                this.updataTitle();
                            }

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
                        selectCause:this.selectCause,
                        confirmClick:(selectCause)=>{

                            if(selectCause){
                                this.selectCause= selectCause;
                                let string = '请选择';

                                if(selectCause.data.title && selectCause.remark){
                                    string = selectCause.data.title+'\n'+selectCause.remark;

                                }else if(selectCause.data.title){
                                    string = selectCause.data.title;
                                }else if(selectCause.remark) {
                                    string = selectCause.remark
                                }

                                this.titleData[0][4].value =string;
                                this.updataTitle();
                            }

                        }
                    }
                });
                break;
        }

    }

    updataTitle=()=>{

        let tmIsTouch = false;

        if(this.borrow_date!='' && this.borrow_days!='' && this.selectCar.auto_vin && this.selectArticle.data.length && this.selectCause.data.title){
            tmIsTouch = true;
        }

        this.setState({
            titleData:this.titleData,
            isButtonTouch:tmIsTouch,
        })
    }

    cellSelectAction=(data)=>{

        this.borrow_days = data.value;
        this.updataTitle();

    }

    footBtnClick=()=>{

        if(this.borrow_date!='' && this.borrow_days!='' && this.selectCar.auto_vin && this.selectArticle.data.length && this.selectCause.data.title){}

            if(!this.selectCar.auto_vin){
                this.props.showToast('请选择车辆！！');
                return;
            }
            if(this.selectArticle.data.length<=0){
                this.props.showToast('请选择借出物！！');
                return;
            }

            if(!this.borrow_date){
                this.props.showToast('请选择借出时间！！');
                return;
            }
            if(!this.borrow_days){
                this.props.showToast('请选择借出天数！！');
                return;
            }
            if(!this.selectCause.data.title){
                this.props.showToast('请选择借出原因！！');
                return;
            }



            if(this.state.isButtonTouch){
            let manufactureData = new  Date(this.borrow_date);
            let initReg = new  Date();
            if(manufactureData.getTime() < initReg.getTime())
            {
                this.props.showToast('借出日期必须晚于今天');
                return;
            }

            this.carApplyAction();

        }

    }

    carApplyAction=()=>{

        let borrow_goods = [];
        for (let data of this.selectArticle.data){
            borrow_goods.push(data.value);
        }

        this.props.showModal(true);
        request(AppUrls.FINANCE, 'Post', {
            api: AppUrls.PLEDGE_CAR_APPLY,
            regulation_list_id:this.selectCar.id,
            borrow_date:this.borrow_date,
            borrow_days:this.borrow_days,
            borrow_goods:borrow_goods.toString(),
            borrow_other_goods:this.selectArticle.remark?this.selectArticle.remark:'',
            borrow_uses:this.selectCause.data.value,
            borrow_other_uses:this.selectCause.remark?this.selectCause.remark:''

        })
            .then((response) => {
                    this.props.showModal(false);
                    this.props.showToast('申请成功');
                    this.props.loadAction();
                    this.backPage();

                },
                (error) => {
                    this.props.showModal(false);
                    this.props.showToast(error.mjson.msg);

                });
    }

    _handleDatePicked = (date)=>{
        let d = this.dateFormat(date,'yyyy-MM-dd');
        this.borrow_date = d;
        this.titleData[0][2].value = d;
        this.updataTitle();
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