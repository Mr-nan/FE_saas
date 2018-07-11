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
    ListView, TextInput
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class MyOrderInfoCarChangeItem extends PureComponent {

    constructor(props) {
        super(props);
        this.topMoney='';
        this.bottomMoney='';
        this.state={
            isChange:false
        }
    }

    render() {
        let date = new Date(this.props.data.car_SKU_details.manufacture*1000);
        let time = date.getFullYear()+'年'+date.getMonth()+'月'
        if(this.state.isChange){
            return (
                <View style={{width:width,backgroundColor:'#fff',borderRadius:5}}>
                    <View style={{width:width, flexDirection:'row',height:Pixel.getPixel(112)}}>
                        <Image style={{marginTop:Pixel.getPixel(17),width:Pixel.getPixel(120),height:Pixel.getPixel(84),marginLeft:Pixel.getPixel(15),
                            resizeMode:'stretch'}}
                               source={require('../../../../images/carSourceImages/car_null_img.png')}/>
                        <View style={{marginLeft:Pixel.getPixel(14),width:width-Pixel.getPixel(149),
                            flexDirection:'row',justifyContent:'flex-end'}}>
                            <View style={{height:Pixel.getPixel(112),marginRight:Pixel.getPixel(9)}}>
                                <Text style={{fontSize:Pixel.getPixel(12),color:'#9B9B9B',marginTop:Pixel.getPixel(25)}}>
                                    单车成交价
                                </Text>
                                <Text style={{fontSize:Pixel.getPixel(10),color:'#9B9B9B'}}>
                                    （万元）
                                </Text>
                                <Text style={{fontSize:Pixel.getPixel(12),color:'#9B9B9B',marginTop:Pixel.getPixel(17)}}>
                                    单车订金
                                </Text>
                                <Text style={{fontSize:Pixel.getPixel(10),color:'#9B9B9B'}}>
                                    （元）
                                </Text>
                            </View>
                            <View style={{height:Pixel.getPixel(112),marginRight:Pixel.getPixel(15)}}>
                                <TextInput
                                    onChangeText={(text) => {
                                        this.topMoney = text;
                                    }}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: Pixel.getFontPixel(19),
                                        color: '#FA5741',
                                        padding: 0,
                                        borderWidth: 1, borderRadius: 2,
                                        height: Pixel.getPixel(32),
                                        width: Pixel.getPixel(77),
                                        borderColor: '#d8d8d8',
                                        marginTop: Pixel.getPixel(19),
                                        fontWeight:'bold'
                                    }}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid="transparent"
                                />
                                <TextInput
                                    onChangeText={(text) => {
                                        this.bottomMoney = text;
                                    }}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: Pixel.getFontPixel(19),
                                        color: '#666666',
                                        padding: 0,
                                        borderWidth: 1, borderRadius: 2,
                                        height: Pixel.getPixel(32),
                                        width: Pixel.getPixel(77),
                                        borderColor: '#d8d8d8',
                                        marginTop: Pixel.getPixel(11),
                                        fontWeight:'bold'
                                    }}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                                if(this.isNull(this.topMoney)||this.isNull(this.bottomMoney)){
                                    this.props.showToast('请输入金额');
                                    return;
                                }
                                this.setState({isChange:false},()=>{
                                    this.props.callBack(this.topMoney,this.bottomMoney,this.props.data.model_id);
                                    this.topMoney='';
                                    this.bottomMoney='';
                                });
                            }} style={{width:Pixel.getPixel(67),height:Pixel.getPixel(112),backgroundColor:'#FA5741',alignItems:'center',
                            justifyContent:'center'}}>
                                <Text style={{fontSize:Pixel.getPixel(15),color:'#fff'}}>完成</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                        this.props.changeNumber();
                    }} style={{backgroundColor:'#FAF9FF',height:Pixel.getPixel(37),width:width-Pixel.getPixel(24),marginLeft:Pixel.getPixel(12),
                        flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(12)}}>车架号</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(14),color:'#666'}}>LVSHJCAC9DE166720</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return (
                <View style={{width:width,backgroundColor:'#fff',borderRadius:5}}>
                    <View style={{marginTop:Pixel.getPixel(17),width:width, flexDirection:'row'}}>
                        <Image style={{width:Pixel.getPixel(120),height:Pixel.getPixel(84),marginLeft:Pixel.getPixel(15),
                            resizeMode:'stretch'}}
                               source={{uri:this.props.data.car_SKU_details.imgs[0].icon_url}}/>
                        <View style={{marginLeft:Pixel.getPixel(14),width:width-Pixel.getPixel(162)}}>
                            <Text style={{fontSize:Pixel.getPixel(14),color:'#000'}}  numberOfLines={1}>{this.props.data.car_SKU_details.model_name}</Text>
                            <Text style={{fontSize:Pixel.getPixel(11),color:'#9b9b9b',
                                marginTop:Pixel.getPixel(6)}}  numberOfLines={1}>{time}/{this.props.data.car_SKU_details.mileage/10000}万公里/{this.props.data.car_SKU_details.car_color_name}/{this.props.data.car_SKU_details.provice_name}</Text>

                            <View style={{marginTop:Pixel.getPixel(12), flexDirection:'row',alignItems:'center'}}>
                                <View style={{flex:5}}><Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b'}}
                                                             numberOfLines={1}>单车成交价</Text></View>
                                <View style={{flex:9}}>
                                    <Text style={{fontSize:Pixel.getPixel(12),color:'#FA5741',marginRight:Pixel.getPixel(16)}}>
                                        <Text style={{fontSize:Pixel.getPixel(19),color:'#FA5741', fontWeight:'bold'}}>
                                            {this.props.data.car_items[0].transaction_price/10000}
                                        </Text>万元
                                    </Text>
                                </View>
                            </View>
                            <View style={{marginTop:Pixel.getPixel(4), flexDirection:'row',alignItems:'center'}}>
                                <View style={{flex:5}}><Text style={{fontSize:Pixel.getPixel(12),color:'#9b9b9b'}}
                                                             numberOfLines={1}>单车订金</Text></View>
                                <View style={{flex:9, flexDirection:'row'}}>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize:Pixel.getPixel(9),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                            <Text style={{fontSize:Pixel.getPixel(14),color:'#666', fontWeight:'bold'}}>
                                                {this.props.data.car_items[0].deposit_amount/10000}
                                            </Text>万元
                                        </Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                                        this.setState({
                                            isChange:true
                                        });
                                    }} style={{flex:1,alignItems:'flex-end'}}>
                                        <Image style={{height:Pixel.getPixel(19),width:Pixel.getPixel(19)}}
                                               source={require('../../../../images/neworder/bianji.png')}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={{backgroundColor:'#FFE3DF',height:Pixel.getPixel(15),borderRadius:50,justifyContent:'center',
                                alignItems:'center',marginTop:Pixel.getPixel(10)}}>
                                <Text style={{color:'#FA5741',fontSize:Pixel.getPixel(10)}}>存在质押车，成交价不得低于20.00万元 </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                        this.props.changeNumber();
                    }} style={{backgroundColor:'#FAF9FF',height:Pixel.getPixel(37),width:width-Pixel.getPixel(24),marginLeft:Pixel.getPixel(12),
                        flexDirection:'row',marginTop:Pixel.getPixel(11)}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(12)}}>车架号</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(14),color:'#666'}}>LVSHJCAC9DE166720</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    /**
     * 非空判断
     * @param content  任意类型值
     */
    isNull = (content) => {
        try {
            if (content == undefined) {
                return true;
            }
            if (content == null) {
                return true;
            }
            if (content instanceof Array) {
                if (content.length <= 0) {
                    return true;
                }
            }
            if (content instanceof Object) {
                if (JSON.stringify(content) == '{}') {
                    return true;
                }
            }
            if (content == 'null') {
                return true;
            }
            if ((content+'').trim() == '') {
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }
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