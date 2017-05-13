import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text,
    Platform,
    Alert,
    AppState
} from 'react-native';

import MyNavigator  from './component/MyNavigator';
import ShowToast from "./component/toast/ShowToast";
import CodePush from 'react-native-code-push';
import *as weChat from 'react-native-wechat';

export default class root extends Component {

    // componentWillMount() {
    //     CodePush.sync();
    // }

    render() {
        return (
            <View style={{flex:1}}>
                <MyNavigator showToast={(content)=>{
                    this.showToast(content)
                }} showModal={(value)=>{this.showModal(value)}}/>
                <ShowToast ref='toast' msg={''}></ShowToast>
            </View>
        );
    }

    componentDidMount() {
        weChat.registerApp('wx6211535f6243c779');
    }

    showToast = (content) => {
        this.refs.toast.changeType(ShowToast.TOAST, content);
    }

    showModal = (value) => {
        this.refs.toast.showModal(value);
    }
}