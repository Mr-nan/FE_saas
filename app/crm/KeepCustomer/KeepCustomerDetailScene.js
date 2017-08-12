/**
 * Created by hanmeng on 2017/8/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import * as AppUrls from "../../constant/appUrls";
import {request, requestNoToken} from "../../utils/RequestUtil";
import DealAmountItem from "./component/item/DealAmountItem";
import CarInfoItem from "./component/item/CarInfoItem";
import BuyersInfoItem from "./component/item/BuyersInfoItem";

export default class KeepCustomerDetailScene extends BaseComponent {

    /**
     *  constructor
     * @param props
     **/
    constructor(props) {
        super(props);
        this.clientInfo = [];
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank'
        };
    }

    /**
     *
     **/
    initFinish = () => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['0', '1', '2']),
            renderPlaceholderOnly: 'success'
        });
    };

    /**
     *  render
     * @returns {XML}
     **/
    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.container}>
                    {this.loadView()}
                    <NavigationView
                        backIconClick={this.backPage}
                        title="保有客户管理"
                        renderRihtFootView={this._navigatorRightView}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <NavigationView
                        backIconClick={this.backPage}
                        title="保有客户管理"
                        renderRihtFootView={this._navigatorRightView}/>
                    <ListView
                        removeClippedSubviews={false}
                        style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(75)}}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeperator}/>
                </View>
            );
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
     * @param rowData
     * @param selectionID
     * @param rowID
     * @returns {XML}
     * @private
     **/
    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData === '0') {
            return (
                <DealAmountItem />
            )
        } else if (rowData === '1') {
            return (
                <CarInfoItem />
            )
        } else if (rowData === '2') {
            return (
                <BuyersInfoItem />
            )
        }
    };

    /**
     *
     * @returns {XML}
     * @private
     **/
    _navigatorRightView = () => {
        return (
            <TouchableOpacity
                style={{
                    width: Pixel.getPixel(53), height: Pixel.getPixel(27),
                    justifyContent: 'center', alignItems: 'flex-end',
                }}
                activeOpacity={0.8}
                onPress={() => {
                    //this.submitClientInfo();
                }}>
                <Text style={{color: fontAndColor.COLORA3}}>保存</Text>
            </TouchableOpacity>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    }
})