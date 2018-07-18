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
import MyOrderListCarItem from "./MyOrderListCarItem";
import MyOrderInfoCarChangeItem from "./MyOrderInfoCarChangeItem";
import LineItem from "./LineItem";
import MyOrderDingDanCarItem from "./MyOrderDingDanCarItem";
export  default class MyOrderInfoCarMarginItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            zk:false
        }
    }

    render() {
        let itemList = [];
        for (let i = 0;i<this.props.data.models.length;i++){
            if(i>1&&this.state.zk==false){
                break;
            }
            itemList.push(<MyOrderDingDanCarItem data={this.props.data.models[i]} key={i + '123'} parentWidth={width-Pixel.getPixel(20)}/>);
        }
        let size = 0;
        for (let i = 0; i < this.props.data.models.length; i++) {
            size = size + this.props.data.models[i].car_items.length;
        }
        return (
            <View style={{width:width-Pixel.getPixel(20),backgroundColor:'#fff',marginTop:Pixel.getPixel(10),borderRadius:5,marginLeft:Pixel.getPixel(10)}}>
                <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(40), flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666666',marginLeft:Pixel.getPixel(16)}}>
                            {this.props.data.seller_company_name}
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666666',marginRight:Pixel.getPixel(16)}}>
                            {this.props.data.seller_name}
                        </Text>
                    </View>
                </View>
                <View style={{width:width-Pixel.getPixel(40),height:1,backgroundColor:'#d8d8d8',marginLeft:Pixel.getPixel(10)}}></View>
                {itemList}
                {this.props.data.models.length > 2 ?
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                        this.setState({zk:!this.state.zk});
                    }} style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(42),justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <View style={{width:Pixel.getPixel(11),height:Pixel.getPixel(7)}}>

                        </View>
                        <Text style={{fontSize:Pixel.getPixel(13),color:'#666',marginLeft:Pixel.getPixel(9)}}>
                            {this.state.zk?'收起':'查看全部'}
                        </Text>
                        <Image style={{width:Pixel.getPixel(11),height:Pixel.getPixel(7),marginLeft:Pixel.getPixel(9)}}
                               source={this.state.zk?require('../../../../images/neworder/shang.png'):require('../../../../images/neworder/xia.png')}>

                        </Image>
                    </TouchableOpacity> : <View/>}
                {
                    this.props.data.models.length > 2 ?
                        <LineItem/>:<View/>
                }


                <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(52),justifyContent:'center',alignItems:'flex-end'}}>
                    <Text style={{fontSize: Pixel.getPixel(12), color: '#666', marginRight: Pixel.getPixel(16)}}>
                        共{size}台车辆     {this.props.name}：
                        <Text style={{fontSize: Pixel.getPixel(19), color: '#666', fontWeight: 'bold'}}>
                            {this.props.data.amount / 10000}
                            <Text style={{fontSize: Pixel.getPixel(12), color: '#666'}}>
                                万元
                            </Text>
                        </Text>

                    </Text>
                </View>
                <View style={{width:width-Pixel.getPixel(40),height:1,backgroundColor:'#d8d8d8',marginLeft:Pixel.getPixel(10)}}></View>
                <View style={{width:width-Pixel.getPixel(20),height:Pixel.getPixel(88)}}>
                    <View style={{flex:1,flexDirection:'row',paddingTop:Pixel.getPixel(10)}}>
                        <View style={{flex:8,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666'}}>
                                {this.props.topText}
                            </Text>
                        </View>
                        <View style={{flex:3,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                <Text style={{fontSize:Pixel.getPixel(19),color:'#666', fontWeight:'bold'}}>
                                    {this.props.data.deposit_amount / 10000}
                                </Text>万元
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row',paddingBottom:Pixel.getPixel(10)}}>
                        <View style={{flex:8,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666'}}>
                                {this.props.bottomText}
                            </Text>
                        </View>
                        <View style={{flex:3,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#FA5741',marginRight:Pixel.getPixel(16)}}>
                                <Text style={{fontSize:Pixel.getPixel(19),color:'#FA5741', fontWeight:'bold'}}>
                                    {this.props.data.amount / 10000-this.props.data.deposit_amount / 10000}
                                </Text>万元
                            </Text>
                        </View>
                    </View>
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