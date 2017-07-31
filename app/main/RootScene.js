import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    Text,
    AppState
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import MyButton from '../component/MyButton';
let {height, width} = Dimensions.get('window');
import MainPage from './MainPage';
import LoginAndRegister from '../login/LoginAndRegister';
import StorageUtil from '../utils/StorageUtil';
import * as KeyNames from '../constant/storageKeyNames';
import WelcomScene from './WelcomScene';
import LoginGesture from '../login/LoginGesture';
import {request} from '../utils/RequestUtil';
import * as Urls from '../constant/appUrls';
import  UpLoadScene from './UpLoadScene';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
import codePush from 'react-native-code-push'
const versionCode = 20.0;
let canNext = true;
let Platform = require('Platform');
let deploymentKey = '';
import ErrorUtils from "ErrorUtils"

export default class RootScene extends BaseComponent {

    componentDidMount() {
        // codePush.sync();
        // AppState.addEventListener("change", (newState) => {
        //     newState === "active" && codePush.sync();
        // });


        //如果获取模拟器错误日志，需将下面代码屏蔽！！！！！！！！！！！！！！！！！！！！！！！


        // ErrorUtils.setGlobalHandler((e) => {　//发生异常的处理方法,当然如果是打包好的话可能你找都找不到是哪段代码出问题了
        //     this.props.showToast('' + JSON.stringify(e));
        //     StorageUtil.mGetItem(KeyNames.PHONE, (data) => {
        //         let maps = {
        //             phone: data.result,
        //             message: '' + JSON.stringify(e)
        //         };
        //         request(Urls.ADDACCOUNTMESSAGEINFO, 'Post', maps)
        //             .then((response) => {
        //
        //                 },
        //                 (error) => {
        //                 });
        //     });
        //
        // });

        //如果获取模拟器错误日志，需将上面代码屏蔽！！！！！！！！！！！！！！！！！！！！！！！


        // if (Platform.OS === 'android') {
        //     deploymentKey = 'fSQnzvsEP5qb9jD_tr4k2QC9pKlie1b7b22b-ea3f-4c77-abcc-72586c814b3c';
        // } else {
        //     deploymentKey = 'TXKA_1RB5rKvXMOuBTMqPoon2c5Pe1b7b22b-ea3f-4c77-abcc-72586c814b3c';
        // }
        // codePush.checkForUpdate(deploymentKey).then((update) => {
        //     if (!update) {
        //     } else {
        //         codePush.sync({
        //             deploymentKey: deploymentKey,
        //             updateDialog: {
        //                 optionalIgnoreButtonLabel: '稍后',
        //                 optionalInstallButtonLabel: '立即更新',
        //                 optionalUpdateMessage: '请更新到最新版本',
        //                 title: '更新提示'
        //             },
        //             installMode: codePush.InstallMode.IMMEDIATE,
        //         }, (status) => {
        //             switch (status) {
        //                 case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        //                     break;
        //                 case codePush.SyncStatus.INSTALLING_UPDATE:
        //                     break;
        //             }
        //         }, (progress) => {
        //         });
        //     }
        // });

        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        let maps = {
            type: '6',
            api: 'api/v1/App/Update'
        };
        request(Urls.APP_UPDATE, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data.versioncode > versionCode) {
                        this.navigatorParams.component = UpLoadScene;
                        this.navigatorParams.params = {url: response.mjson.data.downloadurl}
                        this.toNextPage(this.navigatorParams);
                    } else {
                        this.toJump();
                    }
                },
                (error) => {
                    this.toJump();
                });
    }

    /**
     *
     * 跳转
     **/
    toJump = () => {
        StorageUtil.mSetItem(KeyNames.NEED_GESTURE, 'true');
        let that = this;
        StorageUtil.mGetItem(KeyNames.FIRST_INTO, (res) => {
            if (res.result == null) {
                that.navigatorParams.component = WelcomScene;
                that.navigatorParams.name = 'WelcomScene';
                that.toNextPage(that.navigatorParams);
            } else {
                StorageUtil.mGetItem(KeyNames.ISLOGIN, (res) => {
                    if (res.result !== StorageUtil.ERRORCODE) {
                        if (res.result == null) {
                            that.navigatorParams.component = LoginAndRegister;
                            that.navigatorParams.name = 'LoginAndRegister';
                            that.toNextPage(that.navigatorParams);
                        } else {
                            if (res.result == "true") {

                                StorageUtil.mGetItem(KeyNames.USER_INFO, (data) => {
                                    let datas = JSON.parse(data.result);
                                    if (datas.user_level == 2) {
                                        if (datas.enterprise_list == null || datas.enterprise_list.length <= 0) {
                                            that.navigatorParams.component = LoginAndRegister;
                                            that.navigatorParams.name = 'LoginAndRegister';
                                            that.toNextPage(that.navigatorParams);
                                        } else {
                                            that.navigatorParams.component = LoginGesture;
                                            that.navigatorParams.name = 'LoginGesture';
                                            that.navigatorParams.params = {from: 'RootScene'}
                                            that.toNextPage(that.navigatorParams);
                                        }
                                    } else {
                                        if (datas.enterprise_list == null || datas.enterprise_list.length <= 0) {
                                            that.navigatorParams.component = LoginAndRegister;
                                            that.navigatorParams.name = 'LoginAndRegister';
                                            that.toNextPage(that.navigatorParams);
                                        } else {
                                            that.navigatorParams.component = LoginGesture;
                                            that.navigatorParams.name = 'LoginGesture';
                                            that.navigatorParams.params = {from: 'RootScene'}
                                            that.toNextPage(that.navigatorParams);
                                        }
                                    }
                                });
                            } else {
                                that.navigatorParams.component = LoginAndRegister;
                                that.navigatorParams.name = 'LoginAndRegister';
                                that.toNextPage(that.navigatorParams);
                            }
                        }
                    }
                });
            }
        });
    }


