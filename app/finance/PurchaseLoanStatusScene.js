/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../constant/fontAndColor';
let MovleData = require('./loanStatus.json');
let movies = MovleData.retdata;
import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import PurchasePickerChildItem from './component/PurchaseLoanStatusItem';
export  default class PurchaseLoanStatusScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(movies),
            renderPlaceholderOnly: true
        };
    }


    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }


    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="状态跟踪"
                    backIconClick={this.backPage}
                />
                <View style={{
                    marginTop: Pixel.getTitlePixel(64),
                    backgroundColor: '#ffffff',
                    width: width,
                    height: Pixel.getPixel(44),
                    flexDirection: 'row',
                    paddingLeft: Pixel.getPixel(15),
                    paddingRight: Pixel.getPixel(15)
                }}>
                    <View style={{
                        flex: 1,
                        height: Pixel.getPixel(44),
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA1
                        }}>借款单号</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        height: Pixel.getPixel(44),
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: fontAndColor.COLORA0
                        }}>{movies[0].payment_number}</Text>
                    </View>
                </View>
                <ListView
                    style={{marginTop: Pixel.getPixel(15)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    bounces={false}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <PurchasePickerChildItem lastIndex={movies.length-1} index={rowId} items={movie}/>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height}}>
                <NavigationView
                    title="状态跟踪"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        height: 0,
        backgroundColor: '#00000000'

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})