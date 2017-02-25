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
    InteractionManager,

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import *as fontAnColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil';
var Pixel = new PixelUtil();

import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";

// const carData = require('./carData');

const footprintData = ['A6L', '捷达王', '汉难达', '奥拓'];

export default class CarBrandSelectScene extends BaseComponent {

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });

    }
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


        const dataSource =  new ListView.DataSource({
                getSectionData: getSectionData,
                getRowData: getRowData,
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            });
        this.state = {

            renderPlaceholderOnly: true,
            dataSource: dataSource,
            isHideCarSubBrand: true,
            carTypeCheckend: '',
            carTypes: [],
            sectionTitleArray: [],
            carData:[],

        };

    }

    componentWillMount() {

        this.loadData();
    }

    loadData = ()=> {

        let url = AppUrls.BASEURL + 'v1/home/brand';
        request(url, 'post', {

            status: 0,

        }).then((response) => {

            console.log(response);
            this.setListData(response.mjson.data);

        }, (error) => {

            console.log(error);

        });


    }

    setListData = (array)=> {

        var dataBlob = {}, sectionIDs = [], rowIDs = [], cars = [], sectionTitleArray = [];
        for (var i = 0; i < array.length; i++) {
            //把组号放入sectionIDs数组中
            sectionIDs.push(i);
            //把组中内容放入dataBlob对象中
            dataBlob[i] = array[i].title;
            sectionTitleArray.push(array[i].title);
            //把组中的每行数据的数组放入cars
            cars = array[i].car;
            //先确定rowIDs的第一维
            rowIDs[i] = [];
            //遍历cars数组,确定rowIDs的第二维
            for (var j = 0; j < cars.length; j++) {
                rowIDs[i].push(j);
                //把每一行中的内容放入dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }

        }

        this.setState({

            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            sectionTitleArray: sectionTitleArray,
            carData:array,

        });
    };

    loadCarSeriesData=(carBrandID,carBrandName)=>{

        let url = AppUrls.BASEURL + 'v1/home/series';
        request(url, 'post', {

            brand_id:carBrandID,

        }).then((response) => {

            console.log(response);

            if(response.mjson.data.length){

                this.setState({
                    isHideCarSubBrand: false,
                    carTypeCheckend:carBrandName,
                    carTypes:response.mjson.data,
                });
            }else
            {
                alert('没数据');
            }



        }, (error) => {

            console.log(error);

        });

    }

    // 每一行中的数据
    renderRow = (rowData, sectionID, rowID) => {

        return (
            <TouchableOpacity onPress={() => {

                this.loadCarSeriesData(rowData.brand_id,rowData.brand_name)

            }}>
                <View style={styles.rowCell}>
                    <Image style={styles.rowCellImag}></Image>
                    <Text style={styles.rowCellText}>{rowData.brand_name}</Text>
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

    _indexAndScrollClick = (index)=> {

        let listView = this.refs.listView;
        let scrollY = index * 40;
        for (let i = 0; i < index; i++) {
            let rowIndex =this.state.carData[i].car.length;
            scrollY += +rowIndex * 44;
        }
        listView.scrollTo({x: 0, y: scrollY, animated: true});


    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <NavigationView
                        title="选择品牌"
                        backIconClick={this._backIconClick}
                    />
                </View>);
        }

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
                {
                    this.state.dataSource && (
                        <ListView ref="listView"
                                  style={{flex: 1}}
                                  dataSource={this.state.dataSource}
                                  renderRow={this.renderRow}
                                  renderSectionHeader={this.renderSectionHeader}
                                  contentContainerStyle={styles.listStyle}
                                  pageSize={100}
                                  onScroll={() => {
                                      if (!this.state.isHideCarSubBrand) {
                                          this.setState({
                                              isHideCarSubBrand: true,
                                          });
                                      }
                                  }}
                        />)
                }

                <ZNListIndexView indexTitleArray={this.state.sectionTitleArray} indexClick={this._indexAndScrollClick}/>
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
        const carSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id });
        this.state = {
            dataSource: carSource.ListViewDataSource.cloneWithRows(data),
            valueRight:new Animated.Value(0),
        };
    }

    // 每一行中的数据
    renderRow = (rowData, sectionID, rowID) => {
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
        height: Pixel.getPixel(49),
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: Pixel.getTitlePixel(64),
        flexDirection: 'row',


    },
    carBrandHeadText: {

        color: fontAnColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAnColor.LITTLEFONT),
        backgroundColor: 'white',
        marginLeft:Pixel.getPixel(15),
    },

    footprintView: {

        marginLeft: Pixel.getPixel(7),
        marginRight: Pixel.getPixel(3),
        paddingHorizontal: Pixel.getPixel(10),
        height: Pixel.getPixel(20),
        borderRadius: 4,
        backgroundColor: fontAnColor.COLORA3,
        justifyContent: 'center'
    },
    footprintText: {

        color: fontAnColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAnColor.CONTENTFONT),
    },

    carSubBrandHeadView: {

        flexDirection: 'row',
        backgroundColor: 'white',
        height: Pixel.getPixel(44),
        alignItems: 'center',
    },
    carSubBrandView: {

        backgroundColor: 'white',
        top: Pixel.getTitlePixel(64),
        bottom: 0,
        position: 'absolute',
        width: ScreenWidth * 0.5,
        borderLeftWidth: 2,
        borderLeftColor: fontAnColor.COLORA3,

    },

    navigation: {

        height: Pixel.getPixel(64),
        backgroundColor: fontAnColor.COLORB0,
        left: 0,
        right: 0,
        position: 'absolute',


    },

    sectionHeader: {
        backgroundColor: fontAnColor.COLORA3,
        height: Pixel.getPixel(40),
        justifyContent: 'center'
    },
    sectionText: {
        marginLeft: Pixel.getPixel(31),
        color: fontAnColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAnColor.LITTLEFONT),
    },
    rowCell: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAnColor.COLORA3,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    rowCellImag: {
        width: Pixel.getPixel(40),
        height: Pixel.getPixel(40),
        marginLeft: Pixel.getPixel(15),
        backgroundColor: fontAnColor.COLORB0
    },
    rowCellText: {
        marginLeft: Pixel.getPixel(5),
        color: fontAnColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAnColor.LITTLEFONT),
    },

    indexView:{

        position: 'absolute',
        bottom:0,
        top:Pixel.getTitlePixel(113),
        backgroundColor:'transparent',
        right:0,
        width:Pixel.getPixel(45),
        alignItems:'center',
        justifyContent:'center',

    },
    indexItem:{

        marginTop:Pixel.getPixel(6),
        width:Pixel.getPixel(30),
        backgroundColor:'transparent',


    },
    indexItemText:{

        color:fontAnColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAnColor.CONTENTFONT),
        textAlign:'center',
    },

});