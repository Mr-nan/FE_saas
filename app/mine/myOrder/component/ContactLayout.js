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
const {width, height} = Dimensions.get('window');
const Pixel = new PixelUtil();

export default class ContactLayout extends Component {

    constructor(props) {
        super(props);
        this.showShopId = this.props.showShopId;
    }

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

    render() {
        return (
            <View style={this.props.layoutContent ? styles.itemType1 : styles.itemType1NoContent}>
                <View style={{width: Pixel.getPixel(310)}}>
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
                        <Text style={styles.itemType1Ttile}>{this.props.layoutTitle}</Text>
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
                        <Text style={styles.itemType1Content}>{this.props.layoutContent}</Text> :
                        null}
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={{marginRight: Pixel.getPixel(15), alignSelf: 'center'}}
                    onPress={() => {
                        this.callClick(this.showShopId);
                    }}>
                    <Image
                        source={require('../../../../images/mainImage/making_call.png')}/>
                </TouchableOpacity>

                <ExplainModal ref='expModal' title={this.props.promptTitle} buttonStyle={styles.expButton}
                              textStyle={styles.expText}
                              text='知道了' content={this.props.promptContent}/>
                <MakePhoneModal ref='mkcModal'/>
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
    }
});
