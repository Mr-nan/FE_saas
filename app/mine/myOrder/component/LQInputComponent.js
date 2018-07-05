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
    ListView,
    NativeModules,
    TextInput
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class LQInputComponent extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            value:this.props.money,
        }
    }


    render() {
        return (
            <View style={{width:width,height:Pixel.getPixel(49),paddingLeft:Pixel.getPixel(15),
            paddingRight: Pixel.getPixel(15),flexDirection: 'row',backgroundColor:'#fff'}}>
                <View style={{flex:1,alignItems: 'center',flexDirection: 'row'}}>
                    <Text style={{fontSize: Pixel.getPixel(15),color:'#222222'}}>单车指导价(</Text>
                    <Text style={{fontSize: Pixel.getPixel(12),color:'#222222'}}>可修改</Text>
                    <Text style={{fontSize: Pixel.getPixel(15),color:'#222222'}}>)</Text>
                </View>
                <View style={{alignItems: 'center',flexDirection: 'row'}}>
                    <TextInput
                        keyboardType={'numeric'}
                        style={styles.textInput}
                        maxLength={15}
                        defaultValue={this.props.money}
                        value={this.state.value}
                        underlineColorAndroid='transparent'
                        ref={(input) => {this.instructionsInput = input}}
                        onChangeText={(text)=>{

                            let re = /^[0-9]*[\.]?[0-9]{0,2}$/
                            let flag  = re.test(text);

                            console.log(flag);

                            if(flag){

                                if(text === '.'){
                                    text = '0.'
                                }

                                if(text === '00'){
                                    text = '0'
                                }

                                this.setState({
                                    value:text,
                                }, ()=>{
                                    this.props.inputMoney(text)
                                })
                            }else {
                                this.setState({
                                    value:this.state.value,
                                })
                            }

                        }}
                        onSubmitEditing={()=>{
                            this.trim();

                        }}
                        onBlur={()=>{
                           this.trim();
                        }}

                    />
                    <Text style={{fontSize: Pixel.getPixel(12),color:'#90A1B5'}}>万元</Text>
                </View>
            </View>
        );
    }


    trim = ()=>{
        if(this.state.value.substr(this.state.value.length-1,1) === '.'){
            this.state.value = this.state.value.substr(0,this.state.value.length-1)
            this.setState({
                value:this.state.value
            }, ()=>{
                this.props.inputMoney(this.state.value)
            })
        }
    }

}

const styles = StyleSheet.create({
    textInput: {
        width:Pixel.getPixel(60),
        borderColor: '#00000000',
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(14),
        padding:0,
        backgroundColor:'white',
        color: '#90A1B5',
    },
});
