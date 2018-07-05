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
import MyOrderInfoTitleItem from "./component/MyOrderInfoTitleItem";
import MyOrderInfoBottomItem from "./component/MyOrderInfoBottomItem";
import GetOrderTextUtil from "../../utils/GetOrderTextUtil";
import MyOrderInfoTiShiItem from "./component/MyOrderInfoTiShiItem";
import MyOrderPayItem from "./component/MyOrderPayItem";
import MyOrderListScene from "./MyOrderListScene";
import MyOrderCarIDScene from "./MyOrderCarIDScene";
import MyOrderChangeDataScene from "./MyOrderChangeDataScene";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class MyOrderInfoScene extends BaseComponent {
    initFinish = () => {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([1,2,3,4,6]),
            renderPlaceholderOnly: 'success'
        });
    }
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            type:3
        };
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>

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
                <NavigatorView wrapStyle={{backgroundColor:'#00000000'}} renderRihtFootView={()=>{return <Text style={{color:'#fff',
                    fontSize:Pixel.getPixel(15)
                }}>取消订单</Text>}}  title='订单详情' backIconClick={this.backPage}/>
                {GetOrderTextUtil.getPay(this.state.type)}
            </View>);
        }
    }




    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID) => {
        if(rowData==1){
            return (
               <MyOrderInfoTitleItem type={this.state.type}/>
            );
        }else if(rowData==2){
            return (
                GetOrderTextUtil.getScend(this.state.type)
            );
        }else if(rowData==3){
            return (
                GetOrderTextUtil.getCar(this.state.type,()=>{
                    this.toNextPage({
                        name:'MyOrderChangeDataScene',
                        component:MyOrderChangeDataScene,
                        params:{}
                    })
                })

            );
        }else if(rowData==4){
            return (
                GetOrderTextUtil.getBottom(this.state.type)
            );
        }else if(rowData==5){
            return(
                <MyOrderInfoTiShiItem/>
            );
        }else{
            return(
                <View style={{width:width,height:Pixel.getPixel(55)}}></View>
            );
        }

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