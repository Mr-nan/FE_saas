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
    Dimensions,
    ScrollView,

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import BankcardComponent from "../component/BankcardComponent";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from '../../../../constant/appUrls';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import BindBankCardScene from "./BindBankCardScene";

export default class BankCardScene extends BaseComponent{
    constructor(props) {
        super(props);

        this.state = {
            renderPlaceholderOnly:'blank',
            bankArray:[]
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
                this.setState({
                    renderPlaceholderOnly:'success',
                    bankArray:response.mjson.data,
                })
            },(error)=>{
                this.setState({
                    renderPlaceholderOnly:'error'
                })
                this.props.showToast(error.mjson.msg);
            });
    }

    render(){
        if(this.state.renderPlaceholderOnly != 'success'){
            return(
                <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                    {
                        this.loadView()
                    }
                </View>
            )
        }
        return(
            <View style={{flex:1,backgroundColor:'rgba(76,76,89,1)',alignItems:'center',paddingTop:Pixel.getTitlePixel(64)}}>
                <StatusBar barStyle='light-content'/>
                <ScrollView>
                    {
                        this.state.bankArray.map((data,index)=>{

                            return(
                                <BankcardComponent data={data} key={index} relieveClick={(bankData)=>{this.relieveClick(bankData)}}/>
                            )
                        })

                    }
                    {
                        this.state.bankArray.length<5 && (
                            <TouchableOpacity style={{
                                width:Pixel.getPixel(345),
                                height:Pixel.getPixel(55),
                                borderRadius:Pixel.getPixel(5),
                                borderWidth: Pixel.getPixel(1),borderColor:'#979797',
                                flexDirection: 'row',justifyContent: 'center',alignItems:'center',marginTop: Pixel.getPixel(25)}}
                                              onPress={()=>{this.addBankClick()}}>
                                <Image source={require('../../../../../images/mine/guangfa_account/tianjia.png')}/>
                                <Text style={{backgroundColor:'transparent',color:'#ffffff',fontSize:Pixel.getFontPixel(15),marginLeft: Pixel.getPixel(10)}}>添加银行卡</Text>
                            </TouchableOpacity>
                        )
                    }

                </ScrollView>

                <NavigationView backIconClick={this.backPage} title='银行卡'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>
            </View>
        )
    }


    relieveClick=(bankData)=>{
        

        this.props.showModal(true);
        request(Urls.GF_RELIEVE_BANK, 'Post', {
            bank_card_no:bankData.bank_card_no,
            customer_type:'B',
            enter_base_id:global.companyBaseID,
            user_type:this.props.account.account_open_type
        })
            .then((response)=> {

                this.props.showModal(false);


            },(error)=>{
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
            });

    }

    addBankClick=()=>{
        // this.props.showModal(true);
        // request(Urls.GF_ADD_BANK, 'Post', {
        //     enter_base_id:global.companyBaseID,
        //     reback_url:'cancelAccount'
        //
        // })
        //     .then((response)=> {
        //         this.props.showModal(false);
        //         let da = response.mjson;
        //
        //         if(response.mjson.code==1){
        //             this.toNextPage({
        //                 name:'GFBankWebScene',
        //                 component:GFBankWebScene,
        //                 params:{
        //                     callback:()=>{this.props.callback()},
        //                     uri:da.data.url_wap,
        //                     pa:da.data.params,
        //                     sign:da.data.sign,
        //                     reback_url:'cancelAccount',
        //                     noPushPage:true,
        //                 }});
        //         }else {
        //             this.props.showToast(response.mjson.msg);
        //         }
        //
        //     },(error)=>{
        //         this.props.showModal(false);
        //         this.props.showToast(error.mjson.msg);
        //     });
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                this.iscompany = 1;
                if (datas.role_type instanceof Array) {
                    for (let item of datas.role_type) {
                        if (item == 19) {
                            this.iscompany = 2;
                            break;
                        }
                    }
                }
                this.toNextPage({
                    name:'BindBankCardScene',
                    component:BindBankCardScene,
                    params:{
                        callback:()=>{this.props.callback()},
                        iscompany:this.iscompany,
                        title:'添加银行卡',
                        btnText:'确认提交'
                    }
                })
            }
        })
    }

}

