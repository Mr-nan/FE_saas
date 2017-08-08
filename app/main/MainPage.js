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
    BackAndroid,
    InteractionManager
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


    initFinish = () => {

    }

    componentWillUnmount() {
        tabArray = [];
    }

    /**
     * 初始化,指定tab及页面被选中
     */
    constructor(props) {
        super(props);
        this.state = {
            // selectedTab: tabArray[0].ref,
            canShow: false,
            openSelectBranch: false

        }
        tabArray = [];
        const employerTabArray = [
            new tableItemInfo('firstpage', 'page11', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
                <HomeSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} openModal={()=>{
                     this.publishModal.openModal();
                }} jumpScene={(ref,openSelectBranch)=>{
                    if(openSelectBranch=='true'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_OPENBRAND,'true');
                    }else if(openSelectBranch == 'checkRecommend'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_RECOMMEND,'true');
                    }else{
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
                }}/>),
            new tableItemInfo('carpage', 'page12', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
                <CarSourceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('sendpage', 'page13', '工作台', require('../../images/workbench/gztxz.png'),
                require('../../images/workbench/gztwxz.png'),
                <PublishModal backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('mypage', 'page14', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence backToLogin={()=>{
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
                }}/>)
        ];

        const touristTabArray = [
            new tableItemInfo('firstpage', 'page11', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
                <HomeSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} openModal={()=>{
                     this.publishModal.openModal();
                }} jumpScene={(ref,openSelectBranch)=>{
                    if(openSelectBranch=='true'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_OPENBRAND,'true');
                    } else if(openSelectBranch == 'checkRecommend'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_RECOMMEND,'true');
                    }else{
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
                }}/>),
            new tableItemInfo('carpage', 'page12', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
                <CarSourceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('mypage', 'page14', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence backToLogin={()=>{
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
                }}/>)
        ];

        const bossTabArray = [
            new tableItemInfo('firstpage', 'page1', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
                <HomeSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} openModal={()=>{
                     this.publishModal.openModal();
                }} jumpScene={(ref,openSelectBranch)=>{
                    if(openSelectBranch=='true'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_OPENBRAND,'true');

                    }else if(openSelectBranch == 'checkRecommend'){

                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_RECOMMEND,'true');

                    }else{
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
                }}/>),
            new tableItemInfo('carpage', 'page2', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
                <CarSourceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {

                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('sendpage', 'page3', '工作台', require('../../images/workbench/gztxz.png'),
                require('../../images/workbench/gztwxz.png'),
                <PublishModal backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('financePage', 'page4', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
                <FinanceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params) => {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('mypage', 'page5', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence backToLogin={()=>{
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
                }}/>)
        ];

        const formalUserTabArray = [
            new tableItemInfo('firstpage', 'page1', '首页', require('../../images/mainImage/homeSelect.png'), require('../../images/mainImage/homeUnSelect.png'),
                <HomeSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} openModal={()=>{
                     this.publishModal.openModal();
                }} jumpScene={(ref,openSelectBranch)=>{
                    if(openSelectBranch=='true'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_OPENBRAND,'true');
                    }else if(openSelectBranch == 'checkRecommend'){
                        this.setState({selectedTab: ref})
                        StorageUtil.mSetItem(storageKeyNames.NEED_CHECK_RECOMMEND,'true');
                    }else{
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
                }}/>),
            new tableItemInfo('carpage', 'page2', '车源', require('../../images/mainImage/carSelect.png'), require('../../images/mainImage/carUnSelect.png'),
                <CarSourceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {

                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('sendpage', 'page3', '工作台', require('../../images/workbench/gztxz.png'),
                require('../../images/workbench/gztwxz.png'),
                <WorkBenchScene backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params)=> {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('financePage', 'page4', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
                <NonCreditScene/>),
            new tableItemInfo('mypage', 'page5', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence backToLogin={()=>{
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
                }}/>)
        ];

        const financeTabArray = [
            new tableItemInfo('financePage', 'page24', '金融', require('../../images/mainImage/moneySelect.png'), require('../../images/mainImage/moneyUnSelect.png'),
                <FinanceSence backToLogin={()=>{
                     this.backToLogin({name:'LoginScene',component:LoginScene});
                }} showModal={(value)=>{
                    this.props.showModal(value);
                }} showToast={(content)=>{this.props.showToast(content)}} callBack={(params) => {
                    this.toNextPage(params);
                }}/>),
            new tableItemInfo('mypage', 'page25', '我的', require('../../images/mainImage/mineSelect.png'), require('../../images/mainImage/mineUnSelect.png'),
                <MineSence backToLogin={()=>{
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
                }}/>)
        ];

        StorageUtil.mGetItem(storageKeyNames.USER_INFO, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                if (datas.user_level == 2) {
                    if (datas.enterprise_list[0].role_type == '1' || datas.enterprise_list[0].role_type == '6') {
                        StorageUtil.mGetItem(storageKeyNames.LOAN_SUBJECT, (childdata) => {
                            if (childdata.code == 1) {
                                let childdatas = JSON.parse(childdata.result);
                                console.log(childdatas);
                                if (childdatas.is_done_credit == 0) {
                                    tabArray = formalUserTabArray;
                                } else {
                                    tabArray = bossTabArray;
                                }
                                this.setState({
                                    selectedTab: tabArray[0].ref,
                                    canShow: true
                                });

                            }
                        });
                        return;
                    } else if (datas.enterprise_list[0].role_type == '2') {
                        tabArray = financeTabArray
                    } else {
                        tabArray = employerTabArray
                    }
                } else if (datas.user_level == 1) {
                    tabArray = formalUserTabArray
                } else {
                    if (datas.audit_status == '2') {
                        tabArray = formalUserTabArray
                    } else {
                        tabArray = touristTabArray
                    }
                }
                this.setState({
                    selectedTab: tabArray[0].ref,
                    canShow: true
                });
            }
        });
    }


    render() {
        if (!this.state.canShow) {
            return (<View style={{width:width,height:height,backgroundColor:fontAndClolr.COLORA3}}/>);
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
                    tabBarStyle={{overflow: 'visible', height: Pixel.getPixel(65), backgroundColor: '#00000000'}}
                >
                    {items}
                </TabNavigator>
                <View
                    style={[styles.imageStyle, this.props.identity == "finance" ? {width: Pixel.getPixel(1)} : {width: 0}]}></View>
                <CustomerServiceButton ref='customerservicebutton'/>
            </View>
        );
    }
}


const
    styles = StyleSheet.create({

        flex: {
            flex: 1,
            backgroundColor: '#fff'
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
