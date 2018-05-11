/**
 * Created by hanmeng on 2017/5/8.
 * 采购订单
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    RefreshControl,
    Dimensions
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import * as fontAndColor from '../../constant/fontAndColor';
import NavigatorView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil'
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import LogisCarInfoTopItem from './logisComponent/LogisCarInfoTopItem';
import LogisCarInfoCenterItem from './logisComponent/LogisCarInfoCenterItem';
import LogisCarInfoBottomItem from './logisComponent/LogisCarInfoBottomItem';

var Pixel = new PixelUtil();

export default class LogisCarInfoScene extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([1, 2, 3]),
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,
            scrollEnabled: true
        };
    }

    componentDidMount() {
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'}, () => {
                this.initFinish();
            });

            //});
        }
    }

    initFinish = () => {
        this.loadData();
    };

    // 下拉刷新数据
    refreshingData = () => {
        this.setState({isRefreshing: true});
        this.loadData();
    };

    loadData = () => {
        this.setState({renderPlaceholderOnly: 'success'});
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                <NavigatorView title='单车详情' backIconClick={this.backPage}/>
                {this.loadView()}
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='单车详情' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(60)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          showsVerticalScrollIndicator={false}
                          scrollEnabled={this.state.scrollEnabled}
                          onScroll={(event)=>{
                                this.offY = Pixel.getPixel(event.nativeEvent.contentOffset.y);
                                if(this.offY==286){
                                    console.log("----------------");
                                     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                     this.setState({ dataSource: ds.cloneWithRows([1, 2, 3])});
                                }
                            }}
                          refreshControl={
                                  <RefreshControl
                                      refreshing={this.state.isRefreshing}
                                      onRefresh={this.refreshingData}
                                      tintColor={[fontAndColor.COLORB0]}
                                      colors={[fontAndColor.COLORB0]}
                                  />
                              }/>
            </View>);
        }
    }


    _renderRow = (rowData, selectionID, rowID) => {
        if (rowID == 0) {
            return (<LogisCarInfoTopItem></LogisCarInfoTopItem>);
        } else if (rowID == 1) {
            return (<LogisCarInfoCenterItem></LogisCarInfoCenterItem>);
        } else {
            return (<LogisCarInfoBottomItem offy={this.offY} callBack={(content)=>{
                console.log(55555555555555555);
                this.setState({scrollEnabled:content});
            }}></LogisCarInfoBottomItem>);
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    rowView: {
        height: Pixel.getPixel(186),
        backgroundColor: 'white'
    },
    rowTitleLine: {
        alignItems: 'center',
        height: Pixel.getPixel(40),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //marginTop: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)
    },
    rowTitleState: {
        alignItems: 'flex-end',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB2,
        marginRight: Pixel.getPixel(15)
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    image: {
        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        resizeMode: 'stretch'
    },
    carDescribeTitle: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA1
    },
    carDescribe: {
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color: fontAndColor.COLORA0
    }
});