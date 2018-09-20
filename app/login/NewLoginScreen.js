/**
 * Created by zhengnan on 2018/8/10.
 */

import React,{PropTypes,Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Easing,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    NativeModules,

} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import LoginGesture from "./LoginGesture";
import SetLoginPwdGesture from "./SetLoginPwdGesture";
import NewSetPasswordScreen from  './NewSetPasswordScreen';

import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  {observable} from 'mobx';
import  {observer} from 'mobx-react'
import  ZNTextInputView from './component/ZNTextInputView';
import  ZNGetNoteButton from './component/ZNGetNoteButton';
import MainPage from "../main/MainPage";

import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";

import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import md5 from "react-native-md5";


var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();


@observer
export default class  NewLoginScreen extends BaseComponent{


    @observable isShowLogin;
    @observable phoneOneNumber;
    @observable phoneTwoNumber;
    @observable noteCodeNumber;
    @observable passwordNumber;
    @observable loginType;
    constructor(props) {
        super(props);

        this.isShowLogin = false;
        this.loginType = 0;
        this.phoneOneNumber = '';
        this.phoneTwoNumber = '';
        this.noteCodeNumber = '';
        this.passwordNumber = '';

        this.state = {
            pointValue:new Animated.Value(Pixel.getTitlePixel(40)),
            bounceValue:new Animated.Value(1),
            rotateValue:new Animated.Value(0),
            isShowPassword:false,
        };
    }

