import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text
} from 'react-native';
import MyNavigator  from './component/MyNavigator';
import ShowToast from "./component/toast/ShowToast";
import AllLoading from './component/AllLoading';

export default class root extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                <AllLoading ref="loadingModal"/>
                <MyNavigator showToast={(content)=>{
                    this.showToast(content)
                }} showModal={(value)=>{this.showModal(value)}}/>
                <ShowToast ref='toast' msg={''}></ShowToast>
            </View>
        );
    }

    showToast = (content) => {
        this.refs.toast.changeType(ShowToast.TOAST, content);
    }

    showModal = (value) => {
        this.refs.loadingModal.changeShowType(value);
    }
}