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
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class  ZNCountdownView extends Component{

    // 构造
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.startAction(10*60);
    }



    render(){
        return(
            <View style={{height:Pixel.getPixel(28),
                borderRadius:Pixel.getPixel(14),
                paddingLeft:Pixel.getPixel(10),
                paddingRight:Pixel.getPixel(30),
                backgroundColor:'#09A7B4',
                flexDirection:'row',
                alignItems:'center',
                width:Pixel.getPixel(150),
                position:'absolute',
                top:Pixel.getPixel(13),
                right:-Pixel.getPixel(34)
            }}>
                <Text style={{color:'white', fontSize:Pixel.getFontPixel(10)}}>支付剩余时间</Text>
                <Text style={{color:'white', fontSize:fontAndColor.CONTENTFONT24}}> {`${this.state.minute<10?('0'+this.state.minute):this.state.minute}:${this.state.second<10?('0'+this.state.second):this.state.second}`}</Text>
            </View>
        )
    }

    formatSeconds=()=> {
        let {time,second,minute} = this.state;

        if(time<1){

            this.stopAction();
            return;
        }

        time-=1;

        second = parseInt(time);// 秒
        minute = 0; // 分
        if (second > 60) {
            minute = parseInt(second / 60);
            second = parseInt(second % 60);
        }

        this.setState({
            time:time,
            second:second,
            minute:minute,
        })
    }

    startAction=(time)=>{

        this.setState({
            time: time,
            minute: 0,
            second: 0,

        },()=>{
            InteractionManager.runAfterInteractions(() => {
                this.timer =setInterval(()=>{this.formatSeconds()},1000);

            });
        })
    }

    stopAction=()=>{
        this.setState({
            time:0,
            second:0,
            minute:0,
        })
        this.timer && clearInterval(this.timer);
        this.props.callBack();
    }
}