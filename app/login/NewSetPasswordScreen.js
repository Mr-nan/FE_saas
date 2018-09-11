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
    Keyboard,
} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  ZNTextInputView from './component/ZNTextInputView';
import  AllNavigationView from '../component/AllNavigationView';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
import md5 from "react-native-md5";

import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import SetLoginPwdGesture from "./SetLoginPwdGesture";

@observer
export default class NewSetPasswordScreen extends BaseComponent{

    @observable passwordNumber;
    constructor(props) {
        super(props);

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
            <TouchableOpacity activeOpacity={1} style={styles.root} onPress={()=>{Keyboard.dismiss()}}>
                <StatusBar barStyle={this.state.barStyle}/>
                <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.TITLEFONT40, width:width - Pixel.getPixel(80),marginTop:Pixel.getPixel(20),marginBottom:Pixel.getPixel(40)}}>密码设置</Text>
                <ZNTextInputView placeholder={'请输入至少6位密码'}
                                 keyboardType={"default"}
                                 secureTextEntry={!this.state.isShowPassword}
                                 onChangeText={(text)=>{this.passwordNumber = text}}
                                 replaceAction={(text)=>{
                                     text = text.replace(/[ ]/g, "");
                                     text = text.replace(/[\u4E00-\u9FA5]/g, "");
                                     return text;
                                 }}
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
                <TouchableOpacity activeOpacity={1}  style={{marginTop:Pixel.getPixel(34)}} onPress={this.buttonClick}>
                    <Image source={ this.passwordNumber.length>0?require('../../images/login/anniu.png'): require('../../images/login/anniu-no.png')} style={{height:Pixel.getPixel(61),width:width-Pixel.getPixel(80),
                        alignItems:'center',justifyContent:'center',resizeMode:'cover'
                    }}>
                        <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30, backgroundColor:'transparent',marginBottom:Pixel.getPixel(15)}}>提交</Text>
                    </Image>
                </TouchableOpacity>
                <AllNavigationView  wrapStyle={{backgroundColor:'white'}}/>
            </TouchableOpacity>
        )
    }

    buttonClick=()=>{

        Keyboard.dismiss();
        if(this.passwordNumber.length<6){
            this.props.showToast('密码不少于六位');
            return;
        }

        this.props.showModal(true);
        request(AppUrls.SETPWD,'post',{

            confirm_pwd:md5.hex_md5(this.passwordNumber),
            pwd:md5.hex_md5(this.passwordNumber),

        }).then((response)=>{

            this.props.showModal(false);
            this.toNextPage({
                name: 'SetLoginPwdGesture',
                component: SetLoginPwdGesture,
                params: {
                    from: 'login'
                }
            })

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