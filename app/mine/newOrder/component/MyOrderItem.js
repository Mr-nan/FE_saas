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
export  default class MyOrderItem extends PureComponent {

    constructor(props) {
        super(props);
        this.titles=["交易中","已完成","已关闭","退款"];
    }

    render() {
        let imageW = 20;
        let imageY = 20;
        if(this.props.data.name=="销售订单"){
            imageW = 18;
            imageY = 21;
        }
        let itemList = [];
        for (let i = 0;i<4;i++){
            itemList.push(<TouchableOpacity activeOpacity={0.9} onPress={()=>{
                this.props.callBack(this.props.data.images[i]);
            }} style={{flex:1,height:Pixel.getPixel(50),justifyContent:'center',alignItems:'center'}}>
                <Image style={{width:Pixel.getPixel(imageW),height:Pixel.getPixel(imageY)}} source={this.props.data.images[i]}/>
                <Text style={{color:'#91A2B6',fontSize:Pixel.getPixel(14),marginTop:Pixel.getPixel(10)}}>{this.titles[i]}</Text>
            </TouchableOpacity>);
        }
        return (
            <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(129),backgroundColor:'#fff',marginLeft:Pixel.getPixel(10)}}>
                <View style={{marginTop:Pixel.getPixel(16),marginLeft:Pixel.getPixel(11),flexDirection:'row',alignItems:'center'}}>
                    <Image style={{width:Pixel.getPixel(16),height:Pixel.getPixel(16)}} source={this.props.data.icon}/>
                    <Text style={{fontSize:Pixel.getPixel(14), color:'#333333',
                    marginLeft:Pixel.getPixel(9)}}>{this.props.data.name}</Text>
                </View>
                <View style={{marginTop:Pixel.getPixel(30),width:width-Pixel.getPixel(20),flexDirection:'row'}}>
                    {itemList}
                </View>
            </View>
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