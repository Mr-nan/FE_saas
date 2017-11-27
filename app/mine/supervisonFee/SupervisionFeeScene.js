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
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SupervisionTabBar from './SupervisionTabBar';
import SupervisionTotalScene from './SupervisionTotalScene';
import NavigationView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';

export default class SupervisionFeeScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.noPayNum = 0;
        this.payNum = 0;
        show = true;
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }


    initFinish = () => {
        // this.getData();
    }


    getData = () => {
        first = '';
        last = '';
        let maps = {
            api: Urls.GET_CONTRACT_REMIND,
            opt_user_id: this.props.opt_user_id,
            opt_merge_id: this.props.opt_merge_id
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    if (response.mjson.data != null) {
                        if (response.mjson.data.wait_ctc_sign_num != null && response.mjson.data.wait_ctc_sign_num != '0') {
                            last = '、(' + response.mjson.data.wait_ctc_sign_num + ')';
                        }
                        if (response.mjson.data.wait_sign_num != null && response.mjson.data.wait_sign_num != '0') {
                            first = '、(' + response.mjson.data.wait_sign_num + ')';
                        }
                    }
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'success'});
                });
    }


    render() {
        // if (this.state.renderPlaceholderOnly != 'success') {
        //     return this._renderPlaceholderView();
        //
        // }
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                <ScrollableTabView
                    style={{marginTop: Pixel.getTitlePixel(64)}}
                    initialPage={0}
                    locked={true}
                    scrollWithoutAnimation={true}
                    renderTabBar={() =>
                        <SupervisionTabBar
                            noPayNum={this.noPayNum}
                            tabName={["全部", "未支付", "已支付 （" + this.payNum+"）"]}/>}>
                    <SupervisionTotalScene tabLabel="total"
                                           navigator={this.props.navigator} tabNum={'0'}/>
                    <SupervisionTotalScene tabLabel="no-pay"
                                           navigator={this.props.navigator} tabNum={'1'}/>
                    <SupervisionTotalScene tabLabel="pay"
                                           navigator={this.props.navigator} tabNum={'2'}/>


                </ScrollableTabView>
                <NavigationView
                    title="监管费"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    /**
     * from @zhaojian
     *
     * 页面加载完成前的loading
     **/
    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="监管费"
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
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    }
})