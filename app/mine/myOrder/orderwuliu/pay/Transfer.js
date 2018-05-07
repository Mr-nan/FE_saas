import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../../../component/NavigationBar';
import * as fontAndColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import * as Net from '../../../../utils/RequestUtil';
import * as AppUrls from '../../../../constant/appUrls';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
import MyButton from '../../../../component/MyButton'


export default class Transfer extends BaseComponent {


    constructor(props) {
        super(props)

    }


    render() {
        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'转账支付'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView>
                    <View style={{paddingVertical: Pixel.getPixel(11)}}>
                        <SaasText style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: 12,
                            color: fontAndColor.COLORA1
                        }}>收款方信息</SaasText>
                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: Pixel.getPixel(15),

                        }}
                    >

                        <View
                            style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: fontAndColor.COLORA4,
                                paddingVertical: Pixel.getPixel(15)
                            }}
                        >

                            <SaasText
                                style={{
                                    fontSize: 15,
                                    fontWeight: '200',
                                    color: fontAndColor.COLORA1,
                                    flex: 1
                                }}>开户人</SaasText>
                            <SaasText
                                style={{fontSize: 15, fontWeight: '200', flex: 1.5}}>说服力双方律师费案例都是看风景sad离开公</SaasText>

                        </View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: fontAndColor.COLORA4,
                                paddingVertical: Pixel.getPixel(15)
                            }}
                        >

                            <SaasText
                                style={{
                                    fontSize: 15,
                                    fontWeight: '200',
                                    color: fontAndColor.COLORA1,
                                    flex: 1
                                }}>开户行</SaasText>
                            <SaasText style={{fontSize: 15, fontWeight: '200', flex: 1.5}}>说服力双方律师费案例都是看</SaasText>

                        </View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: Pixel.getPixel(15)
                            }}
                        >

                            <SaasText
                                style={{
                                    fontSize: 15,
                                    fontWeight: '200',
                                    color: fontAndColor.COLORA1,
                                    flex: 1
                                }}>开户行账号</SaasText>
                            <View
                                style={{
                                    flex:1.5,
                                    alignItems:'flex-end'
                                }}

                            >
                                <SaasText style={{fontSize: 15, fontWeight: '200', lineHeight:35}}>88888888888888</SaasText>
                                <TouchableOpacity activeOpacity={.7} onPress={() => {

                                }}>
                                    <View style={{
                                        width: Pixel.getPixel(75),
                                        height: Pixel.getPixel(24),
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: Pixel.getPixel(2),
                                        borderColor: fontAndColor.COLORB0,
                                        borderWidth: Pixel.getPixel(1),

                                    }}>
                                        <Text style={{
                                            color: fontAndColor.COLORB0,
                                            fontSize: 11
                                        }}>复制账号</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>

                    <View
                        style={{
                            marginHorizontal: Pixel.getPixel(15),
                            marginTop: Pixel.getPixel(20)

                        }}
                    >
                        <SaasText style={{fontSize: 12, fontWeight: '200', lineHeight: 20}}>友情提示：</SaasText>
                        <SaasText style={{
                            fontSize: 12,
                            fontWeight: '200',
                            color: fontAndColor.COLORA1,
                            lineHeight: 20
                        }}>{"1.转账前请仔细确认目标账户是否一致；\n2.通过线上手机银行、网银转账请截图或保存电子凭证，并上传； \n3.通过线下银行柜台、ATM机转账，请拍摄纸质凭证，并上传。"}
                        </SaasText>

                    </View>


                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'已转账，去上传支付凭证'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {

                        }}/>
                </ScrollView>

            </View>)
    }
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3,
    },
    next_parentStyle: {
        backgroundColor: fontAndColor.COLORB0,
        marginHorizontal: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(53),
        borderRadius: 2
    },

    next_childStyle: {
        fontSize: 16,
        color: 'white',
        marginVertical: Pixel.getPixel(15)
    }

})