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
import MyOederItem from "./component/MyOederItem";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class MyOrderScene extends BaseComponent {
    initFinish = () => {
        let select = [{
            name: '采购订单',
            icon: require('../../../images/neworder/caigou.png'),
            jyz:require('../../../images/neworder/jyz.png'),
            ywc:require('../../../images/neworder/ywc.png'),
            ygb:require('../../../images/neworder/ygb.png'),
            tk:require('../../../images/neworder/tk.png')
        },
            {
                name: '销售订单',
                icon: require('../../../images/neworder/xiaoshou.png'),
                jyz:require('../../../images/neworder/xsjyz.png'),
                ywc:require('../../../images/neworder/xsywc.png'),
                ygb:require('../../../images/neworder/xsygb.png'),
                tk:require('../../../images/neworder/xstk.png')
            }];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(select),
            renderPlaceholderOnly: 'success'
        });
    }
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        };
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>

                {this.loadView()}
                <NavigatorView title='我的订单' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='我的订单' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(74)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          renderSeparator={this._renderSeperator}
                />
            </View>);
        }
    }

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }


    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID) => {
        return (
          <MyOederItem data={rowData}/>
        );
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