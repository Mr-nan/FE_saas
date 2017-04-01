/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry
} from 'react-native';
import root from './app/root';
import UmengPush from 'react-native-umeng-push';

//获取DeviceToken
UmengPush.getDeviceToken(deviceToken => {
});

//接收到推送消息回调
UmengPush.didReceiveMessage(message => {
});

//点击推送消息打开应用回调
UmengPush.didOpenMessage(message => {
});

AppRegistry.registerComponent('FE_Sass', () => root);
