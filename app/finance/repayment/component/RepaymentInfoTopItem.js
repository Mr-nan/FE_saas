/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import  PlanChildItem from './PlanChildItem';
export  default class RepaymentInfoTopItem extends PureComponent {

    constructor(props) {
        super(props);
        let model_show = false;
        if(this.props.from === 'SingleRepaymentPage'|| this.props.from === 'PurchaseRepaymentPage'){
            model_show = true;
        }
        this.state = {
            show: 'row',
            model_show:model_show
        };
    }

    /**
     * 非空判断
     * @param content  任意类型值
     */
    isNull = (content) => {
        try {
            if (content == undefined) {
                return true;
            }
            if (content == null) {
                return true;
            }
            if (content instanceof Array) {
                if (content.length <= 0) {
                    return true;
                }
            }
            if (content instanceof Object) {
                if (JSON.stringify(content) == '{}') {
                    return true;
                }
            }
            if (content == 'null') {
                return true;
            }
            if ((content+'').trim() == '') {
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }
    }

    render() {
        return (
            <View style={[{width: width, backgroundColor: '#ffffff'},styles.padding]}>
                <View style={{flex:1,height:Pixel.getPixel(144)}}>
                    <Text allowFontScaling={false} 
                        style={styles.loanCodeStyle}>单号：{this.props.items.test_coupon_info.loan_number}</Text>
                    <View
                        style={{flex: 1,
                        marginTop:Pixel.getPixel(1),
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(1)}]}>
                            应还总额
                        </Text>
                        <Text allowFontScaling={false}  style={styles.loanMoneyStyle}>
                            {this.props.items.total_repayment_money}
                        </Text>
                    </View>
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.itemStyle}>
                    <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0)}]}>
                            借款金额:
                        </Text>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0),color:fontAndColor.COLORA0}]}>
                            {this.props.items.test_coupon_info.loan_mny_str} | {this.props.items.loanperiodstr}
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0)}]}>
                            放款日期:{this.props.items.test_coupon_info.loan_time_str}
                        </Text>
                    </View>
                </View>
                <View style={styles.lineStyle}/>
                {
                    this.state.model_show &&
                    <View style={styles.itemStyle}>
                        <Text allowFontScaling={false}  style={[styles.loanCodeStyle,{marginTop: Pixel.getPixel(0)}]}>
                            {this.isNull(this.props.items.car_info) ? '' :this.props.items.car_info.model_name}
                        </Text>
                    </View>
                }

            </View>
        );
    }

}
const styles = StyleSheet.create({
    padding: {
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(233), justifyContent: 'center'},
    itemStyle: {flex: 1, height: Pixel.getPixel(44), flexDirection: 'row',alignItems:'center'},
    lineStyle: {flex: 1, height: Pixel.getPixel(1), backgroundColor: fontAndColor.COLORA3},
    loanCodeStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(15)
    },
    loanMoneyStyle: {fontSize: Pixel.getFontPixel(32), color: fontAndColor.COLORB2, marginTop: Pixel.getPixel(5)}
})