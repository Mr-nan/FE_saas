/**
 * Created by hanmeng on 2017/5/8.
 * 采购订单
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    RefreshControl,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import NavigatorView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil'
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import LogisCarInfoTopItem from './logisComponent/LogisCarInfoTopItem';
import LogisCarInfoCenterItem from './logisComponent/LogisCarInfoCenterItem';
import LogisCarInfoBottomItem from './logisComponent/LogisCarInfoBottomItem';

var Pixel = new PixelUtil();

export default class LogisCarInfoScene extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([1, 2, 3]),
            renderPlaceholderOnly: 'loading',
            isRefreshing: false,
            scrollEnabled: true
        };
        this.order = {};
    }

    initFinish = () => {
        this.loadData();
    };

    // 下拉刷新数据
    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.loadData();
    };



    /*

         {
        "car_name": "2013款 途观 豪华版 1.8TSI 手自一体 两驱",
        "car_price": "130000.00",
        "tms_vin": "",
        "total_amount": "1976.00",
        "tax_amount": "0.00",
        "insure_amount": "0.00",
        "check_amount": "0.00",
        "freight_amount": "1587.00",
        "service_amount": "150.00",
        "tostore_amount": "239.00",
        "Logistics_info": [{
            "nodeDesc": "下单",
            "nodeTime": "2018-05-13 11:26:00",
            "nodeMsg": "备注信息"
        }, {
            "nodeDesc": "到达：辽宁省沈阳市",
            "nodeTime": "2018-05-13 11:26:00",
            "nodeMsg": "备注信息"
        }]
    }

    */

    loadData = () => {

        let params = {
            company_id: global.companyBaseID,
            trans_id: this.props.order.trans_id,
            item_id:this.props.car.item_id,
        }

        request(AppUrls.ORDER_LOGISTICS_CAR_DETAIL, 'post', params).then((response) => {
            let data = response.mjson.data;

            if (typeof data === 'undefined') {
                this.setState({
                    renderPlaceholderOnly: 'noData',
                })
                return;
            }
            this.order = data;
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows([1, 2, 3]),
                isRefreshing: false,
                scrollEnabled: true,
                renderPlaceholderOnly: 'success',
            })
        }, (error) => {

            this.setState({
                renderPlaceholderOnly: "failure",

            })
            this.props.showToast(error.mjson.msg);

        });

    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                <NavigatorView title='单车详情' backIconClick={this.backPage}/>
                {this.loadView()}
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='单车详情' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(60)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          showsVerticalScrollIndicator={false}
                          scrollEnabled={this.state.scrollEnabled}
                          onScroll={(event) => {
                              this.offY = Pixel.getPixel(event.nativeEvent.contentOffset.y);
                              if(this.offY==286){
                                  console.log("----------------");
                                   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                   this.setState({ dataSource: ds.cloneWithRows([1, 2, 3])});
                              }
                          }}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this.refreshingData}
                                  tintColor={[fontAndColor.COLORB0]}
                                  colors={[fontAndColor.COLORB0]}
                              />
                          }/>
            </View>);
        }
    }


    _renderRow = (rowData, selectionID, rowID) => {
        if (rowID == 0) {
            return (<LogisCarInfoTopItem data = {this.order}/>);
        } else if (rowID == 1) {
            return (<LogisCarInfoCenterItem data = {this.order}/>);
        } else {
            return (<LogisCarInfoBottomItem destination = {this.order.destination} data = {this.order.Logistics_info} offy={this.offY} callBack={(content) => {
                console.log(55555555555555555);
                this.setState({scrollEnabled: content});
            }}/>);
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    rowView: {
        height: Pixel.getPixel(186),
        backgroundColor: 'white'
    },
    rowTitleLine: {
        alignItems: 'center',
        height: Pixel.getPixel(40),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //marginTop: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)
    },
    rowTitleState: {
        alignItems: 'flex-end',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB2,
        marginRight: Pixel.getPixel(15)
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    image: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        resizeMode: 'stretch'
    },
    carDescribeTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    carDescribe: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA0
    }
});