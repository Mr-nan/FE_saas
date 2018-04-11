/**
 * Created by zhengnan on 2018/4/2.
 */

import React, {Component, PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    ActivityIndicator,
    PixelRatio,
    TouchableOpacity
} from "react-native";
import * as FontAndColor from "../../constant/fontAndColor";
import PixelUtil from "../../utils/PixelUtil";
import {all} from '../../constant/AllBackLogin';
import LoginScene from "../../login/LoginScene";

var Pixel = new PixelUtil();
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class ShowLoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    showAction = () => {
        this.setState({show:true});
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{width:this.state.show?width:0,height:height,
                position: 'absolute',
                justifyContent:'center',alignItems:'center',overflow:'hidden',backgroundColor:'rgba(0,0,0,0.3)'}}>
                <View style={{
                    backgroundColor:'#fff',
                    borderRadius:Pixel.getPixel(5),
                    justifyContent:'center',
                    alignItems:'center',
                    paddingHorizontal:Pixel.getPixel(20)
                }}>
                    <Text style={{marginTop:Pixel.getPixel(20),color: FontAndColor.COLORA0,
                        fontSize: Pixel.getFontPixel(18)}}>提示</Text>
                    <Text style={{marginTop:Pixel.getPixel(20),color: '#000',
                        fontSize: Pixel.getFontPixel(14),
                       textAlign:'center'}}>{'为了能给您提供更多的优质服务,\n请先登录!'}</Text>
                    <View style={{
                        marginTop:Pixel.getPixel(25),
                        marginBottom:Pixel.getPixel(20),
                        flexDirection:'row'
                    }}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({show:false},()=>{this.props.cancelClick();});
                        }} activeOpacity={0.8} style={{
                            width:Pixel.getPixel(100),
                            height:Pixel.getPixel(30),
                            backgroundColor:FontAndColor.COLORA2,
                            borderRadius:Pixel.getPixel(4),
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:Pixel.getPixel(10)
                        }}>
                            <Text style={{color: '#fff',
                                fontSize: Pixel.getFontPixel(15)}}>暂不登录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.setState({show:false},()=>{
                                if (all) {
                                all.immediatelyResetRouteStack([{
                                    name: 'LoginScene',
                                    component: LoginScene,
                                    params: {}
                                }])
                            }
                                this.props.confirmClick();});
                        }} activeOpacity={0.8} style={{width:Pixel.getPixel(100),
                            height:Pixel.getPixel(30),
                            backgroundColor:FontAndColor.COLORB0,
                            borderRadius:Pixel.getPixel(4),
                            justifyContent:'center',
                            alignItems:'center'}}>
                            <Text style={{color: '#fff',
                                fontSize: Pixel.getFontPixel(15)}}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
