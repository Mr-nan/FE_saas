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
export default class GetCarCountDown extends Component {

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            countDown: false,
            //value: '获取验证码',
            day: 0,
            hour: 1,
            minute: 5
        };
        //this.countTime = TIME;
        this.timer = null;
        this.value1 = this.state.day;
        this.value2 = this.state.hour;
        this.value3 = this.state.minute;
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
                <Text style={styles.textStyle}>{this.state.day}天</Text>
                <Text style={styles.textStyle}>{this.state.hour}小时</Text>
                <Text style={styles.textStyle}>{this.state.minute}分</Text>
            </View>
        );
    }

    //开始计算操作
    StartCountDown = () => {
        if (!this.state.countDown && this.timer === null) {
            /*            this.timer = setInterval(() => {
             if (this.countTime <= 0) {
             this.setState({
             countDown: false,
             value: '获取验证码',
             });
             this.endCountDown();
             } else {
             this.setState({
             countDown: true,
             value: --this.countTime + 'S后重发',
             });
             }
             }, 1000)*/
            this.timer = setInterval(() => {
                if (this.value3 === 0) {
                    if (this.value2 === 0) {
                        this.value1 = --this.value1;
                        if (this.value1 <= 0) {
                            this.endCountDown();
                        } else {
                            this.value2 = --this.value2;
                            this.value3 = 59;
                            this.setState({
                                minute: this.value3,
                                hour: this.value2,
                                day: this.value1,
                            });
                        }
                    } else {
                        this.value2 = --this.value2;
                        this.value3 = 59;
                        this.setState({
                            minute: this.value3,
                            hour: this.value2
                        });
                    }
                } else {
                    this.value3 = --this.value3;
                    this.setState({
                        minute: this.value3
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