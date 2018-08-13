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

} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  {observable} from 'mobx';
import  {observer} from 'mobx-react'
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

export default class  NewLoginScreen extends BaseComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            pointValue:new Animated.Value(Pixel.getTitlePixel(40)),
            widthValue:new Animated.Value(Pixel.getPixel(89)),
            heightValue:new Animated.Value(Pixel.getPixel(89)),
            pointX:new Animated.Value((width - Pixel.getPixel(89))/2),
            radius:new  Animated.Value(Pixel.getPixel(89)/2)
        };
    }

    render(){
        return(
            <Image style={styles.root} source={require('../../images/login/bg.png')}>
                <Animated.View style={[styles.headImage,{top:this.state.pointValue,width:this.state.widthValue,height:this.state.heightValue,left:this.state.pointX,borderRadius:this.state.radius}]}>
                    <Image style={{ width:Pixel.getPixel(89),height:Pixel.getPixel(89),
                    }} source={require('../../images/login/xiaoren.png')}/>
                </Animated.View>
                <View style={{marginTop:Pixel.getPixel(150), alignItems:'center'}}>
                    <ZNSelectButton/>
                    <ScrollView style={{marginTop:Pixel.getPixel(30)}}>
                      <View style={{width:width,alignItems:'center'}}>
                          <ZNTextInputView placeholder={'请输入手机号'}/>
                          <View style={{marginTop:Pixel.getPixel(30)}}/>
                          <ZNTextInputView placeholder={'请输入验证码'} rightView={()=>{
                              return(
                                  <View>

                                  </View>
                              )
                          }}/>
                      </View>
                    </ScrollView>
                    <Text style={{backgroundColor: fontAndColor.COLORB0,width:Pixel.getPixel(150),textAlign:'center',paddingVertical:10}} onPress={()=>{
                        this.startAnimation()
                    }}>点击开始</Text>
                    <Text style={{backgroundColor: fontAndColor.COLORB0,width:Pixel.getPixel(150),textAlign:'center',paddingVertical:10,marginTop:Pixel.getPixel(20)}} onPress={()=>{
                        this.stopAnimation()
                    }}>点击停止</Text>
                </View>
            </Image>
        )
    }

    startAnimation(){
        console.log('开始');
        if(this.isStart) return;

        this.isStart = true;
        this.animation = Animated.spring(                            // 随时间变化而执行的动画类型
            this.state.pointValue,                      // 动画中的变量值
            {
                toValue: Pixel.getTitlePixel(150),
                friction: 20

            }
        ).start(()=>{this.sizeAnimation()});
    }
    stopAnimation(){

        console.log('结束动画');
        this.isStart = false;

        Animated.parallel([
            Animated.spring(                            // 随时间变化而执行的动画类型
                this.state.pointValue,                      // 动画中的变量值
                {
                    toValue: Pixel.getTitlePixel(40),
                    friction: 20

                }
            ),
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
        ]).start();
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
    }
}

class ZNTextInputView extends Component{


    static propTypes={
        placeholder:PropTypes.string,
        rightView:PropTypes.func,
    }

    static defaultProps={
        placeholder:'请输入'
    }

    render(){
        return(
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                height:Pixel.getPixel(35),width:width-Pixel.getPixel(80),
                borderBottomColor:fontAndColor.COLORA3,
                borderBottomWidth:1,
                justifyContent:'space-between'
                }}>
                <TextInput style={{
                    fontSize:fontAndColor.BUTTONFONT30,
                    color:fontAndColor.COLORA0,
                    height: Pixel.getPixel(30),
                    borderColor: fontAndColor.COLORA0,
                    width: Pixel.getPixel(180),
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: 'white',}} placeholder={this.props.placeholder}/>
                {
                    this.props.rightView? this.props.rightView():(<View/>)
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({

    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        alignItems:'center',
    },
    headImage:{
        position:'absolute',
        // width:Pixel.getPixel(89),
        // height:Pixel.getPixel(89),
        // top:Pixel.getTitlePixel(40),
        // left:(width - Pixel.getPixel(89))/2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.3)'

    }

})