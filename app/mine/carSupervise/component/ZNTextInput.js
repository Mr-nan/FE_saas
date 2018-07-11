/**
 * Created by zhengnan on 2018/7/9.
 */

import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    Dimensions

}from 'react-native';

import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
let {width} = Dimensions.get('window');


const Pixel = new PixelUtil();

@observer
export default class ZNTextInput extends Component{

    @observable  znTextInputValue;
    @observable  znTextInputPlaceholder;
    constructor(props) {
        super(props);
        this.znTextInputValue = this.props.defaultValue? this.props.defaultValue:'';
        this.znTextInputPlaceholder = this.props.defaultValue?'':this.props.placeholderText;
        this.state = {};
    }

    render(){
        return(
            <View style={{backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(20)}}>
                <TextInput
                    ref={(ref)=>{this.znTextInput = ref}}
                    style={{height: Pixel.getPixel(180),
                        borderColor: fontAndColor.COLORA1,
                        width: width-Pixel.getPixel(30),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        backgroundColor:fontAndColor.COLORA3
                    }}
                    defaultValue={this.props.defaultValue}
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

                        this.props.onChangeText(this.znTextInputValue);
                    }}
                    onEndEditing={()=>{
                        if(this.znTextInputValue==''){
                            this.znTextInputPlaceholder = this.props.placeholderText;
                        }
                    }}
                    multiline={true}>
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