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
export  default class AccountScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows(['1', '2', '3', '4'])
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success'
        });
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

                        }}})
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
            <AccountTitle bankCard={()=>{this.toNextPage({name:'BankCardScene',component:BankCardScene,params:{}})}}
                          flow={()=>{this.toNextPage({name:'AccountFlowScene',component:AccountFlowScene,params:{}})}} changePwd={()=>{}}
                          resetPwd={()=>{}}
                          changePhone={()=>{}}
                          accountSetting={()=>{this.toNextPage({name:'AccountSettingScene',component:AccountSettingScene,params:{}})}}
                          moreFlow={()=>{}}/>
        )
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