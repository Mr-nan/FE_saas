/**
 * Created by zhaojian 2017/2/8.
 */

import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    InteractionManager,
    RefreshControl,
    BackAndroid,
    Linking,
    NativeModules
} from  'react-native'

import * as fontAndClolr from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
let page = 1;
let status = 1;
import  ViewPagers from './component/ViewPager'
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
import BaseComponet from '../component/BaseComponent';
import {request} from '../utils/RequestUtil';
import CarInfoScene from '../carSource/CarInfoScene';
import  StorageUtil from '../utils/StorageUtil';
import * as storageKeyNames from '../constant/storageKeyNames';
import WebScene from './WebScene';
import  CarMySourceScene from '../carSource/CarMySourceScene';
import HomeJobItem from './component/HomeJobItem';
import HomeRowButton from './component/HomeRowButton';
import HomeAdvertisementButton from './component/HomeAdvertisementButton';
import MessageListScene from "../message/MessageListScene";
import * as Urls from '../constant/appUrls';
import AuthenticationModal from '../component/AuthenticationModal';
let Platform = require('Platform');


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let allList = [];

export default class HomeScene extends BaseComponet {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.carData = [];
        this.state = {
            source: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            headSource: [],
            pageData: []
        };
        this.authenOptions = {
            '1':[true,'请先完成认证后再进行操作','取消','','个人认证',()=>{}],
            '2':[true,'请先完成认证后再进行操作','取消','','企业认证',()=>{}],
            '3':[true,'认证未通过请重新认证，您可以重新认证或联系客服','取消','联系客服','个人认证',()=>{},this.callAciton],
            '4':[true,'认证未通过请重新认证，您可以重新认证或联系客服','取消','联系客服','企业认证',()=>{},this.callAciton],
            '5':[true,'您的认证申请正在审核中，您可查看所提交信息。我们会在一个工作日内向您反馈结果，请稍候。','取消','','个人认证已提交',()=>{}],
            '6':[true,'您的认证申请正在审核中，您可查看所提交信息。我们会在一个工作日内向您反馈结果，请稍候。','取消','','企业认证已提交',()=>{}],
            '7':[true,'需创建此账号的主账号通过个人认证后进行操作','取消','','',()=>{}],
            '8':[true,'需创建此账号的主账号通过个人认证后进行操作','取消','','',()=>{}],
        };

    }

    //联系客服
    callAciton = ()=>{
        request(Urls.GET_CUSTOM_SERVICE, 'Post', {})
            .then((response) => {
                    if (response.mjson.code == 1) {
                        if (Platform.OS === 'android') {
                            NativeModules.VinScan.callPhone(response.mjson.data.phone);
                        } else {
                            Linking.openURL('tel:' + response.mjson.data.phone);
                        }
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                },
                (error) => {
                    this.props.showToast(error.msg);
                });
    };

    //认证功能验证
    _checkAuthen = (params)=>{
        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enterprise_id: datas.company_base_id,
                    function_id: params.id,
                    type:'app'
                };
                request(Urls.USER_IDENTITY_GET_INFO, 'post', maps).then((response) => {
                    this.orderListData = response.mjson.data.items;
                    if(response.mjson.data.auth == 0){
                        this.props.callBack(params);
                    }else{
                        this.refs.authenmodal.changeShowType(...this.authenOptions[response.mjson.data.auth+'']);
                    }
                }, (error) => {
                    this.props.showToast(error.msg);
                });
            } else {
                this.props.showToast('获取企业信息失败');
            }
        });
    }

    _renderHeader = () => {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <ViewPagers callBack={(urls)=> {
                        this.props.callBack(
                            {name: 'WebScene', component: WebScene, params: {webUrl: urls}}
                            );
                    }} items={this.state.allData} toNext={()=>{
                         this.props.jumpScene('financePage','');
                    }}/>
                    <TouchableOpacity onPress={()=> {
                        this.props.jumpScene('carpage', 'true');
                    }} activeOpacity={0.8} style={{
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        width: width - Pixel.getPixel(75),
                        height: Pixel.getPixel(27),
                        position: 'absolute',
                        marginTop: Pixel.getTitlePixel(26)
                        ,
                        marginLeft: Pixel.getPixel(20),
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Image style={{width: Pixel.getPixel(17), height: Pixel.getPixel(17)}}
                               source={require('../../images/findIcon.png')}/>
                        <Text allowFontScaling={false} style={{
                            backgroundColor: '#00000000', fontSize: Pixel.getPixel(fontAndClolr.CONTENTFONT24),
                            color: fontAndClolr.COLORA1
                        }}> 搜索您要找的车</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {
                        this.props.callBack({name:'messagelistscene',component:MessageListScene,params:{}});
                    }} activeOpacity={0.8} style={{
                        backgroundColor: '#00000000',
                        width: Pixel.getPixel(25),
                        height: Pixel.getPixel(25),
                        position: 'absolute',
                        marginTop: Pixel.getTitlePixel(26),
                        marginLeft: width - Pixel.getPixel(35),
                    }}>
                        <Image style={{flex:1,resizeMode:'stretch'}}
                               source={require('../../images/workbench/ysjxx.png')}/>
                    </TouchableOpacity>
                </View>

                <HomeJobItem jumpScene={(ref,com)=>{this.props.jumpScene(ref,com)}}
                             callBack={(params)=>{this._checkAuthen(params)}}/>
                <HomeRowButton onPress={(id)=>{
                    this.props.callBack({name: 'CarInfoScene', component: CarInfoScene, params: {carID:id}});
                }} list={this.carData}/>
                <HomeAdvertisementButton click={()=>{
                    this.props.jumpScene('carpage',storageKeyNames.NEED_CHECK_NEW_CAR);
                }}/>
                <View style={{
                    flexDirection: 'row',
                    width: width,
                    height: Pixel.getPixel(40),
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>

                    <View style={{marginLeft: Pixel.getPixel(10), flex: 1}}>
                        <Text allowFontScaling={false} style={{fontSize: Pixel.getFontPixel(15),
                        fontWeight: 'bold',}}>
                            已订阅车源
                        </Text>

                    </View>
                    <TouchableOpacity style={{marginRight: Pixel.getPixel(20)}} onPress={()=> {
                        this.props.jumpScene('carpage',storageKeyNames.NEED_CHECK_RECOMMEND);
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text allowFontScaling={false} style={{color: 'gray', fontSize: Pixel.getFontPixel(12)}}>
                                更多
                            </Text>

                            <Image source={require('../../images/mainImage/more.png')} style={{
                                width: Pixel.getPixel(5),
                                height: Pixel.getPixel(10),
                                marginLeft: Pixel.getPixel(2),
                            }}/>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    handleBack = () => {
        NativeModules.VinScan.goBack();
        return true;
    }

    componentDidMount() {
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
            //});
        }
    }

//初始化结束后,请求网络,将数据添加到界面
    initFinish = () => {
        this.loadData();
    }
    loadData = () => {

        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != '') {
                let enters = JSON.parse(data.result);
                this.getData(enters.prov_id);

            } else {
                this.getData(0);
            }
        });
    }
    getData = (prov_id) => {
        let maps = {
            page: page,
            rows: 6,
            prov_id: prov_id
        };
        request(Urls.HOME, 'Post', maps, () => {
            this.props.backToLogin()
        })
            .then((response) => {
                    allList.push(...response.mjson.data.carList.list);
                    StorageUtil.mGetItem(storageKeyNames.USER_INFO, (data) => {
                        if (data.code == 1) {
                            let datas = JSON.parse(data.result);
                            if (datas.user_level == 2) {
                                if (datas.enterprise_list[0].role_type == '1' || datas.enterprise_list[0].role_type == '6') {
                                } else if (datas.enterprise_list[0].role_type == '2') {

                                } else {

                                }
                            } else if (datas.user_level == 1) {

                            } else {

                            }
                            this.getCarData(response.mjson.data);
                            // if (allList.length <= 0) {
                            //     this.setState({
                            //         renderPlaceholderOnly: 'success',
                            //         source: ds.cloneWithRows(['1']), isRefreshing: false,
                            //         allData: response.mjson.data
                            //     });
                            // } else {
                            //     this.setState({
                            //         renderPlaceholderOnly: 'success',
                            //         source: ds.cloneWithRows(allList), isRefreshing: false,
                            //         allData: response.mjson.data
                            //     });
                            // }

                        }
                    });
                    status = response.mjson.data.carList.pageCount;
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    }

    getCarData(allData) {
        let maps = {
            brand_id: 0,
            series_id: 0,
            model_id: 0,
            provice_id: 0,
            city_id: 0,
            order_type: 0,
            coty: 0,
            mileage: 0,
            dealer_price: 0,
            emission_standards: 0,
            nature_use: 0,
            car_color: 0,
            model_name: '',
            prov_id: 0,
            v_type: 0,
            rows: 5,
            page: 1,
            start: 0,
            type: 2,
            status: 1,
            no_cache: 1,
        };
        request(Urls.CAR_INDEX, 'Post', maps)
            .then((response) => {
                    console.log(response);
                    this.carData = response.mjson.data.list;
                    if (allList.length <= 0) {
                        this.setState({
                            renderPlaceholderOnly: 'success',
                            source: ds.cloneWithRows(['1']), isRefreshing: false,
                            allData: allData
                        });
                    } else {
                        this.setState({
                            renderPlaceholderOnly: 'success',
                            source: ds.cloneWithRows(allList), isRefreshing: false,
                            allData: allData
                        });
                    }
                }
                ,
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                }
            )
        ;
    }


    allRefresh = () => {
        allList = [];
        this.setState({renderPlaceholderOnly: 'loading'});
        page = 1;
        this.loadData();
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }

//触底加载
    toEnd = () => {
        if (page < status) {
            page++;
            this.loadData();
        }
        // else {
        //     this.props.jumpScene('carpage');
        // }
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={cellSheet.container}>
                    {
                        this.loadView()
                    }
                </View>
            )
        }
        return (

            <View style={cellSheet.container}>

                <ListView
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    initialListSize={6}
                    stickyHeaderIndices={[]}
                    onEndReachedThreshold={1}
                    scrollRenderAheadDistance={1}
                    pageSize={6}
                    contentContainerStyle={cellSheet.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshingData}
                            tintColor={[fontAndClolr.COLORB0]}
                            colors={[fontAndClolr.COLORB0]}
                        />
                    }
                    renderFooter={
                        this.renderListFooter
                    }
                    onEndReached={this.toEnd}
                />
                <AuthenticationModal ref="authenmodal"/>

            </View>
        )
    }

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (
                <TouchableOpacity onPress={()=> {
                    this.props.jumpScene('carpage','checkRecommend');
                }} activeOpacity={0.8} style={{
                    width: width, height: Pixel.getPixel(60), backgroundColor: fontAndClolr.COLORA3,
                    alignItems: 'center'
                }}>
                    <Text allowFontScaling={false}
                          style={{fontSize: Pixel.getFontPixel(14), marginTop: Pixel.getPixel(7)}}>查看更多车源 ></Text>
                </TouchableOpacity>)
        }

    }

    refreshingData = () => {
        allList = [];
        this.setState({isRefreshing: true});
        page = 1;
        this.loadData();
    };

    homeOnPress = (title) => {
        if (title == '收车') {
            this.props.jumpScene('carpage', 'checkRecommend');
        } else if (title == '卖车') {
            this.props.callBack({name: 'CarMySourceScene', component: CarMySourceScene, params: {}});
        } else if (title == '借款') {
            this.props.jumpScene('financePage');
        } else {
            this.props.jumpScene('financePage');
        }
    }


    _renderRow = (movie, sindex, rowID) => {
        let DIDIAN;
        if (movie == '1') {
            return (<View/>);
        }
        if (movie.city_name.length) {
            DIDIAN = '[' + movie.city_name + ']'
        } else {
            DIDIAN = '';
        }
        return (
            <TouchableOpacity onPress={()=> {
                this.props.callBack({name: 'CarInfoScene', component: CarInfoScene, params: {carID: movie.id}});
            }} activeOpacity={0.8} style={{
                width: width / 2,
                backgroundColor: '#ffffff',
                borderWidth: 0,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View
                    style={{width: Pixel.getPixel(166), backgroundColor: '#ffffff', justifyContent: 'center'}}>
                    <Image style={cellSheet.imageStyle}
                           source={movie.img ? {uri: movie.img + '?x-oss-process=image/resize,w_' + 320 + ',h_' + 240} : require('../../images/carSourceImages/car_null_img.png')}/>

                    <Text allowFontScaling={false} style={cellSheet.despritonStyle}
                          numberOfLines={2}>{DIDIAN + movie.model_name}</Text>
                    <Text allowFontScaling={false}
                          style={cellSheet.timeStyle}>{this.dateReversal(movie.create_time + '000') + '/' + movie.mileage + '万公里'}</Text>

                </View>
            </TouchableOpacity>

        )
    }
    dateReversal = (time) => {
        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "年" + (date.getMonth() + 1) + "月");

    };
}


const cellSheet = StyleSheet.create({


    header: {

        backgroundColor: fontAndClolr.COLORA3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: Pixel.getPixel(10),

    },

    headerTitle: {

        fontSize: Pixel.getFontPixel(20),
    },

    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndClolr.COLORA3,
    },

    row: {

        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },

    imageStyle: {

        width: Pixel.getPixel(166),
        height: Pixel.getPixel(111),
        resizeMode: 'stretch'
    },
    listStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',

    },

    timeStyle: {
        textAlign: 'left',
        color: fontAndClolr.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndClolr.MARKFONT),
        marginTop: Pixel.getPixel(8),
        marginBottom: Pixel.getPixel(10)
    },

    Separator: {

        backgroundColor: 'white',
        height: Pixel.getPixel(2),

    },
    despritonStyle: {

        textAlign: 'left',
        marginTop: Pixel.getPixel(8),
        color: fontAndClolr.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndClolr.BUTTONFONT30),
        height: Pixel.getPixel(38),

    }

});
