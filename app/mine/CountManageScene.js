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
                />

            </View>
        )
    }


    // 每一行中的数据
    _renderRow=(rowData)=> {
        return (
            <TouchableOpacity style={styles.rowView}
            >

                <Image source={rowData.icon} style={styles.rowLeftImage}/>
                <View style={styles.rowTitleStyle}>
                    <Text style={styles.rowNameTitle}>{rowData.name}</Text>
                    <Text style={styles.rowNnmTitle}>{rowData.name}</Text>
                </View>



                <Image source={cellJianTou} style={styles.rowjiantouImage}/>


            </TouchableOpacity>
        );
    }


}


const styles = StyleSheet.create({

    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor:fontAndClolr.COLORA3,
    },
    listStyle: {
        marginTop:Pixel.getPixel(64),
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndClolr.COLORA3,
        justifyContent: "center"
    },
    rowView: {
        height: Pixel.getPixel(92),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderBottomColor:fontAndClolr.COLORA4,
        borderBottomWidth:1,
        marginTop:Pixel.getPixel(15),
    },
    rowLeftImage: {
        width: Pixel.getPixel(38),
        height: Pixel.getPixel(38),
        marginLeft:Pixel.getPixel(15),
    },
    rowjiantouImage: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        marginRight:Pixel.getPixel(15),

    },
    rowNameTitle: {
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT30),
        color:fontAndClolr.COLORA0,
        marginBottom:Pixel.getPixel(10)

    },
    rowNnmTitle: {
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT24),
        color:fontAndClolr.COLORA1,

    },
    rowTitleStyle:{
        marginLeft:Pixel.getPixel(10),
        flex:1,
        justifyContent:'center',
    }


});