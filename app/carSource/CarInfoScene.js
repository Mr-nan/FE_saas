import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil';
var Pixel = new PixelUtil();

const carParameterData=[
    '迎宾灯',
    '全时四驱',
    '定速巡航',
    '自动驾驶',
    '全景天窗',
    '车道保持',

];

const  carParameterViewColor=[

    'rgba(5, 197, 194,0.15)',
    'rgba(58, 200, 126,0.15)',
    'rgba(47, 155, 250,0.15)',

];

const carParameterTextColor = [

    fontAndColor.COLORB0,
    fontAndColor.COLORB1,
    fontAndColor.COLORB4,

];

const carIconsData=[
    {
        title:'出厂日期',
        image:require('../../images/carSourceImages/factory.png'),
        imageHigh:require('../../images/carSourceImages/factory_h.png'),
    },
    {
        title:'初登日期',
        image:require('../../images/carSourceImages/rollout.png'),
        imageHigh:require('../../images/carSourceImages/rollout_h.png'),
    },
    {
        title:'表显里程',
        image:require('../../images/carSourceImages/mileage.png'),
        imageHigh:require('../../images/carSourceImages/mileage_h.png'),
    },
    {
        title:'过户次数',
        image:require('../../images/carSourceImages/transfer.png'),
        imageHigh:require('../../images/carSourceImages/transfer_h.png'),
    },
    {
        title:'运营性质',
        image:require('../../images/carSourceImages/operation.png'),
        imageHigh:require('../../images/carSourceImages/operation_h.png'),
    },
    {
        title:'车身/内饰颜色',
        image:require('../../images/carSourceImages/carColor.png'),
        imageHigh:require('../../images/carSourceImages/carColor_h.png'),
    },

];


const carIconsContentData=[
    {
        title:'2013-05-10',
    },
    {
        title:'2013-11-10',
    },
    {
        title:'10.8万公里',
    },
    {
        title:'2次',
    },
    {
        title:'',
    },
    {
        title:'',
    },

];

export default class CarInfoScene extends  BaseComponent {

    initFinish=()=>{

    }

    _backIconClick =()=>{

        this.backPage();
    };

    _callClick=()=>{

        Linking.openURL('tel:4006561290,100001#');
    };

    _navigatorRightView=()=>{
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity>
                    <Image source={require('../../images/carSourceImages/store.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:10}}>
                    <Image  source={require('../../images/carSourceImages/share_nil.png')}></Image>
                </TouchableOpacity>
            </View>
        );
    };

    render(){

        return(
            <View style={{flex:1,backgroundColor:'white'}}>

                <ScrollView style={{marginBottom:44}} onMomentumScrollEnd = {(e)=>{console.log(e.nativeEvent.contentOffset.y)}}>
                    <Image style={styles.carImage}/>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentView}>

                                <Text style={styles.titleText}>凯迪拉克SRX(进口)12款3.0L手自一体 豪华版
                                </Text>
                        <View style={styles.titleFootView}>
                            <View style={styles.browseView}>
                                <Image style={{marginRight:5}} source={require('../../images/carSourceImages/browse.png')}/>
                                <Text style={styles.browseText}>1024次浏览</Text>
                            </View>
                            <Text style={styles.priceText}>24.8万</Text>
                        </View>
                            </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentView}>
                            <View style={styles.carParameterView}>
                                {
                                    carParameterData.map((data,index)=>{
                                        return(<View style={[styles.carParameterItem,{backgroundColor:carParameterViewColor[index%3]}]} key={index}>
                                                <Text style={[styles.carParameterText,{color:carParameterTextColor[index%3]}]}>{data}</Text>
                                            </View>)

                                    })
                                }
                            </View>
                            <View style={styles.carDepictView}>
                                <Text style={styles.carDepictText}>综合车况较好,全车结构件无损伤,加强件无严重损伤,也许覆盖件有修复</Text>
                            </View>
                            <View style={styles.carAddressView}>
                                <View style={styles.carAddressSubView}>
                                    <Text style={styles.carAddressTitleText}>商户所在地:  </Text>
                                    <Text style={styles.carAddressSubTitleText}>广西 南宁</Text>
                                </View>
                                <View style={styles.carAddressSubView}>
                                    <Text style={styles.carAddressTitleText}>挂牌地:  </Text>
                                    <Text style={styles.carAddressSubTitleText}>京B</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.carIconsContainer}>
                       <View style={styles.carIconsView}>
                           {
                               carIconsData.map((data,index)=>{

                                   return(
                                      <CarIconView imageData = {data.image} imageHighData={data.imageHigh} content={carIconsContentData[index].title} title={data.title} key={index}/>
                                   )

                               })
                           }
                       </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.callView} onPress={this._callClick}>
                        <Image source={require('../../images/carSourceImages/phone.png')}/>
                        <Text style={styles.callText}>电话咨询</Text>
                </TouchableOpacity>
                <View style={styles.navigation}>
                    <NavigationView
                                    title="车源详情"
                                    backIconClick={this._backIconClick}
                                    renderRihtFootView={this._navigatorRightView}
                    />
                </View>
            </View>
        )
    }

}

