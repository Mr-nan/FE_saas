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


export default class Result extends BaseComponent {


    constructor(props) {
        super(props)


    }


    render() {
        return (
            <View style={styles.root}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'支付结果'}
                    rightText={""}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView>


                    <View style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: Pixel.getPixel(30)
                    }}>
                        <Image source={require('../../../../../images/carriagePriceImage/支付成功.png')}/>
                        <SaasText style={{fontSize: 15,}}>支付成功</SaasText>
                        {
                            <SaasText
                                style={{fontSize: 13, fontWeight: '200', marginTop: Pixel.getPixel(10)}}>失败原因</SaasText>
                        }


                    </View>


                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: Pixel.getPixel(15),
                            marginTop: Pixel.getPixel(10)
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
                                style={{fontSize: 15, fontWeight: '200', color: fontAndColor.COLORA1}}>支付金额</SaasText>
                            <SaasText style={{fontSize: 15, fontWeight: '200',}}>5000</SaasText>

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
                                style={{fontSize: 15, fontWeight: '200', color: fontAndColor.COLORA1}}>运单号</SaasText>
                            <SaasText style={{fontSize: 15, fontWeight: '200',}}>8888888888888888</SaasText>

                        </View>


                    </View>


                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'确定'}
                        parentStyle={styles.next_parentStyle}
                        childStyle={styles.next_childStyle}
                        mOnPress={() => {


                        }}/>


                </ScrollView>

                <View
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: Pixel.getPixel(15),
                        bottom: 0,
                        position: 'absolute',
                        width: width,
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}
                >


                    <View style={{
                        height: Pixel.getPixel(50.5),
                        backgroundColor: 'white',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>

                        <TouchableOpacity activeOpacity={1} onPress={() => {

                        }}>
                            <View style={{
                                width: Pixel.getPixel(100.5),
                                height: Pixel.getPixel(32.5),
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: Pixel.getPixel(2),
                                borderColor: fontAndColor.COLORA1,
                                borderWidth: Pixel.getPixel(1),
                                marginRight: Pixel.getPixel(12)
                            }}>
                                <Text style={{
                                    color: fontAndColor.COLORA1,
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                }}>暂不支付</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => {

                        }}>
                            <View style={{
                                width: Pixel.getPixel(100.5),
                                height: Pixel.getPixel(32.5),
                                backgroundColor: fontAndColor.COLORB0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: Pixel.getPixel(2)
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
                                }}>继续支付</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

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