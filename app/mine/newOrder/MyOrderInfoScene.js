/**
 * Created by hanmeng on 2017/5/8.
 * 订单类型选择页
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    Image
} from 'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil'

var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import MyOrderInfoTitleItem from "./component/MyOrderInfoTitleItem";
import MyOrderInfoBottomItem from "./component/MyOrderInfoBottomItem";
import GetOrderTextUtil from "../../utils/GetOrderTextUtil";
import MyOrderInfoTiShiItem from "./component/MyOrderInfoTiShiItem";
import MyOrderPayItem from "./component/MyOrderPayItem";
import MyOrderListScene from "./MyOrderListScene";
import MyOrderCarIDScene from "./MyOrderCarIDScene";
import MyOrderChangeDataScene from "./MyOrderChangeDataScene";
import {request} from "../../utils/RequestUtil";
import * as Urls from "../../constant/appUrls";
import BankScene from "../bank/BankScene";
import MyOrderSelectWuliuItem from "./component/MyOrderSelectWuliuItem";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class MyOrderInfoScene extends BaseComponent {


    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            allData:{},
            from:this.props.from,
            wuliu:{name:'',id:''}
        };
    }

    initFinish = () => {
        this.getData();
    }

    getData = () => {
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id
        };
        request(Urls.ORDER_HOME_DETAIL, 'Post', maps)
            .then((response) => {
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(GetOrderTextUtil.getList(response.mjson.data.status,this.state.from)),
                        renderPlaceholderOnly: 'success',
                        allData:response.mjson.data,
                    });
                },
                (error) => {
                    if (error.mycode == '-2100045' || error.mycode == '-1') {
                        this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                    } else {
                        this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                    }
                });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (<View style={styles.container}>

                {this.loadView()}
                <NavigatorView title='订单详情' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>

                <ListView style={{backgroundColor: fontAndColor.COLORA3}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}

                />
                <NavigatorView wrapStyle={{backgroundColor: '#00000000'}} renderRihtFootView={() => {
                    return <Text style={{
                        color: '#fff',
                        fontSize: Pixel.getPixel(15)
                    }}>取消订单</Text>
                }} title='订单详情' backIconClick={this.backPage}/>
                {GetOrderTextUtil.getPay(this.state.allData.status,this.state.from,this.state.allData,(types)=>{
                    if(types==1){
                        this.toNextPage({
                            name:'BankScene',
                            component:BankScene,
                            params:{order_id:this.props.order_id,data:this.state.allData,callBack:()=>{
                                    this.getData();
                                },types:'dingjin'}
                        })
                    }else if(types==2){
                        this.toNextPage({
                            name:'BankScene',
                            component:BankScene,
                            params:{order_id:this.props.order_id,data:this.state.allData,callBack:()=>{
                                    this.getData();
                                },types:'quankuan'}
                        })
                    }else if(types==3){
                        this.jiaoyiqueren();
                    }else{
                        this.sendMoney();
                    }
                },this.state.wuliu)}
                <MyOrderSelectWuliuItem ref='myorderselectwuliuitem' wuliu={this.state.wuliu} callBack={(name,id)=>{
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(GetOrderTextUtil.getList(this.state.allData.status,this.state.from)),
                        renderPlaceholderOnly: 'success',
                        wuliu:{name:name,id:id}
                    });
                }}/>
            </View>);
        }
    }

    jiaoyiqueren=()=>{
        this.props.showModal(true);
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id,
        };
        request(Urls.BUYERCONFIRMORDERPRICE, 'Post', maps)
            .then((response) => {
                    this.props.showToast('确认成功');
                    this.getData();
                },
                (error) => {
                    this.props.showToast(error.mjson.msg);
                });
    }

    sendMoney=()=>{
        this.props.showModal(true);
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id,
        };
        request(Urls.CONFIRMORDERPRICE, 'Post', maps)
            .then((response) => {
                    this.props.showToast('确认成功');
                    this.getData();
                },
                (error) => {
                    this.props.showToast(error.mjson.msg);
                });
    }


    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData == 1) {
            return (
                <MyOrderInfoTitleItem data={this.state.allData} type={GetOrderTextUtil.getStatus(this.state.allData.status,this.state.from)}
                                      from={this.state.from} callBack={()=>{
                    this.refs.myorderselectwuliuitem.changeShow();
                }}
                wuliu={this.state.wuliu}/>
            );
        } else if (rowData == 2) {
            return (
                GetOrderTextUtil.getScend(this.state.allData.status,this.state.from,this.state.allData)
            );
        } else if (rowData == 3) {
            return (
                GetOrderTextUtil.getCar(this.state.allData.status,this.state.from,this.state.allData,(topMoney,bottomMoney,model_id,type)=>{
                    if(type==1){
                        this.setPrice(topMoney,bottomMoney,model_id)
                    }else{
                        this.toNextPage({
                            name:'MyOrderChangeDataScene',
                            component:MyOrderChangeDataScene,
                            params:{order_id:this.props.order_id,data:this.state.allData,index:topMoney,callBack:()=>{
                                this.getData();
                                }}
                        })
                    }
                },(content)=>{this.props.showToast(content)},(show)=>{this.props.showModal(show)})
            );
        } else if (rowData == 4) {
            return (
                GetOrderTextUtil.getBottom(this.state.allData.status,this.state.from)
            );
        } else if (rowData == 5) {
            return (
                <MyOrderInfoTiShiItem/>
            );
        } else {
            return (
                <View style={{width: width, height: Pixel.getPixel(55)}}></View>
            );
        }

    }

    setPrice=(topMoney,bottomMoney,model_id)=>{
        this.props.showModal(true);
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id,
            deposit: parseInt(bottomMoney)*10000,
            model_id: model_id,
            price: parseInt(topMoney)*10000,
        };
        request(Urls.ORDER_HOME_SETPRICE, 'Post', maps)
            .then((response) => {
                    this.props.showToast('设置成功');
                    this.getData();
                },
                (error) => {
                    this.props.showToast(error.mjson.msg);
                });
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