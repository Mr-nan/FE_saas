/**
 * Created by hanmeng on 2017/5/8.
 * 订单类型选择页
 */
import  React, {Component, PropTypes} from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    Image
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import MyOrderUploadImageItem from "./component/MyOrderUploadImageItem";
import MyOrderInputItem from "./component/MyOrderInputItem";
import MyOrderSelectItem from "./component/MyOrderSelectItem";
import MyOrderDHKItem from "./component/MyOrderDHKItem";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
import DateTimePicker from 'react-native-modal-datetime-picker';
import CarZoomImageScene from "../../carSource/CarZoomImagScene";
import * as Urls from "../../constant/appUrls";
export default class MyOrderCarIDScene extends BaseComponent {
    initFinish = () => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.allList),
            renderPlaceholderOnly: 'success'
        });
    }
    // 构造
    constructor(props) {
        super(props);

        this.car_item = this.props.data.models[this.props.index].car_items[this.props.id];
        this.allList = [{name:'车架号',value:this.car_item.car_vin},
            {name:'出厂日期',value:this.car_item.manufacture},
            {name:'车架号照片',image:'',id:'',icon:''},
            {name:'里程表照片',image:'',id:'',icon:''},
            // {name:'待还款金额',image:'',id:''},
            {name:'保存',value:''}];
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            isDateTimePickerVisible:false
        };
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>

                {this.loadView()}
                <NavigatorView title='录入车架号' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='录入车架号' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(74)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                />
                <DateTimePicker
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>);
        }
    }

    sendData=()=>{
        if(this.isNull(this.allList[0].value)){
            this.props.showToast('请录入车架号');
            return;
        }else if(this.isNull(this.allList[1].value)){
            this.props.showToast('请选择出厂日期');
            return;
        }else if(this.isNull(this.allList[2].image)){
            this.props.showToast('请添加车架号照片');
            return;
        }else if(this.isNull(this.allList[3].image)){
            this.props.showToast('请添加里程表照片');
            return;
        }
        this.props.showModal(true);
        let maps = {
            company_id:global.companyBaseID,
            item_id:this.car_item.id,
            manufacture:this.allList[1].value,
            mileage_pic:this.allList[3].image,
            mileage_pic_file_id:this.allList[3].id,
            order_id:this.props.order_id,
            vin:this.allList[0].value,
            vin_pic:this.allList[2].image,
            vin_pic_file_id:this.allList[2].id,
        };
        request(Urls.ORDER_HOME_SETVIN, 'Post', maps)
            .then((response) => {
                  this.props.showToast('保存成功');
                    this.props.callBack();
                    this.backPage();
                },
                (error) => {
                    this.props.showToast(error.mjson.msg);
                });
    }


    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID) => {
        if(rowData.name=="车架号"){
            return(<MyOrderInputItem name={rowData.name} callBack={(text)=>{
                this.allList[0].value=text;
            }}/>);
        }else if(rowData.name=="出厂日期"){
            return(<MyOrderSelectItem name={rowData.name} callBack={()=>{
                this.setState({
                    isDateTimePickerVisible:true
                });
            }} values={rowData.value}/>);
        }else if(rowData.name=="待还款金额"){
            return(<MyOrderDHKItem/>);
        }else if(rowData.name=="保存"){
            return(
                <View style={{width:width,height:Pixel.getPixel(45),alignItems:'center',marginTop:Pixel.getPixel(21)}}>
                    <TouchableOpacity onPress={()=>{
                        this.sendData();
                    }} style={{width:Pixel.getPixel(346),height:Pixel.getPixel(45),alignItems:'center',
                        backgroundColor:'#05C5C2',justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(15),color:'#fff'}}>
                           保存
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return (
                <MyOrderUploadImageItem openImage={(url)=>{
                    let navigatorParams = {
                        name: "CarZoomImageScene",
                        component: CarZoomImageScene,
                        params: {
                            images: [url],
                            index: 0
                        }
                    }
                    this.toNextPage(navigatorParams);
                }} isNull={(value)=>{
                    return this.isNull(value);
                }}  image={rowData.image} icon={rowData.icon} callBack={(id,url,icon)=>{
                    if(rowData.name=="车架号照片"){
                        this.allList[2].id=id;
                        this.allList[2].image=url;
                        this.allList[2].icon=icon;
                    }else{
                        this.allList[3].id=id;
                        this.allList[3].image=url;
                        this.allList[3].icon=icon;
                    }
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    let newList = [];
                    newList.push(...this.allList);
                    this.setState({
                        dataSource: ds.cloneWithRows(newList),
                        renderPlaceholderOnly: 'success'
                    });
                }} showModal={(value)=>{this.props.showModal(value)}}
                                         showToast={(value)=>{this.props.showToast(value)}} name={rowData.name}/>
            );
        }

    }

    _handleDatePicked = (date)=>{
        let d = this.dateFormat(date,'yyyy-MM-dd');
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.allList[1].value = d;
        let newList = [];
        newList.push(...this.allList);
        this.setState({
            dataSource: ds.cloneWithRows(newList),
            renderPlaceholderOnly: 'success',isDateTimePickerVisible: false
        });
        // this._hideDateTimePicker();
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
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3
    },
    listStyle: {
        marginTop: Pixel.getPixel(15)
    },
    itemsView: {
        marginTop: Pixel.getPixel(80),
        height: Pixel.getPixel(121),
        backgroundColor: 'white'
    },
    itemView: {
        height: Pixel.getPixel(40)
    },
    rowView: {
        height: Pixel.getPixel(44),
        alignItems: 'center',
        flexDirection: 'row'
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(55),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2
    },
    rowLeft: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    image: {
        marginRight: Pixel.getPixel(15)
    }

});