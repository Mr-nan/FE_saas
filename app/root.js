import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
} from 'react-native';
import MyNavigator  from './component/MyNavigator';
import ShowToast from "./component/toast/ShowToast";

export default class root extends Component {

    render() {
        return (
            <View style={{flex:1}}>

                <MyNavigator showToast={(content)=>{
                    this.showToast(content)
                }}/>
                <ShowToast ref='toast' msg={''}></ShowToast>
            </View>
        );
    }

    showToast = (content) => {
        this.refs.toast.changeType(ShowToast.TOAST, content);
    }
}