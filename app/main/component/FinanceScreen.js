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
        this.selects = ["全部", "单车融资", "库存融资"]
        this.state = {
            isTop: true,
            selectId: this.props.select
        }

    }

    componentWillMount() {

    }

    setSelect=(select)=> {

        this.setState({selectId: select});
    }

    render() {
        let viewList = [];
        for (let i = 0; i < this.selects.length; i++) {
            let flex = 3;
            if(i==1||i==2){
                flex=4;
            }
            viewList.push(<TouchableOpacity key={i} onPress={()=>{
                    this.setState({selectId:i});
                    this.props.onCheck(i);
                }} activeOpacity={0.8}
                                            style={{flex:flex,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize: Pixel.getFontPixel(14),color:
                    this.state.selectId==i?fontAndColor.COLORB0:'#999999'}}>
                    {this.selects[i]}
                </Text>
            </TouchableOpacity>);
        }
        return (
            <View ref="screen" style={{width:width,height:Pixel.getPixel(45),marginTop:Pixel.getPixel(10),
            marginBottom:Pixel.getPixel(1),backgroundColor:'#fff',flexDirection: 'row',overflow:'visible'}}>
                {viewList}
                <TouchableOpacity onPress={()=>{
                    this.refs.screen.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
                        console.log(pageX+'-------'+pageY);
                        this.props.onPress(pageY);
                    });
                }} activeOpacity={0.8} style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color:this.state.selectId>2?fontAndColor.COLORB0: '#999999'}}>
                        更多
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    let isTop=!this.state.isTop;
                    this.setState({isTop:!this.state.isTop});
                    this.props.timeOrderClick(isTop);
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
