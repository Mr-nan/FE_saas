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
import CustomerServiceButton  from './component/CustomerServiceButton';
import ShowToast from "./component/toast/ShowToast";
import * as weChat from 'react-native-wechat';

export default class root extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                <MyNavigator showToast={(content)=>{
                    this.showToast(content)
                }} showModal={(value)=>{this.showModal(value)}}
                hideView={()=>{this.hideView()}} showView={()=>{this.showView()}}/>
                <ShowToast ref='toast' msg={''}></ShowToast>
                <CustomerServiceButton ref='customerservicebutton'/>
            </View>
        );
    }

    hideView = () => {
        this.refs.customerservicebutton.hideView();
    }

    showView = () => {
        this.refs.customerservicebutton.showView()
    }

    componentDidMount() {
        weChat.registerApp('wx6211535f6243c779');
        global.iosIDFA = this.props.IDFA;
        global.phoneVersion = this.props.phoneVersion;
        global.phoneModel = this.props.phoneModel;
        global.appVersion = this.props.appVersion;

    }

    showToast = (content) => {
        this.refs.toast.changeType(ShowToast.TOAST, content);
    }

    showModal = (value) => {
        this.refs.toast.showModal(value);
    }
}