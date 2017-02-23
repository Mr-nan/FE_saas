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

    handleBack =()=> {
        this.backPage();
        return true;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress',this.handleBack );
        this.initFinish();
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

    componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }


}