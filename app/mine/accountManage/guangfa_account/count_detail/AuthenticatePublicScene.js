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
    ListView

}from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
const Pixel = new PixelUtil();
const {width,height} = Dimensions.get('window');
import NavigationView from "../../../../component/AllNavigationView";
import SubmitComponent from "../component/SubmitComponent";
import AuthenticateCardComponent from '../component/AuthenticateCardComponent';
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import GFBankWebScene from "../open_count/GFBankWebScene";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";

export default class AuthenticatePublicScene extends BaseComponent{
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 == r2});

        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows([]),
        };


        this.sData ={
            reback_url:'123456'
        }
    }
    initFinish(){
        this.getData();

    }

    getData = ()=>{
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT,(data) => {
            if(data.code == 1 && data.result != null){
                let datas = JSON.parse(data.result);
                let maps = {
                    bank_id:'gfyh',
                    enter_base_id:datas.company_base_id,
                    status:'1,2,3',
                }
                request(Urls.GET_BANK_CARD_LIST, 'Post', maps)
                    .then((response)=> {
                        this.data = response.mjson.data;
                        this.setState({
                            renderPlaceholderOnly: 'success',
                            source: this.state.source.cloneWithRows(this.data)
                        })
                    },(error) => {
                        this.setState({renderPlaceholderOnly: 'error'});
                    })
            }
        })
    }

    render(){
        if(this.state.renderPlaceholderOnly !== 'success'){
           return this.renderPlaceholderView();
        }
        return (
            <View style={{height:height,width:width,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='对公账户鉴权'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <ListView style={{flex:1,marginTop: Pixel.getPixel(64),backgroundColor:'transparent'}}
                          dataSource={this.state.source}
                          renderRow={this._renderRow}
                />
            </View>
        )
    }

    _renderRow = (rowData,sectionID,rowID) =>{
        return(
            <View>
                {rowID == 0 ? <AuthenticateCardComponent data = {rowData} id ={rowID} btn={()=>{this.next(rowID)}}/>:
                    <AuthenticateCardComponent btn={()=>{this.next(rowID)}} data = {rowData} id ={rowID} wrapStyle={{marginTop: Pixel.getPixel(10)}}/>
                }
            </View>

            )

     }

     next = (rowID) => {
        console.log('rowID',rowID);
        console.log(this.state.source);
         StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT,(da) => {
             if(da.code == 1 && da.result != null){
                 let datas = JSON.parse(da.result);
                 let maps ={
                     bind_bank_card_no_id:this.data[rowID].id,
                     reback_url:this.sData.reback_url,
                     enter_base_id:datas.company_base_id,
                 }
                 request(Urls.ACTIVE_BANK_CARD_HTML, 'Post', maps)
                     .then((response)=> {
                         let da = response.mjson;
                         this.toNextPage({
                             name:'GFBankWebScene',
                             component:GFBankWebScene,
                             params:{
                             callback:()=>{
                                 this.props.callback()},
                                 uri:da.data.url_wap,
                                 pa:da.data.params,
                                 sign:da.data.sign,
                                 reback_url:this.sData.reback_url,
                                 serial_no:da.data.serial_no,
                             }
                         })
                     },(error)=>{
                         this.props.showToast(error.mjson.msg);
                     })
             }
         })
     }

    renderPlaceholderView = () => {
        return(
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='对公账户鉴权'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>
        )

    }
}