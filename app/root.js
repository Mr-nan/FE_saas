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
    AppState,
    NetInfo,

} from 'react-native';

import MyNavigator  from './component/MyNavigator';
import * as fontAndColor from './constant/fontAndColor';

import ShowToast from "./component/toast/ShowToast";
import * as weChat from 'react-native-wechat';

export default class root extends Component {



    render() {
        return (
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                <MyNavigator showToast={(content)=>{
                    this.showToast(content)
                }} showModal={(value)=>{this.showModal(value)}}/>
                <ShowToast ref='toast' msg={''}></ShowToast>
            </View>
        );
    }


    componentDidMount() {
        weChat.registerApp('wx6211535f6243c779');
        global.iosIDFA = this.props.IDFA;
        global.phoneVersion = this.props.phoneVersion;
        global.phoneModel = this.props.phoneModel;
        global.appVersion = this.props.appVersion;

        NetInfo.addEventListener('change',this.handleConnectionInfoChange);

    }

    componentWillUnMount() {
        NetInfo.removeEventListener('change',this.handleConnectionInfoChange);
    }

    handleConnectionInfoChange(connectionInfo) {
        if(connectionInfo=='none'){
            Alert.alert('提示','当前网络状态不太好，请检测网络',[{'text':"好的"}]);
        }
    }

    showToast = (content) => {
        this.refs.toast.changeType(ShowToast.TOAST, content);
    }

    showModal = (value) => {
        this.refs.toast.showModal(value);
    }
}