/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../../../../../component/BaseComponent";
import NavigationBar from "../../../../../component/NavigationBar";
import * as FontAndColor from "../../../../../constant/fontAndColor";
import PixelUtil from "../../../../../utils/PixelUtil";
import MyButton from "../../../../../component/MyButton";
import {request} from "../../../../../utils/RequestUtil";
import * as AppUrls from "../../../../../constant/appUrls";
import md5 from "react-native-md5";
import StorageUtil from "../../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../../constant/storageKeyNames";
import TextInputItem from '../../component/TextInputItem'

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var Platform = require('Platform');

export default class NameAndIdScene extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
        }
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'个人开户'}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"个人开户"}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />
                <View style = {{width:width, marginTop:15, }}>

                    <TextInputItem
                        title={'银行卡号'}
                        textPlaceholder={'请输入您的银行卡号'}
                        keyboardType={'number-pad'}
                    />
                    <TextInputItem
                        title={'手机号码'}
                        rightButton={true}
                        maxLength={11}
                        keyboardType={'number-pad'}
                    />
                    <TextInputItem
                        title={'短信验证'}
                        separator={false}
                        keyboardType={'number-pad'}
                    />
                </View>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'下一步'}
                          parentStyle={styles.buttonStyle}
                          childStyle={styles.buttonTextStyle}
                          mOnPress={this.setPwd}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: FontAndColor.COLORA3,
    },
    buttonStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginVertical: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
    },
    buttonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
    itemStyel: {
        backgroundColor: "#ffffff",
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
});