    render(){
        return(
            <Image style={styles.root} source={require('../../images/login/bg.png')} >
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{Keyboard.dismiss()}}>
                    <View style={{marginTop:Pixel.getPixel(150), alignItems:'center',backgroundColor:'white'}}>
                        <ZNSelectButton click={(type)=>{
                            Keyboard.dismiss();
                            this.loginType = type;
                            this.scrollView.scrollTo({x:type *width, y:0, animated: true});
                        }}/>
                        <View style={{height:Pixel.getPixel(102),marginTop:Pixel.getPixel(30)}}>
                            <ScrollView ref={(ref)=>{this.scrollView = ref}}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        horizontal={true}
                                        overScrollMode="never"
                                        scrollEnabled={false}>
                                <View style={{width:width,alignItems:'center'}}>
                                    <ZNTextInputView placeholder={'请输入手机号'}
                                                     onChangeText={(text)=>{this.phoneOneNumber = text}}
                                                     keyboardType={'phone-pad'}
                                                     maxLength={11}/>
                                    <View style={{marginTop:Pixel.getPixel(30)}}/>
                                    <ZNTextInputView placeholder={'请输入验证码'}
                                                     rightView={()=>{
                                                         return(<ZNGetNoteButton getNoteClick={(setTime)=>{this.getAuthCode(setTime)}}/>)}}
                                                     onChangeText={(text)=>{this.noteCodeNumber = text}}
                                                     maxLength={6}
                                                     keyboardType={"numeric"}
                                    />
                                </View>
                                <View style={{width:width,alignItems:'center'}}>
                                    <ZNTextInputView placeholder={'请输入手机号'}
                                                     onChangeText={(text)=>{this.phoneTwoNumber = text}}
                                                     keyboardType={'phone-pad'}
                                                     maxLength={11}/>
                                    <View style={{marginTop:Pixel.getPixel(30)}}/>
                                    <ZNTextInputView placeholder={'请输入登录密码'}
                                                     secureTextEntry={!this.state.isShowPassword}
                                                     onChangeText={(text)=>{this.passwordNumber = text}}
                                                     keyboardType={"default"}
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
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.loginAction()}} style={{marginTop:Pixel.getPixel(34)}}>
                            <Image source={this.loginType==0?((this.phoneOneNumber.length>0 && this.noteCodeNumber.length>0)? require('../../images/login/anniu.png'):require('../../images/login/anniu-no.png')):((this.phoneTwoNumber.length>0 && this.passwordNumber.length>0)? require('../../images/login/anniu.png'):require('../../images/login/anniu-no.png'))}
                                   style={{height:Pixel.getPixel(61),width:width-Pixel.getPixel(80),
                                       alignItems:'center',justifyContent:'center',
                                   }}>
                                <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30, backgroundColor:'transparent',marginBottom:Pixel.getPixel(15)}}>登录</Text>
                            </Image>
                        </TouchableOpacity>
                        {/*<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:Pixel.getPixel(34)}}>*/}
                            {/*<Image source={require('../../images/login/dengpaotishi.png')}/>*/}
                            {/*<Text style={{backgroundColor:'transparent',marginLeft:Pixel.getPixel(8), fontSize:fontAndColor.FONTSIZE13,color:fontAndColor.COLORC3}}>登录认证后即可将免息券存入口袋</Text>*/}
                        {/*</View>*/}
                    </View>
                    <TouchableOpacity style={{width:Pixel.getPixel(19),height:Pixel.getPixel(19),right:Pixel.getPixel(23),top:Pixel.getTitlePixel(38),position:'absolute'}}
                                      onPress={()=>{
                                          this.toNextPage({
                                              name: 'MainPage',
                                              component: MainPage,
                                              params: {},
                                          })
                                      }}>
                        <Image style={{width:Pixel.getPixel(19),height:Pixel.getPixel(19)}} source={require('../../images/login/guanbi.png')}/>
                    </TouchableOpacity>
                    {
                        this.isShowLogin && (
                            <View style={{top:0,left:0,right:0,bottom:0,position:'absolute',backgroundColor:'rgba(0,0,0,0.6)'}}/>
                        )
                    }
                    <Animated.View style={[styles.headImage,{top:this.state.pointValue}]}>
                        <Image style={{
                            top:0,left:0,right:0,bottom:0,position:'absolute',
                        }} source={require('../../images/login/xiaoren.png')}/>
                        {
                            this.isShowLogin && (
                                <Animated.Image style={{
                                    top:5,left:0,right:5,bottom:4.5,position:'absolute',
                                    transform:[
                                        {scale:this.state.bounceValue},
                                        {rotateZ:this.state.rotateValue.interpolate({inputRange:[0,1],outputRange:['360deg','0deg']})}]}}
                                                source={ require('../../images/login/guangquan-xx.png')}/>
                            )
                        }
                        <Image style={{
                            top:0,left:0,right:0,bottom:0,position:'absolute',
                        }} source={require('../../images/login/xiaorentfa.png')}/>
                    </Animated.View>
                </TouchableOpacity>
            </Image>
        )
    }

    startAnimation(){

        if(this.isStart) return;
        this.isStart = true;
        this.isShowLogin = true;
        this.animation = Animated.spring(                            // 随时间变化而执行的动画类型
            this.state.pointValue,                      // 动画中的变量值
            {
                toValue:  Pixel.getTitlePixel(200),
                friction: 1,
                tension: 5,
            }
        ).start(()=>{this.startLogin()});
        this.rotateAnimation();

    }
    stopAnimation(errorAction){

        this.isStart = false;
        this.isShowLogin = false;
        this.state.bounceValue.setValue(1);
        this.state.rotateValue.setValue(0);
        Animated.parallel([
            Animated.spring(
                this.state.pointValue,
                {
                    toValue: Pixel.getTitlePixel(40),
                    friction: 20
                }
            ),
        ]).start(()=>{
            errorAction && errorAction();
        });
    }
    rotateAnimation(){
        this.state.bounceValue.setValue(1);
        this.state.rotateValue.setValue(0);
        Animated.parallel(
            [
                Animated.spring(this.state.bounceValue,{
                    toValue:1,
                    friction:30,
                }),
                Animated.timing(this.state.rotateValue, {
                    toValue: 1,  //角度从0变1
                    duration: 1000,  //从0到1的时间
                    easing: Easing.out(Easing.linear),//线性变化，匀速旋转
                }),
            ]
        ).start(()=>{this.isStart && this.rotateAnimation()});
    }

    getAuthCode=(setTime)=>{

        Keyboard.dismiss();
        if(this.phoneOneNumber.length<11) {
            this.props.showToast('请输入正确的手机号');
            return;
        }

        this.props.showModal(true);
        request(AppUrls.GET_AUTH_CODE,'POST',{
            phone:this.phoneOneNumber
        }).then((response)=>{
            this.props.showModal(false);
            setTime();

        },(error)=>{
            this.props.showModal(false);
            this.props.showToast(error.mjson.msg);
        });


    }


    loginAction=()=>{

        Keyboard.dismiss();
        if(this.loginType==0){

            if(this.phoneOneNumber.length<11){
                this.props.showToast('请输入正确的手机号');
                return;
            }
            if(this.noteCodeNumber.length<=0){
                this.props.showToast('请输入短信验证码');
                return;
            }

        }else {

            if(this.phoneTwoNumber.length<11){
                this.props.showToast('请输入正确的手机号');
                return;
            }

            if(this.passwordNumber.length<6){
                this.props.showToast('请输入正确的密码');
                return;
            }
        }

        this.startAnimation();
    }

    startLogin=()=>{
        let params = {};

        if(this.loginType==0){
            params = {
                code:this.noteCodeNumber,
                phone:this.phoneOneNumber
            }
        }else {

            params = {
                pwd:md5.hex_md5(this.passwordNumber),
                phone:this.phoneTwoNumber
            }
        }

        request(AppUrls.SIGN_AND_SIGNUP,'POST',params).then((response)=>{
            this.stopAnimation();

            if (Platform.OS === 'android') {
                NativeModules.GrowingIOModule.setCS1("user_id", response.mjson.data.phone);
            } else {
                // NativeModules.growingSetCS1("user_id", userName);
            }

            if(response.mjson.data.type==1){

                this.loginSucceed(response.mjson.data);

                this.loginPage({
                    name: 'NewSetPasswordScreen',
                    component: NewSetPasswordScreen,
                    params: {}
                })
                return;
            }

            if (response.mjson.data.user_level == 2 || response.mjson.data.user_level == 1) {
                if (response.mjson.data.enterprise_list == [] || response.mjson.data.enterprise_list == "") {
                    this.props.showToast("您的账号未绑定企业");
                    return;
                }
            }

            this.loginSucceed(response.mjson.data);
            StorageUtil.mGetItem(response.mjson.data.phone + "", (data) => {
                if (data.code == 1) {
                    if (data.result != null) {
                        this.loginPage({
                            name: 'LoginGesture',
                            component: LoginGesture,
                            params: {from:'RootScene'}
                        })
                    } else {
                        this.loginPage({
                            name: 'SetLoginPwdGesture',
                            component: SetLoginPwdGesture,
                            params: {
                                from: 'login'
                            }
                        })
                    }
                }
            })

        },(error)=>{
            this.stopAnimation(this.props.showToast(error.mjson.msg));
            StorageUtil.mSetItem(StorageKeyNames.ISLOGIN, 'false');
        });

    }

    loginSucceed=(loginData)=>{

        let userName = loginData.phone;

        StorageUtil.mSetItem(StorageKeyNames.LOGIN_TYPE, '2');
        StorageUtil.mSetItem(StorageKeyNames.ISLOGIN, 'true');

        // 保存登录成功后的用户信息
        StorageUtil.mGetItem(StorageKeyNames.USERNAME, (data) => {
            if (data.code == 1) {
                if (data.result == null || data.result == "") {
                    StorageUtil.mSetItem(StorageKeyNames.USERNAME, userName);
                } else if (data.result.indexOf(userName) == -1) {
                    StorageUtil.mSetItem(StorageKeyNames.USERNAME, userName + "," + data.result);
                } else if (data.result == userName) {
                } else {
                    let names;
                    if (data.result.indexOf(userName + ",") == -1) {
                        if (data.result.indexOf("," + userName) == -1) {
                            names = data.result.replace(userName, "")
                        } else {
                            names = data.result.replace("," + userName, "")
                        }
                    } else {
                        names = data.result.replace(userName + ",", "")
                    }
                    StorageUtil.mSetItem(StorageKeyNames.USERNAME, userName + "," + names);
                }
            }
        })

        StorageUtil.mSetItem(StorageKeyNames.USER_INFO, JSON.stringify(loginData));
        // 保存用户信息
        StorageUtil.mSetItem(StorageKeyNames.BASE_USER_ID, loginData.base_user_id + "");
        StorageUtil.mSetItem(StorageKeyNames.ENTERPRISE_LIST, JSON.stringify(loginData.enterprise_list));
        StorageUtil.mSetItem(StorageKeyNames.HEAD_PORTRAIT_URL, loginData.head_portrait_url + "");
        StorageUtil.mSetItem(StorageKeyNames.IDCARD_NUMBER, loginData.idcard_number + "");
        StorageUtil.mSetItem(StorageKeyNames.PHONE, loginData.phone + "");
        StorageUtil.mSetItem(StorageKeyNames.REAL_NAME, loginData.real_name + "");
        StorageUtil.mSetItem(StorageKeyNames.TOKEN, loginData.token + "");
        StorageUtil.mSetItem(StorageKeyNames.USER_LEVEL, loginData.user_level + "");

    }

    loginPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.immediatelyResetRouteStack([{
                ...mProps
            }])
        }
    }

}

