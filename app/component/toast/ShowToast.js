import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Toast from './Toast';
import Confirm from './Confirm';
/**
 * from @zhaojian
 *
 * 显示弹框和吐司组件   调用时使用ShowToast组件。
 * 需要显示吐司时，调用changeType方法，传递参数为本类TOAST静态常量，msg通过props传递。
 * 需要显示确认弹框时，调用changeType方法，传递参数为本类CONFIRM静态常量，
 * 有msg、title、leftText、rightText、leftCallBack、rightCallBack属性通过props传递
**/
export default  class ShowToast extends Component {
    static TOAST = "1";
    static CONFIRM = "2";

    constructor(props) {
        super(props);
        this.state={
            msg:""
        }
    }


    _toastOnPress = () => {
        this.refs.toast.changeType(this.state.toastType);
        this.refs.toast.open();
        this.timer = setTimeout(() => {

        }, 1000);
    }

    _confirmOnPress = () => {
        this.refs.confirm.open();
    }


    changeType = (_type,msg) => {
        if (_type === ShowToast.TOAST) {
            this.setState({
                msg:msg
            });
            this._toastOnPress();
        } else if(_type === ShowToast.CONFIRM){
            this._confirmOnPress();
        }
    }

    render() {
        return (
            <View>
                <Toast ref='toast' msg={this.state.msg}></Toast>
                <Confirm ref='confirm' leftFunc={this.props.leftCallBack} rightFunc={this.props.rightCallBack}
                         btnLeftText={this.props.leftText}
                         btnRightText={this.props.rightText} title={this.props.title} msg={this.props.msg}></Confirm>
            </View>
        )
    }
}