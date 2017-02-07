import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Navigator,
    TouchableHighlight,
    BackAndroid
} from 'react-native';
export default class BaseComponent extends Component {

    componentDidMount() {
        let that = this;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            that.backPage();
            return true;
        });
        that.initFinish();
    }

    toNextPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.push({
                ...mProps
            })
        }
    }

    backPage = () => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.pop();
        }
    }

}