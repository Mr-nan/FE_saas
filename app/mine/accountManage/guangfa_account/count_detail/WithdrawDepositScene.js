/**
 * Created by dingyonggang on 2017/10/27.
 */

import React, {Component} from "react";
import {
    View,
    Text, Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ScrollView,
    Button, StatusBar
} from "react-native";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
const Pixel = new PixelUtil();
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from '../../../../constant/appUrls';

import SText from '../../zheshangAccount/component/SaasText'

import ZSBaseComponent from '../../zheshangAccount/component/ZSBaseComponent';
import NavigationView from "../../../../component/AllNavigationView";
import BankcardScene from "./BankcardScene";
import GFBankWebScene from "../open_count/GFBankWebScene";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');

let Platform = require('Platform');

export default class WithdrawDepositScene extends ZSBaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            renderPlaceholderOnly:'blank',
            bankData:{}
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'loading'
        });
        this.loadData();
    }
    // enter_base_id:10108

    loadData=()=>{
        let maps = {
            bank_id:'gfyh',
            enter_base_id:global.companyBaseID,

        }
        request(Urls.GET_BANK_CARD_LIST, 'Post', maps)
            .then((response)=> {

                if(response.mjson.data.length>0){
                    this.setState({
                        renderPlaceholderOnly:'success',
                        bankData:response.mjson.data[0],

                    })
                }else {
                    this.setState({
                        renderPlaceholderOnly:'error'
                    })
                    this.props.showToast('获取银行卡数据失败');
                }


            },(error)=>{
                this.setState({
                    renderPlaceholderOnly:'error'
                })
                this.props.showToast(error.mjson.msg);
            });
    }

    render() {
        if (this.state.renderPlaceholderOnly!='success') {
            return (
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <StatusBar barStyle='dark-content'/>
                    {
                        this.loadView()
                    }
                    <NavigationView backIconClick={()=>this.backPage} title='提现'
                                    wrapStyle={{backgroundColor:'white'}} titleStyle={{color:FontAndColor.COLORA0}}/>
                </View>
            )
        }


        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content'/>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: Pixel.getPixel(79),
                        height:Pixel.getPixel(77),
                        paddingLeft: Pixel.getPixel(15),
                        paddingRight: Pixel.getPixel(15),
                        justifyContent:'space-between'
                    }}>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.selectBank}>
                            <Image source={require('../../../../../images/mine/guangfa_account/gs.png')} style={{width:Pixel.getPixel(35),height:Pixel.getPixel(35)}}/>
                            <View style={{marginLeft: Pixel.getPixel(13)}}>
                                <Text
                                    style={{fontSize: Pixel.getFontPixel(15),color:FontAndColor.COLORA0}}>{this.state.bankData.sub_bank_name}</Text>
                                <Text
                                    style={{color: '#666666',fontSize: Pixel.getFontPixel(14),marginTop:4}}>{this.state.bankData.bank_card_no}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:FontAndColor.COLORA1}}>更换银行</Text>
                            <Image style={{marginLeft:Pixel.getPixel(9)}} source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </View>

                    <View style={{backgroundColor: 'white', marginTop: Pixel.getPixel(10)}}>
                        <View >
                            <View style={{
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: FontAndColor.COLORA4
                            }}>
                                <SText style={{marginVertical: 15, fontSize: 15}}>提现金额（元）</SText>
                                <View style={{flexDirection: 'row',}}>
                                    <SText style={{marginRight: 5, marginTop: 5, fontSize: 14}}>￥</SText>
                                    <TextInput
                                        style={{
                                            height: 40,
                                            fontSize: Pixel.getPixel(35),
                                            flex: 1,
                                            marginBottom: 15,
                                            padding: 0
                                        }}
                                        keyboardType={'numeric'}
                                        underlineColorAndroid={"#00000000"}
                                        onChangeText={(text)=>{this.money = text}}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'确认提现'}
                        parentStyle={styles.next_button_parent}
                        childStyle={{fontSize: 18, color: 'white'}}
                        mOnPress={()=>{this.confirm()}}
                    />

                    <View style={{marginHorizontal: 30, marginVertical: 40}}>
                        <SText style={{
                            color: FontAndColor.COLORA1,
                            lineHeight: 20
                        }}>银行受理及到账时间</SText>
                    </View>

                </ScrollView>
                <NavigationView backIconClick={this.backPage} title='提现'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:FontAndColor.COLORA0}}/>
            </View>

        )
    }


    selectBank=()=>{
        this.toNextPage({
            name:'BankcardScene',
            component:BankcardScene,
            params:{
                account:this.props.accountData,
                selectBank:this.getBankData,
            }});
    }

    getBankData =(bankData)=>{

        console.log(bankData);
        this.setState({
            bankData:bankData,
        })
    }

    confirm=()=>{
        this.props.showModal(true);
        let maps = {
            bind_bank_card_no_id:this.state.bankData.id,
            amount:this.money,
            enter_base_id:global.companyBaseID,
            reback_url:'withdraw'
        }
        request(Urls.GF_WITHDRAWA, 'Post', maps)
            .then((response)=> {
                this.props.showModal(false);

                let  data = response.mjson.data;
                if(response.mjson.code==1){
                    this.toNextPage({
                        name:'GFBankWebScene',
                        component:GFBankWebScene,
                        params:{
                            callback:()=>{this.props.callback()},
                            uri:data.url_wap,
                            pa:data.params,
                            sign:data.sign,
                            reback_url:'withdraw',
                            noPushPage:true,
                        }});
                }else {
                    this.props.showToast(response.mjson.msg);

                }

            },(error)=>{
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
            });
    }

}
const styles = StyleSheet.create({
    deposit_container_selected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: FontAndColor.COLORB0,
        borderBottomWidth: 1,
        height: 50
    },
    deposit_container_deselected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: FontAndColor.COLORA4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50
    },

    deposit_title_selected: {
        color: FontAndColor.COLORB0,
        fontSize: 16,
    },
    deposit_title_deselected: {
        color: 'black',
        fontSize: 16,
    },
    next_button_parent: {
        backgroundColor: FontAndColor.COLORB0,
        marginTop: 50,
        height: 50,
        width: width - 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        borderRadius: 3,
    }
})