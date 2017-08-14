/**
 * Created by zhengnan on 2017/8/14.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    TouchableOpacity,
    Dimensions,

} from 'react-native';

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';

export default class AccountDeductProtocolScene extends BaseComponent {
    render(){
        return(
            <View style={styles.rootView}>
                <WebView style={this.props.protocolType !=1 && {marginBottom:Pixel.getPixel(44)}} source={{uri:'https:www.hao123.com'}}/>
                {
                    this.props.protocolType !=1 && (
                    <TouchableOpacity style={styles.footBtn} activeOpacity={1}>
                        <Text style={{color:'white',fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),textAlign:'center'}}>签署合同并开通电子账户还款</Text>
                    </TouchableOpacity>
                    )
                }
                <NavigationView title="账户划扣授权委托书" backIconClick={this.backPage}/>
            </View>
        )
    }

    openProtocol=()=>{

    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footBtn:{
        backgroundColor:fontAndColor.COLORB0,
        left:0,
        right:0,
        bottom:0,
        height:Pixel.getPixel(44),
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
    }
})