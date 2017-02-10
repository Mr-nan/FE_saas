import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import LoginScene from '../login/LoginScene';
import BaseComponent from '../component/BaseComponent';
var KeyNames = require("../constant/storageKeyNames");
import StorageUtil from '../utils/StorageUtil';


export default class SplashScene extends BaseComponent {
    mProps = {
        name: 'login',
        component: LoginScene,
        params: {
            showname: 'login',
            dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 123, 123, 123]
        }
    };

    initFinish = () => {
        let that = this;
        setTimeout(
            () => {
                StorageUtil.mGetItem(KeyNames.ISLOGIN, (result) => {
                    if (result !== StorageUtil.ERRORCODE) {
                        if (result == null) {
                            that.navigatorParams.component = LoginScene;
                            that.toNextPage(that.navigatorParams);
                        } else {
                            if (result == "true") {
                                that.navigatorParams.component = LoginScene;
                                that.navigatorParams.params = {

                                }
                                that.toNextPage(that.navigatorParams);
                            } else {
                                that.navigatorParams.component = LoginScene;
                                that.toNextPage(that.navigatorParams);
                            }
                        }
                    }
                });
            }, 1500
        );
    }

    onPress = () => {
        this.toNextPage(this.mProps)
    }

    toNextPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.replace({
                ...mProps
            })
        }
    }

    navigatorParams = {
        name: 'LoginScene',
        component: LoginScene,
        params: {}
    }

    render() {
        return (
            <View style={{backgroundColor: '#ff8800', flex: 1, paddingTop: 20}}>

            </View>
        );
    }
}