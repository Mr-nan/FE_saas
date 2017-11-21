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
import TrustAccountContractScene from "../trustAccount/TrustAccountContractScene";
const Pixel = new PixelUtil();

export default class OpenTrustAccountView extends BaseComponent {

    /**
     *
     * @param props
     **/
    constructor(props) {
        super(props);
        this.contractList = [];
        this.state = {
            isShow: false
        };
    }


    /**
     *
     **/
    loadData = () => {

    };

    /**
     * 控制显示、隐藏
     * @param isShow
     **/
    changeState = (isShow) => {
        this.setState({
            isShow: isShow
        });
    };

    /**
     *   跳转合同预览页
     **/
    openContractScene = (agreement_id) => {
        if (this.contractList.length === 0) {
            this.props.showModal(true);
            let maps = {
                source_type: '3',
                fund_channel: '信托'
            };
            request(AppUrls.AGREEMENT_LISTS, 'Post', maps)
                .then((response) => {
                    this.props.showModal(false);
                    //console.log('USER_ACCOUNT_INFO=====', response.mjson.data['zsyxt'].status);
                    /*                this.toNextPage({
                     name: 'AccountFlowScene',
                     component: AccountFlowScene, params: {}
                     })*/
                    this.contractList = response.mjson.data.list;
                    this.toNextPage({
                        name: 'TrustAccountContractScene',
                        component: TrustAccountContractScene,
                        params: {
                            title: this.contractList[0].name,
                            webUrl: this.contractList[0].url
                        }
                    })
                }, (error) => {
                    this.props.showModal(false);
                    this.props.showToast(error.mjson.msg);
                });
        } else {
            this.toNextPage({
                name: 'TrustAccountContractScene',
                component: TrustAccountContractScene,
                params: {
                    title: this.contractList[0].name,
                    webUrl: this.contractList[0].url
                }
            })
        }
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
                                    onPress={() => {this.openContractScene(1)}}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《用户注册协议》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    onPress={() => {this.openContractScene(1)}}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《服务信托项目信托合同》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    onPress={() => {this.openContractScene(1)}}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《信托风险申请书》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    onPress={() => {this.openContractScene(1)}}
                                    style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        color: fontAndColor.COLORA1,
                                        lineHeight: Pixel.getPixel(20)
                                    }}>
                                    《委托支付协议》,
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    onPress={() => {this.openContractScene(1)}}
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