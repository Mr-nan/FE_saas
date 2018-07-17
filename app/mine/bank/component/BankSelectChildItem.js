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
export  default class BankSelectChildItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                if(this.props.data.describe=='余额不足'){
                    return;
                }
                this.props.callBack();
            }} style={{width:width, backgroundColor:'#fff',height:Pixel.getPixel(70),flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'center',flexDirection:'row'}}>
                    <Image style={{width:Pixel.getPixel(26),height:Pixel.getPixel(26),marginLeft:Pixel.getPixel(17)}} source={this.props.data.image}/>
                    <View style={{marginLeft:Pixel.getPixel(17)}}>
                        <Text style={{fontSize:Pixel.getPixel(15),color:'#333'}}>{this.props.data.name}</Text>
                        {this.isNull(this.props.data.describe)?<View></View>:   <Text style={{fontSize:Pixel.getPixel(11),color:'#9B9B9B',
                            marginTop:Pixel.getPixel(5)}}>{this.props.data.describe}</Text>}

                    </View>
                </View>
                <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                    {this.props.select?
                        <Image style={{width:Pixel.getPixel(22),height:Pixel.getPixel(14),marginRight:Pixel.getPixel(17)}}
                                               source={require('../../../../images/neworder/duigou.png')}/>:
                        <View></View>
                    }
                    {
                        this.props.data.describe=='余额不足'?<TouchableOpacity activeOpacity={0.9} onPress={()=>{
                            this.props.toPay();
                        }} style={{
                            width:Pixel.getPixel(58),height:Pixel.getPixel(24),borderRadius:2,borderWidth:1,
                            borderColor:'#05C3C0',justifyContent:'center',alignItems:'center',marginRight:Pixel.getPixel(17)
                        }}>
                            <Text style={{fontSize:Pixel.getPixel(14),color:'#05C5C2'}}>去充值</Text>
                        </TouchableOpacity>:<View></View>
                    }
                </View>
            </TouchableOpacity>
        );
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