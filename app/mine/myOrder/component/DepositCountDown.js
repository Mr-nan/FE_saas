/**
 * Created by hanmeng on 2017/5/15.
 */
import React, {Component, PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as fontAndColor from "../../../constant/fontAndColor";
import PixelUtil from "../../../utils/PixelUtil";
var Pixel = new PixelUtil();

//const TIME = 60;
export default class DepositCountDown extends Component {

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            countDown: false,
            //value: '获取验证码',
            hour: this.props.hour,
            minute: this.props.minute
        };
        //this.countTime = TIME;
        this.timer = null;
        this.value1 = this.state.hour;
        this.value2 = this.state.minute;
    }

/*    static propTypes = {
        // leftIconShow: PropTypes.bool,
        // inputPlaceholder: PropTypes.string,
        // inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        callBackSms: PropTypes.func,//发送短语验证码
    }*/

    initFinish = () => {
    }

    componentDidMount() {
        this.StartCountDown();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>{this.state.hour}</Text>
                <Text style={styles.textStyle}>:</Text>
                <Text style={styles.textStyle}>{this.state.minute}</Text>
            </View>
        );
    }

    //开始计算操作
    StartCountDown = () => {
        if (!this.state.countDown && this.timer === null) {
            this.timer = setInterval(() => {
                if (this.value2 === 0) {
                    this.value1 = --this.value1;
                    this.value2 = 59;
                    if (this.value1 <= 0) {
                        this.endCountDown();
                    } else {
                        this.setState({
                            second: this.value2,
                            minute: this.value1
                        });
                    }
                } else {
                    this.value2 = --this.value2;
                    this.setState({
                        second: this.value2
                    });
                }
            }, 60000)
        }
    }

    //结束计算操作
    endCountDown = () => {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
        //this.countTime = TIME;
    }

    componentWillUnmount() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: fontAndColor.COLORB2
    }
});