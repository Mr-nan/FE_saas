/**
 * Created by hanmeng on 2017/11/13.
 */
import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text,
    TouchableOpacity,
    InteractionManager
} from "react-native";

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../../component/BaseComponent";
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import {request} from "../../../utils/RequestUtil";
import * as AppUrls from "../../../constant/appUrls";
const Pixel = new PixelUtil();

export default class OpenTrustAccountView extends BaseComponent {

    /**
     *
     * @param props
     **/
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        };
    }


    /**
     *
     **/
    loadData = () => {

    };

    changeState = (isShow) => {
        this.setState({
            isShow: isShow
        });
    };

    /**
     *
     **/
    render() {
        if (this.state.isShow) {
            return (<View style={styles.container}>
                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    this.changeState(false)
                }}/>
            </View>);
        } else {
            return (<View />);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        top: 0,
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: 0
    },
});