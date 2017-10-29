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

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var Platform = require('Platform');


var type;
//   type
//    0：个人开户
//    1：企业开户
//    2：充值
//    3：提现





export default class ResultIndicativeScene extends BaseComponent{
    constructor(){
        super()
        this.state = {
            renderPlaceholderOnly: true,
        }
        this.props ={
            type:1,
        }


        type = this.props.type;
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly: false,
        })
    }

    render(){

        let navi_title = ''
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
            <View>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={true}
                        leftTextShow={false}
                        centerText={navi_title}
                        rightText={""}
                        leftImageCallBack={()=>{
                            this.backPage();
                        }}
                    />


                </View>

            </View>

        )
    }


}

const styles = StyleSheet.create({






})