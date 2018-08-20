/**
 * Created by zhengnan on 2018/8/14.
 */
import React,{Component,PropTypes} from 'react';
import {
    TouchableOpacity,
    View,
    Dimensions,
    Text
} from 'react-native';

import * as fontAndColor from "../../constant/fontAndColor";
import PixelUtil from "../../utils/PixelUtil";
import  {observable} from 'mobx';
import  {observer} from 'mobx-react'
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

@observer
export default class ZNGetNoteButton extends Component{

    @observable time;
    constructor(props) {
        super(props);
        this.time = 0;
        this.state = {};
    }

    static propTypes={

        defaultTime:PropTypes.number,
        getNoteClick:PropTypes.func
    }

    static defaultProps={
        defaultTime:60,
    }

    render(){
        return(
            <TouchableOpacity activeOpacity={1} onPress={this.getNoteClick}>
                <View style={{height:Pixel.getPixel(26),borderRadius:Pixel.getPixel(13),justifyContent:'center',backgroundColor:fontAndColor.COLORC1,width:Pixel.getPixel(90),
                    alignItems:'center'
                }}>
                    <Text style={{color:fontAndColor.COLORC2, fontSize:fontAndColor.CONTENTFONT24}}>{this.time==0?'获取验证码':(this.time+'s')}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    getNoteClick=(setTime)=>{

        if(this.time==0){
            this.props.getNoteClick && this.props.getNoteClick(this.setTime);
        }
    }

    setTime=()=>{
        this.time = this.props.defaultTime;
        this.myInterval =setInterval(()=>{
            this.time--;
            if(this.time<=0){
                clearInterval(this.myInterval);
            }

        },1000);
    }

    componentDidUnMount() {
        clearInterval(this.myInterval);
    }
}
