import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import  PixelUtil from '../utils/PixelUtil'
let Pixel = new PixelUtil();
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
import * as fontAndColor from '../constant/fontAndColor';
export default class AccountModal extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: false,
            content: '',
            leftText: '',
            rightText: ''

        };
    }

    changeShowType = (value, content, leftText, rightText) => {
        this.setState({
            isShow: value,
            content: content,
            leftText: leftText,
            rightText: rightText
        });
    }


    render() {
        return (
            <Modal
                ref='loadingModal'
                animationType={"none"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    onPress={()=>{
                       this.setState({
                            isShow: false
                        });
                    }}
                    activeOpacity={1}
                    style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <View style={{width:width-width/4,height:Pixel.getPixel(155),backgroundColor:'#fff',
                     paddingLeft:Pixel.getPixel(20),paddingRight:Pixel.getPixel(20),alignItems: 'center',borderRadius:4}}>
                        <Text style={{textAlign: 'center',fontSize:Pixel.getPixel(14),color:'#000',marginTop: Pixel.getPixel(35)}}>
                            {this.state.content}
                        </Text>
                        <View style={{width:width-width/4-Pixel.getPixel(40),height:Pixel.getPixel(35),flexDirection:'row',
                        position: 'absolute',bottom:Pixel.getPixel(20),left: Pixel.getPixel(20)}}>
                            <TouchableOpacity onPress={()=>{
                                this.props.callBack();
                                 this.setState({
                                    isShow: false
                                    });
                              }} activeOpacity={0.9} style={{flex:1,marginRight:Pixel.getPixel(10),
                              backgroundColor:fontAndColor.COLORB0,borderRadius:3,
                              justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:Pixel.getPixel(14),color:'#fff'}}>{this.state.leftText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                 this.setState({
                                    isShow: false
                                    });
                              }} activeOpacity={0.9} style={{flex:1,marginLeft:Pixel.getPixel(10),
                              backgroundColor:'#fff',borderRadius:3,
                             justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:fontAndColor.COLORB0}}>
                                <Text
                                    style={{fontSize:Pixel.getPixel(14),color:fontAndColor.COLORB0}}>{this.state.rightText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}