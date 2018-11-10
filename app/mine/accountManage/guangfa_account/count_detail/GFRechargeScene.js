/*
*
* created on marongting by 2018/10/20
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
    Dimensions,
    Clipboard

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";

export default class GFRechargeScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.person = '上海锋之行汽车金融信息服务有限公司转账交易资金托管账户';
        this.state = {
            renderPlaceholderOnly:'blank'
        }
        this.state={
            name:this.person,
            account:'9550880211863500332'
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    render(){
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this.renderPlaceholderView();
        }
        return(
            <View style={{backgroundColor:fontAndColor.COLORA3,flex:1,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='充值'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <Image source={require('../../../../../images/mine/guangfa_account/chongzhi.png')} style={{marginTop: Pixel.getPixel(69),width:width,height:width*1.2}}>
                    <View style={{width:width-Pixel.getPixel(30),marginTop:Pixel.getPixel(9),height:(width-Pixel.getPixel(30))*1.2,alignItems:'center',marginLeft:Pixel.getPixel(15)}}>
                        <Image style={{width:Pixel.getPixel(31),height:Pixel.getPixel(31),marginTop:Pixel.getPixel(19)}} source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                        <Text style={{color:'#999999',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14),lineHeight:Pixel.getPixel(22),marginTop:Pixel.getPixel(13)}} allowFontScaling={false}> 您可以使用您绑定过的银行卡，</Text>
                        <Text style={{color:'#999999',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14),lineHeight:Pixel.getPixel(22)}} allowFontScaling={false}> 通过线下转账（柜台、网银、手机银行）的方式</Text>
                        <Text style={{color:'#999999',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14),lineHeight:Pixel.getPixel(22)}} allowFontScaling={false}> 将资金充值到您的广发银行账户下</Text>
                        <View style={{marginTop:Pixel.getPixel(61),paddingLeft: Pixel.getPixel(18),paddingRight: Pixel.getPixel(18),height:Pixel.getPixel(60),width:Pixel.getPixel(345),flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'flex-start',height:Pixel.getPixel(22),}}>
                                <Text style={{color:'#999999',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14),marginTop:Pixel.getPixel(5)}} allowFontScaling={false}> 收款人</Text>
                                <Text style={{marginLeft:Pixel.getPixel(42),color:fontAndColor.COLORA0,backgroundColor:'transparent',width:Pixel.getPixel(165),fontSize:Pixel.getFontPixel(14),lineHeight:Pixel.getPixel(20)}} allowFontScaling={false}>{this.state.name}</Text>
                            </View>
                            <TouchableOpacity onPress={this.copyPerson.bind(this)} style={{width:Pixel.getPixel(46),height:Pixel.getPixel(23),backgroundColor:'rgba(8,195,197,0.1)',marginTop:Pixel.getPixel(5),borderRadius:Pixel.getPixel(25),alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#05C5C2',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(15)}}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:Pixel.getPixel(20),paddingLeft: Pixel.getPixel(18),paddingRight: Pixel.getPixel(18),height:Pixel.getPixel(22),width:Pixel.getPixel(345),flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center',height:Pixel.getPixel(22),}}>
                                <Text style={{color:'#999999',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}> 收款账号</Text>
                                <Text style={{marginLeft:Pixel.getPixel(28),color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>{this.state.account}</Text>
                            </View>
                            <TouchableOpacity onPress={this.copyAccount.bind(this)} style={{width:Pixel.getPixel(46),height:Pixel.getPixel(23),backgroundColor:'rgba(8,195,197,0.1)',borderRadius:Pixel.getPixel(25),alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#05C5C2',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(15)}}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:Pixel.getPixel(20),paddingLeft: Pixel.getPixel(18),paddingRight: Pixel.getPixel(18),height:Pixel.getPixel(22),width:Pixel.getPixel(345),flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center',height:Pixel.getPixel(22),}}>
                                <Text style={{color:'#999999',backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}> 收款银行</Text>
                                <Text style={{marginLeft:Pixel.getPixel(28),color:fontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14)}} allowFontScaling={false}>广发银行广州分行营业部</Text>
                            </View>

                        </View>
                    </View>
                </Image>
            </View>

        )

    }

    async copyPerson (){
        Clipboard.setString(this.state.name);
        let  str = await Clipboard.getString();
        this.props.showToast('复制成功');
        console.log('name',str);
    }
    async copyAccount(){
        Clipboard.setString(this.state.account);
        let  str = await Clipboard.getString();
        this.props.showToast('复制成功');
        console.log('account',str);
    }
    renderPlaceholderView = () => {
        return(
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='充值'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                {this.loadView()}
            </View>
        )
    }

}