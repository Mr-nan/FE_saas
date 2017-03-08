import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import MyButton from '../component/MyButton';
import lendMoney from '../finance/lend/LendMoneyScene'
var {height, width} = Dimensions.get('window');
import MainPage from './MainPage';
import LoginAndRegister from '../login/LoginAndRegister';
import StorageUtil from '../utils/StorageUtil';
import * as KeyNames from '../constant/storageKeyNames';
import WelcomScene from './WelcomScene';
import LoginGesture from '../login/LoginGesture';


export default class RootScene extends BaseComponent {
    initFinish = () => {
        StorageUtil.mSetItem(KeyNames.NEED_GESTURE, 'true');
        let that = this;
        setTimeout(
            () => {
                StorageUtil.mGetItem(KeyNames.FIRST_INTO, (res) => {
                    if (res.result == null) {
                        that.navigatorParams.component = WelcomScene;
                        that.toNextPage(that.navigatorParams);
                    } else {

                        StorageUtil.mGetItem(KeyNames.ISLOGIN, (res) => {
                            if (res.result !== StorageUtil.ERRORCODE) {
                                if (res.result == null) {
                                    that.navigatorParams.component = LoginAndRegister;
                                    that.toNextPage(that.navigatorParams);
                                } else {
                                    if (res.result == "true") {

                                        StorageUtil.mGetItem(KeyNames.USER_INFO, (data) => {
                                            let datas = JSON.parse(data.result);
                                            if (datas.user_level == 2) {
                                                if (datas.enterprise_list == null || datas.enterprise_list.length <= 0) {
                                                    that.navigatorParams.component = LoginAndRegister;
                                                    that.toNextPage(that.navigatorParams);
                                                } else {
                                                    if (datas.enterprise_list[0].role_type == '2') {
                                                        that.navigatorParams.component = LoginGesture;
                                                        that.navigatorParams.params = {from: 'RootScene'}
                                                        that.toNextPage(that.navigatorParams);
                                                    } else {
                                                        that.navigatorParams.component = MainPage;
                                                        that.navigatorParams.params = {}
                                                        that.toNextPage(that.navigatorParams);
                                                    }
                                                }
                                            } else {
                                                that.navigatorParams.component = MainPage;
                                                that.navigatorParams.params = {}
                                                that.toNextPage(that.navigatorParams);
                                            }
                                        });
                                    } else {
                                        that.navigatorParams.component = LoginAndRegister;
                                        that.toNextPage(that.navigatorParams);
                                    }
                                }
                            }
                        });
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
        name: 'MainPage',
        component: MainPage,
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

