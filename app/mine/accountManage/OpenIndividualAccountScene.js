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
const childItems = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
export  default class OpenIndividualAccountScene extends BaseComponent {

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
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="name"
                            textPlaceholder={'请输入真实姓名'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            import={false}
                            clearValue={true}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="businessName"
                            textPlaceholder={'请输入身份证号码'}
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
                    请确认您的姓名与身份证信息填写准确
                </Text>

                <TouchableOpacity onPress={()=>{

                }} activeOpacity={0.8} style={{backgroundColor:fontAndColor.COLORB0,marginTop:Pixel.getPixel(15),
                width:width-Pixel.getPixel(30),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),
                height:Pixel.getPixel(44),justifyContent:'center',alignItems: 'center'}}>
                    <Text style={{color:'#fff',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>确认开通</Text>
                </TouchableOpacity>
                <NavigationView
                    title="开通个人账户"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="开通个人账户"
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
    }
});