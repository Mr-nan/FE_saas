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
    Button,
    StatusBar,
    Modal
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
import SubmitComponent from "../component/SubmitComponent";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');

let Platform = require('Platform');

export default class WithdrawDepositScene extends ZSBaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            renderPlaceholderOnly:'blank',
            bankData:{},
            animationType:'none',
            modalVisible:false,
            transparent:true,
            modalVisibleTip:false,
            modalVisibleRemovefailed:false

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
        console.log('11111');
        let maps = {
            bank_id:'gfyh',
            enter_base_id:global.companyBaseID,
            status:'3',

        }
        request(Urls.GET_BANK_CARD_LIST, 'Post', maps)
            .then((response)=> {

                if(response.mjson.data.length>0){

                    for (let bankItem of response.mjson.data){
                        if(bankItem.status == 3){
                            this.setState({
                                renderPlaceholderOnly:'success',
                                bankData:bankItem,
                            })
                            break;
                        }
                    }


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

        this.cardNO = this.state.bankData.bank_card_no && this.state.bankData.bank_card_no !=0 ? this.state.bankData.bank_card_no.replace(/^(....).*(....)$/, "$1****$2"):'**** **** ****';
        if (this.state.renderPlaceholderOnly!='success') {
            return (
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <StatusBar barStyle='dark-content'/>
                    {
                        this.loadView()
                    }
                    <NavigationView backIconClick={this.backPage} title='提现'
                                    wrapStyle={{backgroundColor:'white'}} titleStyle={{color:FontAndColor.COLORA0}}/>
                </View>
            )
        }

        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content' />
                    <View style={{
                       flex:1,
                        backgroundColor:FontAndColor.COLORA3,
                        alignItems:'center'
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            width:width,
                            marginTop: Pixel.getPixel(79),
                            height:Pixel.getPixel(77),
                            justifyContent:'space-between',
                            paddingLeft: Pixel.getPixel(15),
                            paddingRight: Pixel.getPixel(15)
                        }} onPress={this.selectBank}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={this.getBankImage(this.state.bankData.sub_bank_name)} style={{width:Pixel.getPixel(35),height:Pixel.getPixel(35)}}/>
                                <View style={{marginLeft: Pixel.getPixel(13),justifyContent:'center',flexDirection:'column'}}>
                                    <Text
                                        style={{fontSize: Pixel.getFontPixel(15),color:FontAndColor.COLORA0}}>{this.state.bankData.sub_bank_name}</Text>
                                    <Text
                                        style={{color:'#666666',fontSize: Pixel.getFontPixel(14),marginTop:4}}>{this.cardNO}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:FontAndColor.COLORA1,fontSize:Pixel.getFontPixel(14)}}>更换银行</Text>
                                <Image style={{marginLeft:Pixel.getPixel(9)}} source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                            </View>
                        </TouchableOpacity>

                       <View style={{backgroundColor: 'white', marginTop: Pixel.getPixel(10)}}>
                            <View style={{
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: FontAndColor.COLORA4,
                                marginLeft:Pixel.getPixel(15),
                                marginRight:Pixel.getPixel(15)
                            }}>
                                <Text style={{fontSize:Pixel.getFontPixel(14),color:FontAndColor.COLORD2,marginTop:Pixel.getPixel(14)}}>提现金额（元）</Text>
                                <View style={{flexDirection: 'row',marginTop:Pixel.getPixel(14)}}>
                                    <Text style={{fontSize:Pixel.getFontPixel(17),color:FontAndColor.COLORD2}}>￥</Text>
                                    <TextInput
                                        style={{
                                            height: 40,
                                            fontSize: Pixel.getPixel(35),
                                            flex: 1,
                                            marginBottom: 15,
                                            padding: 0,
                                            marginLeft:Pixel.getPixel(5),
                                        }}
                                        keyboardType={'numeric'}
                                        underlineColorAndroid={"#00000000"}
                                        onChangeText={(text)=>{this.money = text}}
                                    />
                                </View>
                            </View>
                        <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(47),alignItems:'center'}}>
                            <Text style={{fontSize:Pixel.getFontPixel(12),color:FontAndColor.COLORA1,marginLeft:Pixel.getPixel(15)}}>可用余额:</Text>
                            <Text style={{fontSize:Pixel.getFontPixel(12),color:'#000000'}}>{this.props.account.balance}</Text>
                        </View>

                    </View>
                <SubmitComponent btn={()=>{this.confirm()}} title='提现' btnType={3}
                iconWrap = {{marginTop:Pixel.getPixel(30),marginLeft:Pixel.getPixel(0)}}/>

                    <TouchableOpacity onPress={this.tip} style={{marginTop:Pixel.getPixel(19)}}>
                        <Text style={{
                            color: '#AEAEAE',
                            fontSize:Pixel.getPixel(14)
                        }}>银行受理及到账时间</Text>
                    </TouchableOpacity>
                    </View>

                <Modal animationType={this.state.animationType}
                       transparent={this.state.transparent}
                       visible={this.state.modalVisible}>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <Image source={require('../../../../../images/mine/guangfa_account/tanchuang.png')} style={{marginTop: Pixel.getPixel(149),width:width-Pixel.getPixel(116),height:(width-Pixel.getPixel(116))*1.22}}>
                            <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(317),alignItems:'center'}}>
                                <Text allowFontScaling={true} style={{color:'#ffffff',fontWeight: 'bold',fontSize:Pixel.getFontPixel(24),marginTop:Pixel.getPixel(30),letterSpacing: Pixel.getFontPixel(4.9)}}>提示</Text>
                                <Text style={{marginTop:Pixel.getPixel(49),color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>确认提现后您的资金将会被冻结，</Text>
                                <Text style={{color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>并跳转到交易密码页面进行验证。</Text>
                                <Text style={{color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}> 若验证未完成，</Text>
                                <Text style={{color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>冻结资金将会在10分钟后</Text>
                                <Text style={{color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}> 解冻并退回到您的账户中。</Text>
                                <View style={{flexDirection: 'row',marginTop:Pixel.getPixel(33),width:Pixel.getPixel(260),paddingRight: Pixel.getPixel(17),paddingLeft: Pixel.getPixel(23),justifyContent: 'space-between',alignItems:'center'}}>
                                    <TouchableOpacity onPress={()=>{this.cancel()}} style={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:Pixel.getPixel(2),borderWidth: Pixel.getPixel(1),borderColor:'#0DC1C8'}}>
                                        <Text style={{color:'#05C5C2',fontSize:Pixel.getFontPixel(15)}} >取消</Text>
                                    </TouchableOpacity>
                                    <SubmitComponent btn={()=>{this.submit()}} title="确认" btnStyle={1}
                                                     warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32)}}
                                                     iconWrap={{marginLeft: Pixel.getPixel(20),marginTop:Pixel.getPixel(10),width:Pixel.getPixel(100),height:Pixel.getPixel(46)}}
                                    />
                                </View>
                            </View>
                        </Image>
                    </View>
                </Modal>

                <Modal animationType={this.state.animationType}
                       transparent={this.state.transparent}
                       visible={this.state.modalVisibleTip}>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <Image source={require('../../../../../images/mine/guangfa_account/tanchuang.png')} style={{marginTop: Pixel.getPixel(149),width:width-Pixel.getPixel(116),height:(width-Pixel.getPixel(116))*1.22}}>
                            <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(317),alignItems:'center',paddingLeft:Pixel.getPixel(20),paddingRight:Pixel.getPixel(20)}}>
                                <Text allowFontScaling={true} style={{color:'#ffffff',fontWeight: 'bold',fontSize:Pixel.getFontPixel(24),marginTop:Pixel.getPixel(30),letterSpacing: Pixel.getFontPixel(4.9)}}>提示</Text>
                                <Text style={{marginTop:Pixel.getPixel(49),color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),lineHeight:Pixel.getPixel(22)}}>1.单笔提现五万元以内(包含五万)，不限节假日24小时内到账;</Text>
                                <Text style={{color:FontAndColor.COLORA0,backgroundColor:'transparent',fontSize:Pixel.getPixel(14),marginTop:Pixel.getPixel(10),lineHeight:Pixel.getPixel(22)}}>2.单笔提现五万以上，只限于工作日16:00前申请，申请成功后，24小时内到账。</Text>
                                    <SubmitComponent btn={()=>{this.know()}} title="我知道了" btnType={2}
                                                     warpStyle={{width:Pixel.getPixel(200),height:Pixel.getPixel(32)}}
                                                     iconWrap={{marginTop:Pixel.getPixel(20),marginLeft:Pixel.getPixel(10),width:Pixel.getPixel(200),height:Pixel.getPixel(46)}}/>
                            </View>
                        </Image>
                    </View>
                </Modal>

                <Modal animationType={this.state.animationType}
                       transparent={this.state.transparent}
                       visible={this.state.modalVisibleRemovefailed}>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(204),backgroundColor:'#ffffff',marginTop: Pixel.getPixel(149),borderRadius:Pixel.getPixel(4),alignItems:'center'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/shi.png')} style={{marginTop:Pixel.getPixel(30)}}/>
                            <Text style={{textAlign:'center',width:Pixel.getPixel(260),color:FontAndColor.COLORA0,backgroundColor:'transparent',lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(15)}} allowFontScaling={false}>提现金额必须小于等于可用余额</Text>
                            <SubmitComponent btn={this.falied} title="确认" btnType={1}
                                             iconWrap = {{marginTop:Pixel.getPixel(25),marginLeft: 0,width:Pixel.getPixel(100),height:Pixel.getPixel(42)}}
                                             warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32)}}/>
                        </View>
                    </View>
                </Modal>
                <NavigationView backIconClick={this.backPage} title='提现'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:FontAndColor.COLORA0}}/>
            </View>

        )
    }

    tip = () =>{
        this.setState({
            modalVisibleTip:true
        })
    }

    know = () =>{
        this.setState({
            modalVisibleTip:false
        })
    }

    falied = () =>{
        this.setState({
            modalVisibleRemovefailed:false
        })
    }

    selectBank=()=>{
        this.toNextPage({
            name:'BankcardScene',
            component:BankcardScene,
            params:{
                account:this.props.account,
                getBankData:(bankData)=>{this.getBankData(bankData)},
            }});
    }

    getBankData =(bankData)=>{

        console.log(bankData);
        this.setState({
            bankData:bankData,
        })
    }

    //modal取消
    cancel = () =>{
        this.setState({
            modalVisible:false
        })
    }

    //modal确认
    submit = () =>{
        this.setState({
            modalVisible:false
        })
        if(Number(this.money) <= Number(this.props.account.balance)){
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
                                serial_no:data.serial_no,
                                reback_url:'withdraw',

                            }});
                    }else {
                        this.props.showToast(response.mjson.msg);

                    }

                },(error)=>{
                    this.props.showModal(false);
                    this.props.showToast(error.mjson.msg);
                });
        }else{
            this.setState({
                modalVisibleRemovefailed:true
            })
        }
    }
    //提现
    confirm=()=>{
        console.log('this.money',this.money);
        if(!this.money){
            this.props.showToast('请输入提现金额')
        } else{
            this.setState({
                modalVisible:true
            })
        }
    }

    getBankImage=(name)=>{
        if(name.indexOf('工商银行')>-1){
             return require('../../../../../images/mine/guangfa_account/gs.png');
        }else if(name.indexOf('中国银行')>-1){
            return require('../../../../../images/mine/guangfa_account/zh.png');
        }else if(name.indexOf('建设银行')>-1){
            return require('../../../../../images/mine/guangfa_account/js.png');
        }else if(name.indexOf('农业银行')>-1){
            return require('../../../../../images/mine/guangfa_account/ny.png');
        }else if(name.indexOf('交通银行')>-1){
            return require('../../../../../images/mine/guangfa_account/jt.png');
        }else if(name.indexOf('邮储银行')>-1){
            return require('../../../../../images/mine/guangfa_account/yz.png');
        }else if(name.indexOf('招商银行')>-1){
            return require('../../../../../images/mine/guangfa_account/zs.png');
        }else if(name.indexOf('平安银行')>-1){
            return require('../../../../../images/mine/guangfa_account/pa.png');
        }else if(name.indexOf('民生银行')>-1){
            return require('../../../../../images/mine/guangfa_account/ms.png');
        }else if(name.indexOf('光大银行')>-1){
            return require('../../../../../images/mine/guangfa_account/gd_new.png');
        }else if(name.indexOf('华夏银行')>-1){
            return require('../../../../../images/mine/guangfa_account/hx.png');
        }else if(name.indexOf('中信银行')>-1){
            return require('../../../../../images/mine/guangfa_account/zx.png');
        }else if(name.indexOf('浦发银行')>-1){
            return require('../../../../../images/mine/guangfa_account/pf.png');
        }else if(name.indexOf('广发银行')>-1){
            return require('../../../../../images/mine/guangfa_account/gf.png');
        }else if(name.indexOf('兴业银行')>-1){
            return require('../../../../../images/mine/guangfa_account/zx.png');
        }
        return require('../../../../../images/mine/guangfa_account/moren-bank.png');
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