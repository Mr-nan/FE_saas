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
import ExplainModal from "../../../../mine/myOrder/component/ExplainModal";
const Pixel = new PixelUtil();

export default class BaseInfoItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.childItems = [];
        this.childItems.push({name: '客户姓名', value: '', parameter: 'customerName'});
        this.childItems.push({name: '电话', value: '', parameter: 'customerPhone'});
        this.childItems.push({name: '当前客户状态', value: '', parameter: 'customerStatus'});
        this.childItems.push({name: '信息来源', value: '', parameter: 'informationSources'});
        this.childItems.push({name: '地域', value: '', parameter: 'customerRegion'});
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
     *   获取表单内数据
     **/
    getItemData = () => {
        return this.childItems;
    };

    /**
     *
     **/
    render() {
        let items = [];
        if (this.props.editState != 'look') {
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
                    items.push(<CustomerInfoInput callBack={this.userAireadyExist} key={i + 'bo'}
                                                  items={this.childItems[i]}/>);
                }

            }
        } else {
            for (let i = 0; i < this.childItems.length; i++) {
                items.push(
                    <View
                        key={i + 'bo'}
                        style={{
                            width: width,
                            height: Pixel.getPixel(45),
                            backgroundColor: '#fff'
                        }}>
                        <View style={{
                            width: width,
                            height: Pixel.getPixel(44),
                            backgroundColor: '#00000000',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text allowFontScaling={false}
                                  style={{
                                      marginLeft: Pixel.getPixel(15),
                                      width: Pixel.getPixel(125),
                                      fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                      color: fontAndColor.COLORA1
                                  }}>{this.childItems[i].name}</Text>
                            <Text allowFontScaling={false}
                                  style={{
                                      fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                      color: '#000'
                                  }}>dasdadada</Text>
                        </View>
                        <View style={{
                            width: width,
                            height: Pixel.getPixel(1),
                            backgroundColor: fontAndColor.COLORA3
                        }}/>
                    </View>)
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
                <ExplainModal ref={(ref) => {
                    this.em = ref
                }} title="提示" content="用户已经存在" text="确定"
                              buttonStyle={styles.expButton}
                              textStyle={styles.expText}/>
            </View>
        )
    }

    /**
     *  用户已经存在弹出提示框
     **/
    userAireadyExist = () => {
        this.em.changeShowType(true, "提示", "用户已经存在", "确定");
    };
}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    expButton: {
        marginBottom: Pixel.getPixel(20),
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(35),
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
});