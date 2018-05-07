/**
 * Created by zhengnan on 2018/5/7.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';


export default class NewCarriagePriceInfoScene extends  BaseComponent{
    render(){
        return(
            <View style={styles.root}>
                <ScrollView>
                    <LocationView title="运单号20171212100" startName="太原市" stopName="保定市" typeName="大拌菜运输" />
                </ScrollView>
                <TouchableOpacity style={styles.footButton} activeOpacity={1}>
                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>查看物流详情</Text>
                </TouchableOpacity>
                <NavigationBar title="运单详情" backIconClick={this.backPage}/>
            </View>
        )
    }
}

class LocationView extends Component{


    render(){

        const {title,startName,stopName,typeName} = this.props;

        return(
            <View style={styles.contentView}>
                <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{title}</Text>
                <View style={{backgroundColor:fontAndColor.COLORB10,paddingVertical:Pixel.getFontPixel(20), alignItems:'center',justifyContent:'center',marginTop:Pixel.getPixel(10),
                    flexDirection:'row'}}>
                    <View style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(100),}}>
                        <Image source={require('../../../images/carriagePriceImage/startLocation.png')}/>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),marginTop:Pixel.getPixel(5)}} numberOfLines={1}>{startName}</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{typeName}</Text>
                        <Image source={require('../../../images/carriagePriceImage/typeName.png')}/>
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(100),}}>
                        <Image source={require('../../../images/carriagePriceImage/stopLocation.png')}/>
                        <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),marginTop:Pixel.getPixel(5)}} numberOfLines={1}>{stopName}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getPixel(44),
        backgroundColor:fontAndColor.COLORA3,
    },
    footButton:{
        left:0,
        right:0,
        bottom:0,
        height:Pixel.getPixel(44),
        backgroundColor:fontAndColor.COLORB0,
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
    },
    contentView:{
        padding:Pixel.getPixel(15),
        backgroundColor:'white',
        marginBottom:Pixel.getPixel(10)
    }
})