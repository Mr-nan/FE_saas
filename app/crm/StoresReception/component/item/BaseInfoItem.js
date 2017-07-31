/**
 * Created by hanmeng on 2017/5/18.
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

export default class BaseInfoItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.childItems = [];
        this.childItems.push({name: '客户姓名', value: ''});
        this.childItems.push({name: '电话', value: ''});
        this.childItems.push({name: '当前客户状态', value: ''});
        this.childItems.push({name: '信息来源', value: ''});
        this.childItems.push({name: '地域', value: ''});
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
            if (i == 2) {
                items.push(<ClientInfoSelected ref='selectsex' key={i + 'bo'} items={this.childItems[i]}
                                               toSelect={() => {
                                                   this.toNextPage({
                                                       name: 'SelectScene',
                                                       component: SelectScene,
                                                       params: {
                                                           regShowData: ['初次到店', '3日电话邀约-到店', '3日电话邀约-未到店', '7日电话邀约-到店', '7日电话邀约-未到店', '首次购买', '首次置换购买', '置换', '复购'],
                                                           title: '客户状态',
                                                           callBack: (name, index) => {
                                                               this.childItems[i].value = name + ',' + index;
                                                               this.refs.selectsex.setValue(name);
                                                           }
                                                       }
                                                   })
                                               }}/>);
            } else if (i == 3) {
                items.push(<ClientInfoSelected ref="company" key={i + 'bo'} items={this.childItems[i]}
                                               toSelect={() => {
                                                   this.toNextPage({
                                                       name: 'SelectScene',
                                                       component: SelectScene,
                                                       params: {
                                                           regShowData: ['朋友介绍', '朋友圈', '58同城', '二手车之家', 'FM调频广播', '室外广告牌', '同行引荐', '文章引导', '自到店', '转介绍', '其他'],
                                                           title: '信息来源',
                                                           callBack: (name, index) => {
                                                               this.childItems[i].value = name + ',' + index;
                                                               this.refs.company.setValue(name);
                                                           }
                                                       }
                                                   })
                                               }}/>);
            } else if (i == 4) {
                items.push(<ClientInfoSelected ref='juese' key={i + 'bo'} items={this.childItems[i]}
                                               toSelect={() => {
                                                   this.toNextPage({
                                                       name: 'SelectScene',
                                                       component: SelectScene,
                                                       params: {
                                                           regShowData: ['本地', '非本地'],
                                                           title: '地域',
                                                           callBack: (name, index) => {
                                                               this.childItems[i].value = name + ',' + index;
                                                               this.refs.juese.setValue(name);
                                                           }
                                                       }
                                                   })
                                               }}/>);
            } else {
                items.push(<CustomerInfoInput key={i + 'bo'} items={this.childItems[i]}/>);
            }

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
                        allowFontScaling={false}>基本信息</Text>
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