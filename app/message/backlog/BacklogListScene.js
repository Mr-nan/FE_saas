/**
 * Created by hanmeng on 2017/7/31.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ListView,
    Modal
} from 'react-native';

import NavigatorView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import DailyReminderScene from "../dailyReminder/DailyReminderScene";
const Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');

export class BacklogListScene extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank'
        };
    }

    /**
     *
     **/
    initFinish = () => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['0', '1']),
            renderPlaceholderOnly: 'success'
        });
        //this.loadData();
    };

    /**
     *
     **/
    loadData = () => {

    };

    /**
     *
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            // 加载中....
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='待办事项' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='待办事项' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(80)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          renderSeparator={this._renderSeperator}/>
            </View>);
        }

    }

    /**
     *
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }

    /**
     *
     **/
    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData == '0') {
            return (
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={styles.listItem}>
                        <Text allowFontScaling={false} style={styles.title}>车辆成交</Text>
                        <Text allowFontScaling={false} style={styles.describe}>测试测试测试测试测试测试测试测试测试</Text>
                        <View style={styles.separatedLine}/>
                        <View style={styles.subItem}>
                            <Text allowFontScaling={false} style={styles.subTitle}>查看详情</Text>
                            <View style={{flex: 1}}/>
                            <Image source={cellJianTou} style={styles.image}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '1') {
            return (
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={styles.listItem}>
                        <Text allowFontScaling={false} style={styles.title}>保有客户跟进</Text>
                        <Text allowFontScaling={false} style={styles.describe}>测试测试测试测试测试测试测试测试测试</Text>
                        <View style={styles.separatedLine}/>
                        <View style={styles.subItem}>
                            <Text allowFontScaling={false} style={styles.subTitle}>查看详情</Text>
                            <View style={{flex: 1}}/>
                            <Image source={cellJianTou} style={styles.image}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '2') {
            return (
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={styles.listItem}>

                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '3') {
            return (
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={styles.listItem}>

                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '4') {
            return (
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={styles.listItem}>

                    </View>
                </TouchableOpacity>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),
        backgroundColor: fontAndColor.COLORA3,
    },
    listItem: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        backgroundColor: '#ffffff',
        borderRadius: Pixel.getPixel(4),
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    title: {
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(20),
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT),
        color: fontAndColor.COLORA0
    },
    describe: {
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(10),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color: fontAndColor.COLORA1
    },
    separatedLine: {
        marginTop: Pixel.getPixel(10),
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    subItem: {
        alignItems: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(44),
        backgroundColor: '#ffffff'
    },
    subTitle: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color: fontAndColor.COLORA2
    },
    image: {
        marginRight: Pixel.getPixel(15)
    }
});