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
                        尊敬的客户，由于合规要求，使用微众银行贷款服务需提供有效的居民纳税户。如欲进一步了解相关法规，可致电微众银行客服；如需更改借款人，请联系第一车贷客服人员，十分感谢选择微众银行服务
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