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
    InteractionManagerm,
    RefreshControl,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';

const Pixel = new PixelUtil();
import * as fontAndColor from '../../../../constant/fontAndColor';
import {request} from '../../../../utils/RequestUtil';
import * as Urls from '../../../../constant/appUrls';
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import BaseComponent from '../../../../component/BaseComponent';
import SaasText from "../../../accountManage/zheshangAccount/component/SaasText";
//import ListFooter from './../../../component/LoadMoreFooter';

export default class FlowAllPage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {renderPlaceholderOnly: 'loading'};

    }

    initFinish = () => {

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.setState({
            renderPlaceholderOnly: 'success',
            source: ds.cloneWithRows(['1', '2'])
        })
        //this.getData();
    }

    getData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {};
                request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {

                        },
                        (error) => {
                            this.setState({
                                renderPlaceholderOnly: 'error',
                            });
                        });
            } else {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
            }
        })
    }

    getFlowData = (id, type) => {
        let maps = {};
        request(Urls.ACCOUNT_PAYLOG, 'Post', maps)
            .then((response) => {

                },
                (error) => {

                });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <ListView
                removeClippedSubviews={false}
                style={{marginTop: Pixel.getPixel(8), backgroundColor: fontAndColor.COLORA3, flex: 1}}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                initialListSize={10}
                onEndReachedThreshold={2}
                stickyHeaderIndices={[]}//仅ios
                enableEmptySections={true}
                scrollRenderAheadDistance={10}
                pageSize={10}
                onEndReached={this.toEnd}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshingData}
                        tintColor={[fontAndColor.COLORB0]}
                        colors={[fontAndColor.COLORB0]}
                    />}
            />
        );
    }

    _renderRow = (movie, sectionId, rowId) => {

        return (
            <View style={{padding: Pixel.getPixel(15), backgroundColor: 'white', marginBottom: Pixel.getPixel(8)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
                    <SaasText style={{flex: 1, color: fontAndColor.COLORA1, fontSize: 13}}>运单号234567890</SaasText>
                    <Image source={require('../../../../../images/mine/celljiantou.png')}/>
                </View>

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#f8f8f8',
                    marginVertical: Pixel.getPixel(15),
                    padding: Pixel.getPixel(25),
                    justifyContent:"space-between",
                    borderRadius:Pixel.getPixel(2)
                }}>

                    <View style={{alignItems: 'center',}}>
                        <Image style={{
                            width: Pixel.getPixel(12),
                            height: Pixel.getPixel(12),
                            marginBottom: Pixel.getPixel(7),
                            resizeMode:'contain'
                        }} source={require('../../../../../images/carriagePriceImage/startLocation.png')}/>
                        <SaasText style={{fontSize: 15}}>太原市</SaasText>
                    </View>
                    <View style={{alignItems: 'center',marginTop:Pixel.getPixel(7)}}>
                        <SaasText style={{fontSize: 13, color: fontAndColor.COLORA1}}>大板车运输</SaasText>
                        <Image style={{
                            width: Pixel.getPixel(200),
                            height: Pixel.getPixel(6),
                            resizeMode:'contain'
                        }} source={require('../../../../../images/carriagePriceImage/direction_line.png')}/>
                    </View>

                    <View style={{alignItems: 'center',}}>
                        <Image style={{
                            width: Pixel.getPixel(9),
                            height: Pixel.getPixel(9),
                            marginBottom: Pixel.getPixel(7),
                            resizeMode:'contain'
                        }} source={require('../../../../../images/carriagePriceImage/stopLocation.png')}/>
                        <SaasText style={{fontSize: 15}}>保定市</SaasText>
                    </View>
                </View>




            </View>

        )


    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
            </View>
        );
    }

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<ListFooter isLoadAll={this.state.haveMoreData ? false : true}/>)
        }
    }

    toEnd = () => {

        // if (!this.state.isRefreshing && this.page != this.allPage) {
        //     this.page = this.page + 1;
        //     this.getFlowData(this.enter_base_id, this.user_type);
        // }

    };

    refreshingData = () => {


    }

}
const styles = StyleSheet.create({
    leftText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        minWidth: Pixel.getPixel(100),
        maxWidth: Pixel.getPixel(150),
    },
    text: {
        color: '#ffffff',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        textAlign: 'center',
    },
    rightText: {
        color: '#000',
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        flex: 1,
        textAlign: 'right',
    },
})