@observer
class  ZNSelectButton extends Component{

    @observable selectType;
    constructor(props) {
        super(props);
        this.selectType = 0;
        this.state = {};
    }
    render(){
        return(
            <View style={{flexDirection:'row'}}>
                <View style={{paddingVertical:Pixel.getPixel(12),marginRight:Pixel.getPixel(73),borderBottomWidth: this.selectType==0?Pixel.getPixel(2):0,borderBottomColor:fontAndColor.COLORB0}}>
                    <Text style={{fontSize:fontAndColor.FONTSIZE18,
                        color:this.selectType==0?fontAndColor.COLORA0:fontAndColor.COLORA1,
                        backgroundColor:'transparent'}} onPress={()=>{
                        this.click(0);
                    }}>短信登录</Text>
                </View>
                <View style={{paddingVertical:Pixel.getPixel(12),borderBottomWidth: this.selectType==1?Pixel.getPixel(2):0,borderBottomColor:fontAndColor.COLORB0}}>
                    <Text style={{fontSize:fontAndColor.FONTSIZE18,
                        color:this.selectType==1?fontAndColor.COLORA0:fontAndColor.COLORA1,
                        backgroundColor:'transparent'}} onPress={()=>{
                        this.click(1);
                    }}>密码登录</Text>
                </View>
            </View>
        )
    }
    click=(type)=>{
        this.selectType = type;
        this.props.click && this.props.click(type)
    }
}





const styles = StyleSheet.create({

    root:{
        backgroundColor:fontAndColor.COLORA3,
        alignItems:'center',
        width:width,
        height:height,
    },
    headImage:{
        position:'absolute',
        width:Pixel.getPixel(100),
        height:Pixel.getPixel(100),
        left:(width - Pixel.getPixel(100))/2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'transparent',
        // backgroundColor:fontAndColor.COLORA3

    }

})