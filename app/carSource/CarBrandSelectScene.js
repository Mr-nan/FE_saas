/**
 * Created by zhengnan on 17/2/16.
 */


import React, {Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import *as fontAnColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil';
var Pixel = new PixelUtil();


const carData = require('./carData');
const carTypeData = [{
    "carsTypes": [
        {
            "icon": "m_180_100.png",
            "name": "奥迪A1"
        },
        {
            "icon": "m_92_100.png",
            "name": "奥迪A2"
        },
        {
            "icon": "m_9_100.png",
            "name": "奥迪A3",

        },
        {
            "icon": "m_97_100.png",
            "name": "奥迪A4"
        }
    ],
    "title": "奥迪进口"
},
    {
        "carsTypes": [
            {
                "icon": "m_172_100.png",
                "name": "奥迪A6"
            },
            {
                "icon": "m_157_100.png",
                "name": "奥迪A7"
            },
            {
                "icon": "m_3_100.png",
                "name": "奥迪A8"
            },
            {
                "icon": "m_82_100.png",
                "name": "保时捷"
            },
            {
                "icon": "m_163_100.png",
                "name": "北京汽车"
            },
            {
                "icon": "m_211_100.png",
                "name": "北汽幻速"
            },
            {
                "icon": "m_168_100.png",
                "name": "北汽威旺"
            },
            {
                "icon": "m_14_100.png",
                "name": "北汽制造"
            },
            {
                "icon": "m_2_100.png",
                "name": "奔驰"
            },
            {
                "icon": "m_59_100.png",
                "name": "奔腾"
            },
            {
                "icon": "m_26_100.png",
                "name": "本田"
            },
            {
                "icon": "m_5_100.png",
                "name": "标致"
            },
            {
                "icon": "m_127_100.png",
                "name": "别克"
            },
            {
                "icon": "m_85_100.png",
                "name": "宾利"
            },
            {
                "icon": "m_15_100.png",
                "name": "比亚迪"
            },
            {
                "icon": "m_135_100.png",
                "name": "布加迪"
            }
        ],
        "title": "奥迪国产"
    },];

const footprintData = ['A6L', '捷达王', '汉难达', '奥拓'];

export default class CarBrandSelectScene extends BaseComponent {

    initFinish = () => {

    };

    _backIconClick = () => {


        this.backPage();

    };

    // 构造
    constructor(props) {
        super(props);

        let getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ":" + rowID];
        };


        var dataSource = new ListView.DataSource({
            getSectionData: getSectionData,
            getRowData: getRowData,
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        })


        var dataBlob = {}, sectionIDs = [], rowIDs = [], cars = [],sectionTitleArray=[];

        for (var i = 0; i < carData.length; i++) {
            //把组号放入sectionIDs数组中
            sectionIDs.push(i);
            //把组中内容放入dataBlob对象中
            dataBlob[i] = carData[i].title;
            sectionTitleArray.push(carData[i].title);
            //把组中的每行数据的数组放入cars
            cars = carData[i].cars;
            //先确定rowIDs的第一维
            rowIDs[i] = [];
            //遍历cars数组,确定rowIDs的第二维
            for (var j = 0; j < cars.length; j++) {
                rowIDs[i].push(j);
                //把每一行中的内容放入dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }


            this.state = {

                dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                isHideCarSubBrand: true,
                carTypeCheckend: '',
                carTypes: carTypeData,
                sectionTitleArray:sectionTitleArray,

            };
        }
    }

    // 每一行中的数据
    renderRow = (rowData, sectionID, rowID) => {

        return (
            <TouchableOpacity onPress={() => {

                this.setState({
                    isHideCarSubBrand: false,
                    carTypeCheckend: rowData.name
                });
            }}>
                <View style={styles.rowCell}>
                    <Image style={styles.rowCellImag}></Image>
                    <Text style={styles.rowCellText}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    // 每一组对应的数据
    renderSectionHeader = (sectionData, sectionId) => {

        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{sectionData}</Text>
            </View>
        );
    }

    _checkedCarType = (carType) => {

        this.props.checkedCarClick(carType);
        this.backPage();

    };

    _indexAndScrollClick=(index)=>{

        let scrollY=index*40;
        for (let i=0;i<index;i++)
        {
            let rowIndex = carData[i].cars.length;
            scrollY+=+rowIndex*44;
        }
        this.refs.listView.scrollTo({x: 0, y:scrollY, animated: true});


    };
    render() {

        return (
            <View style={styles.rootContainer}>
                <View style={styles.carBrandHeadView}>
                    <Text style={styles.carBrandHeadText}>足迹:</Text>
                    {
                        footprintData.map((data, index) => {
                            return (
                                <View style={styles.footprintView} key={index}>
                                    <Text style={styles.footprintText}>{data}</Text>
                                </View>)
                        })
                    }
                </View>
                <ListView ref="listView"
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    contentContainerStyle={styles.listStyle}
                          pageSize={100}
                    onScroll={() => {

                        if(!this.state.isHideCarSubBrand)
                        {
                            this.setState({
                                isHideCarSubBrand: true,

                            });
                        }
                    }}
                />

                <ZNListIndexView  indexTitleArray={this.state.sectionTitleArray} indexClick={this._indexAndScrollClick}/>

                <NavigationView
                    title="选择品牌"
                    backIconClick={this._backIconClick}
                />
                {
                    this.state.isHideCarSubBrand ? (null) : (
                            <CarSubBrand
                                         data={this.state.carTypes}
                                         title={this.state.carTypeCheckend}
                                         checkedCarType={this.props.checkedCarType}
                                         checkedCarClick={this._checkedCarType}/>
                        )
                }

            </View>
        )
    }

}

class CarSubBrand extends Component {


    constructor(props) {
        super(props);

        const {data} = this.props;

        let getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ":" + rowID];
        };


        var dataSource = new ListView.DataSource({
            getSectionData: getSectionData,
            getRowData: getRowData,
            rowHasChanged: (r1, r2) => r1 == r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        })


        var dataBlob = {}, sectionIDs = [], rowIDs = [], cars = [];

        for (var i = 0; i < data.length; i++) {
            sectionIDs.push(i);
            dataBlob[i] = data[i].title;
            cars = data[i].carsTypes;
            rowIDs[i] = [];
            for (var j = 0; j < cars.length; j++) {
                rowIDs[i].push(j);
                dataBlob[i + ':' + j] = cars[j];
            }
            this.state = {
                dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                valueRight:new Animated.Value(0),

            };
        }
    }

    // 每一行中的数据
    renderRow = (rowData, sectionID, rowID) => {
        var aaa = this.state.dataSource;
        return (

            <TouchableOpacity onPress={() => {

                this.props.checkedCarClick(rowData.name);

            }}>
                <View style={styles.rowCell}>
                    <Text
                        style={[styles.rowCellText, this.props.checkedCarType == rowData.name && {color: fontAnColor.COLORB0}]}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    // 每一组对应的数据
    renderSectionHeader = (sectionData, sectionId) => {

        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{sectionData}</Text>
            </View>
        );
    }

    componentDidMount() {

        this.state.valueRight.setValue(ScreenWidth);
        Animated.spring(
            this.state.valueRight,
            {
                toValue:ScreenWidth*0.5,
                friction:5,
            }
        ).start();

    }


    render() {

        return (

            <Animated.View style={[styles.carSubBrandView,{left:this.state.valueRight}]}>
                <View style={styles.carSubBrandHeadView}>
                    <Image style={styles.rowCellImag}/>
                    <Text style={styles.rowCellText}>{this.props.title}</Text>
                </View>
                <ListView
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    contentContainerStyle={styles.listStyle}
                />
            </Animated.View>
        )

    }

}

