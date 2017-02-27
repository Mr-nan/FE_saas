/**
 * Created by yujinzhong on 2017/2/8.
 */

import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    InteractionManager,
    RefreshControl
} from  'react-native'

import * as fontAndClolr from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
let page = 1;
let status = 1;
import  HomeHeaderItem from './component/HomeHeaderItem';
import  ViewPagers from './component/ViewPager'
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
import BaseComponet from '../component/BaseComponent';
import * as Urls from '../constant/appUrls';
import {request} from '../utils/RequestUtil';
import  LoadMoreFooter from '../component/LoadMoreFooter';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let allList = [];
export class HomeHeaderItemInfo {
    constructor(ref, key, functionTitle, describeTitle, functionImage) {

        this.ref = ref;
        this.key = key;
        this.functionTitle = functionTitle;
        this.describeTitle = describeTitle;
        this.functionImage = functionImage;
    }

}

const bossFuncArray = [
    new HomeHeaderItemInfo('shouche', 'page111', '收车', '真实靠谱车源', require('../../images/mainImage/shouche.png')),
    new HomeHeaderItemInfo('maiche', 'page112', '卖车', '面向全国商家', require('../../images/mainImage/maiche.png')),
    new HomeHeaderItemInfo('jiekuan', 'page113', '借款', '一步快速搞定', require('../../images/mainImage/jiekuan.png')),
    new HomeHeaderItemInfo('huankuan', 'page114', '还款', '智能自动提醒', require('../../images/mainImage/huankuan.png')),
];
const employerFuncArray = [bossFuncArray[0], bossFuncArray[1]];


export default class HomeScene extends BaseComponet {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            source: [],
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        };
    }

    initFinish = () => {
        this.getData();
    }
    getData = () => {
        let maps = {
            page: page,
            rows: 6
        };
        request(Urls.HOME, 'Post', maps)
            .then((response) => {
                    allList.push(...response.mjson.data.carList.list);
                    this.setState({
                        renderPlaceholderOnly: 'success',
                        source: ds.cloneWithRows(allList), isRefreshing: false
                    });
                    status = response.mjson.data.carList.status;
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                });
    }

    allRefresh = () => {
        allList = [];
        this.setState({renderPlaceholderOnly: 'loading'});
        page = 1;
        this.getData();
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }

    toEnd = () => {
        if (status == 1) {
            page++;
            this.getData();
        } else {
            this.props.jumpScene('carpage');
        }
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (

                <View style={cellSheet.container}>
                    {
                        this.loadView()
                    }
                </View>
            )
        }
        return (

            <View style={cellSheet.container}>

                <ListView
                    initialListSize={6}
                    stickyHeaderIndices={[]}
                    onEndReachedThreshold={1}
                    scrollRenderAheadDistance={1}
                    pageSize={6}
                    contentContainerStyle={cellSheet.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    bounces={false}
                    refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.refreshingData}
                                        tintColor={[fontAndClolr.COLORB0]}
                                        colors={[fontAndClolr.COLORB0]}
                                    />
                                }
                    renderFooter={
                                    this.renderListFooter
                                }
                    onEndReached={this.toEnd}
                />

            </View>
        )
    }

    renderListFooter = () => {

        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={status==2?true:false}/>)
        }

    }

    refreshingData = () => {
        allList = [];
        this.setState({isRefreshing: true});
        page = 1;
        this.getData();
    };

    homeOnPress = (title) => {
        if (title == '收车') {
            this.props.jumpScene('carpage');
        } else if (title == '卖车') {
            this.props.openModal();
        } else if (title == '借款') {
            this.props.jumpScene('financePage');
        } else {
            this.props.jumpScene('financePage');
        }
    }

    _renderHeader = () => {
        let tablist;
        tablist = bossFuncArray;
        let items = [];
        tablist.map((data) => {
            let tabItem;

            tabItem = <HomeHeaderItem
                ref={data.ref}
                key={data.key}
                functionTitle={data.functionTitle}
                describeTitle={data.describeTitle}
                functionImage={data.functionImage}
                callBack={(title)=>{
                    this.homeOnPress(title);
                }}
            />
            items.push(tabItem);
        });

        return (
            <View>

                <View style={{flexDirection: 'row'}}>
                    <ViewPagers/>
                </View>

                <View style={cellSheet.header}>

                    {items}
                </View>


                <View style={{
                    flexDirection: 'row',
                    width: width,
                    height: Pixel.getPixel(40),
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>

                    <View style={{marginLeft: Pixel.getPixel(20), flex: 1}}>
                        <Text style={{fontSize: Pixel.getFontPixel(15)}}>
                            意向车源
                        </Text>

                    </View>
                    <TouchableOpacity style={{marginRight: Pixel.getPixel(20)}} onPress={()=> {
                                   this.props.jumpScene('carpage');
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'gray', fontSize: Pixel.getFontPixel(12)}}>
                                更多
                            </Text>

                            <Image source={require('../../images/mainImage/more.png')} style={{
                                width: Pixel.getPixel(5),
                                height: Pixel.getPixel(10),
                                marginLeft: Pixel.getPixel(2),
                            }}/>


                        </View>
                    </TouchableOpacity>


                </View>

            </View>

        )
    }

    _renderRow = (movie, sindex, rowID) => {
        return (
            <View style={{
                width: width / 2,
                backgroundColor: '#ffffff',
                borderWidth: 0,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View
                    style={{width: Pixel.getPixel(166), backgroundColor: '#ffffff', justifyContent: 'center'}}>
                    <Image style={cellSheet.imageStyle}
                           source={{uri: 'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/baike/s%3D220/sign=7fa024e5f703738dda4a0b20831ab073/279759ee3d6d55fb745a2d636c224f4a21a4ddd3.jpg'}}/>
                    <Text style={cellSheet.despritonStyle}>{'[' + movie.city_name + ']' + movie.model_name}</Text>
                    <Text
                        style={cellSheet.timeStyle}>{this.dateReversal(movie.create_time + '000') + '/' + movie.mileage + '万公里'}</Text>

                </View>
            </View>

        )
    }
    dateReversal = (time) => {
        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "年" + (date.getMonth() + 1) + "月");

    };
}


const cellSheet = StyleSheet.create({


    header: {

        backgroundColor: fontAndClolr.COLORA3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: Pixel.getPixel(10),

    },

    headerTitle: {

        fontSize: Pixel.getFontPixel(20),
    },

    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: 'white',
    },

    row: {

        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },

    imageStyle: {

        width: Pixel.getPixel(166),
        height: Pixel.getPixel(111),
    },
    listStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',

    },

    timeStyle: {
        textAlign: 'left',
        color: fontAndClolr.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndClolr.MARKFONT),
        marginTop: Pixel.getPixel(8),
        marginBottom: Pixel.getPixel(10)
    },

    Separator: {

        backgroundColor: 'white',
        height: Pixel.getPixel(2),

    },
    despritonStyle: {

        textAlign: 'left',
        marginTop: Pixel.getPixel(8),
        color: fontAndClolr.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndClolr.BUTTONFONT30),
        height: Pixel.getPixel(40),

    }

});
