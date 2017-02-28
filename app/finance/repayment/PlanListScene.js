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
let MovleData = require('./repayment.json');
let movies = MovleData.retdata;
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import PlanParentItem from './component/PlanParentItem';
import OldPlanScene from './OldPlanListScene';
import  PlanInfoScene from './PlanInfoScene';
export  default class PlanListScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: ds.cloneWithRows(movies)
        };
    }


    initFinish = () => {
        this.setState({renderPlaceholderOnly: 'success'});
    }


    render() {
        if (this.state.renderPlaceholderOnly!=='success') {
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
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <PlanParentItem items={movie} mOnPress={(loan_id) => {
                this.toNextPage({name:'PlanInfoScene',component:PlanInfoScene,params:{}});
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