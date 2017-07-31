/**
 * Created by hanmeng on 2017/7/26.
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
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import BaseInfoItem from "./component/item/BaseInfoItem";
import BuyerDemandItem from "./component/item/BuyerDemandItem";
import CommunicationRecordItem from "./component/item/CommunicationRecordItem";

export default class ClientAddScene extends BaseComponent {

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
                        title="客户信息"
                        renderRihtFootView={this._navigatorRightView}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <NavigationView
                        backIconClick={this.backPage}
                        title="客户信息"
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
                <BaseInfoItem ref={(ref) => {
                    this.baseInfoItem = ref
                }} navigator={this.props.navigator}/>
            )
        } else if (rowData === '1') {
            return (
                <BuyerDemandItem ref={(ref) => {
                    this.buyerDemandItem = ref
                }} navigator={this.props.navigator}/>
            )
        } else if (rowData === '2') {
            return (
                <CommunicationRecordItem ref={(ref) => {
                    this.communicationRecordItem = ref
                }} navigator={this.props.navigator}/>
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
                    this.checkInfo();
                }}>
                <Text style={{color: fontAndColor.COLORA3}}>保存</Text>
            </TouchableOpacity>
        );
    }

    /**
     *
     **/
    submitClientInfo = () => {

    };

    /**
     *
     **/
    checkInfo = () => {
        this.clientInfo = [];
        let baseInfoItems = this.baseInfoItem.getItemData();
        for (let key in baseInfoItems) {
            this.clientInfo.push(baseInfoItems[key]);
        }

        let buyerDemandItems = this.buyerDemandItem.getItemData();
        for (let key in buyerDemandItems) {
            this.clientInfo.push(buyerDemandItems[key]);
        }

        let communicationRecordItems = this.communicationRecordItem.getItemData();
        for (let key in communicationRecordItems) {
            this.clientInfo.push(communicationRecordItems[key]);
        }
        //console.log('this.clientInfo=====', this.clientInfo);
        for (let key in this.clientInfo) {
            //console.log('this.clientInfo=====', key + this.clientInfo[key]);
            if (this.clientInfo[key].value == '') {
                this.props.showToast(this.clientInfo[key].name + '不能为空');
                return false;
            }
        }
        return true;
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    }
})