/**
 * Created by zhengnan on 2017/5/9.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,
    Image
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

import *as appUrls from '../../constant/appUrls';
import {request} from "../../utils/RequestUtil";

const provinceData = (require('../../carSource/carData/carFilterData.json')).provinceSource2;
const SceneWidth = Dimensions.get('window').width;
const delImage = require('../../../images/deleteIcon2x.png');

let selectData={
    provice_id:'',
    provice_code:'',
    provice_name:'',
    city_name:'',
    city_id:'',
    city_code:'',
    district_id:'',
    district_name:'',
    district_code:''
};

export default class CityRegionScene extends Component{

    componentWillMount() {
        selectData.provice_id = '';
        selectData.provice_name = '';
        selectData.provice_code = '';
        selectData.city_name='';
        selectData.city_id='';
        selectData.city_code='';
        selectData.district_name='';
        selectData.district_id='';
        selectData.district_code='';
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.titleArray = [];

        let  getSectionData = (dataBlob,sectionID)=>{
            return dataBlob[sectionID];
        };
        let  getRowData = (dataBlob,sectionID,rowID)=>{
            return dataBlob[sectionID+":"+rowID];
        };

        const dataSource = new  ListView.DataSource(
            {
                getSectionData:getSectionData,
                getRowData:getRowData,
                sectionHeaderHasChanged:(s1,s2)=>s1!==s2,
                rowHasChanged:(r1,r2)=>r1!==r2,
            }
        );

        let dataBlob={},sectionIDS=[],rowIDS=[],rows=[];
        for (var i=0;i<provinceData.length;i++){

            sectionIDS.push(i);
            dataBlob[i]=provinceData[i].title;
            this.titleArray.push(dataBlob[i]);
            rows = provinceData[i].data;
            rowIDS[i] = [];
            for (var j=0;j<rows.length;j++){
                rowIDS[i].push(j);
                dataBlob[i+':'+j] = rows[j];
            }
        }

        this.state = {
            dataSource:dataSource.cloneWithRowsAndSections(dataBlob,sectionIDS,rowIDS),
            isShowCityList:false,
            isShowDistrictList:false
        };
    }

    _checkedCityClick=()=>{
        if(this.props.noneDistrict === true){
            this.props.checkAreaClick(selectData);
            this.props.closePress();
        }else{
            if (!this.state.isShowDistrictList) {
                this.setState({
                    isShowDistrictList: true,
                });
            } else {
                this.refs.districtList.loadData();
            }
        }
    };

    _checkDistrictClick = ()=>{
        this.props.checkAreaClick(selectData);
        this.props.closePress();
    };

    loadModel=(type)=>{
        this.props.showModal(type);
    };

    render(){
        return(
        <View style={styles.absContainer}>
            <View style={styles.rootContainer}>
                <View style={styles.rootTitleContainer}>
                    <Text style={styles.rootTitleText}>所在区域</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.rootDelContainer}
                        onPress={()=>{
                            this.props.closePress();
                        }}
                    >
                        <Image style={styles.rootDelImage} source={delImage}/>
                    </TouchableOpacity>
                </View>
                <ListView
                    ref="listView"
                    dataSource={this.state.dataSource}
                    renderSectionHeader={(sectionData)=>{
                        return(
                            <View style={styles.sectionHeader}>
                                <Text allowFontScaling={false}  style={styles.sectionText}>{sectionData}</Text>
                            </View>
                        )
                    }}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    onScroll={() => {
                        if (this.state.isShowCityList) {
                            this.setState({
                                isShowCityList:false,
                            });
                        }}}/>
                <ZNListIndexView indexTitleArray={this.titleArray} indexClick={this._indexAndScrollClick}/>
                {
                    this.state.isShowCityList && (<CityList  isZs = {this.props.isZs} ref="cityList" checkedCityClick={this._checkedCityClick} isSelectProvince = {this.props.isSelectProvince} showLoadModel={this.loadModel}/>)
                }
                {
                    this.state.isShowDistrictList && (<DistrictList  ref="districtList" checkDistrictClick={this._checkDistrictClick} showLoadModel={this.loadModel}/>)
                }
            </View>
        </View>)
    }

    // 每一行中的数据
    renderRow = (rowData) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>{
                this.setState({isShowCityList:true});

                if(selectData.provice_id == rowData.provId){return;}

                selectData.city_name=rowData.provName;
                selectData.provice_id=rowData.provId;
                selectData.provice_name=rowData.provName;
                selectData.provice_code=rowData.provCode;

                this.refs.cityList && this.refs.cityList.loadData();
            }}>
                <View style={styles.rowCell}>
                    <Text allowFontScaling={false}  style={styles.rowCellText}>{rowData.provName}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _indexAndScrollClick = (index) => {

        let listView = this.refs.listView;
        let scrollY = index * Pixel.getPixel(40);
        for (let i = 0; i < index; i++) {
            let rowIndex = provinceData[i].data.length;
            scrollY += +rowIndex * Pixel.getPixel(44);
        }
        listView.scrollTo({x: 0, y: scrollY, animated: true});
    };

}

class CityList extends  Component{

    componentDidMount() {

        this.state.valueRight.setValue(SceneWidth);
        Animated.spring(
            this.state.valueRight,
            {
                toValue: SceneWidth * 0.2,
                friction: 5,
            }
        ).start();

        this.loadData();


    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });

        this.state = {
            dataSource:dataSource,
            valueRight: new Animated.Value(0),
        };
    }

    loadData=()=>{

        this.props.showLoadModel(true);

        request(appUrls.REGION_CITY,'post',{provId:selectData.provice_id,provCode:selectData.provice_code})
            .then((response) => {

                this.props.showLoadModel(false);

                if(response.mycode ==1){
                    this.setState(
                        {dataSource:this.state.dataSource.cloneWithRows(response.mjson.data)}
                    );
                }


            }, (error) => {
                this.props.showLoadModel(false);

                console.log(error);

            });
    }
    render(){
        return(
            <Animated.View style={[styles.cityContainer,{left:this.state.valueRight}]}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          removeClippedSubviews={false}
                          enableEmptySections={true}
                          renderHeader={()=>{
                              return(
                                  <TouchableOpacity style={styles.sectionHeader} onPress={()=>{
                                      if(this.props.isSelectProvince)
                                      {
                                          this.props.checkedCityClick();
                                      }
                                  }} activeOpacity={1}>
                                      <Text allowFontScaling={false}  style={styles.sectionText}>{selectData.provice_name}</Text>
                                  </TouchableOpacity>
                              )}}/>
            </Animated.View>
        )
    }
    // 每一行中的数据
    renderRow = (rowData) => {
        return (

            <TouchableOpacity style={styles.rowCell} onPress={()=>{
                selectData.city_name=rowData.cityName;
                selectData.city_id=rowData.cityId;
                selectData.city_code=rowData.cityCode;
                this.props.checkedCityClick();
            }}>
                <Text allowFontScaling={false}  style={styles.rowCellText}>{rowData.cityName}</Text>
            </TouchableOpacity>
        )
    };
}

class DistrictList extends  Component{

    componentDidMount() {

        this.state.valueRight.setValue(SceneWidth);
        Animated.spring(
            this.state.valueRight,
            {
                toValue: SceneWidth * 0.5,
                friction: 5,
            }
        ).start();

        this.loadData();


    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });

        this.state = {
            dataSource:dataSource,
            valueRight: new Animated.Value(0),
        };
    }

    loadData=()=>{

        this.props.showLoadModel(true);

        request(appUrls.REGION_COUNTY,'post',{provId:selectData.provice_id,provCode:selectData.provice_code,
            cityId:selectData.city_id,cityCode:selectData.city_code})
            .then((response) => {

                this.props.showLoadModel(false);
                //广东东莞，"441900"
                // cityCode:"441900"
                // cityId:367
                // cityName:"东莞"
                // countyCode:"441900"
                // countyName:"东莞市"
                // id:11831
                // initial:""
                // provCode:"440000"
                // provId:20
                // provName:"广东"
                // 海南三沙，
                // cityCode:"460300"
                // cityId:396
                // cityName:"三沙"
                // countyCode:"460321"
                // countyName:"西沙群岛"
                // id:11966
                // initia:""
                // provCode:"460000"
                // provId:25
                // provName:"海南"
                // 甘肃嘉峪关，
                // cityCode:"620200"
                // cityId:135
                // cityName:"嘉峪关"
                // countyCode:"620201"
                // countyName:"嘉峪关市"
                // id:12612
                // initial:""
                // provCode:"620000"
                // provId:21
                // provName:"甘肃"
                // 海南儋州，
                // cityCode:"460400"
                // cityId:138
                // cityName:"儋州"
                // countyCode:"460400"
                // countyName:"儋州市"
                // id:11969
                // initial:""
                // provCode:"460000"
                // provId:25
                // provName:"海南"
                // 广东中山
                // cityCode:"442000"
                // cityId:373
                // cityName:"中山"
                // countyCode:"442000"
                // countyName:"中山市"
                // id:11832
                // initial:""
                // provCode:"440000"
                // provId:20
                // provName:"广东"


                if(response.mycode ==1){
                    if(response.mjson.data.length == 0){

                        let data = [];
                        switch (selectData.city_code){
                            case '441900':{  // 东莞
                                data.push({
                                    cityCode:"441900",
                                    cityId:367,
                                    cityName:"东莞",
                                    countyCode:"441900",
                                    countyName:"东莞市",
                                    id:11831,
                                    initial:"",
                                    provCode:"440000",
                                    provId:20,
                                    provName:"广东"
                                })

                            }
                                break
                            case '620200':{ // 嘉峪关
                                data.push({
                                    cityCode:"620200",
                                    cityId:135,
                                    cityName:"嘉峪关",
                                    countyCode:"620201",
                                    countyName:"嘉峪关市",
                                    id:12612,
                                    initial:"",
                                    provCode:"620000",
                                    provId:21,
                                    provName:"甘肃"
                                })
                            }
                                break
                            case '442000':{ // 中山市
                                data.push({
                                    cityCode:"442000",
                                    cityId:373,
                                    cityName:"中山",
                                    countyCode:"442000",
                                    countyName:"中山市",
                                    id:11832,
                                    initial:"",
                                    provCode:"440000",
                                    provId:20,
                                    provName:"广东"
                                })
                            }
                                break
                            case '460400':{ //儋州
                                data.push({
                                    cityCode:"460400",
                                    cityId:138,
                                    cityName:"儋州",
                                    countyCode:"460400",
                                    countyName:"儋州市",
                                    id:11969,
                                    initial:"",
                                    provCode:"460000",
                                    provId:25,
                                    provName:"海南"
                                })
                            }
                                break
                            case '460300':{ //三沙
                                data.push({
                                    cityCode:"460300",
                                    cityId:396,
                                    cityName:"三沙",
                                    countyCode:"460321",
                                    countyName:"西沙群岛",
                                    id:11966,
                                    initia:"",
                                    provCode:"460000",
                                    provId:25,
                                    provName:"海南"
                                })
                            }
                                break



                        }

                        response.mjson.data = data;
                    }

                    this.setState(
                        {dataSource:this.state.dataSource.cloneWithRows(response.mjson.data)}
                    );
                }

            }, (error) => {
                this.props.showLoadModel(false);
                console.log(error);
            });
    };

    render(){
        return(
            <Animated.View style={[styles.cityContainer,{left:this.state.valueRight}]}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          removeClippedSubviews={false}
                          enableEmptySections={true}
                          renderHeader={()=>{
                              return(
                                  <TouchableOpacity style={styles.sectionHeader} onPress={()=>{
                                      if(this.props.isSelectProvince)
                                      {
                                          this.props._checkDistrictClick();
                                      }
                                  }} activeOpacity={1}>
                                      <Text allowFontScaling={false}  style={styles.sectionText}>{selectData.city_name}</Text>
                                  </TouchableOpacity>
                              )}}/>
            </Animated.View>
        )
    }
    // 每一行中的数据
    renderRow = (rowData) => {
        return (

            <TouchableOpacity style={styles.rowCell} onPress={()=>{
                selectData.district_name=rowData.countyName;
                selectData.district_id=rowData.id;
                selectData.district_code=rowData.countyCode;
                this.props.checkDistrictClick();
            }}>
                <Text allowFontScaling={false}  style={styles.rowCellText}>{rowData.countyName}</Text>
            </TouchableOpacity>
        )
    };
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
                                <Text allowFontScaling={false}  style={styles.indexItemText}>{data}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    absContainer:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    },
    rootContainer:{
        flex:1,
        width:SceneWidth,
        backgroundColor:'rgba(0,0,0,0.3)',
        paddingTop:Pixel.getPixel(140),

    },
    rootTitleContainer:{
        height:Pixel.getPixel(44),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    rootTitleText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(16)
    },
    rootDelContainer:{
        height:Pixel.getPixel(44),
        width:Pixel.getPixel(44),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        right:Pixel.getPixel(5),
        bottom:Pixel.getBottomPixel(0),
    },
    rootDelImage:{
        height:Pixel.getPixel(16),
        width:Pixel.getPixel(16),
    },
    sectionHeader: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(40),
        justifyContent: 'center'
    },
    sectionText: {
        marginLeft: Pixel.getPixel(15),
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    rowCell: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    rowCellText: {
        marginLeft: Pixel.getPixel(15),
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    indexView: {
        position: 'absolute',
        bottom: 0,
        top: Pixel.getPixel(184),
        backgroundColor: 'transparent',
        right: 0,
        width: Pixel.getPixel(45),
        alignItems: 'center',
        justifyContent: 'center',

    },
    indexItem: {
        marginTop: Pixel.getPixel(6),
        width: Pixel.getPixel(30),
        backgroundColor: 'transparent',
    },
    indexItemText: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT),
        textAlign: 'center',
    },
    cityContainer:{
        backgroundColor: 'white',
        top: Pixel.getPixel(184),
        bottom: 0,
        position: 'absolute',
        width: SceneWidth * 0.8,
        borderLeftWidth: 2,
        borderLeftColor: fontAndColor.COLORA3,
    },
    districtContainer:{
        backgroundColor: 'white',
        top: Pixel.getPixel(184),
        bottom: 0,
        position: 'absolute',
        width: SceneWidth * 0.5,
        borderLeftWidth: 2,
        borderLeftColor: fontAndColor.COLORA3,
    }
});