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

} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  {observable} from 'mobx';
import  {observer} from 'mobx-react'
import  ZNTextInputView from './component/ZNTextInputView';
import  ZNGetNoteButton from './component/ZNGetNoteButton';
import MainPage from "../main/MainPage";

var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();


@observer
export default class  NewLoginScreen extends BaseComponent{


    @observable isShowLogin;
    constructor(props) {
        super(props);

        this.isShowLogin = false;
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
                        this.scrollView.scrollTo({x:type *width, y:0, animated: true});
                    }}/>
                    <View style={{height:Pixel.getPixel(100),marginTop:Pixel.getPixel(30)}}>
                    <ScrollView ref={(ref)=>{this.scrollView = ref}}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                horizontal={true}
                                overScrollMode="never"
                                scrollEnabled={false}>
                      <View style={{width:width,alignItems:'center'}}>
                          <ZNTextInputView placeholder={'请输入手机号'}
                                           onChangeText={(text)=>{console.log(text)}}
                                           keyboardType={'phone-pad'}/>
                          <View style={{marginTop:Pixel.getPixel(30)}}/>
                          <ZNTextInputView placeholder={'请输入验证码'} rightView={()=>{
                              return(<ZNGetNoteButton/>)
                          }}/>
                      </View>
                        <View style={{width:width,alignItems:'center'}}>
                            <ZNTextInputView placeholder={'请输入手机号'}/>
                             <View style={{marginTop:Pixel.getPixel(30)}}/>
                            <ZNTextInputView placeholder={'请输入登录密码'}  secureTextEntry={!this.state.isShowPassword} rightView={()=>{
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
                    <TouchableOpacity activeOpacity={1} onPress={()=>{this.startAnimation()}} style={{marginTop:Pixel.getPixel(34)}}>
                    <Image source={require('../../images/login/anniu-no.png')} style={{height:Pixel.getPixel(61),width:width-Pixel.getPixel(80),
                        alignItems:'center',justifyContent:'center',
                    }}>
                        <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30, backgroundColor:'transparent',marginBottom:Pixel.getPixel(15)}}>登录</Text>
                    </Image>
                    </TouchableOpacity>
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
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:Pixel.getPixel(34)}}>
                    <Image source={require('../../images/login/dengpaotishi.png')}/>
                    <Text style={{backgroundColor:'transparent',marginLeft:Pixel.getPixel(8), fontSize:fontAndColor.FONTSIZE13,color:fontAndColor.COLORC3}} onPress={()=>{
                        this.stopAnimation()
                    }}>登录认证后即可将免息券存入口袋</Text>
                </View>
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
        ).start();
        this.rotateAnimation();

    }
    stopAnimation(){

        console.log('结束动画');
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
        ]).start();
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
    sizeAnimation(){
        this.sizeAnimationAction = Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.widthValue, {
                    toValue: Pixel.getPixel(89),
                }),
                Animated.timing(this.state.heightValue, {
                    toValue:Pixel.getPixel(89),
                }),
                Animated.timing(this.state.pointX, {
                    toValue: (width - Pixel.getPixel(89))/2,
                }),  Animated.timing(this.state.radius, {
                    toValue: (Pixel.getPixel(89))/2,
                }),
            ]),
            Animated.parallel([
                Animated.timing(this.state.widthValue, {
                    toValue: Pixel.getPixel(89) * 1.5,
                }),
                Animated.timing(this.state.heightValue, {
                    toValue: Pixel.getPixel(89) *1.5,
                }),
                Animated.timing(this.state.pointX, {
                    toValue: (width - Pixel.getPixel(89) *1.5)/2,
                }),
                Animated.timing(this.state.radius, {
                    toValue: (Pixel.getPixel(89) *1.5)/2,
                }),
            ]),

            Animated.parallel([
                Animated.timing(this.state.widthValue, {
                    toValue: Pixel.getPixel(89) *0.8,
                }),
                Animated.timing(this.state.heightValue, {
                    toValue:Pixel.getPixel(89)* 0.8,
                }),
                Animated.timing(this.state.pointX, {
                    toValue: (width- Pixel.getPixel(89) *0.8)/2,
                }),
                Animated.timing(this.state.radius, {
                    toValue: (Pixel.getPixel(89)*0.8)/2,
                }),
            ]),


        ]).start(()=>{ this.isStart && this.sizeAnimation()});
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
                <View style={{paddingVertical:Pixel.getPixel(12),marginRight:Pixel.getPixel(73),borderBottomWidth: this.selectType==0?Pixel.getPixel(2):0,borderBottomColor:fontAndColor.COLORC0}}>
                    <Text style={{fontSize:fontAndColor.FONTSIZE18,
                        color:this.selectType==0?fontAndColor.COLORA0:fontAndColor.COLORA1,
                        backgroundColor:'transparent'}} onPress={()=>{
                            this.click(0);
                    }}>短信登录</Text>
                </View>
                <View style={{paddingVertical:Pixel.getPixel(12),borderBottomWidth: this.selectType==1?Pixel.getPixel(2):0,borderBottomColor:fontAndColor.COLORC0}}>
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
        width:Pixel.getPixel(95),
        height:Pixel.getPixel(95),
        left:(width - Pixel.getPixel(95))/2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'transparent',
        // backgroundColor:fontAndColor.COLORA3

    }

})