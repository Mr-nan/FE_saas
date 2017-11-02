/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text,Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../../../component/BaseComponent";
import NavigationBar from "../../../component/NavigationBar";
import * as FontAndColor from "../../../constant/fontAndColor";
import PixelUtil from "../../../utils/PixelUtil";
import MyButton from "../../../component/MyButton";
import {request} from "../../../utils/RequestUtil";
import * as AppUrls from "../../../constant/appUrls";
import md5 from "react-native-md5";
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');


let type;
//   type
//    0：个人开户
//    1：企业开户
//    2：充值
//    3：提现
//    4: 更换银行卡

let status;
//   status
//    0：处理中
//    1：成功
//    2：失败
//    3：提交资料 （开通企业账户ONLY）


export default class ResultIndicativeScene extends BaseComponent{

    constructor(props){
        super(props)

        this.state = {
            renderPlaceholderOnly: true,
        }
        this.props ={
            type:4,
            status:0
        }

        // type = this.props.type;
        // status = this.props.status;
        type = 2;
        status =0;
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly: false,
        })
    }

    render(){

        let navi_title = '';
        if(type ===0){
            navi_title = '个人开户';
        }else if (type === 1){
            navi_title = '企业开户'
        }else if (type === 2){
            navi_title = '充值'
        }else if (type === 3){
            navi_title = '提现'
        }

        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={navi_title}
                        rightText={""}

                    />
                </View>
            </TouchableWithoutFeedback>);
        }



        return(
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <NavigationBar
                        leftImageShow={true}
                        leftTextShow={false}
                        centerText={navi_title}
                        rightText={""}
                        leftImageCallBack={()=>{
                            this.backPage();
                        }}
                    />

                    <View style = {{justifyContent:'center', alignItems:'center', flex:1}}>
                        <Image style={{width:status===0?80:180, height:status===0?80:120, marginBottom:35}} source = {this.image()}/>
                        <Text allowFontScaling = {false} style = {{fontSize:20, marginBottom:15}}>开户处理中</Text>
                        {this.renderAnnotation()}
                        <MyButton
                            buttonType = {MyButton.TEXTBUTTON}
                            content = {'刷新试试'}
                            parentStyle = {{backgroundColor:FontAndColor.COLORB0,borderRadius:3,marginTop:20}}
                            childStyle = {{color:'white', marginHorizontal:20, marginVertical:10, fontSize:16}}
                            mOnPress = {()=>{

                            }}
                        />
                    </View>
                        {this.renderFooter()}
                </View>

        )
    }

    renderAnnotation=()=>{

        if (type === 0||type === 1){
            if(status === 0){
                return null;
            }else {
                return <View style = {{alignItems:'center'}}>
                    <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1, marginBottom:5}}>您已成功开通浙商银行存管账户</Text>
                    <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1}}> 并已经绑定交通银行（尾号3008）的银行卡</Text>
                </View>
            }
        }else if(type === 2|| type===3) {
            if(status === 1){
                return <Text allowFontScaling = {false} style = {{fontSize:17}}>'￥10,200.00'</Text>
            }else {
                return <View style = {{alignItems:'center'}}>
                    <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1, marginBottom:5}}>您已成功开通浙商银行存管账户</Text>
                    <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1}}> 交通银行（尾号3008）的银行卡</Text>
                </View>
            }
        }else if (type === 4){
            return <View style = {{alignItems:'center'}}>
                <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1, marginBottom:5}}>新银行卡为</Text>
                <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1}}> 6282 9262 9292 229 220</Text>
            </View>
        }

    }

    image = ()=>{

        if(type === 0||type === 1||type === 4){ // 个人开户、企业开户、更换银行卡
            switch (status){
                case 0:{  //处理中...
                    return require('../../../../images/account/processing.png')
                }break;
                case 1:{
                    return require('../../../../images/account/open_account_success.png')
                }break;
                case 2:{
                    return require('../../../../images/account/open_account_failure.png')
                }break;
                case 3:{ //企业开户ONLY
                    return require('../../../../images/account/commit_success.png')
                }break;
            }
        }else if (type === 2||type === 3){ // 提现、充值
            switch (status){
                case 0:{
                    return require('../../../../images/account/processing.png')
                }break;
                case 1:{
                    return require('../../../../images/account/withdraw_success.png')
                }break;
                case 2:{
                    return require('../../../../images/account/withdraw_failure.png')
                }break;
            }
        }
    }


    renderFooter = ()=>{
            switch (type){
                case 0:{  // 个人开户
                    return <View style = {{alignItems:'center', marginBottom:35, marginTop:150}}>
                        <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1}}>温馨提示：此账户暂时仅支持SP业务</Text>
                    </View>

                }
                    break;
                case 1:case 4:{   // 企业开户、更换银行卡
                    return <View style = {{marginTop:200}}/>
                }
                    break;
                case 2 :case 3:{  //提现、充值

                    return  <View style = {{marginHorizontal:30, height:180}}>
                        <View style = {{flexDirection:'row', alignItems:'center', marginBottom:20}}>
                            <View style = {{height:1, backgroundColor:FontAndColor.COLORA4, flex:1, marginRight:15}}/>
                            <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1}}>温馨提示</Text>
                            <View style = {{height:1, backgroundColor:FontAndColor.COLORA4, flex:1, marginLeft:15}}/>
                        </View>
                        <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1, marginBottom:5,lineHeight:20 }}>1  浙商银行及其它银行1000万以内的提现，实时到账，五分钟。</Text>

                        <Text allowFontScaling = {false} style = {{color:FontAndColor.COLORA1, lineHeight:20}}>2  企业用户及其它个人用户提现大于1000万以上的，工作日走大小额，资金0.5-2小时即可到达。</Text>

                    </View>
                }
                    break;

            }
    }
}
