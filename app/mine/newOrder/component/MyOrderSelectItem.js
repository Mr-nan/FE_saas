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
export  default class MyOrderSelectItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#fff'}}>
                <View style={{width:width,height:Pixel.getPixel(44),flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666',marginLeft:Pixel.getPixel(15)}}>
                            {this.props.name}
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                        this.props.callBack();
                    }} style={{flex:2,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                        <Text
                            style={{
                                fontSize: Pixel.getFontPixel(14),
                                color: this.isNull(this.props.values)?'#91A2B6':'#333',
                                padding: 0,
                                marginRight:Pixel.getPixel(22),
                            }}
                        >{this.isNull(this.props.values)?'必选':this.props.values}</Text>
                            <Image style={{width:Pixel.getPixel(9),height:Pixel.getPixel(15),marginRight:Pixel.getPixel(15)}}
                                   source={require('../../../../images/neworder/right.png')}/>

                    </TouchableOpacity>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#D8D8D8'}}></View>
            </View>
        );
    }

    /**
     * 非空判断
     * @param content  任意类型值
     */
    isNull = (content) => {
        console.log(11111111111111111);
        console.log(content);
        console.log(11111111111111111);
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