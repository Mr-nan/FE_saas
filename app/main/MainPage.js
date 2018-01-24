/**
 * Created by yujinzhong on 2017/2/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    NativeModules,
    InteractionManager,
    DeviceEventEmitter,
    TouchableWithoutFeedback,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import  PixelUtil from '../utils/PixelUtil'
let Pixel = new PixelUtil();
import TabNavigator from 'react-native-tab-navigator';

import HomeSence  from './HomeScene'
import CarSourceSence from '../carSource/CarSourceListScene'
import MineSence from './MineScene'
import FinanceSence from './FinanceScene'
import PublishModal from './PublishModal'
import  StorageUtil from '../utils/StorageUtil';
import * as storageKeyNames from '../constant/storageKeyNames';
import LoginGesture from '../login/LoginGesture';
import * as fontAndClolr from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import NonCreditScene from './NonCreditScene';
import LoginScene from '../login/LoginScene';
import AllSelectCompanyScene from '../main/AllSelectCompanyScene';
let tabArray = [];
import CustomerServiceButton  from '../component/CustomerServiceButton';
import WorkBenchScene from './WorkBenchScene';
import GetPermissionUtil from '../utils/GetPermissionUtil';
const GetPermission = new GetPermissionUtil();
import {request} from '../utils/RequestUtil';
import * as Urls from '../constant/appUrls';
import * as StorageKeyNames from "../constant/storageKeyNames";
export class tableItemInfo {
    constructor(ref, key, title, selectedImg, defaultImg, topView) {

        this.ref = ref;
        this.key = key;
        this.title = title;
        this.selectedImg = selectedImg;
        this.defaultImg = defaultImg;
        this.topView = topView;

    }

}
;


export default class MainPage extends BaseComponent {

    /**
     * 根据传过来的属性,判断身份
     */
    static defaultProps = {
        identity: 'boss'
    };


    componentWillUnmount() {
        tabArray = [];
        this.emitterNewCarPage.remove();
        this.emitterUserCarPage.remove();
        this.mbShow.remove();
    }

    /**
     * 初始化,指定tab及页面被选中
     */
    constructor(props) {
        super(props);
        this.state = {
            // selectedTab: tabArray[0].ref,
            renderPlaceholderOnly: 'blank',
            openSelectBranch: false,
            mb_one: false,
            mb_tow: false,
            mb_three: true,
            mbShow: false,

        }
        this.emitterNewCarPage = DeviceEventEmitter.addListener('pushNewCarListScene', () => {
            StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_NEW_CAR, 'true');
            this.setState({selectedTab: 'carpage'});
        });
        this.emitterUserCarPage = DeviceEventEmitter.addListener('pushUserCarListScene', () => {
            StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_USER_CAR, 'true');
            this.setState({selectedTab: 'carpage'});
        })
        this.mbShow = DeviceEventEmitter.addListener('mb_show', (data) => {
            if (data == '未认证') {
                StorageUtil.mGetItem(StorageKeyNames.MB_ZHGL_WKHWBD, (data) => {
                    if (data.result != 'false') {
                        this.setState({mb_one: true,})
                    }
                })
            } else if (data == '已认证') {
                StorageUtil.mGetItem(StorageKeyNames.MB_YKHYBD, (data) => {
                    if (data.result != 'false') {
                        this.setState({mb_three: true,})
                    }
                })
            } else if (data == '未通过') {
                StorageUtil.mGetItem(StorageKeyNames.MB_ZHGL_YKHWBD, (data) => {
                    if (data.result != 'false') {
                        this.setState({mb_tow: true,})
                    }
                })
            } else if (data == '完成') {
                this.setState({mbShow: true});
            }
        })
        tabArray = [];
    }


    initFinish = () => {
        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (childdata) => {
            if (childdata.code == 1) {
                let childdatas = JSON.parse(childdata.result);
                this.is_done_credit = childdatas.is_done_credit;
                this.getUserPermission(childdatas.company_base_id);
            } else {
                this.setState({renderPlaceholderOnly: 'error'});
            }
        });
    }

    allRefresh = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this.initFinish();
    }

    getUserPermission = (id) => {
        let maps = {
            enterprise_uid: id
        };
        request(Urls.GETFUNCTIONBYTOKENENTER, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data == null || response.mjson.data.length <= 0) {
                        this.setState({
                            renderPlaceholderOnly: 'null',
                        });
                    } else {
                        StorageUtil.mSetItem(storageKeyNames.GET_USER_PERMISSION,
                            JSON.stringify(response.mjson), () => {
                                GetPermission.getFirstList((list) => {
                                    for (let i = 0; i < list.length; i++) {
                                        tabArray.push(new tableItemInfo(list[i].ref, list[i].key, list[i].name, list[i].image,
                                            list[i].unImage, this.getTopView(list[i].ref)));
                                    }
                                    this.setState({
                                        selectedTab: tabArray[0].ref,
                                        renderPlaceholderOnly: 'success'
                                    });
                                });
                            });
                    }
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndClolr.COLORA3}}>
                {this.loadView()}
            </View>
        );
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        let items = [];

        tabArray.map((data) => {
            let tabItem;
            tabItem = <TabNavigator.Item
                selected={this.state.selectedTab === data.ref}
                key={data.key}
                title={data.title}
                renderSelectedIcon={() => <Image style={styles.img}
                                                 source={data.selectedImg}/>}
                renderIcon={() => <Image style={styles.img}
                                         source={data.defaultImg}/>}
                onPress={() => {
                        this.setState({selectedTab: data.ref})
                    }
                }
                selectedTitleStyle={styles.selectedTitleStyle}


            >
                {data.topView}
            </TabNavigator.Item>

            items.push(tabItem);
        })
        return (
            <View style={styles.flex}>
                <PublishModal backToLogin={()=>{
                    this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);}} ref={(modal) => {this.publishModal = modal}}/>
                <TabNavigator
                    sceneStyle={{backgroundColor: '#00000000'}}
                    tabBarShadowStyle={{backgroundColor: '#00000000'}}
                    tabBarStyle={{overflow: 'visible', height: Pixel.getPixel(60), backgroundColor: '#00000000'}}
                >
                    {items}
                </TabNavigator>
                <View
                    style={[styles.imageStyle, this.props.identity == "finance" ? {width: Pixel.getPixel(1)} : {width: 0}]}></View>
                {/*<CustomerServiceButton ref='customerservicebutton'/>*/}
                {
                    this.state.mb_one != false && this.state.selectedTab == 'mypage' && this.state.mbShow ?
                        <View style={{position: 'absolute',top:0,bottom:0,left:0,right:0}}>
                            <TouchableWithoutFeedback
                                onPress={()=>{StorageUtil.mSetItem(StorageKeyNames.MB_ZHGL_WKHWBD,'false',()=>{this.setState({mb_one: false,})})}}>
                                <Image style={{flex:1,width:width,resizeMode:'stretch'}}
                                       source={require('../../images/tishimengban/zhgl_wkhwbk.png')}/>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
                {
                    this.state.mb_tow != false && this.state.selectedTab == 'mypage' && this.state.mbShow ?
                        <View style={{position: 'absolute',top:0,bottom:0,left:0,right:0}}>
                            <TouchableWithoutFeedback
                                onPress={()=>{StorageUtil.mSetItem(StorageKeyNames.MB_ZHGL_YKHWBD,'false',()=>{this.setState({mb_tow: false,})})}}>
                                <Image style={{flex:1,width:width,resizeMode:'stretch'}}
                                       source={require('../../images/tishimengban/zhgl_ykhwbk.png')}/>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
                {
                    this.state.mb_three != false && this.state.selectedTab == 'mypage' && this.state.mbShow ?
                        <View style={{position: 'absolute',top:0,bottom:0,left:0,right:0}}>
                            <TouchableWithoutFeedback
                                onPress={()=>{StorageUtil.mSetItem(StorageKeyNames.MB_YKHYBD,'false',()=>{this.setState({mb_three: false,})})}}>
                                <Image style={{flex:1,resizeMode:'stretch',width:width}}
                                       source={require('../../images/tishimengban/ykhybk.png')}/>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
            </View>
        );
    }

    getTopView = (ref) => {
        if (ref == 'firstpage') {
            return <HomeSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} openModal={()=>{
                     this.publishModal.openModal();
                }} jumpScene={(ref,openSelectBranch)=>{

                    if(openSelectBranch=='true'){

                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_OPENBRAND,'true');

                    }else if(openSelectBranch == storageKeyNames.NEED_CHECK_RECOMMEND){

                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_RECOMMEND,'true');

                    }else if(openSelectBranch == storageKeyNames.NEED_CHECK_NEW_CAR){

                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_NEW_CAR,'true');
                        StorageUtil.mSetItem(storageKeyNames.NEED_NEW_CHECK_RECOMMEND,'true',()=>{
                            this.setState({selectedTab: ref})

                        });

                    }else if(openSelectBranch == storageKeyNames.NEED_CHECK_USER_CAR)
                    {
                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_USER_CAR,'true');
                        StorageUtil.mSetItem(storageKeyNames.NEED_USER_CHECK_RECOMMEND,'true',()=>{
                            this.setState({selectedTab: ref})
                        });


                    }else {
                        if(ref==='financePage'){
                             StorageUtil.mGetItem(storageKeyNames.NEED_GESTURE,(datas)=>{
                       if(datas.code==1){
                             if(datas.result=='true'){
                             this.toNextPage({name:'LoginGesture',component:LoginGesture,params:{
                                callBack:()=>{
                                    this.setState({selectedTab: ref})
                               }
                            }});
                          }else{
                                this.setState({selectedTab: ref})
                          }
                       }
                  });
                      }else{
                            this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_OPENBRAND,'false');
                      }
                    }
                }} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>
        } else if (ref == 'carpage') {
            return <CarSourceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {

                    this.toNextPage(params);
                }}/>
        } else if (ref == 'sendpage') {
            return <WorkBenchScene backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>
        } else if (ref == 'financePage') {
            if (this.is_done_credit == 0) {
                return <NonCreditScene/>
            } else {
                return <FinanceSence backToLogin={()=>{
                            this.backToLogin({name:'LoginScene',component:LoginScene});
                        }} showModal={(value)=>{
                        this.props.showModal(value);
                        }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params) => {
                        this.toNextPage(params);
                }}/>
            }
        } else {
            return <MineSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }} toSelect={()=>{
                let mProps = {name: 'AllSelectCompanyScene', component: AllSelectCompanyScene, params: {}};
                const navigator = this.props.navigator;
                if (navigator) {
                    navigator.immediatelyResetRouteStack([{
                        ...mProps
                    }])
                }
                }}/>
        }
    }
}

const styles = StyleSheet.create({

    flex: {
        flex: 1,
        backgroundColor: '#fff',
        width: width, height: height,
        paddingBottom: 0,
    },
    img: {

        width: Pixel.getPixel(26),
        height: Pixel.getPixel(26),

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigimg: {
        width: Pixel.getPixel(56),
        height: Pixel.getPixel(56),
    },
    selectedTitleStyle: {
        color: fontAndClolr.COLORB0
    },
    imageStyle: {
        position: 'absolute',
        bottom: Pixel.getPixel(10),
        left: width / 2.0 - 0.5,
        width: 1,
        height: Pixel.getPixel(30),
        backgroundColor: "lightgray",
    },
    outImageStyle: {
        position: 'absolute',

        bottom: Pixel.getPixel(16),
        left: width / 2 - Pixel.getPixel(56) / 2
    }
});
