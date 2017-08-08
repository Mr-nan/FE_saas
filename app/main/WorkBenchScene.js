import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    Linking,
    NativeModules,
    BackAndroid,
    InteractionManager,
    ListView
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
var {height, width} = Dimensions.get('window');
import * as fontAndColor  from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
let Pixel = new PixelUtil();
import NavigationView from '../component/AllNavigationView';
import GetPermissionUtil from '../utils/GetPermissionUtil';
const GetPermission = new GetPermissionUtil();
import WorkBenchItem from './component/WorkBenchItem';
export default class NonCreditScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
            source: [],
        };
    }

    handleBack = () => {
        NativeModules.VinScan.goBack();
        return true;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            renderPlaceholderOnly: 'success',
            source: ds.cloneWithRows(GetPermission.getAllList())
        });
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.source}
                    style={{marginTop: Pixel.getTitlePixel(64)}}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    showsVerticalScrollIndicator={false}
                />
                <NavigationView
                    title="工作台"
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        return (
            <WorkBenchItem items={movie} callBack={(params)=>{this.props.callBack(params);}}/>
        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={{width:width,height:1,backgroundColor: fontAndColor.COLORA3}} key={sectionId + rowId}>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="工作台"
                />
            </View>
        );
    }
}

