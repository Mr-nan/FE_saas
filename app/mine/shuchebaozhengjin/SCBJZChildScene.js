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
            page: page,
            rows: 10,
            api : Urls.CONTRACT_CONTRACT_LIST,
            opt_user_id: this.props.opt_user_id,
            sign_status: '0',
        };
        request(Urls.FINANCE, 'Post', maps)

            .then((response) => {
                    if (page == 1 && response.mjson.data.contract_list.length <= 0) {
                        this.setState({renderPlaceholderOnly: 'null'});
                    } else {
                        allPage = response.mjson.data.total/10;
                        allSouce.push(...response.mjson.data.contract_list);
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(allSouce),
                            isRefreshing: false
                        });
                        this.setState({renderPlaceholderOnly: 'success'});
                    }
                },
                (error) => {
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

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={page>=allPage?true:false}/>)
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (<View style={{backgroundColor: fontAndColor.COLORA3, flex: 1, paddingTop: Pixel.getPixel(15)}}>
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
                    <Text allowFontScaling={false}  style={{color: '#333333',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{'订单号：JGF201720475793735'}</Text>
                </View>
                <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')}
                       style={{width:width-Pixel.getPixel(30),height:onePT,}} />
                <View style={{flexDirection:'column',height:Pixel.getPixel(79),justifyContent:'center'}}>
                    <Text allowFontScaling={false}  style={{color: "#000000",fontSize: Pixel.getFontPixel(13)}}>{'2017款别克精英版 1.8TSI 手自一体 反而凤凰热开关法人四驱（098521）'}</Text>
                    <Text allowFontScaling={false}  style={{color: '#9B9B9B',fontSize: Pixel.getFontPixel(12)}}>
                        {'申请时间：'}
                        <Text style={{fontSize:Pixel.getPixel(15)}}>{'2017-11-12 10:23'}</Text>
                    </Text>
                </View>
                <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')}
                       style={{width:width-Pixel.getPixel(30),height:onePT,}} />
                <View style={{flexDirection:'row',alignItems:'center',height:Pixel.getPixel(37),alignItems:'center'}}>
                    <Text allowFontScaling={false}  style={{color: "#333333",fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{'保证金：'}</Text>
                    <Text allowFontScaling={false}  style={{color: "#FA5741",fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),flex:1}}>{'345元'}</Text>
                    {
                       this.props.page == '未支付' &&
                       <TouchableOpacity
                           style={styles.buttonStyle}
                           onPress={() => {
                               this.toNextPage({
                                   name: 'ContractSignScene',
                                   component: ContractSignScene,
                                   params: {
                                       contract_id: rowData.contract_id,   //合同ID
                                       contract_log_id: rowData.contract_log_id,	//合同日志ID
                                       product_type_code: rowData.product_type_code,	//产品类型编码
                                       opt_user_id:this.props.opt_user_id,
                                       showButton: true,
                                       user_id:rowData.signator_id,
                                       callBack: () => {
                                           allSouce = [];
                                           this.setState({renderPlaceholderOnly: 'loading'});
                                           page = 1;
                                           this.getData();
                                       },
                                   },
                               })
                           }}>
                           <Text allowFontScaling={false}  style={{color: '#ffffff',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>去支付</Text>
                       </TouchableOpacity>
                    }
                </View>
            </View>

        );
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
    }
});