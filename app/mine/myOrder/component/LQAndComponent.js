/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class LQAndComponent extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            number:props.value,
        }
    }

    componentWillReceiveProps(props) {

        console.log(props)


        this.setState({
            number:props.value,
        })
    }
    // componentDidMount() {
    //     this.setState({
    //         number:1
    //     })
    // }

    render() {

        return (
            <View style={{width:width,height:Pixel.getPixel(49),paddingLeft:Pixel.getPixel(15),
            paddingRight: Pixel.getPixel(15),flexDirection: 'row',backgroundColor:'#fff'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize: Pixel.getFontPixel(15),color:'#222222'}}>
                        {this.props.leftName}
                    </Text>
                </View>
                <View style={{flex:1,alignItems: 'flex-end',justifyContent: 'center'}}>
                    <View style={{width:Pixel.getPixel(100),height:Pixel.getPixel(27),
                    flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>{
                            if(this.state.number>1){
                                this.setState({number:parseInt(this.state.number)-1},()=>{
                                    this.props.changeNumber(this.state.number);

                            });
                            }
                        }} activeOpacity={0.8}
                                          style={{flex:2,justifyContent:'center',alignItems:'center',
                                          borderWidth:1,borderColor:'#d8d8d8'}}>
                            <Image
                                source={this.state.number>1?require('../../../../images/jian.png'):
                                   require('../../../../images/unjian.png')}/>

                        </TouchableOpacity>
                        <View style={{flex:3,justifyContent:'center',alignItems:'center',
                        borderTopWidth:1,borderBottomWidth:1,borderColor:'#d8d8d8', flexDirection:'row'}}>
                            <TextInput
                                underlineColorAndroid={"#00000000"}
                                keyboardType = {'numeric'}
                                    style={{fontSize:14 ,flex:1, textAlign:'center', padding:0,}}
                                value={String(this.state.number)}
                                onChangeText={(text) => {

                                    console.log(text)
                                    console.log(typeof text)


                                    let re = /^[0-9]+$/;
                                    let flag = re.test(text);

                                    if(flag){
                                        if(parseInt(text)>999){
                                            text = '999'
                                        }

                                        this.setState({
                                            number: text
                                        },()=>{
                                            this.props.changeNumber(parseInt(text));
                                        });
                                    }else {
                                        if(text == ''){
                                            this.setState({
                                                number:text
                                            },()=>{
                                                this.props.changeNumber(parseInt(text));
                                            })
                                        }else {
                                            this.props.changeNumber(parseInt(this.state.number));
                                        }
                                    }
                                }}

                                onBlur={()=>{
                                    if(this.state.number == ''||parseInt(this.state.number)<=0){
                                        this.setState({
                                            number: 1
                                        },()=>{
                                            this.props.changeNumber(1);
                                        });
                                    }
                                }}

                                onSubmitEditing={()=>{
                                    if(this.state.number == ''||parseInt(this.state.number)<=0){
                                        this.setState({
                                            number: 1
                                        },()=>{
                                            this.props.changeNumber(1);
                                        });
                                    }
                                }}
                            />
                            {/*<Text style={{fontSize: Pixel.getFontPixel(14),color:'#000'}}>*/}
                                {/*{this.state.number}*/}
                            {/*</Text>*/}
                        </View>
                        <TouchableOpacity onPress={()=>{

                            if (this.state.number>=999){
                                return;
                            }
                            this.setState({number:parseInt(this.state.number)+1},()=>{

                                this.props.changeNumber(this.state.number);


                            });
                        }} activeOpacity={0.8}
                                          style={{flex:2,justifyContent:'center',alignItems:'center',
                                          borderWidth:1,borderColor:'#d8d8d8'}}>
                            <Image style={{width:Pixel.getPixel(12),height:Pixel.getPixel(12)}}
                                   source={require('../../../../images/canjia.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }


}
