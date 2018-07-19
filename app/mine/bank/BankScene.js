/**
 * Created by hanmeng on 2017/5/8.
 * 订单类型选择页
 */
import  React, {Component, PropTypes} from  'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    Image, StatusBar
} from 'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import BankTitleItem from "./component/BankTitleItem";
import BankTitleTextItem from "./component/BankTitleTextItem";
import BankSelectItem from "./component/BankSelectItem";
import BankTextItem from "./component/BankTextItem";
import BankButtonItem from "./component/BankButtonItem";
import * as Urls from "../../constant/appUrls";
import AccountWebScene from "../accountManage/AccountWebScene";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class BankScene extends BaseComponent {
    initFinish = () => {
        this.getData();
    }

    getData=()=>{
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id
        };
        request(Urls.CASHIERDETAILS, 'Post', maps)
            .then((response) => {
                    if(response.mjson.data.payment_type.hengfeng.available==1){
                        if(response.mjson.data.payment_type.hengfeng.entrust==1){
                            this.xintuo = true;
                        }
                        if(parseInt(response.mjson.data.payment_type.hengfeng.balance)>=parseInt(this.props.data.deposit_amount)){
                            this.selectData.push({
                                name:'恒丰账户',
                                image:require('../../../images/neworder/heng.png'),
                                describe:'可用余额'+response.mjson.data.payment_type.hengfeng.balance+'元'
                            });
                        }else{
                            this.selectData.push({
                                name:'恒丰账户',
                                image:require('../../../images/neworder/heng.png'),
                                describe:'余额不足'
                            });
                        }
                    }
                    if(response.mjson.data.payment_type.dingcheng.available==1){
                        this.selectData.push({
                            name:'鼎诚代付',
                            image:require('../../../images/neworder/ding.png')
                        });
                    }
                    if(response.mjson.data.payment_type.offline.available==1){
                        this.selectData.push({
                            name:'线下支付',
                            image:require('../../../images/neworder/xian.png')
                        });
                    }
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows([1,2,3,4,5]),
                        renderPlaceholderOnly: 'success'
                    });
                },
                (error) => {
                    this.setState({
                        renderPlaceholderOnly: 'error'
                    });
                });
    }
    // 构造
    constructor(props) {
        super(props);
        this.selectData=[];
        this.select = -1;
        this.xintuo = false;
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            barStyle:'default'

        };
    }
    componentWillUnmount(){
        this.setState({
            barStyle:'light-content'
        })
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                <StatusBar barStyle={this.state.barStyle}/>

                {this.loadView()}
                <NavigatorView title={'收银台'}
                                backIconClick={()=>{
                                    this.backPage()

                                } }
                                wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <StatusBar barStyle={this.state.barStyle}/>
                <NavigatorView title={'收银台'}
                                backIconClick={()=>{
                                    this.backPage()
                                } }
                                wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontAndColor.COLORA0}}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(64)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                />
            </View>);
        }
    }


    
    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID) => {
        if(rowData==1){
            return(<BankTitleItem types={this.props.types} data={this.props.data}/>);
        }else if(rowData==2){
            return(<BankTitleTextItem/>);
        }else if(rowData==3){
            return(<BankSelectItem data={this.selectData} callBack={(index)=>{
                this.select = index;
            }}/>);
        }else if(rowData==4){
            return(<BankTextItem xintuo={this.xintuo}/>);
        }else{
            return (
                <BankButtonItem callBack={()=>{
                    if(this.select==-1){
                        this.props.showToast('请选择支付方式');
                    }else{
                        if(this.selectData[this.select].name=='恒丰账户'){
                            this.hengfeng();
                        }else if(this.selectData[this.select].name=='鼎诚代付'){
                            this.dingcheng();
                        }else{
                            this.xianxia();
                        }
                    }
                }}/>
            );
        }
    }
    hengfeng=()=>{
        if(this.props.types=='dingjin'){
            this.props.showModal(true);
            let maps = {
                company_id: global.companyBaseID,
                order_id: this.props.order_id,
                reback_url:'www.orderzhifudingjin.com'
            };
            request(Urls.ORDER_HOME_PAYDEPOSIT, 'Post', maps)
                .then((response) => {
                        this.props.showModal(false);
                        this.toNextPage({
                            name:'AccountWebScene',
                            component:AccountWebScene,
                            params:{webUrl:response.mjson.data.url,backUrl:'www.orderzhifuweikuan.com',callBack:()=>{
                                    this.props.callBack();
                                    this.backPage();
                                }}
                        })
                    },
                    (error) => {
                        this.props.showToast(error.mjson.msg);
                    });
        }else{
            this.props.showModal(true);
            let maps = {
                company_id: global.companyBaseID,
                order_id: this.props.order_id,
                reback_url:'www.orderzhifuweikuan.com'
            };
            request(Urls.ORDER_HOME_PAYBALANCE, 'Post', maps)
                .then((response) => {
                        this.props.showModal(false);
                        this.toNextPage({
                            name:'AccountWebScene',
                            component:AccountWebScene,
                            params:{webUrl:response.mjson.data.url,backUrl:'www.orderzhifuweikuan.com',callBack:()=>{
                                    this.props.callBack();
                                    this.backPage();
                                }}
                        })
                    },
                    (error) => {
                        this.props.showToast(error.mjson.msg);
                    });
        }
      
    }

    dingcheng=()=>{
        this.props.showModal(true);
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id,
        };
        request(Urls.DINGCHENGPAY, 'Post', maps)
            .then((response) => {
                    this.props.showToast('支付成功');
                    this.props.callBack();
                    this.backPage();
                },
                (error) => {
                    this.props.showToast(error.mjson.msg);
                });
    }

    xianxia=()=>{
        this.props.showModal(true);
        let maps = {
            company_id: global.companyBaseID,
            order_id: this.props.order_id,
        };
        request(Urls.OFFLINEPAY, 'Post', maps)
            .then((response) => {
                    this.props.showToast('支付成功');
                    this.props.callBack();
                    this.backPage();
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