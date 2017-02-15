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
} from  'react-native'


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
    new HomeHeaderItemInfo('shouche', 'page111', '收车', '优质车源,最佳商户', require('../../images/mainImage/shouche.png')),
    new HomeHeaderItemInfo('maiche', 'page112', '卖车', '快速发车,一键上架', require('../../images/mainImage/maiche.png')),
    new HomeHeaderItemInfo('jiekuan', 'page113', '借款', '多样化融资方案', require('../../images/mainImage/jiekuan.png')),
    new HomeHeaderItemInfo('huankuan', 'page114', '还款', '方便,快捷,安全', require('../../images/mainImage/huankuan.png')),
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


    _renderRow(movie) {

        return (
            <View style={cellSheet.row}>

                <Image style={cellSheet.thumnail} source={{uri: movie.images.large}}/>
                <View style={cellSheet.rightContainer}>

                    <View style={cellSheet.rightContainerTop}>

                        <Text style={cellSheet.title}>{movie.title}</Text>
                        <Text style={cellSheet.year}>{movie.year}</Text>
                    </View>
                    <View style={cellSheet.rightContainerBottom}>
                        <Text style={cellSheet.despriton}>{movie.casts[0].avatars.medium}</Text>
                    </View>

                </View>


            </View>


        )
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
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    bounces={false}
                />

            </View>
        )
    }

    _renderHeader() {
        let tablist;

        tablist = bossFuncArray;
        let items = [];
        tablist.map((data)=> {
            let tabItem;

            tabItem = <HomeHeaderItem
                ref={data.ref}
                key={data.key}
                functionTitle={data.functionTitle}
                describeTitle={data.describeTitle}
                functionImage={data.functionImage}
            />
            items.push(tabItem);
        });

        return (
            <View>

                <View>
                    <ViewPagers/>
                </View>

                <View style={cellSheet.header}>
                    {items}
                </View>



                <View   style={{flexDirection:'row',width:width,height:30,backgroundColor:'yellow',alignItems:'center',}}>

                    <View style={{marginLeft:20,flex:1}}>
                        <Text>
                            意向车源
                        </Text>

                    </View>

                    <View style={{marginRight:20,flexDirection:'row',justifyContent:'center'}}>

                            <Text>
                                更多
                            </Text>
                        <Image source={require('../../images/mainImage/shouche.png')} style={{marginRight:20,flexDirection:'row',justifyContent:'center'}}/>


                    </View>


                </View>

            </View>

        )
    }
}


const cellSheet = StyleSheet.create({


    header: {
        flex: 1,

        backgroundColor: 'green',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10,

    },

    headerTitle: {

        fontSize: 20,
    },

    container: {

        flex: 1,
        marginTop: 0,   //设置listView 顶在最上面
        backgroundColor: '#F5FCFF',
    },

    row: {

        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },

    thumnail: {

        width: 80,
        height: 81,
    },

    rightContainer: {

        marginLeft: 20,
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainerTop: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },

    rightContainerBottom: {

        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        flex: 1,
        fontSize: 15,
        textAlign: 'left',

    },
    year: {
        fontSize: 15,
        textAlign: 'center',
        marginRight: 20,
    },
    Separator: {

        backgroundColor: 'white',
        height: 2,

    },
    despriton: {

        textAlign: 'left',

    }

});
