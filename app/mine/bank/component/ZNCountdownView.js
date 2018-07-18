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
import {observable} from 'mobx';
import {observer} from 'mobx-react/native'

@observer
export  default class  ZNCountdownView extends Component{

    @observable time;
    @observable minute;
    @observable second;

    constructor(props) {
        super(props);

        this.time=0;
        this.minute = 0;
        this.second = 0;

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
                <Text style={{color:'white', fontSize:fontAndColor.CONTENTFONT24}}> {`${this.minute<10?('0'+this.minute):this.minute}:${this.second<10?('0'+this.second):this.second}`}</Text>
            </View>
        )
    }

    formatSeconds=()=> {

        if(this.time<1){

            this.stopAction();
            return;
        }

        this.time-=1;

        this.second = parseInt(this.time);// 秒
        this.minute = 0; // 分
        if (this.second > 60) {
            this.minute = parseInt(this.second / 60);
            this.second = parseInt(this.second % 60);
        }

    }

    startAction=(time)=>{

        this.time=time;
        this.minute=0;
        this.second=0;

        InteractionManager.runAfterInteractions(() => {
            this.timer =setInterval(()=>{this.formatSeconds()},1000);

        });
    }

    stopAction=()=>{
        this.time=0;
        this.minute=0;
        this.second=0;
        this.timer && clearInterval(this.timer);
        this.props.callBack();
    }
}