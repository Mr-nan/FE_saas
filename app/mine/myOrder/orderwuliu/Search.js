import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, TextInput, Image,
} from 'react-native';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';

const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";
import CheckWaybill from './CheckWaybill';
import SelectDestination from './SelectDestination';
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";

const cellJianTou = require('../../../../images/mainImage/celljiantou@2x.png');
import {request} from '../../../utils/RequestUtil';
import * as Urls from '../../../constant/appUrls';
const Pixel = new PixelUtil();


export default  class  List extends BaseComponent{

    constructor(props){
        super(props)

        this.state = {
            renderPlaceholderOnly: "loading",
        }


    }

    initFinish(){


        this.state = {
            renderPlaceholderOnly: "success",
        }

    }



    render(){

        if (this.state.renderPlaceholderOnly !== 'success') {
            // 加载中....
            return ( <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'我的运单'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                {this.loadView()}
            </View>);
        }

        return(<View>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'我的运单'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />




            </View>
        )
    }







}