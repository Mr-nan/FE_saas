/**
 * Created by dingyonggang on 2018/04/27/11.
 */

import React, {Component, PureComponent} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";

import * as FontAndColor from "../../../../../constant/fontAndColor";
import PixelUtil from "../../../../../utils/PixelUtil";
import SaasText from "../../../zheshangAccount/component/SaasText";


let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class ProcessIndicator extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(

            <View
                style={{backgroundColor:'white'}}
            >
                <View
                    style={{backgroundColor:'white',
                        flexDirection:'row',
                        paddingHorizontal:Pixel.getPixel(37),
                        alignItems:'center',
                        marginTop:Pixel.getPixel(24),
                        marginBottom:Pixel.getPixel(14)
                    }}
                >
                    <StepNum highlighted={true} value={1}/>
                    <View style={{flex:1, height:Pixel.getPixel(3), backgroundColor:this.props.step >= 2?FontAndColor.COLORB0:FontAndColor.COLORA4}}/>
                    <StepNum highlighted={this.props.step>=2?true:false} value={2}/>
                    <View style={{flex:1, height:Pixel.getPixel(3), backgroundColor:this.props.step == 3?FontAndColor.COLORB0:FontAndColor.COLORA4}}/>
                    <StepNum highlighted={this.props.step==3?true:false} value={3}/>
                </View>
                <View style={{
                    flexDirection:'row',
                    paddingHorizontal:Pixel.getPixel(27),
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginBottom:Pixel.getPixel(17)
                }}>
                    <SaasText style={{fontSize:12, color:FontAndColor.COLORA1}} >基本信息</SaasText>
                    <SaasText style={{fontSize:12, color:this.props.step>=2?FontAndColor.COLORA1:FontAndColor.COLORA4}} >开户行信息</SaasText>
                    <SaasText style={{fontSize:12, color:this.props.step ==3?FontAndColor.COLORA1: FontAndColor.COLORA4}} >证件上传</SaasText>

                </View>

            </View>

        )
    }
}


class StepNum extends PureComponent{

    render(){
        return(
            <View
                style={{
                    width:Pixel.getPixel(30),
                    height:Pixel.getPixel(30),
                    backgroundColor: this.props.highlighted?FontAndColor.COLORB0:'white',
                    borderRadius:Pixel.getPixel(15),
                    borderColor:this.props.highlighted?FontAndColor.COLORB0:FontAndColor.COLORA4,
                    borderWidth:Pixel.getPixel(1),
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <SaasText style={{color:this.props.highlighted?'white':FontAndColor.COLORA4, fontSize:15}}>{this.props.value}</SaasText>
            </View>
        )
    }

}