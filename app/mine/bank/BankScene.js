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
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class BankScene extends BaseComponent {
    initFinish = () => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows([1,2,3,4,5]),
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
            return(<BankTitleItem/>);
        }else if(rowData==2){
            return(<BankTitleTextItem/>);
        }else if(rowData==3){
            return(<BankSelectItem/>);
        }else if(rowData==4){
            return(<BankTextItem/>);
        }else{
            return (
                <BankButtonItem/>
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