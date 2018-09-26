/**
 * Created by zhengnan on 2018/9/26.
 */

import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';


const Pixel = new PixelUtil();


 export default class CertificateManageScene extends BaseComponent{

    render(){
        return(
            <View style={styles.root}>
                <ScrollView>
                    <CertificateNullItem image ={require('../../../images/mine/geren-da.png')} title="申请个人认证"/>
                    <CertificateNullItem image ={require('../../../images/mine/qiye-da.png')} title="申请企业认证"/>
                    <CertificateItem image ={require('../../../images/mine/geren-da.png')} title="雪大胆" content="210404*********2430"/>
                    <CertificateItem image ={require('../../../images/mine/qiye-da.png')} title="申请企业认证"  content="实际控制人: 名称最多可以十六个字"/>
                </ScrollView>
                <AllNavigationView title="用户认证" backIconClick={this.backPage} wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
            </View>
        )
    }
}

class CertificateNullItem extends Component{
     render(){
         return(
             <View style={styles.nullItem}>
                <Image style={{width:Pixel.getPixel(26),height:Pixel.getPixel(26),marginRight:Pixel.getPixel(16)}} source={this.props.image}/>
                 <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>{this.props.title}</Text>
             </View>
         )
     }
}

class CertificateItem extends Component{
     render(){
         return(
             <View style={[styles.nullItem,{alignItems:'flex-start',flexDirection:'column'}]}>
                 <View style={{marginLeft:Pixel.getPixel(28), flexDirection:'row',alignItems:'center'}}>
                     <Image style={{width:Pixel.getPixel(17),height:Pixel.getPixel(17),marginRight:Pixel.getPixel(6)}} source={this.props.image}/>
                     <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>{this.props.title}</Text>
                 </View>
                 <Text style={{color:'#999999', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(15),marginLeft:Pixel.getPixel(28)}}>{this.props.content}</Text>
             </View>
         )
     }
}



const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
        alignItems:'center',
    },
    nullItem:{
        height:Pixel.getPixel(78),
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        width:width-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(5),
        marginTop:Pixel.getPixel(16),
        flexDirection:'row'
    }
})