//     onPress = () => {
//         if(canNext){
//             let that = this;
//             StorageUtil.mSetItem(KeyNames.NEED_GESTURE, 'true');
//             StorageUtil.mGetItem(KeyNames.FIRST_INTO, (res) => {
//                 if (res.result == null) {
//                     that.navigatorParams.component = WelcomScene;
//                     that.toNextPage(that.navigatorParams);
//                 } else {
//
//                     StorageUtil.mGetItem(KeyNames.ISLOGIN, (res) => {
//                         if (res.result !== StorageUtil.ERRORCODE) {
//                             if (res.result == null) {
//                                 that.navigatorParams.component = LoginAndRegister;
//                                 that.toNextPage(that.navigatorParams);
//                             } else {
//                                 if (res.result == "true") {
//
//                                     StorageUtil.mGetItem(KeyNames.USER_INFO, (data) => {
//                                         let datas = JSON.parse(data.result);
//                                         if (datas.user_level == 2) {
//                                             if (datas.enterprise_list == null || datas.enterprise_list.length <= 0) {
//                                                 that.navigatorParams.component = LoginAndRegister;
//                                                 that.toNextPage(that.navigatorParams);
//                                             } else {
//                                                 if (datas.enterprise_list[0].role_type == '2') {
//                                                     that.navigatorParams.component = LoginGesture;
//                                                     that.navigatorParams.params = {from: 'RootScene'}
//                                                     that.toNextPage(that.navigatorParams);
//                                                 } else {
//                                                     that.navigatorParams.component = MainPage;
//                                                     that.navigatorParams.params = {}
//                                                     that.toNextPage(that.navigatorParams);
//                                                 }
//                                             }
//                                         } else {
//                                             that.navigatorParams.component = MainPage;
//                                             that.navigatorParams.params = {}
//                                             that.toNextPage(that.navigatorParams);
//                                         }
//                                     });
//                                 } else {
//                                     that.navigatorParams.component = LoginAndRegister;
//                                     that.toNextPage(that.navigatorParams);
//                                 }
//                             }
//                         }
//                     });
//                 }
//             });
//             canNext=false;
//         }
//
//     // this.toNextPage(this.mProps)
// }

    onPress = () => {
        let that = this;
        StorageUtil.mSetItem(KeyNames.NEED_GESTURE, 'true');
        StorageUtil.mGetItem(KeyNames.FIRST_INTO, (res) => {
            if (res.result == null) {
                that.navigatorParams.component = WelcomScene;
                that.navigatorParams.name = 'WelcomScene';
                that.toNextPage(that.navigatorParams);
            } else {
                StorageUtil.mGetItem(KeyNames.ISLOGIN, (res) => {
                    if (res.result !== StorageUtil.ERRORCODE) {
                        if (res.result == null) {
                            that.navigatorParams.component = LoginAndRegister;
                            that.navigatorParams.name = 'LoginAndRegister';
                            that.toNextPage(that.navigatorParams);
                        } else {
                            if (res.result == "true") {

                                StorageUtil.mGetItem(KeyNames.USER_INFO, (data) => {
                                    let datas = JSON.parse(data.result);
                                    if (datas.user_level == 2) {
                                        if (datas.enterprise_list == null || datas.enterprise_list.length <= 0) {
                                            that.navigatorParams.component = LoginAndRegister;
                                            that.navigatorParams.name = 'LoginAndRegister';
                                            that.toNextPage(that.navigatorParams);
                                        } else {
                                            that.navigatorParams.component = LoginGesture;
                                            that.navigatorParams.name = 'LoginGesture';
                                            that.navigatorParams.params = {from: 'RootScene'}
                                            that.toNextPage(that.navigatorParams);
                                        }
                                    } else {
                                        if (datas.enterprise_list == null || datas.enterprise_list.length <= 0) {
                                            that.navigatorParams.component = LoginAndRegister;
                                            that.navigatorParams.name = 'LoginAndRegister';
                                            that.toNextPage(that.navigatorParams);
                                        } else {
                                            that.navigatorParams.component = LoginGesture;
                                            that.navigatorParams.name = 'LoginGesture';
                                            that.navigatorParams.params = {from: 'RootScene'}
                                            that.toNextPage(that.navigatorParams);
                                        }
                                    }
                                });
                            } else {
                                that.navigatorParams.component = LoginAndRegister;
                                that.navigatorParams.name = 'LoginAndRegister';
                                that.toNextPage(that.navigatorParams);
                            }
                        }
                    }
                });
            }
        });
        // this.toNextPage(this.mProps)
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
        content: require("../../images/splash.png")
    }

    render() {
        return (
            <Image style={{backgroundColor: '#00000000',alignItems:'flex-end',resizeMode:'contain',flex:1,width:width}}
                   source={require('../../images/splash.png')}>
                <TouchableOpacity onPress={()=>{this.onPress()}} activeOpacity={0.8} style={{width:Pixel.getPixel(30),height:Pixel.getPixel(30),borderRadius: 1000,justifyContent:'center',
                alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.2)',marginRight: Pixel.getPixel(15),
                marginTop:Pixel.getTitlePixel(35)}}>
                    <Text allowFontScaling={false} style={{color:'#fff',fontSize:Pixel.getFontPixel(12)}}>取消</Text>
                </TouchableOpacity>
            </Image>
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

