/**
 * Created by zhengnan on 2018/8/14.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import  {observable} from 'mobx';
import  {observer} from 'mobx-react'
import  ZNTextInputView from './component/ZNTextInputView';
import  ZNGetNoteButton from './component/ZNGetNoteButton';

var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

export default class NewSetPasswordScreen extends Component{

}