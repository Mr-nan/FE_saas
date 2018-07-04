/**
 * Created by zhengnan on 2018/7/4.
 */

import React from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NativeModules,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    TouchableWithoutFeedback,
}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";
import ImagePicker from "react-native-image-picker";

import * as FontAndColor from "../../constant/fontAndColor";
import MyButton from "../../component/MyButton";
import ProvinceListScene from "../../carSource/ProvinceListScene";
import ImageSourceSample from "../../publish/component/ImageSourceSample";
import * as ImageUpload from "../../utils/ImageUpload";
import {request} from '../../utils/RequestUtil';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";

const Pixel = new PixelUtil();
const selectImg = require('../../../images/financeImages/celljiantou.png');
const IS_ANDROID = Platform.OS === 'android';

export default class CarSuperviseListScreen extends BaseComponent{
    
}