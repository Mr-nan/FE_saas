/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import ZNCountdownView from "./ZNCountdownView";
export  default class BankTitleItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image style={{width:width,height:Pixel.getPixel(169),resizeMode:'stretch'}} source={require('../../../../images/neworder/sanjiaobg.png')}>
                <Image style={{width:width-Pixel.getPixel(28),marginLeft:Pixel.getPixel(14),marginTop:Pixel.getPixel(5),
                height:Pixel.getPixel(134),alignItems:'center',justifyContent:'center'}} source={require('../../../../images/neworder/qianbg.png')}>
                    <Text style={{fontSize:Pixel.getPixel(14),color:'#fff',backgroundColor:'#00000000',marginTop:Pixel.getPixel(15)}}>
                        应付金额
                    </Text>
                    <Text style={{fontSize:Pixel.getPixel(37),color:'#fff',marginTop:Pixel.getPixel(13), fontWeight:'bold',backgroundColor:'#00000000'}}>
                        {this.props.types=='dingjin'?this.props.data.deposit_amount:this.props.data.amount}<Text style={{fontSize:Pixel.getPixel(24),color:'#fff',backgroundColor:'#00000000'
                        , fontWeight:'normal'}}>元
                    </Text>
                    </Text>
                    <ZNCountdownView callBack={()=>{

                    }}/>
                </Image>
            </Image>
        );
    }

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})