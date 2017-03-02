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
    InteractionManager,
    RefreshControl
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
let MovleData = require('./repayment.json');
let movies = MovleData.retdata;
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import PlanParentItem from './component/PlanParentItem';
import OldPlanScene from './OldPlanListScene';
import  PlanInfoScene from './PlanInfoScene';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
export  default class PlanListScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
            isRefreshing: false
        };
    }


    initFinish = () => {
        this.getData();
    }

    getData = () => {
        let maps = {
            api: Urls.GETPLANLIST
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    movies = response.mjson.data;
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        source: ds.cloneWithRows(movies),
                        renderPlaceholderOnly: 'success',
                        isRefreshing: false
                    });
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    }

    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.getData();
    };


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <NavigationView
                    title="还款计划"
                    backIconClick={this.backPage}
                    renderRihtFootView={this._navigatorRightView}
                />
                <ListView
                    style={{marginTop: Pixel.getTitlePixel(79)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    bounces={false}
                    refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                        tintColor={[fontAndColor.COLORB0]}
                                        colors={[fontAndColor.COLORB0]}
                                    />
                                }
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <PlanParentItem items={movie} mOnPress={(loan_code,loan_number,plan_id,type) => {
                this.toNextPage({name:'PlanInfoScene',component:PlanInfoScene,params:{loan_code:loan_code,
                loan_number:loan_number,plan_id:plan_id,type:type}});
            }}/>
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
                    title="还款计划"
                    backIconClick={this.backPage}
                />
                {this.loadView()}
            </View>
        );
    }

    navigatorParams = {
        name: 'OldPlanScene',
        component: OldPlanScene,
        params: {}
    }

    _navigatorRightView = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.toNextPage(this.navigatorParams)
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>历史还款</Text>
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
        height: Pixel.getPixel(15),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})