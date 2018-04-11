import React, {Component, PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    PixelRatio,
    TouchableOpacity
} from "react-native";
import * as FontAndColor from "../../constant/fontAndColor";
import SendMmsCountDown from "./SendMmsCountDown";
import PixelUtil from "../../utils/PixelUtil";
import MyButton from "../../component/MyButton";

var Pixel = new PixelUtil();
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
let onePT = 1 / PixelRatio.get(); //一个像素

export default class MultiselectButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }

    show = () => {
        this.setState({
            width: width,
            height: height
        });
    }

    render() {
        return (
            <TouchableOpacity style={{width:this.state.width,height:this.state.height,
                                        backgroundColor:'rgba(0,0,0,0.6)',
                                        overflow: 'hidden',position: 'absolute',justifyContent:'center',
                                        alignItems:'center'}}
                              onPress={()=>{
                            this.setState({
                                width:0,
                                height:0
                            });
                        }} activeOpacity={1}>
                <TouchableOpacity activeOpacity={1} style={{width:width-Pixel.getPixel(60),
                backgroundColor:'#fff',borderRadius:8,padding: Pixel.getPixel(15),justifyContent:'center',
                alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize: Pixel.getPixel(14),
                    color:FontAndColor.COLORA1,lineHeight:20}}>
                        1. 本表所称中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或者多次累计不超过90日的离境。
                    </Text>
                    <Text allowFontScaling={false} style={{fontSize: Pixel.getPixel(14),
                    color:FontAndColor.COLORA1,lineHeight:20}}>
                        2. 本表所称非居民是指中国税收居民以外的个人。其他国家（地区）税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站
                    </Text>
                    <Text allowFontScaling={false} style={{fontSize: Pixel.getPixel(12),
                    color:FontAndColor.COLORA1,lineHeight:20}}>
                        (http://www.chinatax.gov.cn/aeoi_index.html）。
                    </Text>
                    <TouchableOpacity onPress={()=>{
                         this.setState({
                                width:0,
                                height:0
                            });
                    }} activeOpacity={1} style={{width:Pixel.getPixel(90),
                   backgroundColor:'#fff',borderRadius:8,borderWidth:1,
                   borderColor:FontAndColor.COLORB0,justifyContent:'center',alignItems:'center',
                   height:Pixel.getPixel(30),marginTop:Pixel.getPixel(15)}}>
                        <Text allowFontScaling={false} style={{fontSize: Pixel.getPixel(16),
                    color:FontAndColor.COLORB0}}>
                           好的
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    clearValue = () => {
        this.setState({
            values: ""
        });
    }

    StartCountDown = () => {
        if (this.props.rightButton) {
            this.refs.sendMms.StartCountDown();
        } else {
            alert("您没有开启此功能哦")
        }
    }
}

const styles = StyleSheet.create({
    componentStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: onePT,
        borderBottomColor: FontAndColor.COLORA4,
        height: Pixel.getPixel(45),
    },
    textInputStyle: {
        flex: 1,
        height: Pixel.getPixel(44),
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        paddingLeft: Pixel.getPixel(15),
        paddingTop: 0,
        paddingBottom: 0,
        color: FontAndColor.COLORA0,
    },
    iconStyle: {
        width: Pixel.getPixel(25),
        height: Pixel.getPixel(25),
    },
    leftTextStyle: {
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA0,
        paddingRight: 5,
    }

});