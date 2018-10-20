/*
*
* created on marongting by 2018/10/19
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";

export default class IndexAccountmanageScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank'
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
            this.renderPlaceholderView;
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle='light-content'/>
                <Image source={require('../../../../../images/mine/guangfa_account/tou-bg.png')}>
                <NavigationView backIconClick={this.backPage} title='账户管理'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
                    <View style={{flexDirection: 'row',marginTop: Pixel.getPixel(88),alignItems:'center',justifyContent:'space-between',marginLeft:Pixel.getPixel(34),marginRight: Pixel.getPixel(30,5)}}>
                        <View style={{flexDirection:'column',alignItems:'center',width:Pixel.getPixel(130)}}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),lineHeight:Pixel.getPixel(17)}}>可用余额(元)</Text>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(22),lineHeight:Pixel.getPixel(26),fontWeight: 'bold'}}>200,000.00</Text>
                        </View>
                        <View style={{width:Pixel.getPixel(1),height:Pixel.getPixel(20),backgroundColor:'#ffffff'}}/>
                        <View style={{flexDirection:'column',alignItems:'center',width:Pixel.getPixel(130)}}>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(12),lineHeight:Pixel.getPixel(17)}}>冻结余额(元)</Text>
                            <Text style={{color:'#ffffff',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(22),lineHeight:Pixel.getPixel(26),fontWeight: 'bold'}}>50,630.00</Text>
                        </View>
                    </View>
                </Image>
                <View style={{width:width,height:Pixel.getPixel(36),justifyContent:'center'}}>
                    <Text style={{color:fontAndColor.COLORA1,fontSize:Pixel.getFontPixel(12),marginLeft:Pixel.getPixel(15)}} allowFontScaling={false}>账户功能</Text>
                </View>
                <View style={{backgroundColor:'#ffffff',width:width}}>
                    <TouchableOpacity style={{paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(43),width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/yinghangka.png')}/>
                            <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>银行卡</Text>
                        </View>
                        <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                    </TouchableOpacity>
                    <View style={{height:Pixel.getPixel(1),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3}}/>
                    <TouchableOpacity style={{paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(43),width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/jianquan.png')}/>
                            <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>小额鉴权</Text>
                        </View>
                        <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                    </TouchableOpacity>
                    <View style={{height:Pixel.getPixel(1),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3}}/>
                    <TouchableOpacity style={{paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(43),width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/jiaoyimingxi.png')}/>
                            <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>交易明细查询</Text>
                        </View>
                        <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#ffffff',width:width,marginTop:Pixel.getPixel(10)}}>
                    <TouchableOpacity style={{paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(43),width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/shoujihao.png')}/>
                            <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>修改预留手机号</Text>
                        </View>
                        <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                    </TouchableOpacity>
                    <View style={{height:Pixel.getPixel(1),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),backgroundColor:fontAndColor.COLORA3}}/>
                    <TouchableOpacity style={{paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(43),width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/chongzhimima.png')}/>
                            <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>重置密码</Text>
                        </View>
                        <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#ffffff',width:width,marginTop:Pixel.getPixel(10)}}>
                    <TouchableOpacity style={{paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),height:Pixel.getPixel(43),width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/shehzi.png')}/>
                            <Text style={{marginLeft:Pixel.getPixel(18),color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>账户设置</Text>
                        </View>
                        <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                    </TouchableOpacity>






                </View>
                <View style={{width:width,height:Pixel.getPixel(44),flexDirection:'row',marginTop:Pixel.getPixel(127)}}>
                    <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(15)}}>提现</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',marginLeft:Pixel.getPixel(1),alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:fontAndColor.COLORB0,fontSize:Pixel.getFontPixel(15)}}>充值</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderPlaceholderView = () => {
        this.loadView();
    }
    backPage = () => {
        this.loadView();
    }
}