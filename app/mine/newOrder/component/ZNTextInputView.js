/**
 * Created by zhengnan on 2018/7/10.
 */
import  React, {Component} from  'react'
import  {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
} from  'react-native'

import * as fontAndColor from '../../../constant/fontAndColor';
import  PixelUtil from '../../../utils/PixelUtil'
var Pixel = new PixelUtil();
import { observer } from 'mobx-react/native';
import {observable} from 'mobx';
let ScreenWidth = Dimensions.get('window').width;

@observer
export default class ZNTextInputView extends Component{

    @observable  znTextInputValue;
    @observable  znTextInputPlaceholder
    constructor(props) {
        super(props);
        this.znTextInputValue = '';
        this.znTextInputPlaceholder = this.props.placeholderText?this.props.placeholderText:'请输入内容';
        this.maxLine = this.props.maxLine ?  this.props.maxLine : 20;
        this.state = {};
    }

    render(){
        return(
            <View style={{backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(20)}}>
                <TextInput
                    ref={(ref)=>{this.znTextInput = ref}}
                    style={[{height: Pixel.getPixel(180),
                        borderColor: fontAndColor.COLORA1,
                        width: ScreenWidth-Pixel.getPixel(30),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                        backgroundColor:fontAndColor.COLORB13
                    },this.props.style]}
                    underlineColorAndroid='transparent'
                    multiline={true}
                    onFocus={()=>{this.znTextInputPlaceholder=''}}
                    onChangeText={(text)=>{

                        if(text.length>this.maxLine) {
                            this.znTextInputValue= text.substring(0, text.length-1);
                        }else {
                            this.znTextInputValue = text;
                        }
                        this.znTextInput.setNativeProps({
                            text: this.znTextInputValue,
                        });

                        this.props.onChangeText && this.props.onChangeText(this.znTextInputValue);
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
                        {`${this.znTextInputValue.length}/${this.maxLine}`}
                    </Text>
                </View>
            </View>
        )
    }

}