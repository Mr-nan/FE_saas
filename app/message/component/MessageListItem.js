/**
 * Created by hanmeng on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Modal
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import HeadLineDetailScene from "../headLine/HeadLineDetailScene";
const Pixel = new PixelUtil();
import SQLiteUtil from "../../utils/SQLiteUtil";
import BaseComponent from "../../component/BaseComponent";
import SysMessageDetailScene from "../sysMessage/SysMessageDetailScene";
const SQLite = new SQLiteUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');

export class MessageListItem extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.state = {
            isRead: this.props.rowData.isRead
        };
    }

    /**
     *
     * @returns {XML}
     **/
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.props.type === 'advertisement') {
                        this.updateHeadLineInfoState(this.props.rowData.id);
                        this.toNextPage({
                            name: 'HeadLineDetailScene',
                            component: HeadLineDetailScene,
                            params: {
                                url: this.props.rowData.content
                            }
                        });
                    } else {
                        this.updateSysMessageInfoState(this.props.rowData.id);
                        this.toNextPage({
                            name: 'SysMessageDetailScene',
                            component: SysMessageDetailScene,
                            params: {
                                url: this.props.rowData.content
                            }
                        });
                    }
                }}>
                <View style={{
                    marginRight: Pixel.getPixel(15),
                    marginLeft: Pixel.getPixel(15),
                    backgroundColor: '#ffffff',
                    borderRadius: Pixel.getPixel(4),
                    borderWidth: 1,
                    borderColor: '#ffffff'
                }}>
                    <Text allowFontScaling={false} style={{
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(20),
                        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT),
                        color: this.state.isRead ? fontAndColor.COLORA1 : fontAndColor.COLORA0
                    }}>{this.props.rowData.title}</Text>
                    <Text allowFontScaling={false} style={{
                        marginLeft: Pixel.getPixel(15),
                        marginTop: Pixel.getPixel(10),
                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
                        color: fontAndColor.COLORA1
                    }}> </Text>
                    <View style={{
                        marginTop: Pixel.getPixel(10),
                        marginRight: Pixel.getPixel(15),
                        marginLeft: Pixel.getPixel(15),
                        height: 1,
                        backgroundColor: fontAndColor.COLORA4
                    }}/>
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: Pixel.getPixel(44),
                        backgroundColor: '#ffffff'
                    }}>
                        <Text allowFontScaling={false} style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
                            color: fontAndColor.COLORA2
                        }}>查看详情</Text>
                        <View style={{flex: 1}}/>
                        <Image source={cellJianTou} style={{marginRight: Pixel.getPixel(15)}}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     *   更新数据库中数据的已读状态isRead
     **/
    updateHeadLineInfoState = (id) => {
        SQLite.changeData('UPDATE messageHeadLineModel set isRead = ? WHERE id = ?',
            [true, id]);
        this.setState({
            isRead: true
        });
    };

    /**
     *   更新数据库中数据的已读状态isRead
     **/
    updateSysMessageInfoState = (id) => {
        SQLite.changeData('UPDATE messageSystemModel set isRead = ? WHERE id = ?',
            [true, id]);
        this.setState({
            isRead: true
        });
    };

}

const styles = StyleSheet.create({
    selectView: {
        top: Pixel.getTitlePixel(75),
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: 0
    },
    checkedCell: {
        backgroundColor: 'white',
        height: Pixel.getPixel(44),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA3
    },
    checkedCellText: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT),
        textAlign: 'center',
        color: fontAndColor.COLORA0
    }
});