/**
 * Created by hanmeng on 2017/5/9.
 */

import React, {Component, PureComponent} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import StepNode from "./StepNode";

export default class StepView extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let items = this.props.items;
        let item = [];
        //let itemTitle = [];
        for (let i = 0; i < items.length; i++) {
            item.push(<StepNode item={items[i]} key={i + 'child'}/>);
            /*itemTitle.push(<Text style={{
             fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
             color: fontAndColor.COLORA1,
             }} key={i + 'title'}>{items[i].title}</Text>);*/
        }
        return (
            <View style={styles.container}>
                {item}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        //width: width,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    node: {
        marginTop: Pixel.getPixel(15)
    }
});