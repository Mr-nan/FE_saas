/**
 * Created by zhengnan on 2018/7/9.
 */

import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,

}from 'react-native';
let {width} = Dimensions.get('window');


import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();

@observer
class ZNTextInput extends Component{

    @observable  znTextInputValue;
    @observable  znTextInputPlaceholder
    constructor(props) {
        super(props);
        this.znTextInputValue = '';
        this.znTextInputPlaceholder = this.props.placeholderText;
        this.state = {};
    }

    render(){
        return(
            <View style={{backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(20)}}>
                <TextInput
                    ref={(ref)=>{this.znTextInput = ref}}
                    style={{height: Pixel.getPixel(180),
                        borderColor: fontAndColor.COLORA1,
                        width: ScreenWidth-Pixel.getPixel(30),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        backgroundColor:fontAndColor.COLORB12
                    }}
                    underlineColorAndroid='transparent'
                    onFocus={()=>{this.znTextInputPlaceholder=''}}
                    onChangeText={(text)=>{

                        if(text.length>20) {
                            this.znTextInputValue= text.substring(0, text.length-1);
                        }else {
                            this.znTextInputValue = text;
                        }
                        this.znTextInput.setNativeProps({
                            text: this.znTextInputValue,
                        });
                    }}
                    onEndEditing={()=>{
                        if(this.znTextInputValue==''){
                            this.znTextInputPlaceholder = this.props.placeholderText;
                        }
                    }}>
                </TextInput>
                <View style={{left:Pixel.getPixel(30),top:Pixel.getPixel(30),position: 'absolute'}}>
                    <Text style={{color:fontAndColor.COLORA1,
                        fontSize:fontAndColor.CONTENTFONT24,
                        backgroundColor:'transparent'}}>{this.znTextInputPlaceholder}</Text>
                </View>
                <View style={{right:Pixel.getPixel(30),bottom:Pixel.getPixel(30),position: 'absolute'}}>
                    <Text style={{color:fontAndColor.COLORA1,
                        fontSize:fontAndColor.CONTENTFONT24,
                        backgroundColor:'transparent'}}>
                        {this.znTextInputValue.length}/20
                    </Text>
                </View>
            </View>
        )
    }
}