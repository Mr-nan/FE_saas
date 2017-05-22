/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import AccountTitle from './component/AccountTitle';
import RechargeScene from './RechargeScene';
import WithdrawalsScene from './WithdrawalsScene';
import BankCardScene from './BankCardScene';
import AccountFlowScene from './AccountFlowScene';
import AccountSettingScene from './AccountSettingScene';
import FrozenScene from './FrozenScene';
import TransferScene from './TransferScene';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
export  default class AccountScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
            info:{}
        };
    }

    initFinish = () => {
        this.getData()
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.setState({
        //     renderPlaceholderOnly:'success',
        //     source:ds.cloneWithRows([1,2,3,4,5,6,7])
        // });
    }

    allRefresh = () => {
        this.setState({
            renderPlaceholderOnly:'loading'
        });
        this.getData()
    }

    getData=()=>{
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas=JSON.parse(data.result);
                let maps = {
                    enter_base_ids:datas.merge_id,
                    child_type:'1'
                };
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            this.setState({
                                renderPlaceholderOnly: 'success',
                                source:ds.cloneWithRows(response.mjson.data.payLogs),
                                info:response.mjson.data.info,

                            });
                        },
                        (error) => {
                            this.props.showToast('用户信息查询失败');
                            this.setState({
                                renderPlaceholderOnly: 'error'
                            });
                        });
            } else {
                this.props.showToast('用户信息查询失败');
                this.setState({
                    renderPlaceholderOnly: 'error'
                });
            }
        })
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(64),marginBottom:Pixel.getPixel(45)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderHeader={this._renderHeader}
                    renderSeparator={this._renderSeparator}
                    showsVerticalScrollIndicator={false}
                />
                <View style={{width:width,height:Pixel.getPixel(44),backgroundColor: fontAndColor.COLORA3,
                flexDirection:'row',position: 'absolute',bottom: 0}}>
                    <TouchableOpacity onPress={()=>{
                        this.toNextPage({name:'WithdrawalsScene',component:WithdrawalsScene,params:{callBack:()=>{

                        } ,money:this.state.info.balance}})
                    }} activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'}}>
                        <Text style={{color: fontAndColor.COLORB0,fontSize: Pixel.getFontPixel(15)}}>提现</Text>
                    </TouchableOpacity>
                    <View style={{width:1,justifyContent:'center',
                    alignItems: 'center',height:Pixel.getPixel(44)}}></View>
                    <TouchableOpacity onPress={()=>{
                        this.toNextPage({name:'RechargeScene',component:RechargeScene,params:{}})
                    }} activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'#fff'}}>
                        <Text style={{color: fontAndColor.COLORB0,fontSize: Pixel.getFontPixel(15)}}>充值</Text>
                    </TouchableOpacity>
                </View>
                <NavigationView
                    title="账户管理"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <View style={{width:width,height:Pixel.getPixel(72),backgroundColor: '#fff',flexDirection: 'row',
            paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15)}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{color: '#000',fontSize: Pixel.getPixel(14)}}>
                        充值
                    </Text>
                    <Text style={{color: fontAndColor.COLORA1,fontSize: Pixel.getPixel(12)}}>
                        2017-04-26 13:00
                    </Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems: 'flex-end'}}>
                    <Text style={{color: '#000',fontSize: Pixel.getPixel(20)}}>
                        13万
                    </Text>
                </View>
            </View>
        )
    }
    _renderHeader = () => {
        return (
            <AccountTitle info={this.state.info}
                          bankCard={()=>{this.toNextPage({name:'BankCardScene',component:BankCardScene,params:{}})}}
                          flow={()=>{this.toNextPage({name:'AccountFlowScene',component:AccountFlowScene,params:{}})}}
                          changePwd={()=>{
                              let maps={
                                  user_type:this.state.info.account_open_type
                              }
                              this.getWebUrl(Urls.USER_ACCOUNT_EDITPAYPWD,maps,'修改交易密码');
                          }}
                          resetPwd={()=>{
                              let maps={
                                  user_type:this.state.info.account_open_type
                              }
                              this.getWebUrl(Urls.USER_ACCOUNT_RESETPAYPWD,maps,'重置交易密码');
                          }}
                          changePhone={()=>{
                              let maps={
                                  user_type:this.state.info.account_open_type
                              }
                              this.getWebUrl(Urls.USER_ACCOUNT_RESETPAYPWD,maps,'修改手机号');
                          }}
                          accountSetting={()=>{this.toNextPage({name:'AccountSettingScene',component:AccountSettingScene,params:{}})}}
                          moreFlow={()=>{this.toNextPage({name:'AccountFlowScene',component:AccountFlowScene,params:{}})}}
                          frozen={()=>{
                              {/*this.toNextPage({name:'FrozenScene',component:FrozenScene,params:{}})*/}
                          }}
                          transfer={()=>{this.toNextPage({name:'TransferScene',component:TransferScene,params:{money:this.state.info.balance}})}}


            />
        )
    }

    getWebUrl=(url,maps,title)=>{
        this.props.showModal(true);
        request(url, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    this.toNextPage({name:'AccountWebScene',component:AccountWebScene,params:{
                        title:title,webUrl:response.mjson.data.auth_url+'?authTokenId='+response.mjson.data.auth_token
                    }});
                },
                (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('网络连接失败');
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="账户管理"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: 1,

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})