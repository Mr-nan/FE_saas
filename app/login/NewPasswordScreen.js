/**
 * Created by zhengnan on 2018/8/14.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  ZNTextInputView from './component/ZNTextInputView';
import  ZNGetNoteButton from './component/ZNGetNoteButton';
import  AllNavigationView from '../component/AllNavigationView';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";


@observer
export default class NewPasswordScreen extends BaseComponent{

    @observable phoneNumber;
    @observable noteCodeNumber;
    @observable passwordNumber;
    constructor(props) {
        super(props);

        this.phoneNumber = '';
        this.noteCodeNumber = '';
        this.passwordNumber = '';
        this.state = {
            isShowPassword:false,
            barStyle:'dark-content',
        };
    }

    componentWillMount() {

        this.setState({
            barStyle:'dark-content',

        })
    }

    componentWillUnMount() {

        this.setState({
            barStyle:'light-content',

        })
    }

    render(){
        return(
            <View style={styles.root}>
                <StatusBar barStyle={this.state.barStyle}/>
                <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.TITLEFONT40, width:width - Pixel.getPixel(80),marginTop:Pixel.getPixel(20),marginBottom:Pixel.getPixel(40)}}>密码重置</Text>
                <ZNTextInputView placeholder={'请输入您的注册手机号'}
                                 keyboardType={'phone-pad'}
                                 maxLength={11}
                                 onChangeText ={(text)=>{this.phoneNumber = text}}/>
                <View style={{marginTop:Pixel.getPixel(35)}}/>
                <ZNTextInputView placeholder={'请输入您收到的验证码'} rightView={()=>{
                    return(
                        <ZNGetNoteButton getNoteClick={(setTime)=>{this.getAuthCode(setTime)}}/>
                    )
                }} onChangeText={(text)=>{this.noteCodeNumber = text}}/>
                <View style={{marginTop:Pixel.getPixel(35)}}/>
                <ZNTextInputView placeholder={'请输入至少6位密码'}
                                 secureTextEntry={!this.state.isShowPassword}
                                 onChangeText={(text)=>{this.passwordNumber = text}}
                                 rightView={()=>{
                    return(
                        <TouchableOpacity style={{paddingHorizontal:Pixel.getPixel(10)}} onPress={()=>{
                            this.setState({
                                isShowPassword :!this.state.isShowPassword
                            })
                        }}>
                            <Image source={this.state.isShowPassword? require('../../images/login/kejian.png'):require('../../images/login/bukejian.png')}/>
                        </TouchableOpacity>
                    )
                }}/>
                <TouchableOpacity activeOpacity={1} onPress={this.confirmAction} style={{marginTop:Pixel.getPixel(34)}}>
                    <Image source={require('../../images/login/anniu-no.png')} style={{height:Pixel.getPixel(61),width:width-Pixel.getPixel(80),
                        alignItems:'center',justifyContent:'center',resizeMode:'cover'
                    }}>
                        <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30, backgroundColor:'transparent',marginBottom:Pixel.getPixel(15)}}>确认</Text>
                    </Image>
                </TouchableOpacity>
                <AllNavigationView backIconClick={this.backPage} wrapStyle={{backgroundColor:'white'}}/>
            </View>
        )
    }

    getAuthCode=(setTime)=>{


        if(this.phoneNumber.length<11) {
            this.props.showToast('请输入正确的手机号');
            return;
        }

        this.props.showModal(true);
        request(AppUrls.GET_AUTH_CODE,'POST',{
            phone:this.phoneNumber,
            type:4
        }).then((response)=>{
            this.props.showModal(false);
            setTime();

        },(error)=>{
            this.props.showModal(false);
            this.props.showToast(error.mjson.msg);
        });


    }


    confirmAction=()=>{

        if(this.phoneNumber.length<11){
            this.props.showToast('请输入正确的手机号');
            return;
        }

        if(this.noteCodeNumber<0){
            this.props.showToast('请输入短信验证码');
            return;
        }

        if(this.passwordNumber.length<6){
            this.props.showToast('密码不少于六位');
            return;
        }


        this.props.showModal(true);
        request(AppUrls.AUTH_FORGET_PWD,'post',{

            phone:this.phoneNumber,
            pwd:this.passwordNumber,
            code:this.noteCodeNumber,
            device_code:Platform.OS === 'android'?'dycd_platform_android':'dycd_platform_ios'

        }).then((response)=>{

            this.props.showModal(false);
            this.props.showToast('密码已修改成功');
            this.backPage();

        },(error)=>{
            this.props.showModal(false);
            this.props.showToast(error.mjson.msg);
        })

    }

}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'white',
        paddingTop:Pixel.getTitlePixel(64),
        alignItems:'center'
    }
})