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
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import PurchasePickerItem from '../component/PurchasePickerItem';
import {request} from '../../utils/RequestUtil';
const childItems = [];
export  default class PurchasePickerScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: true,
            source: {}
        };
    }

    componentWillUnmount() {
        childItems.splice(0, childItems.length);
    }

    initFinish = () => {
        let that = this;
        let maps = {
            reqtoken: 'e9ab1d1bb12b2f824df9503ba4f0e4cd',
            source_type: '1',
            archives_status: '2',
            key: '5f9864159325c4e67ff9928b375997c9',
            device_code: 'dycd_bms_android',
        };
        request('https://openbms.dycd.com/api/v1/purchaAuto/getPurchaAutoPicCate', 'Post', maps)
            .then((response) => {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    that.setState({
                        source: ds.cloneWithRows(response.mjson.retdata.cate_list)
                    });
                    for (let i = 0; i < response.mjson.retdata.cate_list.length; i++) {
                        childItems.push({
                            code: response.mjson.retdata.cate_list[i].code,
                            id: response.mjson.retdata.cate_list[i].id,
                            list: []
                        });
                    }
                    InteractionManager.runAfterInteractions(() => {
                        this.setState({renderPlaceholderOnly: false});
                    });
                },
                (error) => {

                });
    }


    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="车辆照片"
                    backIconClick={this.backPage}
                    renderRihtFootView={this._navigatorRightView}
                />
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(79)}}
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
            <PurchasePickerItem items={movie} childList={childItems[rowId]}/>
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
                    title="车辆照片"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    navigatorParams = {}

    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {

            }}>
                <Text style={{
                    color: 'white',
                    fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>下一步</Text>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})