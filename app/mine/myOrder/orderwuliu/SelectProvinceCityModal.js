import React, {Component} from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native';
import PixelUtil from '../../../utils/PixelUtil'

let Pixel = new PixelUtil();
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import BaseComponent from "../../../component/BaseComponent";

export default class SelectProvinceCityModal extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.repoId='';
        this.state = {
            datas: this.props.datas
        }

    }

    setSelect=(data,index)=>{
        this.repoId=data.repoId;
        this.index=index;
        this.props.datas.map((data)=>{
            data.isCheck=false;
        });
        this.props.datas[index].isCheck=true;
        this.setState({
            datas: this.props.datas
        });
    }

    render() {
        return (
            <View
                style={{
                    width: width,
                    height: height,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    position: 'absolute',
                    justifyContent:'center',
                    left: 0,
                    top: 0
                }}>
                <View style={{
                    height: Pixel.getPixel(180),
                    backgroundColor: fontAndColor.COLORA3,
                    width:Pixel.getPixel(width),
                    position:'absolute',
                    bottom:0,
                }}>
                    <View style={{flex: 1}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'white',
                            height: Pixel.getPixel(40),
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                                this.props.closeModal();
                            }}>
                            <Text style={{color:fontAndColor.COLORB0,width:Pixel.getPixel(100),textAlign:'center',}}>取消</Text>
                            </TouchableOpacity>
                            <Text>选择城市</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                                if(this.repoId==''){
                                    this.props.showToast('请选择城市');
                                }else{
                                    this.props.confirm(this.repoId,this.index);
                                }
                            }}>
                                <Text style={{color:fontAndColor.COLORB0,width:Pixel.getPixel(100),textAlign:'center'}}>确认</Text>
                            </TouchableOpacity>

                        </View>

                        <View>
                            {this.state.datas.map((data, index) => {
                                return(<TouchableOpacity key={index + 'select'} activeOpacity={0.8} onPress={() => {
                                    this.setSelect(data,index)
                                }}>
                                    <View style={[{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        height: Pixel.getPixel(40),
                                        alignItems: 'center',
                                        backgroundColor:'white',
                                        borderBottomWidth:1,
                                        borderColor:fontAndColor.COLORA4
                                    }]}>
                                        <Text
                                            style={[{color: fontAndColor.COLORA1,fontSize:14,marginLeft:20}, data.isCheck && {color: 'black',fontSize:16}]}>{data.province}</Text>
                                        <Text
                                            style={[{color: fontAndColor.COLORA1,fontSize:14}, data.isCheck && {color: 'black',fontSize:16}]}>{data.city}</Text>
                                        <Text
                                            style={[{color: fontAndColor.COLORA1,fontSize:14,marginRight:20}, data.isCheck && {color: 'black',fontSize:16}]}>{data.country}</Text>
                                    </View>
                                </TouchableOpacity>)


                            })}

                        </View>
                    </View>

                </View>

            </View>
        );
    }
}