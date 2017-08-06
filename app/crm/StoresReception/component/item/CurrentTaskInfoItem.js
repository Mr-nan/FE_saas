/**
 * Created by hanmeng on 2017/8/6.
 */
import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
import ClientInfoSelected from "../ClientInfoSelected";
import CustomerInfoInput from "../ClientInfoInput";
import SelectScene from "../../SelectScene";
const Pixel = new PixelUtil();

export default class CurrentTaskInfoItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.childItems = [];
        this.childItems.push({name: '客户状态', value: ''});
        this.childItems.push({name: '跟进时间', value: ''});
        this.childItems.push({name: '跟踪内容', value: ''});
    }

    /**
     *
     **/
    initFinish = () => {
        /*this.setState({
         renderPlaceholderOnly: 'success'
         });*/
    }

    /**
     *
     **/
    getItemData = () => {
        return this.childItems;
    };

    /**
     *
     **/
    render() {
        let items = [];
        for (let i = 0; i < this.childItems.length; i++) {
            items.push(<View
                key={i + 'bo'}
                style={{
                    //width: width,
                    //height: Pixel.getPixel(45),
                    backgroundColor: '#fff'
                }}>
                <View style={{
                    //height: Pixel.getPixel(44),
                    backgroundColor: '#00000000',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    width: width,
                    //marginRight: Pixel.getPixel(15)
                }}>
                    <Text allowFontScaling={false}
                          style={{
                              marginLeft: Pixel.getPixel(15),
                              marginTop: Pixel.getPixel(15),
                              fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                              color: fontAndColor.COLORA0
                          }}>{this.childItems[i].name}</Text>
                    <View style={{flex: 1}}/>
                    <View style={{
                        width: width - Pixel.getPixel(115),
                        marginRight: Pixel.getPixel(15), marginTop: Pixel.getPixel(15),
                        marginBottom: Pixel.getPixel(15),
                    }}>
                        <Text allowFontScaling={false}
                              style={{
                                  alignSelf: 'flex-end',
                                  textAlign: 'left',
                                  fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                  color: fontAndColor.COLORA0
                              }}>测试测试测测试测试测测试测试测测试测试测测试测试测测试测试测</Text>
                    </View>
                </View>
                <View style={{
                    width: width,
                    height: Pixel.getPixel(1),
                    backgroundColor: fontAndColor.COLORA3
                }}/>
            </View>)
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <View style={{height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        marginLeft: Pixel.getPixel(15),
                        backgroundColor: fontAndColor.COLORB0,
                        height: Pixel.getPixel(11),
                        width: Pixel.getPixel(3)
                    }}/>
                    <Text
                        style={{marginLeft: Pixel.getPixel(5), fontWeight: 'bold'}}
                        allowFontScaling={false}>当前任务信息</Text>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: fontAndColor.COLORA3
                }}/>
                {items}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
});