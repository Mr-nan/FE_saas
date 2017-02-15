import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import MyButton from '../component/MyButton';
import StorageUtil from '../utils/StorageUtil';
var {height, width} = Dimensions.get('window');
var KeyNames = require("../constant/storageKeyNames");
var carName = require('../../json/carName.json');
import LoginAndRegister from '../login/LoginAndRegister';

export default class RootScene extends BaseComponent {
    initFinish = () => {
        let that = this;
        setTimeout(
            () => {
                StorageUtil.mGetItem(KeyNames.ISLOGIN, (result) => {
                    if (result !== StorageUtil.ERRORCODE) {
                        if (result == null) {
                            that.navigatorParams.component = LoginAndRegister;
                            that.toNextPage(that.navigatorParams);
                        } else {
                            if (result == "true") {
                                that.navigatorParams.component = LoginAndRegister;
                                that.navigatorParams.params = {

                                }
                                that.toNextPage(that.navigatorParams);
                            } else {
                                that.navigatorParams.component = LoginAndRegister;
                                that.toNextPage(that.navigatorParams);
                            }
                        }
                    }
                });
            }, 500
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
        name: 'LoginAndRegister',
        component: LoginAndRegister,
        params: {}
    }

    buttonParams = {
        buttonType: MyButton.IMAGEBUTTON,
        parentStyle: styles.parentStyle,
        childStyle: styles.childStyle,
        opacity: 1,
        content: require("../../images/welcome.jpg")
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyButton {...this.buttonParams}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentStyle: {
        flex: 1
    },
    childStyle: {
        width: width,
        height: height
    },
});

