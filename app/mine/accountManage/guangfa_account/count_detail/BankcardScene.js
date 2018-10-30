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
    ListView,
    Modal

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
import WattingTenScendsScene from "./WattingTenScendsScene";
import SubmitComponent from "../component/SubmitComponent";

export default class BankCardScene extends BaseComponent{
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 == r2});
        this.state = {
            renderPlaceholderOnly:'blank',
            bankArray:[],
            source: ds.cloneWithRows([]),
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            modalVisibleRemoveSuccess:false, //成功
            image:require('../../../../../images/mine/guangfa_account/tongguo.png'),
            text:'解绑银行卡成功\n' +
                '等待银行审核'

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
            status:this.props.getBankData?'3':'1,2,3'

        }
        request(Urls.GET_BANK_CARD_LIST, 'Post', maps)
            .then((response)=> {
                this.setState({
                    renderPlaceholderOnly:'success',
                    bankArray:response.mjson.data,
                    source:this.state.source.cloneWithRows(response.mjson.data),

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
        this.tips = '您要解绑卡号为\n' + '6226****8867银行卡\n' + '解绑完成后将无法通过此\n' + '卡进行入金'
        return(
            <View style={{flex:1,backgroundColor:'rgba(76,76,89,1)',alignItems:'center',paddingTop:Pixel.getTitlePixel(64)}}>
                <StatusBar barStyle='light-content'/>
                <ListView dataSource={this.state.source}
                              removeClippedSubviews={false}
                              renderRow={this._renderRow}
                              renderSeparator={this._renderSeparator}
                              renderFooter={this._renderFootView}
                              showsVerticalScrollIndicator={false}/>


                <NavigationView backIconClick={this.backPage} title='银行卡'
                                wrapStyle={{backgroundColor:'transparent'}} titleStyle={{color:'#ffffff'}}/>

                    <Modal  animationType={this.state.animationType}
                            transparent={this.state.transparent}
                            visible={this.state.modalVisible}>
                        <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                            <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(204),backgroundColor:'#ffffff',marginTop: Pixel.getPixel(149),borderRadius:Pixel.getPixel(4),alignItems:'center'}}>
                                <Text style={{textAlign:'center',width:Pixel.getPixel(260),color:fontAndColor.COLORA0,backgroundColor:'transparent',lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(29)}} allowFontScaling={false}>{this.tips}</Text>
                                <SubmitComponent  title="确认" warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),marginTop:Pixel.getPixel(25),marginLeft: 0}}/>
                            </View>
                        </View>
                    </Modal>

                <Modal  animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisibleRemoveSuccess}>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(204),backgroundColor:'#ffffff',marginTop: Pixel.getPixel(149),borderRadius:Pixel.getPixel(4),alignItems:'center'}}>
                            <Image source={this.state.image} style={{marginTop:Pixel.getPixel(30)}}/>
                            <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(15)}} allowFontScaling={false}>{this.state.text}</Text>
                            <SubmitComponent btn={this.goWatting} title="确认" warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),marginTop:Pixel.getPixel(25),marginLeft: 0}}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    _renderSeparator(sectionId, rowId) {
        return (
            <View style={{height:Pixel.getPixel(10)}} key={sectionId + rowId}>
            </View>
        )
    }

    _renderRow=(rowData)=>{
        return(
            <BankcardComponent data={rowData} relieveClick={(bankData)=>{this.relieveClick(bankData)}} bankClick={(bankData)=>{
               if(this.props.getBankData){
                   if(bankData.status!=3){
                       this.props.showToast('当前银行不可用!');
                       return;
                   }
                   this.props.getBankData(bankData);
                   this.backPage();
               }

            }}/>
        )
    }

    _renderFootView=()=>{
        if(this.state.bankArray.length<5){
            return(
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

    }


    relieveClick=(bankData)=>{
        this.setState({
            modalVisible:true
        })
        this.go(bankData);
    }

    go = (bankData) =>{
        this.setState({
            modalVisible:false
        })
        this.props.showModal(true);
        request(Urls.GF_RELIEVE_BANK, 'Post', {
            bank_card_no:bankData.bank_card_no,
            customer_type:'B',
            enter_base_id:global.companyBaseID,
            user_type:this.props.account.account_open_type
        })
            .then((response)=> {
                this.props.showModal(false);
                this.datas = response.mjson.data;
                this.serial_no = this.datas.serial_no;
                this.setState({
                    modalVisibleRemoveSuccess:true
                })

            },(error)=>{
               this.setState({
                   image:require('../../../../../images/mine/guangfa_account/shi.png'),
                   text:'无法解绑\n' + '请至少保留一张银行卡',
                   modalVisibleRemoveSuccess:true,
               })
            });

    }

    goWatting = ()=>{
        this.setState({
            modalVisibleRemoveSuccess:false
        })
        if(this.datas != ''){
            this.toNextPage({
                name:'WattingTenScendsScene',
                component:WattingTenScendsScene,
                params:{
                    serial_no:this.serial_no,
                }
            })
        }else{
            this.backPage()
        }
    }

    addBankClick=()=>{
        this.toNextPage({
            name:'BindBankCardScene',
            component:BindBankCardScene,
            params:{
                iscompany:this.props.account.account_open_type,
            }
        });

    }

}

