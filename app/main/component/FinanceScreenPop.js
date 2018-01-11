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
export default class FinanceScreenPop extends PureComponent {

    constructor(props) {
        super(props);
        this.selects = ["全部", "单车融资", "库存融资", "采购贷", "新车订单贷", "订单融资"]
        this.state = {
            top: 0,
            width: 0,
            height: 0,
            select: 0
        };
    }

    componentWillMount() {

    }

    changeTop = (top, width, height) => {
        this.setState({top: top, width: width, height: height});
    }
    changeSelect = (select) => {
        this.setState({select: select});
    }

    render() {
        let viewList = [];
        for (let i = 0; i < this.selects.length; i++) {
            viewList.push(<TouchableOpacity onPress={()=>{
                this.props.hidden(i);
                this.setState({select:i});
            }} activeOpacity={0.8} key={i+'123'}
                                            style={{flex:1,flexDirection: 'row'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color:
                    this.state.select==i?fontAndColor.COLORB0:'#333333'}}>{this.selects[i]}</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    {this.state.select == i ? <Image style={{width:Pixel.getPixel(18),height:Pixel.getPixel(12)}}
                                                     source={require('../../../images/financeImages/lvseduigou.png')}></Image> :
                        <View/>}
                </View>
            </TouchableOpacity>);
            if (i < this.selects.length - 1) {
                viewList.push(<View key={i+'234'} style={{width:Pixel.getPixel(345),height:Pixel.getPixel(1),
                backgroundColor:'#d8d8d8'}}></View>);
            }
        }
        return (
            <TouchableOpacity onPress={()=>{
                this.props.hidden('null');
            }} activeOpacity={1} style={{width:this.state.width,height:this.state.height,
            backgroundColor:'rgba(0,0,0,0.6)',position: 'absolute',
            left:0,top:this.state.top,overflow:'hidden'}}>
                <View style={{width:this.state.width,height:Pixel.getPixel(274),backgroundColor:'#fff'
                    ,paddingHorizontal:Pixel.getPixel(15)}}>
                    {viewList}
                </View>
            </TouchableOpacity>
        );
    }
}
