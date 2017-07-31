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
    ScrollView,
    Modal
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

export class DailyReminderSelectView extends Component {

    render() {
        const {checkedSource, checkTimeFrameClick, hideClick, checkedTypeString} = this.props;
        return (
            <View style={styles.selectView}>
                <View style={{backgroundColor: 'white'}}>
                    <ScrollView>
                        {
                            checkedSource.map((data, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        checkTimeFrameClick(data, index);
                                    }}>
                                        <View style={styles.checkedCell}>
                                            {
                                                <Text allowFontScaling={false}
                                                      style={[styles.checkedCellText,
                                                          data.name == checkedTypeString && {color: fontAndColor.COLORB0}]}>{data.name}
                                                </Text>
                                            }

                                        </View>
                                    </TouchableOpacity>

                                )
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    hideClick()
                }}/>
            </View>
        )
    }
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