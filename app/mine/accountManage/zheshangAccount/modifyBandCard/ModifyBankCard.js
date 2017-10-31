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
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import TextInputItem from '../component/TextInputItem'

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
                        centerText={'更换银行卡'}
                        rightText={""}
                        centerTextStyle={{paddingHorizontal:0, backgroundColor:'red'}}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"更换银行卡"}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                    centerTextStyle={{paddingLeft:0,paddingRight:0}}
                />
                <View style = {{width:width, marginTop:15, }}>

                    <TextInputItem
                        title={'资金账号'}
                        value={'1234567890987654321'}
                        keyboardType={'number-pad'}
                        editable={false}
                    />
                    <TextInputItem
                        title={'原银行卡'}
                        value={'发生防守打法三个傻瓜'}
                        editable={false}
                    />
                    <TextInputItem
                        title={'账户余额'}
                        value={'12345678909'}
                        textPlaceholder={'请输入短信验证码'}
                        keyboardType={'number-pad'}
                        editable={false}
                        separator={false}
                    />

                </View>
                <View style = {{width:width, marginTop:15, }}>
                    <TextInputItem
                        title={'新银行卡'}
                        textPlaceholder={'请输入您的新银行卡卡号'}
                        keyboardType={'number-pad'}

                        maxLength={11}
                    />
                    <TextInputItem
                        titleStyle={{letterSpacing:8}}
                        inputTextStyle={{paddingLeft:8}}
                        title={'开户行'}
                        textPlaceholder={'请输入开户行支行信息'}
                    />
                    <TextInputItem
                        titleStyle={{letterSpacing:8}}
                        inputTextStyle={{paddingLeft:8}}
                        title={'手机号'}
                        value={'1234567890'}
                        editable={false}
                        rightButton={true}
                    />
                    <TextInputItem
                        titleStyle={{letterSpacing:8}}
                        inputTextStyle={{paddingLeft:8}}
                        title={'验证码'}
                        textPlaceholder={'请输入短信验证码'}
                        separator={false}
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

