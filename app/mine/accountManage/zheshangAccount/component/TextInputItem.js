import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    PixelRatio
} from "react-native";
import * as FontAndColor from "../../../../constant/fontAndColor";
import SendMmsCountDown from "../../../../login/component/SendMmsCountDown";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";

var Pixel = new PixelUtil();
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
let onePT = 1 / PixelRatio.get(); //一个像素


export default class TextInputItem extends Component{

    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    static defaultProps = {
        editable:true,
        value:null,
        title:'标题',
        rightButton: false,
        clearValue: false,
        maxLength: 100,
        annotation:null,
        textPlaceholder: null,
        keyboardType: 'default',
        secureTextEntry: false,//设置是否为密码安全输入框	bool，默认为false
        separator:true,
    };

    static propTypes = {
        editable:PropTypes.bool,
        value:PropTypes.string,
        title:PropTypes.string,
        separator:PropTypes.bool,
        rightButton: PropTypes.bool,
        clearValue: PropTypes.bool,//清除输入框内容
        annotation:PropTypes.string,
        maxLength: PropTypes.number,//限制文本输入框最大的输入字符长度
        textPlaceholder: PropTypes.string,
        keyboardType: PropTypes.string,  //键盘类型：用来选择默认弹出键盘类型
        inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        viewStytle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        titleStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        callBackSms: PropTypes.func,//发送短语验证码
    }

    StartCountDown = () => {
        if (this.props.rightButton) {
            this.refs.sendMms.StartCountDown();
        } else {
            alert("您没有开启此功能哦")
        }
    }
    getInputTextValue() {
        return this.state.value;
    }

    setInputTextValue = (text) => {
        this.setState({
            value: text
        });
    }

    render(){
        return(

            <View style = {{backgroundColor:'white'}}>
                <View style = {[styles.container, this.props.separator?{borderBottomColor: FontAndColor.COLORA4}:{borderBottomColor:'white'}]}>
                    <Text
                        allowFontScaling = {false}
                        style={[styles.title, this.props.titleStyle]}

                    >{this.props.title}</Text>
                    <TextInput
                        ref="inputText"
                        underlineColorAndroid={"#00000000"}
                        keyboardType = {this.props.keyboardType}
                        placeholder = {this.props.textPlaceholder?this.props.textPlaceholder:'请输入'+this.props.title}
                        style={[styles.textInputStyle, this.props.inputTextStyle]}
                        maxLength={this.props.maxLength}
                        secureTextEntry={this.props.secureTextEntry}
                        value={this.state.value}
                        editable = {this.props.editable}
                        onChangeText={(text) => {
                            this.setState({
                                value: text
                            });
                        }}
                    />
                    {
                        this.props.rightButton ?
                            <SendMmsCountDown ref="sendMms" callBackSms={this.props.callBackSms}/> : null
                    }
                    {
                        this.props.annotation?
                            <Text
                                allowFontScaling = {false}
                                style={styles.annotation}
                            >{this.props.annotation}</Text> : null
                    }

                </View>

            </View>

        )
    }

}


const styles = StyleSheet.create({

    title:{
        fontSize:16,
        color:FontAndColor.COLORA0
    },
    container: {
        marginHorizontal:15,
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

    annotation:{
        fontSize:15,
        color:FontAndColor.COLORA2
    }

});