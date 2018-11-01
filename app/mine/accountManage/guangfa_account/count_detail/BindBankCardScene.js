/*
* created by marongting on 2018/10/18
*
* */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Modal

} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

import BaseComponent from "../../../../component/BaseComponent";
import NavigationView from '../../../../component/AllNavigationView';
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from '../component/SubmitComponent';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import {request} from "../../../../utils/RequestUtil";
import * as Urls from "../../../../constant/appUrls";
import SelectBankScene from "../../SelectBankScene";
import NoAccountScene from "./NoAccountScene";
import SmallAmountBankStatusScene from "./SmallAmountBankStatusScene";
import WattingTenScendsScene from "./WattingTenScendsScene";

export default class BindBankCardScene extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            bankName:'请选择银行',
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            image:require('../../../../../images/mine/guangfa_account/tongguo.png'),
            text:'添加银行卡成功\n' + '等待银行审核',
        }
        console.log('this.props.iscompany',this.props.iscompany)
        this.sData = {
            bank_card_no:'',
            bank_name:'',
            bank_no:'',
            customer_type:'B',
            enter_base_id:'',
            mobile:'',
            reback_url:'123456',
            user_type:this.props.iscompany
        }
    }

    initFinish(){
        this.loadData();
        StorageUtil.mGetItem(StorageKeyNames.USER_INFO,(data)=>{
            if(data.code == 1){
                let userData = JSON.parse(data.result);
                this.userID = userData.base_user_id;
            }
        })

        this.setState({
            renderPlaceholderOnly:'success'
        })
    }
    loadData = () =>{
        let maps = {
            enter_base_ids: global.companyBaseID,
            bank_id:'gfyh',
            child_type:'1'
        };
        request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
            .then((response) => {
                console.log('response',response);
                this.accountData=response.mjson.data.gfyh[0];
                this.setState({
                    renderPlaceholderOnly: 'success',
                });
            }, (error) => {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
                this.props.showToast(error.mjson.msg);
            });
    }
    _renderPlaceholderView = () => {
        return(
            <View style={{width:width,height:height,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title={'添加银行卡'}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                {this.loadView()}
            </View>
        )

    }
    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
            return this._renderPlaceholderView()
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle="default"/>
                <View style={styles.inputTextsStyleView}>
                    {this.props.iscompany == '2' ?  <LoginInputText
                        ref = 'name'
                        textPlaceholder={'请输入姓名'}
                        leftText = '姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}/>
                        :  <LoginInputText
                            ref = 'name'
                            textPlaceholder={'请输入银行账户名称'}
                            leftText = '银行账户名称'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(30),paddingLeft:0}}/>}
                    {/*{this.props.iscompany == '2' ?  (<LoginInputText*/}
                        {/*ref='code'*/}
                        {/*textPlaceholder={'请输入资金账号'}*/}
                        {/*leftText = '资金账号'*/}
                        {/*leftIcon={false}*/}
                        {/*import={false}*/}
                        {/*clearValue={true}*/}
                        {/*rightIcon={false}*/}
                        {/*rightButton={false}*/}
                        {/*inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>):*/}
                        {/*(<LoginInputText*/}
                        {/*ref='code'*/}
                        {/*textPlaceholder={'请输入资金账号'}*/}
                        {/*leftText = '资金账号'*/}
                        {/*leftIcon={false}*/}
                        {/*import={false}*/}
                        {/*clearValue={true}*/}
                        {/*rightIcon={false}*/}
                        {/*rightButton={false}*/}
                        {/*inputTextStyle = {{marginLeft:Pixel.getPixel(58),paddingLeft:0}}/>)}*/}


                    {this.props.iscompany == '2' && (<LoginInputText
                        ref = 'phone'
                        textPlaceholder={'请输入手机号码'}
                        leftText = '手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={11}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(42),paddingLeft:0}}/>)
                    }

                    {this.props.iscompany == '2'?    <LoginInputText
                        ref='bank_count'
                        textPlaceholder={'请输入银行卡号'}
                        leftText = '银行卡号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        maxLength={19}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>:
                        <LoginInputText
                            ref='bank_count'
                            textPlaceholder={'请输入银行卡号'}
                            leftText = '银行卡号'
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}
                            rightButton={false}
                            maxLength={19}
                            inputTextStyle = {{marginLeft:Pixel.getPixel(58),paddingLeft:0}}/>}
                    <TouchableOpacity ref='bank_type' onPress={()=>{this.next()}} style={{flexDirection: 'row',alignItems:'center',width:Pixel.getPixel(345),height:Pixel.getPixel(44)}}>
                        <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),justifyContent: 'flex-start'}}>银行</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight: Pixel.getPixel(15),width:Pixel.getPixel(316)}}>
                            <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:'#AEAEAE',marginRight:Pixel.getPixel(20)}}>{this.state.bankName}</Text>
                            <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop: Pixel.getPixel(21),alignItems:'flex-end' }}>
                    <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                    <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>请确认信息的准确性，开户时间为7*24小时 </Text>
                </View>
                <SubmitComponent   btn={()=>{this.submit()}} title={'确认提交'} warpStyle={{marginTop:Pixel.getPixel(30)}}/>
                <NavigationView backIconClick={this.backPage} title={'添加银行卡'}
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <Modal  animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisible}>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <View style={{width:Pixel.getPixel(260),height:Pixel.getPixel(204),backgroundColor:'#ffffff',marginTop: Pixel.getPixel(149),borderRadius:Pixel.getPixel(4),alignItems:'center'}}>
                            <Image source={this.state.image} style={{marginTop:Pixel.getPixel(30)}}/>
                            <Text style={{color:fontAndColor.COLORA0,backgroundColor:'transparent',lineHeight:Pixel.getPixel(20),marginTop:Pixel.getPixel(15)}} allowFontScaling={false}>{this.state.text}</Text>
                            <SubmitComponent btn={this.go} title="确认" warpStyle={{width:Pixel.getPixel(100),height:Pixel.getPixel(32),marginTop:Pixel.getPixel(25),marginLeft: 0}}/>
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }

    next =() =>{
        this.toNextPage({
            name:'SelectBankScene',
            component:SelectBankScene,
            params:{getBankData:(data)=>{
                    console.log('bankdata',data);
                    this.sData.bank_name = data.bankName;
                    this.sData.bank_no = data.bankNo;
                    this.setState({
                        bankName:data.bankName
                    })
                }}

        })
    }
    submit = () => {
        if(this.sData.user_type == '2'){
            this.sData.mobile = this.refs.phone.getInputTextValue();
        }else{
            this.sData.mobile = '';
        }
        // this.sData.bank_card_no  = this.refs.bank_count.getInputTextValue();
        this.sData.bank_card_no = this.accountData.bank_card_no;
        if(this.sData.cust_name == ''){
            this.props.showToast('请输入姓名');
            return;
        }
        // else if(this.sData.cert_no == ''){
        //     this.props.showToast('请输入正确的资金账号');
        //     return;
        // }
        else if (this.sData.user_type == '2' && this.sData.mobile.length != 11){
            this.props.showToast('请输入正确的手机号码');
            return;
        }else if( isNaN(Number(this.sData.bank_card_no)) && this.sData.bank_card_no <= 19){
            this.props.showToast('请输入银行卡号');
            return;
        }else if(this.sData.bank_name == '' ){
            this.props.showToast('请选择银行');
            return;
        }else{
            this.sData.enter_base_id = global.companyBaseID;
            this.sendData(this.sData);
        }
    }

    sendData = (data) =>{
        this.props.showModal(true);
        request(Urls.GF_ADD_BANK, 'Post', data)
            .then((response)=> {
                this.props.showModal(false);
                this.datas = response.mjson.data;
                this.datacode = response.mjson.code;
                this.serial_no = this.datas.serial_no;
                this.setState({
                    modalVisible:true
                })
            },(error)=>{
                this.props.showModal(false)
                this.setState({
                    image:require('../../../../../images/mine/guangfa_account/shi.png'),
                    text:'添加银行卡失败\n' + '请重新尝试添加'
                })
                this.setState({
                    modalVisible:true
                })
            })
    }

    go =()=>{
        this.setState({
            modalVisible:false
        })
        if(this.datacode==1){
            this.toNextPage({
                name:'WattingTenScendsScene',
                component:WattingTenScendsScene,
                params:{
                    serial_no:this.serial_no,
                }
            })

        }
    }

}

const styles = StyleSheet.create({
    inputTextsStyleView: {
        width:width,
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getTitlePixel(79)
    },

})