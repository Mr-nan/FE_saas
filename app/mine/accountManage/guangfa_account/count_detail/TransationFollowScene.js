/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text, Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ScrollView,
    RefreshControl,
    ListView,
    StatusBar
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import * as fontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import DateTimePicker from 'react-native-modal-datetime-picker';
import NavigationView from "../../../../component/AllNavigationView";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2})

export default class TransationFollowScene extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: 'blank',
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                    <StatusBar barStyle='dark-content'/>
                    <NavigationView backIconClick={this.backPage} title='银行流水'
                                    wrapStyle={{backgroundColor: 'white'}} titleStyle={{color: fontAndColor.COLORA0}}/>
                    {this.loadView()}
                </View>
            )
        }
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title='银行流水'
                                wrapStyle={{backgroundColor: 'white'}} titleStyle={{color: fontAndColor.COLORA0}}/>
                <View style={{width:width,paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(13),flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{backgroundColor:'transparent',fontSize:Pixel.getFontPixel(14),color:fontAndColor.COLORD2,marginTop:Pixel.getPixel(76),}}>2018年9月</Text>
                    <TouchableOpacity>
                        <Image style={{marginTop:Pixel.getPixel(76)}} source={require('../../../../../images/mine/guangfa_account/rili.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width:width,marginTop:Pixel.getPixel(12),backgroundColor:'white'}}>
                    <View style={{width:width,height:Pixel.getPixel(80),paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15),
                        flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                            <View style={{width:Pixel.getPixel(40),height:Pixel.getPixel(40),borderRadius:Pixel.getPixel(20),backgroundColor:'#3AC87E',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:Pixel.getPixel(12),color:'#ffffff'}}>充值</Text>
                            </View>
                            <View style={{marginLeft: Pixel.getPixel(15)}}>
                                <Text style={{fontSize:Pixel.getFontPixel(14),color:fontAndColor.COLORD2}}>向源之宝账户-转出</Text>
                                <Text style={{fontSize:Pixel.getFontPixel(12),color:fontAndColor.COLORA1,marginTop:Pixel.getPixel(4)}}>2018-09-20  13:00</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                            <Text style={{fontSize:Pixel.getFontPixel(17),color:'#3AC87E',fontWeight: 'bold'}}>+</Text>
                            <Text style={{fontSize:Pixel.getFontPixel(25),color:'#3AC87E',fontWeight:'bold'}}>20</Text>
                            <Text style={{fontSize:Pixel.getFontPixel(14),color:'#3AC87E'}}>万元</Text>
                        </View>
                    </View>
                    <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(2),backgroundColor:fontAndColor.COLORA3,marginLeft:Pixel.getPixel(15)}}/>
                </View>
                <View style={{width:width,backgroundColor:'white'}}>
                    <View style={{width:width,height:Pixel.getPixel(80),paddingRight:Pixel.getPixel(15),paddingLeft:Pixel.getPixel(15),flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                            <View style={{width:Pixel.getPixel(40),height:Pixel.getPixel(40),borderRadius:Pixel.getPixel(20),backgroundColor:'#3AC87E',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:Pixel.getPixel(12),color:'#ffffff'}}>充值</Text>
                            </View>
                            <View style={{marginLeft: Pixel.getPixel(15)}}>
                                <Text style={{fontSize:Pixel.getFontPixel(14),color:fontAndColor.COLORD2}}>向源之宝账户-转出</Text>
                                <Text style={{fontSize:Pixel.getFontPixel(12),color:fontAndColor.COLORA1,marginTop:Pixel.getPixel(4)}}>2018-09-20  13:00</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                            <Text style={{fontSize:Pixel.getFontPixel(17),color:'#3AC87E',fontWeight: 'bold'}}>+</Text>
                            <Text style={{fontSize:Pixel.getFontPixel(25),color:'#3AC87E',fontWeight:'bold'}}>20</Text>
                            <Text style={{fontSize:Pixel.getFontPixel(14),color:'#3AC87E'}}>万元</Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }

}