class ZNListIndexView extends Component{


    render(){
        const {indexTitleArray}=this.props;
        return(
            <View style={styles.indexView}>
                {
                    indexTitleArray.map((data,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.indexItem} onPress={()=>{

                                this.props.indexClick(index);

                            }}>
                                <Text style={styles.indexItemText}>{data}</Text>
                            </TouchableOpacity>
                        )
                    })


                }
            </View>
        )
    }

}

var ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    carBrandHeadView: {

        backgroundColor: 'white',
        height: 49,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 64,
        flexDirection: 'row',


    },
    carBrandHeadText: {

        color: fontAnColor.COLORA0,
        fontSize: fontAnColor.LITTLEFONT,
        backgroundColor: 'white',
        marginLeft: 15,
    },

    footprintView: {

        marginLeft: 7,
        marginRight: 3,
        paddingHorizontal: 10,
        height: 20,
        borderRadius: 4,
        backgroundColor: fontAnColor.COLORA3,
        justifyContent: 'center'
    },
    footprintText: {

        color: fontAnColor.COLORA0,
        fontSize: fontAnColor.CONTENTFONT,
    },

    carSubBrandHeadView: {

        flexDirection: 'row',
        backgroundColor: 'white',
        height: 44,
        alignItems: 'center',
    },
    carSubBrandView: {

        backgroundColor: 'white',
        top: 64,
        bottom: 0,
        position: 'absolute',
        width: ScreenWidth * 0.5,
        borderLeftWidth: 2,
        borderLeftColor: fontAnColor.COLORA3,

    },

    navigation: {

        height: Pixel.getPixel(64),
        // height:64,
        backgroundColor: fontAnColor.COLORB0,
        left: 0,
        right: 0,
        position: 'absolute',


    },

    sectionHeader: {
        backgroundColor: fontAnColor.COLORA3,
        height: 40,
        justifyContent: 'center'
    },
    sectionText: {
        marginLeft: 31,
        color: fontAnColor.COLORA1,
        fontSize: fontAnColor.LITTLEFONT,
    },
    rowCell: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAnColor.COLORA3,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    rowCellImag: {
        width: 40,
        height: 40,
        marginLeft: 15,
        backgroundColor: fontAnColor.COLORB0
    },
    rowCellText: {
        marginLeft: 5,
        color: fontAnColor.COLORA0,
        fontSize: fontAnColor.LITTLEFONT,
    },

    indexView:{

        position: 'absolute',
        bottom:0,
        top:113,
        backgroundColor:'transparent',
        right:0,
        width:45,
        alignItems:'center',
        justifyContent:'center',

    },
    indexItem:{

        marginTop:6,
        width:30,
        backgroundColor:'transparent',


    },
    indexItemText:{

        color:fontAnColor.COLORA0,
        fontSize:fontAnColor.CONTENTFONT,
        textAlign:'center',
    },

});