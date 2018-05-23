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
                let xx = {"token":"","code":1,"msg":"ok","data":{"request":{},"response":[{"id":"118","water_num":"20180410140227104226","type_id":"1","scene_id":"1","payment_number":"201710190014","assets_number":"","finance_number":"","money":"120000.00","status":"1","bussness_status":"0","merge_id":"2877","remark":"77522","create_time":"2018-04-10 14:02:27","update_time":"2018-04-10 14:36:38","user_id":"0","ip":"","is_del":"0"},{"id":"119","water_num":"2018041014080066348","type_id":"1","scene_id":"1","payment_number":"201710190014","assets_number":"","finance_number":"","money":"120000.00","status":"4","bussness_status":"0","merge_id":"2877","remark":"77522","create_time":"2018-04-10 14:08:00","update_time":"2018-04-10 14:32:40","user_id":"0","ip":"","is_del":"0"},{"id":"123","water_num":"20180411105418859911","type_id":"1","scene_id":"1","payment_number":"201710190014","assets_number":"","finance_number":"","money":"22500.00","status":"4","bussness_status":"0","merge_id":"2877","remark":"77521","create_time":"2018-04-11 10:54:18","update_time":"2018-04-11 10:56:09","user_id":"0","ip":"","is_del":"0"},{"id":"124","water_num":"20180411160617279955","type_id":"1","scene_id":"1","payment_number":"201710180005","assets_number":"","finance_number":"10101006201804131113164226233132","money":"32000.00","status":"2","bussness_status":"0","merge_id":"2877","remark":"77510","create_time":"2018-04-11 16:06:17","update_time":"2018-04-16 12:38:43","user_id":"0","ip":"","is_del":"0"},{"id":"125","water_num":"20180411160724404488","type_id":"1","scene_id":"1","payment_number":"201710180005","assets_number":"","finance_number":"","money":"32000.00","status":"4","bussness_status":"0","merge_id":"2877","remark":"77510","create_time":"2018-04-11 16:07:24","update_time":"2018-04-11 16:11:21","user_id":"0","ip":"","is_del":"0"},{"id":"126","water_num":"20180411161623136752","type_id":"1","scene_id":"1","payment_number":"201710180005","assets_number":"","finance_number":"10101006201804131113164226233132","money":"32000.00","status":"2","bussness_status":"0","merge_id":"2877","remark":"77510","create_time":"2018-04-11 16:16:23","update_time":"2018-04-16 12:38:43","user_id":"0","ip":"","is_del":"0"},{"id":"128","water_num":"20180412175703866422","type_id":"1","scene_id":"1","payment_number":"201710190014","assets_number":"","finance_number":"","money":"22500.00","status":"0","bussness_status":"0","merge_id":"2877","remark":"77521","create_time":"2018-04-12 17:57:03","update_time":"0000-00-00 00:00:00","user_id":"0","ip":"","is_del":"0"}]},"trace":{"source_url":"http:\/\/","cost_time":"0.4317s","cost_mem":"1 B","server_ip":"","server_version":"5.6.32","file_max_size":"2M","post_max_size":"8M","source_ip":"0.0.0.0","sql":["SHOW COLUMNS FROM `dms_merge` [ RunTime:1,526,870,198.1623s ]","SHOW COLUMNS FROM `dms_merge` [ RunTime:-0.0001s ]"]}}
                    if (page == 1 && response.mjson.data.contract_list.length <= 0) {
                        this.setState({renderPlaceholderOnly: 'null'});
                    } else {
                        allPage = response.mjson.data.total/10;
                        allSouce.push(...xx.data.response);
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
                    <Text allowFontScaling={false}  style={{color: '#333333',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{'订单号：'+rowData.water_num}</Text>
                </View>
                <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')}
                       style={{width:width-Pixel.getPixel(30),height:onePT,}} />
                <View style={{flexDirection:'column',height:Pixel.getPixel(79),justifyContent:'center'}}>
                    <Text allowFontScaling={false}  style={{color: "#000000",fontSize: Pixel.getFontPixel(13)}}>{rowData.car_name}</Text>
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
                           style={styles.buttonStyle}
                           onPress={() => {
                               if(this.props.status == 3){
                                   this.toNextPage({
                                       name: 'MyAccountScene',
                                       component: MyAccountScene,
                                       params: {
                                           callBackData: () => {
                                               this.props.callBack();
                                               this.initFinish();
                                           }
                                       }
                                   });
                               }else {
                                   if(rowData.status == 0){

                                   }
                               }
                               // this.toNextPage({
                               //     name: 'ContractSignScene',
                               //     component: ContractSignScene,
                               //     params: {
                               //         contract_id: rowData.contract_id,   //合同ID
                               //         contract_log_id: rowData.contract_log_id,	//合同日志ID
                               //         product_type_code: rowData.product_type_code,	//产品类型编码
                               //         opt_user_id:this.props.opt_user_id,
                               //         showButton: true,
                               //         user_id:rowData.signator_id,
                               //         callBack: () => {
                               //             allSouce = [];
                               //             this.setState({renderPlaceholderOnly: 'loading'});
                               //             page = 1;
                               //             this.getData();
                               //         },
                               //     },
                               // })
                           }}>
                           <Text allowFontScaling={false}  style={{color: '#ffffff',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>
                               {this.getStatusStr(this.props.status,rowData.status)}</Text>
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
                tempTitle = ['处理中']
            }else if(state == 2){
                tempTitle = ['处理成功']
            }else if(state == 3){
                tempTitle = ['处理失败']
            }else if(state == 4){
                tempTitle = ['订单取消']
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
    }
});