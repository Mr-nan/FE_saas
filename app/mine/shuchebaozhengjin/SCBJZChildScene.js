import  React, {Component, PropTypes} from  'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    RefreshControl,
    PixelRatio,
} from 'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
import ContractSignScene from '../contractManage/ContractSignScene';
import BaseComponent from "../../component/BaseComponent";
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import  LoadMoreFooter from '../../component/LoadMoreFooter';
import MyAccountScene from "../accountManage/MyAccountScene";
import CheckStand from "../supervisonFee/CheckStand";
var onePT = 1 / PixelRatio.get(); //一个像素
/*
 * 获取屏幕的宽和高
 **/
let page = 1;
let allPage = 1;
let allSouce = [];
const {width, height} = Dimensions.get('window');

export default class SCBJZChildScene extends BaseComponent {
    initFinish = () => {
        page = 1;
        allPage = 1;
        allSouce = [];
        this.getData();
    }

    componentWillUnmount() {
         page = 1;
         allPage = 1;
         allSouce = [];
    }

    getData = () => {
        let maps = {
            // page: page,
            // rows: 10,
            api : Urls.DEPOSIT_DEPOSIT_LIST,
            status:this.props.opt_user_id,
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    if (page == 1 && response.mjson.data.length <= 0 || response.mjson.data=='') {
                        this.setState({renderPlaceholderOnly: 'null'});
                    } else {
                        // allPage = response.mjson.data.total/10;
                        allSouce.push(...response.mjson.data);
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(allSouce),
                            isRefreshing: false
                        });
                        this.setState({renderPlaceholderOnly: 'success'});
                    }
                }, (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
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

    refreshingData = () => {
        allSouce = [];
        this.setState({isRefreshing: true});
        page = 1;
        this.getData();
    };

    toEnd = () => {
        if (this.state.isRefreshing) {

        } else {
            if (page < allPage) {
                page++;
                this.getData();
            }
        }
    };

    upDataView = () =>{
        this.initFinish()
    }

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page>=allPage?true:false}/>)
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (<View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                {this.loadView()}
            </View>);
        }else{

            return (
                <View style={styles.container}>
                    <ListView
                        contentContainerStyle={styles.listStyle}
                        dataSource={this.state.dataSource}
                        removeClippedSubviews={false}
                        renderRow={this._renderRow}
                        renderFooter={
                            this.renderListFooter
                        }
                        onEndReached={this.toEnd}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.refreshingData}
                                tintColor={[fontAndColor.COLORB0]}
                                colors={[fontAndColor.COLORB0]}
                            />
                        }
                    />

                </View>
            );
        }
    }

    // 每一行中的数据
    _renderRow = (rowData, rowID, selectionID) => {
        return (
            <View style={styles.rowView}>
                <View style={{flexDirection:'row',alignItems:'center',height:Pixel.getPixel(39)}}>
                    <Text allowFontScaling={false}  style={{color: '#333333',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{'订单号：'+rowData.water_num}</Text>
                </View>
                <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')}
                       style={{width:width-Pixel.getPixel(30),height:onePT,}} />
                <View style={{flexDirection:'column',height:Pixel.getPixel(79),justifyContent:'center'}}>
                    <Text allowFontScaling={false}  style={{color: "#000000",fontSize: Pixel.getFontPixel(13)}}>
                        {rowData.car_name+'('+ rowData.auto_vin.substring(rowData.auto_vin.length - 6,rowData.auto_vin.length)+")"}</Text>
                    <Text allowFontScaling={false}  style={{color: '#9B9B9B',fontSize: Pixel.getFontPixel(12)}}>
                        {'申请时间：'}
                        <Text style={{fontSize:Pixel.getPixel(15)}}>{rowData.create_time}</Text>
                    </Text>
                </View>
                <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')}
                       style={{width:width-Pixel.getPixel(30),height:onePT,}} />
                <View style={{flexDirection:'row',alignItems:'center',height:Pixel.getPixel(37),alignItems:'center'}}>
                    <Text allowFontScaling={false}  style={{color: "#333333",fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{'保证金：'}</Text>
                    <Text allowFontScaling={false}  style={{color: "#FA5741",fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),flex:1}}>{parseFloat(rowData.money)+'元'}</Text>
                    {
                       this.props.page == '未支付' &&
                       <TouchableOpacity
                           style={rowData.status == 4 ? styles.buttonCancel:styles.buttonStyle}
                           onPress={() => {
                               if(this.props.status != 3){
                                   this.toNextPage({
                                       name: 'MyAccountScene',
                                       component: MyAccountScene,
                                       params: {
                                           callBackData: () => {
                                               this.props.callBack();
                                           }
                                       }
                                   });
                               }else {
                                   if(rowData.status == 0){
                                       this.toNextPage({
                                           name: 'CheckStand',
                                           component: CheckStand,
                                           params: {
                                               page:'ShuCheBaoZhengJin',
                                               orderNums:rowData.water_num,
                                               callBack: () => {
                                                   allSouce = [];
                                                   this.setState({renderPlaceholderOnly: 'loading'});
                                                   page = 1;
                                                   this.getData();
                                               },
                                           },
                                       })
                                   }
                               }
                           }}>
                           {
                               rowData.status == 4 ?
                                   <Text allowFontScaling={false}  style={{color: fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>
                                       {this.getStatusStr(this.props.status,rowData.status)}</Text>:
                                   <Text allowFontScaling={false}  style={{color: '#ffffff',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>
                                       {this.getStatusStr(this.props.status,rowData.status)}</Text>
                           }
                       </TouchableOpacity>
                    }
                </View>
            </View>

        );
    }

    getStatusStr = (stateCode,state) => {
        let tempTitle = []
        if (stateCode == '0') {
            tempTitle = ['去开户']
        } else if (stateCode == '1') {
            tempTitle = ['去绑卡']
        } else if (stateCode == '2') {
            tempTitle = ['去激活']
        }else {
            if(state == 0){
                tempTitle = ['去支付']
            }else if(state == 1){
                tempTitle = ['支付中']
            }else if(state == 2){
                tempTitle = ['处理成功']
            }else if(state == 3){
                tempTitle = ['处理失败']
            }else if(state == 4){
                tempTitle = ['已取消']
            }
        }
        return tempTitle;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
        marginBottom:Pixel.getPixel(15)
    },
    listStyle: {
        marginTop: Pixel.getPixel(0)
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3,
    },
    rowView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopWidth:Pixel.getPixel(10),
        borderTopColor:fontAndColor.COLORA3,
        paddingLeft:Pixel.getPixel(15),
        paddingRight:Pixel.getPixel(15)
    },
    rowLeftTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0,
    },
    rowLeftTitle1: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2,
    },
    rowLeft: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        flexDirection: 'column',
    },
    rowRightTitle: {
        color: fontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        textAlign:'center',
    },
    image: {
        marginRight: Pixel.getPixel(15),
    },
    buttonStyle:{
        height: Pixel.getPixel(25),
        width: Pixel.getPixel(73),
        borderRadius: Pixel.getPixel(1),
        backgroundColor: fontAndColor.COLORB0,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonCancel: {
        height: Pixel.getPixel(25),
        width: Pixel.getPixel(73),
        borderRadius: Pixel.getPixel(1),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA2
    },
});