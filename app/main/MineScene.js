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
import CountInfoScene from '../mine/CountInfoScene';
import CountManageScene from '../mine/CountManageScene'
const cellJianTou = require('../../images/mainImage/celljiantou.png');
const Car = [
    {
        "cars": [
            {
                "icon":require('../../images/mainImage/zhanghuguanli.png'),
                "name": "账户管理"
            },
        ],
        "title": "section0"
    },
    {
        "cars": [
            {
                "icon":require('../../images/mainImage/youhuiquanguanli.png'),
                "name": "优惠券管理"
            },
            {
                "icon":require('../../images/mainImage/jifenguanli.png'),
                "name": "积分管理"
            },
            {
                "icon":require('../../images/mainImage/hetongguanli.png'),
                "name": "合同管理"
            },
            {
                "icon":require('../../images/mainImage/yuangongguanli.png'),
                "name": "员工管理"
            },
        ],
        "title": "section1"
    },
    {
        "cars": [
            {
                "icon":require('../../images/mainImage/shoucangjilu.png'),
                "name": "收藏记录"
            },
            {
                "icon":require('../../images/mainImage/liulanlishi.png'),
                "name": "浏览历史"
            },
        ],
        "title": "section2"
    },
    {
        "cars": [
            {
                "icon":require('../../images/mainImage/shezhi.png'),
                "name": "设置"
            },
        ],
        "title": "section3"
    },
]

// let Car = require('./Car.json');
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class MineSectionListView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        //    拿到所有的json数据
        var jsonData = Car;

        //    定义变量
        var dataBlob = {},
            sectionIDs = [],
            rowIDs = [];
        for (var i = 0; i < jsonData.length; i++) {
            //    1.拿到所有的sectionId
            sectionIDs.push(i);

            //    2.把组中的内容放入dataBlob内容中
            dataBlob[i] = jsonData[i].title;

            //    3.设置改组中每条数据的结构
            rowIDs[i] = [];

            //    4.取出改组中所有的数据
            var cars = jsonData[i].cars;

            //    5.便利cars,设置每组的列表数据
            for (var j = 0; j < cars.length; j++) {
                //    改组中的每条对应的rowId
                rowIDs[i].push(j);

                // 把每一行中的内容放入dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }
        }

        let getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ":" + rowID];
        };
        const ds = new ListView.DataSource({
                getSectionData: getSectionData,
                getRowData: getRowData,
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        );

        this.state = {
            source: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)

        };
    }


    render() {

        return (

            <View style={styles.container}>

                <ListView
                    contentContainerStyle={styles.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSectionHeader={this._renderSectionHeader}
                    renderHeader={this._renderHeader}
                />

            </View>
        )
    }
    navigatorParams={
        name:'CountInfoScene',
        component:CountManageScene,
        params:{

        }
    }

    // 每一行中的数据
    _renderRow=(rowData)=> {
        return (
            <TouchableOpacity style={styles.rowView} onPress={()=>{
                this.props.callBack(this.navigatorParams);
            }}>

                <Image source={rowData.icon} style={styles.rowLeftImage}/>

                <Text style={styles.rowTitle}>{rowData.name}</Text>

                <Image source={cellJianTou} style={styles.rowjiantouImage}/>


            </TouchableOpacity>
        );
    }

    // 每一组对应的数据
    _renderSectionHeader(sectionData, sectionId) {
        return (
            <View style={styles.sectionView}>
            </View>
        );
    }

    _renderHeader = ()=> {

        return (

            <View style={styles.headerViewStyle}>

                <TouchableOpacity style={styles.headerImageStyle}>
                    <Image source={require('../../images/mainImage/mineSelect.png')}
                           style={{
                               width: Pixel.getPixel(65),
                               height: Pixel.getPixel(65),
                               borderRadius: Pixel.getPixel(65 / 2),
                               borderColor: 'black',
                               borderWidth: 1,
                           }}
                    />

                </TouchableOpacity>

                <Text style={styles.headerNameStyle}>
                    隔壁老王
                </Text>

                <Text style={styles.headerPhoneStyle}>
                    16516153866
                </Text>
            </View>



        )
    }

}


const styles = StyleSheet.create({


    headerViewStyle: {

        height: Pixel.getPixel(210),
        width: width,
        backgroundColor: fontAndClolr.COLORB0,
        alignItems: 'center',

    },
    headerImageStyle: {

        width: Pixel.getPixel(65),
        height: Pixel.getPixel(65),
        marginTop: Pixel.getPixel(55),
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerNameStyle: {

        color: 'white',
        fontSize: Pixel.getFontPixel(15),
        marginTop: Pixel.getPixel(15),
        marginBottom: Pixel.getPixel(10),
        fontWeight:'bold'
    },
    headerPhoneStyle: {
        color: 'white',
        fontSize: Pixel.getFontPixel(12)
    },
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor:fontAndClolr.COLORA3,
    },
    listStyle: {
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndClolr.COLORA3,
        justifyContent: "center"
    },
    sectionTitle: {
        marginLeft: 16,
    },
    rowView: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderBottomColor:fontAndClolr.COLORA4,
        borderBottomWidth:1
    },
    rowLeftImage: {
        width: Pixel.getPixel(26),
        height: Pixel.getPixel(26),
        marginLeft:Pixel.getPixel(15),
    },
    rowjiantouImage: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        marginRight:Pixel.getPixel(15),

    },
    rowTitle: {
        flex:1,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        marginLeft:Pixel.getPixel(20),
        color:fontAndClolr.COLORA1,

    }


});