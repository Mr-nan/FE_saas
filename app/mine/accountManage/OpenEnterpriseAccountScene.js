/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager,
    KeyboardAvoidingView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import LoginInputText from "../../login/component/LoginInputText";
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
export  default class OpenEnterpriseAccountScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="gsmc"
                            textPlaceholder={'请输入公司名称'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                       <View></View>
                        <LoginInputText
                            ref="shxydm"
                            textPlaceholder={'请输入证件号'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                    </View>
                </KeyboardAvoidingView>
                    <View style={styles.inputTextLine}/>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                    <View style={styles.inputStyle}>
                        <LoginInputText
                            ref="frxm"
                            textPlaceholder={'请输入法人姓名'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="frsfzh"
                            textPlaceholder={'请输入法人身份证号'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                    </View>
                    </KeyboardAvoidingView>
                    <View style={styles.inputTextLine}/>
                    <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={5}>
                    <View style={styles.inputStyle}>
                        <LoginInputText
                            ref="jbrxm"
                            textPlaceholder={'请输入经办人姓名'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="jbrsfzh"
                            textPlaceholder={'请输入经办人身份证号'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="jbrsjh"
                            textPlaceholder={'请输入经办人手机号'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                    </View>
                    </KeyboardAvoidingView>

                <Text style={{color: fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                marginTop:Pixel.getPixel(20),marginLeft:Pixel.getPixel(15)}}>
                    请确认您的企业信息填写准确
                </Text>

                <TouchableOpacity onPress={()=>{

                }} activeOpacity={0.8} style={{backgroundColor:fontAndColor.COLORB0,marginTop:Pixel.getPixel(15),
                width:width-Pixel.getPixel(30),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),
                height:Pixel.getPixel(44),justifyContent:'center',alignItems: 'center'}}>
                    <Text style={{color:'#fff',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>确认开通</Text>
                </TouchableOpacity>
                <NavigationView
                    title="开通企业账户"
                    backIconClick={this.backPage}
                />
                </ScrollView>
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="开通企业账户"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    buttonStyle: {
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(10),
    },
    itemStyel: {},
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop:Pixel.getTitlePixel(79)
    },
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    imageButtonsStyle: {
        width: width,
        height: Pixel.getPixel(88),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),

    },
    imageButtonStyle: {
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(60),
        resizeMode: 'contain'
    },
    imageClearButtonStyle: {
        width: Pixel.getPixel(17),
        height: Pixel.getPixel(17),
    },
    imagebuttonok: {
        width: width,
        backgroundColor:fontAndColor.COLORA3,
        height:Pixel.getPixel(130),
        paddingLeft:Pixel.getPixel(15),
        paddingRight:Pixel.getPixel(15),
        paddingTop:Pixel.getPixel(25)
    },
    inputStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    }
});