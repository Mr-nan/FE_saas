/**
 * Created by hanmeng on 2017/5/22.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import PixelUtil from "../../../utils/PixelUtil";
import * as fontAndColor from "../../../constant/fontAndColor";
import ExplainModal from "./ExplainModal";
import MakePhoneModal from "./MakePhoneModal";
import {request} from "../../../utils/RequestUtil";
import * as AppUrls from "../../../constant/appUrls";
import TrustAccountContractScene from "../../accountManage/trustAccount/TrustAccountContractScene";
import SaasText from "../../accountManage/zheshangAccount/component/SaasText";

const {width, height} = Dimensions.get('window');
const Pixel = new PixelUtil();

export default class ContactLayout extends Component {

    /**
     *   初始化
     **/
    constructor(props) {
        super(props);
        this.showShopId = this.props.showShopId;
        this.state = {
            layoutContent: this.props.layoutContent
        };
    }

    /**
     *   更新文字内容
     **/
    setLayoutContent = (content) => {
        this.setState({
            layoutContent: content
        });
    };

    /**
     *   点击"我要咨询"
     **/
    callClick = (show_shop_id) => {
        // this.props.showModal(true);
        request(AppUrls.CAR_CUSTOMER_PHONE_NUMBER, 'post', {'enterprise_uid': show_shop_id}).then((response) => {
            // this.props.showModal(false);
            if (response.mjson.code === 1) {
                // Linking.openURL('tel:'+response.mjson.data.phone);
                this.refs.mkcModal.changeShowType(true, response.mjson.data);
            } else {
                this.props.showToast(response.mjson.msg);
            }
        }, (error) => {
            this.props.showToast(error.msg);
        });

    };


    openContractScene = (name, url) => {
        this.props.toNextPage({
            name: 'TrustAccountContractScene',
            component: TrustAccountContractScene,
            params: {
                title: name,
                webUrl: url
            }
        })
    };

    /**
     *   render
     **/
    render() {
        let contractList = [];

        if(typeof this.props.contractList !== 'undefined'&& this.props.contractList !== null){


            for (let i = 0; i < this.props.contractList.length; i++) {
                if (this.props.contractList[i].name.indexOf('机动车辆买卖合同') !== -1 || this.props.contractList[i].name.indexOf('信托利益分配申请及代为支付指令函') !== -1) {
                    contractList.push(<Text
                        key={i + 'contractList'}
                        allowFontScaling={false}
                        onPress={() => {
                            this.openContractScene('合同', this.props.contractList[i].url)
                            console.log(this.props.contractList[i].url)
                        }}
                        style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                            color: fontAndColor.COLORB4,
                            lineHeight: Pixel.getPixel(20)
                        }}>
                        《{this.props.contractList[i].name}》
                    </Text>);
                }
            }

            let a = contractList[contractList.length - 1];
            contractList.splice(0, 0, a);
            contractList.pop()

        }


        return (

            <View style={{backgroundColor: 'white',}}>
                <View style={this.props.layoutContent ? styles.itemType1 : styles.itemType1NoContent}>
                    <View style={{width: Pixel.getPixel(270)}}>
                        <View style={this.props.layoutContent ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: Pixel.getPixel(15),
                            marginTop: Pixel.getPixel(21)
                        } : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: Pixel.getPixel(15)
                        }}>
                            <Text allowFontScaling={false} style={styles.itemType1Ttile}>{this.props.layoutTitle}</Text>
                            {this.props.setPrompt ? <TouchableOpacity
                                style={{marginLeft: Pixel.getPixel(10)}}
                                onPress={() => {
                                    this.refs.expModal.changeShowType(true, this.props.promptTitle, this.props.promptContent, '知道了');
                                }}>
                                <Image
                                    source={require('../../../../images/mainImage/down_payment.png')}/>
                            </TouchableOpacity> : null}
                        </View>
                        {this.props.layoutContent ?
                            <Text allowFontScaling={false}
                                  style={styles.itemType1Content}>{this.state.layoutContent}</Text> :
                            null}
                    </View>
                    <View style={{flex: 1}}/>
                    {/*<TouchableOpacity
                    style={{marginRight: Pixel.getPixel(15), alignSelf: 'center'}}
                    onPress={() => {
                        this.callClick(this.showShopId);
                    }}>
                    <Image
                        source={require('../../../../images/mainImage/making_call.png')}/>
                </TouchableOpacity>*/}
                    <TouchableOpacity onPress={() => {
                        this.callClick(this.showShopId);
                    }} activeOpacity={0.8} style={styles.negativeButtonStyle}>
                        <Text allowFontScaling={false} style={styles.negativeTextStyle}>我要咨询</Text>
                    </TouchableOpacity>

                    <ExplainModal ref='expModal' title={this.props.promptTitle} buttonStyle={styles.expButton}
                                  textStyle={styles.expText}
                                  text='知道了' content={this.props.promptContent}/>
                    <MakePhoneModal ref='mkcModal'/>
                </View>
                {
                   typeof this.props.contractList !== 'undefined' &&this.props.contractList.length>0?
                    <View
                        style={{marginHorizontal: Pixel.getPixel(15), marginBottom: Pixel.getPixel(5)}}
                    >

                        <SaasText>
                            <SaasText
                                style={{
                                    color: fontAndColor.COLORA1,
                                    fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                                }}
                            >
                                交易完成即表示您已阅读
                            </SaasText>
                            {contractList}
                        </SaasText>
                    </View>:null
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    itemType1: {
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    itemType1NoContent: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        height: Pixel.getPixel(80),
        alignItems: 'center'
    },
    itemType1Ttile: {
        fontSize: Pixel.getFontPixel(fontAndColor.TITLEFONT40),
        color: fontAndColor.COLORB2
    },
    itemType1Content: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginTop: Pixel.getPixel(7),
        marginBottom: Pixel.getPixel(21)
    },
    expButton: {
        marginBottom: Pixel.getPixel(20),
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        marginTop: Pixel.getPixel(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    expText: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    },
    negativeButtonStyle: {
        alignSelf: 'center',
        marginRight: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    negativeTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    }
});
