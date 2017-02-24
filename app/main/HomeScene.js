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
    TouchableOpacity
} from  'react-native'

import * as fontAndClolr from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();

let MovleData = require('./MoveData.json');
let movies = MovleData.subjects;
import  HomeHeaderItem from './component/HomeHeaderItem';
import  ViewPagers from './component/ViewPager'
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');


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


export default class MyListView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            source: ds.cloneWithRows(movies)

        };
    }


    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    render() {

        return (

            <View style={cellSheet.container}>

                <ListView

                    contentContainerStyle={cellSheet.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    bounces={false}
                />

            </View>
        )
    }

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

    _renderRow(movie, sindex, rowID) {

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
                    <Image style={cellSheet.imageStyle} source={{uri: movie.images.large}}/>
                    <Text style={cellSheet.despritonStyle}>{rowID == 0 ? '我不是盘简历我不是盘简历' : '我不是盘简历我不是'}</Text>
                    <Text style={cellSheet.timeStyle}>{movie.title}</Text>

                </View>
            </View>

        )
    }
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
