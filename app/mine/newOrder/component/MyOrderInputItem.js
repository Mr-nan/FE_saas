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
export  default class MyOrderInputItem extends PureComponent {

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
                    <View style={{flex:2,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                        <TextInput
                            onChangeText={(text) => {
                                this.props.callBack(text);
                            }}
                            maxLength={17}
                            style={{
                                textAlign: 'right',
                                fontSize: Pixel.getFontPixel(14),
                                color: '#333',
                                padding: 0,
                                marginRight:Pixel.getPixel(13),
                                height:Pixel.getPixel(44),
                                width:width-width/3-Pixel.getPixel(48)
                            }}
                            placeholder='必填'
                            placeholderTextColor={'#91A2B6'}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                            this.props.callBack();
                        }}>
                            <Image style={{width:Pixel.getPixel(18),height:Pixel.getPixel(17),marginRight:Pixel.getPixel(15)}}
                                   source={require('../../../../images/neworder/saoyisao.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#D8D8D8'}}></View>
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