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

export default class CommunicationRecordItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.childItems = [];
        this.childItems.push({name: '客户级别', value: ''});
        this.childItems.push({name: '进店时间', value: ''});
        this.childItems.push({name: '离店时间', value: ''});
        this.childItems.push({name: '进店人数', value: ''});
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
            if (i == 0) {
                items.push(<ClientInfoSelected ref='selectsex' key={i + 'bo'} items={this.childItems[i]}
                                                 toSelect={() => {
                                                     this.toNextPage({
                                                         name: 'SelectScene',
                                                         component: SelectScene,
                                                         params: {
                                                             regShowData: ['A:一周以内(购买欲望特别强)', 'B:一月以内(准买车用户)', 'C:三个月以内(有购买意向)', 'D:闲逛(近期无意向)'],
                                                             title: '客户级别',
                                                             callBack: (name, index) => {
                                                                 this.childItems[i].value = name + ',' + index;
                                                                 this.refs.selectsex.setValue(name);
                                                             }
                                                         }
                                                     })
                                                 }}/>);
            } else if (i == 1) {
                items.push(<ClientInfoSelected ref="company" key={i + 'bo'} items={this.childItems[i]}
                                                 toSelect={() => {
                                                     this.toNextPage({
                                                         name: 'SelectCompanyScene',
                                                         component: SelectCompanyScene,
                                                         params: {
                                                             comps: comps,
                                                             title: '选择公司',
                                                             callBack: (selected) => {
                                                                 this.childItems[i].value = selected;
                                                                 this.refs.company.setValue(selected[0].enterprise_name);
                                                             }
                                                         }
                                                     })
                                                 }}/>);
            } else if (i == 2) {
                items.push(<ClientInfoSelected ref='juese' key={i + 'bo'} items={this.childItems[i]}
                                                 toSelect={() => {
                                                     this.toNextPage({
                                                         name: 'SelectGenderScene',
                                                         component: SelectGenderScene,
                                                         params: {
                                                             title: '选择角色',
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