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
// import LoginScene from '../login/LoginScene';
import CarSourceScene from '../carSource/CarSourceListScene';

var {height, width} = Dimensions.get('window');
var KeyNames = require("../constant/storageKeyNames");
var carName = require('../../json/carName.json');


export default class RootScene extends BaseComponent {
    initFinish = () => {
        let that = this;
        setTimeout(
            () => {
                StorageUtil.mGetItem(KeyNames.ISLOGIN, (result) => {
                    if (result !== StorageUtil.ERRORCODE) {
                        if (result == null) {
                            that.navigatorParams.component = CarSourceScene;
                            that.toNextPage(that.navigatorParams);
                        } else {
                            if (result == "true") {
                                that.navigatorParams.component = CarSourceScene;
                                that.navigatorParams.params = {

                                }
                                that.toNextPage(that.navigatorParams);
                            } else {
                                that.navigatorParams.component = CarSourceScene;
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
        name: 'CarSourceScene',
        component: CarSourceScene,
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

