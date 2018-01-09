import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
export default class FinanceScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isTop: true,
            selectId: 0
        }

    }

    componentWillMount() {

    }

    changeSelect = (select) => {
        this.setState({selectId: select});
    }

    render() {
        return (
            <View ref="screen" style={{width:width,height:Pixel.getPixel(45),marginTop:Pixel.getPixel(10),
            marginBottom:Pixel.getPixel(1),backgroundColor:'#fff',flexDirection: 'row',overflow:'visible'}}>
                <TouchableOpacity onPress={()=>{
                    this.setState({selectId:0});
                }} activeOpacity={0.8}
                                  style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color:
                    this.state.selectId==0?fontAndColor.COLORB0:'#999999'}}>
                        全部
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({selectId:1});
                }} activeOpacity={0.8} style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color:
                    this.state.selectId==1?fontAndColor.COLORB0:'#999999'}}>
                        单车融资
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({selectId:2});
                }} activeOpacity={0.8} style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color:
                    this.state.selectId==2?fontAndColor.COLORB0:'#999999'}}>
                        订单融资
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.refs.screen.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
                        console.log(pageX+'-------'+pageY);
                        this.props.onPress(pageY);
                    });
                }} activeOpacity={0.8} style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#999999'}}>
                        更多
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({isTop:!this.state.isTop});
                }} activeOpacity={0.8} style={{flex:4,alignItems:'center',flexDirection:'row'}}>
                    <View style={{width:Pixel.getPixel(2),height:Pixel.getPixel(20),
                    backgroundColor:'#d8d8d8'}}></View>
                    <View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                        <Image style={{width:Pixel.getPixel(8),height:Pixel.getPixel(15)}}
                               source={this.state.isTop==true?
                               require('../../../images/financeImages/lvsejiantou.png'):
                               require('../../../images/financeImages/lvsejiantouxia.png')}></Image>
                        <Text style={{fontSize: Pixel.getFontPixel(14),color: '#999999',
                        marginLeft:Pixel.getPixel(5)}}>时间</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
