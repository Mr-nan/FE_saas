import React, {Component} from "react";
import {
    View,
    Text, Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ScrollView,
    ListView,
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import SText from '../component/SaasText'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class Log extends BaseComponent {

    constructor() {
        super()
        this.state({
            renderPlaceholderOnly: false
        })
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: true
        })
    }

    render() {
        if (!this.state.renderPlaceholderOnly) {
            return (
                <View>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'账户流水'}
                        rightimageshow={true}
                        rightImage={require('')}
                    />
                </View>
            )
        }


        return (
            <View>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={""}
                    centerText={'账户流水'}
                    rightText={""}
                />


                <ListView
                    renderSectionHeader={this._renderSectionHeader}
                    renderRow={this._renderRow}
                    renderSeparator = {this._renderSeparator}
                    dataSource={this.state.source}
                    onEndReached = {this._onEndReached}
                    onEndReachedThreshold = {1}
                    initialListSize = {10}
                    removeClippedSubviews = {false}
                    renderFooter = {this._renderFooter}
                />

            </View>

        )

    }

    _renderFooter= ()=>{


    }

    _onEndReached = ()=>{


    }

    _renderSeparator = ()=>{


    }
    _renderRow = (data, sectionID, rowID) => {


    }

    _renderSectionHeader = (data, sectionID) => {

    }


}