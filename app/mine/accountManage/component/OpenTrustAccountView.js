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
    InteractionManager,
    Animated,
} from "react-native";

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../../component/BaseComponent";
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import {request} from "../../../utils/RequestUtil";
import * as AppUrls from "../../../constant/appUrls";
import TrustAccountContractScene from "../trustAccount/TrustAccountContractScene";
import SelectButton from "./SelectButton";
import OpenTrustSubmit from "./OpenTrustSubmit";

const Pixel = new PixelUtil();

export default class OpenTrustAccountView extends BaseComponent {

    /**
     *
     * @param props
     **/
    constructor(props) {
        super(props);
        this.contractList = [];
        this.agree_contract = true;
        this.agree_default = true;

        this.state = {
            isShow: false,
            content_height: new Animated.Value(Pixel.getPixel(280))
        };
    }

    /**
     *   没卵用.......
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
     * 控制显示、隐藏并接收数据
     * @param isShow
     * @param data
     **/
    changeStateWithData = (isShow, data) => {
        this.contractList = data;
        this.setState({
            isShow: isShow
        });
    };

    /**
     *   跳转合同预览页
     **/
    openContractScene = (name, url) => {
        this.toNextPage({
            name: 'TrustAccountContractScene',
            component: TrustAccountContractScene,
            params: {
                title: name,
                webUrl: url
            }
        })
    };

    /**
     *   获取OpenTrustSubmit组件ref
     **/
    getOpenTrustSubmitRef = () => {
        return this.openTrustSubmitRef;
    };

    /**
     *   开通信托账户提交
     **/
    openTrustSubmit = () => {
        if (this.agree_contract && this.agree_default) {
            this.changeState(false);
            this.props.callBack();
        }

    };

    /**
     *  render
     **/
    render() {
        if (this.state.isShow) {
            let contractList = [];
            for (let i = 0; i < this.contractList.length; i++) {

                if (this.contractList[i].name.indexOf('机动车辆买卖合同') !== -1 || this.contractList[i].name.indexOf('信托利益分配申请及代为支付指令函')!==-1){
                    contractList.push(<Text
                        key={i + 'contractList'}
                        allowFontScaling={false}
                        onPress={() => {
                            this.openContractScene('合同', this.contractList[i].url)
                            console.log(this.contractList[i].url)
                        }}
                        style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                            color: fontAndColor.COLORB4,
                            lineHeight: Pixel.getPixel(20)
                        }}>
                        《{this.contractList[i].name}》
                    </Text>);

                }
            }

            let a = contractList[contractList.length - 1];
            contractList.splice(0, 0, a);
            contractList.pop()

            return (

                <View style={styles.container}>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: 'center',}}
                        onPress={() => {
                            this.changeState(false)
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                marginTop:Pixel.getPixel(200),
                            }}
                            onPress={()=>{}}
                        >


                        <Animated.View style={{

                            backgroundColor: '#ffffff',
                            borderRadius: Pixel.getPixel(4),
                            width: Pixel.getPixel(260),
                            height: this.state.content_height,
                            paddingBottom: Pixel.getPixel(15),
                            overflow:"hidden",
                        }}>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: Pixel.getPixel(50),
                                    paddingHorizontal: Pixel.getPixel(20)
                                }}
                            >

                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: '#000',
                                        fontSize: Pixel.getFontPixel(15),
                                        lineHeight: Pixel.getPixel(18),
                                    }}
                                >{"\t第1车贷与中信信托合作,为优质合作伙伴开通具备强大金融功能的信托服务账户“粮票”。"}</Text>

                            </View>

                            <View style={{
                                marginTop: Pixel.getPixel(15), alignSelf: 'center',
                                marginHorizontal: Pixel.getPixel(20),
                            }}>
                                <OpenTrustSubmit ref={(ref) => {
                                    this.openTrustSubmitRef = ref
                                }} submit={this.openTrustSubmit}/>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: Pixel.getPixel(15)
                                }}>
                                    <SelectButton onPress={(flag) => {
                                        this.agree_default = flag;
                                        this.openTrustSubmitRef.changeState(this.agree_contract && this.agree_default)
                                    }}/>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                            color: fontAndColor.COLORA1,
                                            marginLeft: Pixel.getPixel(5),
                                            marginTop: Pixel.getPixel(5),
                                            textAlign: 'center',
                                        }}>
                                        默认使用恒丰开户信息开通粮票
                                    </Text>

                                </View>


                                <View
                                    style={{flexDirection: 'row', alignItems: 'center'}}
                                >
                                    <SelectButton onPress={(flag) => {
                                        this.agree_contract = flag;
                                        this.openTrustSubmitRef.changeState(this.agree_contract && this.agree_default)

                                    }}/>

                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                            color: fontAndColor.COLORA1,
                                            lineHeight: Pixel.getPixel(20),
                                            marginLeft: Pixel.getPixel(5)
                                        }}
                                        onPress={() => {
                                            Animated.timing(
                                                this.state.content_height,
                                                {
                                                    toValue:Pixel.getPixel(360)
                                                }
                                            ).start()

                                        }}
                                    >

                                        我已经阅读并同意以下协议,点击查看
                                    </Text>

                                </View>


                            </View>


                            <View style={{
                                marginHorizontal:Pixel.getPixel(15),
                                marginVertical:Pixel.getPixel(9),
                            }}>
                                {contractList}
                            </View>
                        </Animated.View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

            );
        } else {
            return (<View/>);
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
        justifyContent: 'center',
        alignItems: 'center'
    },
});