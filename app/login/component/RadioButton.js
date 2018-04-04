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

export default class RadioButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agree: false
        }
    }

    hideAgree = () => {
        this.setState({
            agree: false
        });
    }

    render() {
        return (
            <TouchableOpacity style={{width:Pixel.getPixel(23),height:Pixel.getPixel(23),justifyContent:'center'}}
                              onPress={()=>{
                            this.setState({
                                agree:!this.state.agree
                            },()=>{
                                let number = this.props.number;
                                if(!this.state.agree){
                                    number=0;
                                }
                                this.props.callBack(number);
                            });
                        }} activeOpacity={0.8}>
                <Image style={{width:Pixel.getPixel(16),height:Pixel.getPixel(16)}}
                       source={this.state.agree?require('../../../images/login/amou_choose.png')
                       :require('../../../images/login/amou_unchoose.png')}/>
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