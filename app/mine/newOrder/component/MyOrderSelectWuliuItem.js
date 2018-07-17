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
export  default class MyOrderSelectWuliuItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            parentWidth:0,
            parentHeight:0,
            childWidth:0,
            childHeight:0,
        };
    }

    changeShow=()=>{
        this.setState({
            parentWidth:width,
            parentHeight:height,
            childWidth:width,
            childHeight:Pixel.getPixel(143),
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{
                this.setState({
                    parentWidth:0,
                    parentHeight:0,
                    childWidth:0,
                    childHeight:0,
                });
            }} style={{width:this.state.parentWidth,height:this.state.parentHeight,backgroundColor:'rgba(0,0,0,0.5)',
                position:'absolute',left:0,top:0}}>
                <View style={{width:this.state.childWidth,height:this.state.childHeight,backgroundColor:fontAndColor.COLORA3,
                    position:'absolute',left:0,bottom:0,overflow:'hidden'}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            parentWidth:0,
                            parentHeight:0,
                            childWidth:0,
                            childHeight:0,
                        },()=>{
                            this.props.callBack('物流',1);
                        });
                    }} style={{width:width,height:Pixel.getPixel(44),backgroundColor:'#fff', alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:this.props.wuliu.name=='物流'?'#00C5C3':'#000'}}>物流</Text>
                    </TouchableOpacity>
                    <View style={{width:width-Pixel.getPixel(20),height:1,backgroundColor:'#D8D8D8',marginLeft:Pixel.getPixel(10)}}>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            parentWidth:0,
                            parentHeight:0,
                            childWidth:0,
                            childHeight:0,
                        },()=>{
                            this.props.callBack('自提',2);
                        });
                    }} style={{width:width,height:Pixel.getPixel(44),backgroundColor:'#fff', alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:this.props.wuliu.name=='自提'?'#00C5C3':'#000'}}>自提</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            parentWidth:0,
                            parentHeight:0,
                            childWidth:0,
                            childHeight:0,
                        });
                    }} style={{width:width,height:Pixel.getPixel(44),backgroundColor:'#fff', alignItems:'center',justifyContent:'center',
                    marginTop:Pixel.getPixel(10)}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#999999'}}>取消</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
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