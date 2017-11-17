/**
 * Created by hanmeng on 2017/11/13.
 */
import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Image,
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
                <View style={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    width: Pixel.getPixel(260),
                    height: Pixel.getPixel(272),
                    //marginTop: Pixel.getPixel(150),
                    //justifyContent: 'center',
                    top: Pixel.getPixel(150),
                    left: Pixel.getPixel(58),
                    alignSelf: 'center',
                    borderRadius: Pixel.getPixel(4),
                    borderWidth: 1,
                    borderColor: '#ffffff'
                }}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            marginTop: Pixel.getPixel(27),
                            marginLeft: Pixel.getPixel(20),
                            marginRight: Pixel.getPixel(20),
                            color: '#000',
                            fontSize: Pixel.getFontPixel(14),
                            lineHeight: Pixel.getPixel(24)
                        }}>为了使广大用户有更好的用户体验，以及更多的资金用途，新版本给大家开通了信托账户。</Text>
                    <View style={{
                        marginTop: Pixel.getPixel(15), flexDirection: 'row', alignSelf: 'center',
                        marginLeft: Pixel.getPixel(20), marginRight: Pixel.getPixel(20),
                    }}>
                        <Image style={{marginTop: Pixel.getPixel(5)}}
                               source={require('../../../../images/mainImage/agreed_sign.png')}/>
                        <View style={{marginLeft: Pixel.getPixel(5),}}>
                            <Text >
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    我已经阅读并同意
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《用户注册协议》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《服务信托项目信托合同》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《信托风险申请书》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《委托支付协议》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《平台与商户的民事信托合同》
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{alignSelf: 'center', marginTop: Pixel.getPixel(25),}}
                                      onPress={() => {
                                          this.changeState(false);
                                          this.props.callBack();
                                      }}>
                        <View style={{
                            width: Pixel.getPixel(100),
                            height: Pixel.getPixel(32),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 3,
                            borderWidth: 1,
                            borderColor: fontAndColor.COLORB0
                        }}>
                            <Text allowFontScaling={false} style={{
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                color: fontAndColor.COLORB0
                            }}>立刻升级</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        bottom: 0,
    },
});