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
    Dimensions
} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  ZNTextInputView from './component/ZNTextInputView';
import  AllNavigationView from '../component/AllNavigationView';

var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

export default class NewSetPasswordScreen extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShowPassword:false,

        };
      }
    render(){
        return(
            <View style={styles.root}>
                <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.TITLEFONT40, width:width - Pixel.getPixel(80),marginTop:Pixel.getPixel(20),marginBottom:Pixel.getPixel(40)}}>密码设置</Text>
                <ZNTextInputView placeholder={'请输入至少6位密码'} rightView={()=>{
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
                <TouchableOpacity activeOpacity={1} onPress={()=>{}} style={{marginTop:Pixel.getPixel(34)}}>
                    <Image source={require('../../images/login/anniu-no.png')} style={{height:Pixel.getPixel(43),width:width-Pixel.getPixel(80),
                        alignItems:'center',justifyContent:'center',resizeMode:'cover'
                    }}>
                        <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30, backgroundColor:'transparent'}}>提交</Text>
                    </Image>
                </TouchableOpacity>
                <AllNavigationView backIconClick={this.backPage} wrapStyle={{backgroundColor:'white'}}/>
            </View>
        )

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