class CarIconView extends Component{

    render(){

       const {imageData,imageHighData,title,content} = this.props;

        return(
            <View style={styles.carIconItem}>
                <Image source={content? imageHighData:imageData}/>
                <Text style={[styles.carIconItemContentText,content && {color:fontAndColor.COLORA0}]}>{content?content:'暂无'}</Text>
                <Text style={styles.carIconItemTitleText}>{title}</Text>
            </View>
        )
    }


}


const styles = StyleSheet.create({

    navigation:{

        height:Pixel.getPixel(64),
        // height:64,
        backgroundColor:fontAndColor.COLORB0,
        left:0,
        right:0,
        position:'absolute',

    },

    carImage:{

        backgroundColor:'yellow',
        height:250,

    },
    contentContainer:{

        backgroundColor:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,

    },
    contentView:{

        marginLeft:15,
        marginTop:10,
        marginRight:15,
        marginBottom:15,
        backgroundColor:'white'

    },
    titleText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.TITLEFONT,
        backgroundColor:'transparent',

    },
    subTitleView:{

        borderWidth:StyleSheet.hairlineWidth,
        borderRadius:3,
        borderColor:fontAndColor.COLORB0,
        justifyContent:'center',
        alignItems:'center',
        width:52,
        marginLeft:5,

        marginTop:15,
        height:30,


    },
    subText:{

        color:fontAndColor.COLORB0,
        fontSize:fontAndColor.CONTENTFONT,
        textAlign:'center',

    },
    titleFootView:{

        flexDirection:'row',
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:10,


    },
    browseView:{

        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'yellow',

    },
    browseText:{
        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.CONTENTFONT,
    },
    priceText:{
        color:fontAndColor.COLORB2,
        fontSize:fontAndColor.TITLEFONT,
        fontWeight:'bold',

    },
    carParameterView:{

        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        flexWrap: 'wrap',

    },
    carParameterItem:{

        marginTop:5,
        marginBottom:5,
        marginRight:5,
        paddingHorizontal:5,
        height:18,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    carParameterText:{
        fontSize:fontAndColor.MARKFONT,
    },
    carDepictView:{

        marginTop:10,
        paddingHorizontal:5,
        paddingVertical:5,
        backgroundColor:'rgba(158,158,158,0.15)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3,
    },
    carDepictText:{

        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.MARKFONT,
    },
    carAddressView:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:15,

    },
    carAddressSubView:{

        flexDirection:'row',
    },
    carAddressTitleText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.LITTLEFONT,

    },
    carAddressSubTitleText:{

        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT,
    },
    carIconsContainer:{

        marginBottom:15,
        marginHorizontal:15,
        backgroundColor:'white',


    },
    carIconsView:{

        backgroundColor:'white',
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignItems:'center',

    },
    carIconItem:{

        alignItems:'center',
        marginTop:25,
        backgroundColor:'white',
        width:90,
        height:90,
        marginRight:10,
        marginLeft:10,
    },
    carIconItemTitleText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.CONTENTFONT,

    },
    carIconItemContentText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.LITTLEFONT,
        marginTop:5,
        marginBottom:5,

    },
    callView:{

        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:fontAndColor.COLORB0,
        height:44,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
    },
    callText:{
        color:'white',
        fontSize:fontAndColor.CONTENTFONT,
    },

})