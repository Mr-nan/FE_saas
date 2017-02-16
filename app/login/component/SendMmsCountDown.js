import React, {Component, PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    PixelRatio,
} from "react-native";
import MyButton from '../../component/MyButton';
import  * as FontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import PixelUtil from '../../utils/PixelUtil';
var Pixel = new PixelUtil();

var countTime = 6;
export default class sendMmsCountDown extends BaseComponent {
    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            countDown: false,
            value: '获取验证码'
        }
    }

    static propTypes = {
        // leftIconShow: PropTypes.bool,
        // inputPlaceholder: PropTypes.string,
        // inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        callBackSms: PropTypes.func,//发送短语验证码
    }

    initFinish = () => {
    }

    render() {
        return (
            <View>
                <MyButton buttonType={MyButton.TEXTBUTTON} content={this.state.value}
                          parentStyle={this.state.countDown ? styles.pressButtonStyle : styles.buttonStyle}
                          childStyle={this.state.countDown ? styles.pressTextStyle : styles.textStyle}
                          mOnPress={this.countDown}/>
            </View>
        );
    }

    //开始计算操作
    countDown = () => {
        if (!this.state.countDown) {
            this.props.callBackSms();
            let timer = setInterval(() => {
                if (countTime <= 0) {
                    this.setState({
                        countDown: false,
                        value: '获取验证码',
                    });
                    this.endCountDown(timer);
                } else {
                    this.setState({
                        countDown: true,
                        value: --countTime + 'S后重发',
                    });
                }
            }, 1000)
        }
    }

    //结束计算操作
    endCountDown = (timer) => {
        clearInterval(timer);
        countTime = 6;
    }
}

const styles = StyleSheet.create({
    container: {
        width: Pixel.getPixel(50),
        height: Pixel.getPixel(20),
    },
    buttonStyle: {
        borderWidth: 1,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: FontAndColor.COLORB0,
    },
    textStyle: {
        color: FontAndColor.COLORB0,
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
    },
    pressButtonStyle: {
        borderWidth: 1,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: FontAndColor.COLORA1,
    },
    pressTextStyle: {
        color: FontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
    },
});