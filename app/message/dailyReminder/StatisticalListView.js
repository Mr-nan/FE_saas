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
const dashed = require('../../../images/mainImage/dashed.png');

export class StatisticalListView extends BaseComponent {

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
            dataSource: ds.cloneWithRows(['0', '0', '0']),
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
            </View>);
        } else {
            return (<View style={styles.container}>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getPixel(15)}}
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
                <View style={styles.listItem}>
                    <View style={{flexDirection: 'row'}}>
                        <Text allowFontScaling={false} style={styles.title}>本周统计</Text>
                        <View style={{flex: 1}}/>
                        <Text allowFontScaling={false} style={styles.date}>2017.07</Text>
                    </View>
                    <View style={styles.subItem}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text allowFontScaling={false} style={styles.contentTitle}>上架车辆</Text>
                            <Text allowFontScaling={false} style={styles.contentvalue}>30</Text>
                        </View>
                        <Image source={dashed}/>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text allowFontScaling={false} style={styles.contentTitle}>库存车辆</Text>
                            <Text allowFontScaling={false} style={styles.contentvalue}>30</Text>
                        </View>
                        <Image source={dashed}/>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text allowFontScaling={false} style={styles.contentTitle}>采购车辆</Text>
                            <Text allowFontScaling={false} style={styles.contentvalue}>30</Text>
                        </View>
                    </View>
                </View>
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
        height: Pixel.getPixel(115),
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        backgroundColor: '#ffffff',
        borderRadius: Pixel.getPixel(4),
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    date: {
        marginRight: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(20),
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
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
        marginTop: Pixel.getPixel(20),
        alignItems: 'center',
        flexDirection: 'row',
        height: Pixel.getPixel(35),
        backgroundColor: '#ffffff'
    },
    subTitle: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        color: fontAndColor.COLORA2
    },
    contentTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    contentvalue: {
        marginTop: Pixel.getPixel(4),
        fontSize: Pixel.getFontPixel(19),
        color: fontAndColor.COLORB2
    }
});